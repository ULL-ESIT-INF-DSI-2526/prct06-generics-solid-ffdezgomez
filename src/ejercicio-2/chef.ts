import type { Recetario } from './recetario'
import type { PasoBase } from './paso'

/**
 * Chef class that represents a chef with a name, number of followers, and a collection of recipes. It includes validation for the chef's name and followers count, and provides getters for its properties.
 */
export class Chef {
  #id: string | number
  #name: string
  #followers: number
  #recetarios: Recetario<PasoBase>[]

  /**
   *  Initializes a new Chef instance with the provided name, followers count, and recetario (collection of recipes). The constructor includes validation to ensure that the name is not empty and that the followers count is not negative. If the validation fails, it throws an error with an appropriate message.
   * @param name - The name of the chef. It must be a non-empty string. If an empty string is provided, an error is thrown with the message "Name can not be empty".
   * @param followers - The number of followers the chef has. It must be a non-negative integer. If a negative number is provided, an error is thrown with the message "Followers can not be less than zero".
   * @param recetario - An array of Receta objects representing the chef's collection of recipes. This parameter does not have specific validation in the constructor, but it is expected to be an array of valid Receta objects.
   */
  constructor(id: string | number, name: string, followers: number, recetarios: Recetario<PasoBase>[] = []) {
    if (name.length <= 0) throw Error('Name can not be empty')
    if (followers < 0) throw Error('Followers can not be less than zero');
    
    this.#id = id
    this.#name = name
    this.#followers = followers
    this.#recetarios = recetarios
  }

  get id(): string | number {
    return this.#id
  }

  /**
   * Getter for the chef's name. It returns the name of the chef as a string.
   * @returns The name of the chef.
   */
  get name(): string {
    return this.#name;
  }

  /**
   * Getter for the chef's followers count. It returns the number of followers the chef has as a number.
   * @returns The number of followers the chef has.
   */
  get followers(): number {
    return this.#followers;
  }

  /**
   * Getter for the chef's recetario (collection of recipes). It returns an array of Receta objects representing the chef's recipes.
   * @returns An array of Receta objects representing the chef's collection of recipes.
   */
  get recetarios(): Recetario<PasoBase>[] {
    return this.#recetarios;
  }

  /** Alias para mantener el nombre previo del getter */
  get recetario(): Recetario<PasoBase>[] {
    return this.recetarios
  }
}