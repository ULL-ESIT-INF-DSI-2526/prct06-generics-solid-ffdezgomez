export interface SearchByName<T extends { name: string }> {
  searchByName(name: string): T[]
}

export interface SearchByMinFollowers<T extends { followers: number }> {
  searchByMinFollowers(minFollowers: number): T[]
}

export interface SearchByTags<T extends { tags: string[] }> {
  searchByTags(tags: string[]): T[]
}

export interface SearchByOptional<T extends { opcional: boolean }> {
  searchByOptional(isOptional: boolean): T[]
}

export interface SearchByYearRange<T extends { year: number }> {
  searchByYearRange(minYear: number, maxYear: number): T[]
}