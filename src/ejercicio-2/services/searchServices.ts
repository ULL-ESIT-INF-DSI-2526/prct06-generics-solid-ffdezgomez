import type { Chef } from '../chef'
import type { Receta } from '../receta'
import type { PasoBase } from '../paso'
import type {
  SearchByMinFollowers,
  SearchByName,
  SearchByOptional,
  SearchByTags,
  SearchByYearRange,
} from '../searchs'

export class ChefSearchService implements SearchByName<Chef>, SearchByMinFollowers<Chef> {
  readonly #getChefs: () => Chef[]

  constructor(getChefs: () => Chef[]) {
    this.#getChefs = getChefs
  }

  public searchByName(name: string): Chef[] {
    return this.#getChefs().filter((chef) => chef.name.includes(name))
  }

  public searchByMinFollowers(minFollowers: number): Chef[] {
    return this.#getChefs().filter((chef) => chef.followers >= minFollowers)
  }
}

export class RecipeSearchService implements SearchByName<Receta<PasoBase>>, SearchByYearRange<Receta<PasoBase>> {
  readonly #getRecipes: () => Receta<PasoBase>[]

  constructor(getRecipes: () => Receta<PasoBase>[]) {
    this.#getRecipes = getRecipes
  }

  public searchByName(name: string): Receta<PasoBase>[] {
    return this.#getRecipes().filter((receta) => receta.name.includes(name))
  }

  public searchByYearRange(minYear: number, maxYear: number): Receta<PasoBase>[] {
    const min = Math.min(minYear, maxYear)
    const max = Math.max(minYear, maxYear)
    return this.#getRecipes().filter((receta) => receta.year >= min && receta.year <= max)
  }
}

export class StepSearchService
  implements SearchByName<PasoBase>, SearchByTags<PasoBase>, SearchByOptional<PasoBase>
{
  readonly #getSteps: () => PasoBase[]

  constructor(getSteps: () => PasoBase[]) {
    this.#getSteps = getSteps
  }

  public searchByName(name: string): PasoBase[] {
    return this.#getSteps().filter((step) => step.name.includes(name))
  }

  public searchByTags(tags: string[]): PasoBase[] {
    return this.#getSteps().filter((step) => tags.every((tag) => step.tags.includes(tag)))
  }

  public searchByOptional(isOptional: boolean): PasoBase[] {
    return this.#getSteps().filter((step) => step.opcional === isOptional)
  }
}
