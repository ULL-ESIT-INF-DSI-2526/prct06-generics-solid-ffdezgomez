import { Chef } from './chef'
import type { Receta } from './receta'
import type { PasoBase } from './paso'
import type { Recetario } from './recetario'
import type { Repository } from './repository'
import { InMemoryRepository } from './repository'
import { RecipeTimeEstimator } from './services/recipeTimeEstimator'
import { ConsoleTableRenderer, TablePresenter } from './services/tablePresenter'
import { ChefSearchService, RecipeSearchService, StepSearchService } from './services/searchServices'

/**
 * System class that manages chefs and their recipes. It allows adding chefs, printing chefs and recipes, and searching for chefs, recipes, and steps by name.
 */
export class System
{
  readonly #chefRepo: Repository<Chef, string | number>
  readonly #timeEstimator = new RecipeTimeEstimator<PasoBase>()
  readonly #chefSearch: ChefSearchService
  readonly #recipeSearch: RecipeSearchService
  readonly #stepSearch: StepSearchService
  
  /**
   *  Initializes the System with an array of chefs.
   * @param chefs - An array of Chef objects to initialize the system with.
   */
  constructor(chefs: Chef[] = [], chefRepo?: Repository<Chef, string | number>) {
    this.#chefRepo = chefRepo ?? new InMemoryRepository<Chef, string | number>((chef) => chef.id, chefs)
    this.#chefSearch = new ChefSearchService(() => this.getAll())
    this.#recipeSearch = new RecipeSearchService(() => this.flattenRecetas())
    this.#stepSearch = new StepSearchService(() => this.flattenPasos())
  }

  /**
   *  Adds a new chef to the system.
   * @param chef - A Chef object to be added to the system.
   */
  public add(chef: Chef): void {
    this.#chefRepo.add(chef)
  }

  public removeChef(id: string | number): void {
    this.#chefRepo.remove(id)
  }

  public getById(id: string | number): Chef | undefined {
    return this.#chefRepo.getById(id)
  }

  public getAll(): Chef[] {
    return this.#chefRepo.getAll()
  }

  /**
   *  Prints the chefs in the system. If an array of chefs is provided as an argument, it prints that array instead. The output includes the chef's name, followers, and a summary of their recipes.
   * @param chefs - An optional array of Chef objects to be printed. If not provided, it defaults to printing all chefs in the system.
   */
  public printChefs(chefs: Chef[] = this.getAll()): void {
    const presenter = new TablePresenter<Chef>(
      new ConsoleTableRenderer(),
      (chef) => ({
        id: chef.id,
        name: chef.name,
        followers: chef.followers,
        recetarios: chef.recetarios.map((rb) => `${rb.name} [${rb.recetas.length} recetas]`).join(', '),
      }),
    )
    presenter.present(chefs)
  }

  /**
   * Prints the recipes in the system. It takes an array of Receta objects as an argument and prints their details, including the name, year, and a summary of the steps involved in each recipe.
   * @param recetas - An array of Receta objects to be printed. Each recipe's details include the name, year, and a summary of its steps (name, duration in seconds, and whether the step is optional).
   */
  public printRecipes(recetas: Receta<PasoBase>[]): void {
    const presenter = new TablePresenter<Receta<PasoBase>>(
      new ConsoleTableRenderer(),
      (receta) => ({
        id: receta.id,
        name: receta.name,
        year: receta.year,
        steps: this.#timeEstimator.countSteps(receta),
        timeSeconds: this.#timeEstimator.estimateTime(receta),
      }),
    )
    presenter.present(recetas)
  }

  public printSteps(steps: PasoBase[]): void {
    const presenter = new TablePresenter<PasoBase>(
      new ConsoleTableRenderer(),
      (step) => ({
        id: step.id,
        name: step.name,
        segundos: step.segundos,
        opcional: step.opcional,
        completado: step.completado,
        tags: step.tags.join(', '),
      }),
    )
    presenter.present(steps)
  }

  /**
   *  Searches for chefs in the system whose names include the provided string. It returns an array of Chef objects that match the search criteria.
   * @param name - A string to search for in the names of the chefs. The search is case-sensitive and checks if the chef's name includes the provided string.
   * @returns 
   */
  /** Chefs por nombre (subcadena, case-sensitive como en el ejercicio anterior) */
  public searchChefsByName(name: string): Chef[] {
    return this.#chefSearch.searchByName(name)
  }

  /** Chefs por mínimo de seguidores */
  public searchChefsByMinFollowers(minFollowers: number): Chef[] {
    return this.#chefSearch.searchByMinFollowers(minFollowers)
  }

  /**
   *  Searches for recipes in the system whose names include the provided string. It returns an array of Receta objects that match the search criteria.
   * @param name - A string to search for in the names of the recipes. The search is case-sensitive and checks if the recipe's name includes the provided string.
   * @returns 
   */
  private flattenRecetarios(): Recetario<PasoBase>[] {
    return this.getAll().flatMap((chef) => chef.recetarios)
  }

  private flattenRecetas(): Receta<PasoBase>[] {
    return this.flattenRecetarios().flatMap((rb) => rb.recetas)
  }

  private flattenPasos(): PasoBase[] {
    return this.flattenRecetas().flatMap((recipe) => recipe.pasos)
  }

  /** Recetas por nombre (subcadena) */
  public searchRecipesByName(name: string): Receta<PasoBase>[] {
    return this.#recipeSearch.searchByName(name)
  }

  /** Recetas por rango de años [minYear, maxYear] inclusivo */
  public searchRecipesByYearRange(minYear: number, maxYear: number): Receta<PasoBase>[] {
    return this.#recipeSearch.searchByYearRange(minYear, maxYear)
  }

  /**
   * Searches for recipes in the system that contain a step with a name that includes the provided string. It returns an array of Receta objects that match the search criteria.
   * @param name - A string to search for in the names of the steps within the recipes. The search is case-sensitive and checks if any step's name includes the provided string.
   * @returns 
   */
  /** Pasos por nombre */
  public searchStepsByName(name: string): PasoBase[] {
    return this.#stepSearch.searchByName(name)
  }

  /** Pasos que contengan todas las tags indicadas */
  public searchStepsByTags(tags: string[]): PasoBase[] {
    return this.#stepSearch.searchByTags(tags)
  }

  /** Pasos por opcionalidad */
  public searchStepsByOptional(isOptional: boolean): PasoBase[] {
    return this.#stepSearch.searchByOptional(isOptional)
  }

  /** Alias de compatibilidad con el nombre anterior */
  public searchChef(name: string): Chef[] {
    return this.searchChefsByName(name)
  }

  /** Alias de compatibilidad con el nombre anterior */
  public searchReceta(name: string): Receta<PasoBase>[] {
    return this.searchRecipesByName(name)
  }

  /** Alias de compatibilidad con el nombre anterior */
  public searchStep(name: string): Receta<PasoBase>[] {
    return this.flattenRecetas().filter((receta) => receta.pasos.some((step) => step.name.includes(name)))
  }

  get chefs(): Chef[] {
    return this.getAll()
  }
}