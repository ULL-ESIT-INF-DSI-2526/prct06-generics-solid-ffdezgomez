export type PasoBase = {
  id: string | number
  name: string
  /** Duración del paso en segundos */
  segundos: number
  /** Si el paso es opcional, puede omitirse */
  opcional: boolean
  /** Veces que se ha completado */
  completado: number
  /** Etiquetas del paso para búsquedas */
  tags: string[]
}

/**
 * Paso “básico” del sistema.
 * Se mantiene el modelo anterior y se amplía con `tags`.
 */
export type Paso = PasoBase

/** Paso extendido: incluye herramienta necesaria (ejemplo de extensión futura) */
export type PasoConHerramienta = PasoBase & {
  herramienta: string
}

/** Paso extendido: incluye temperatura objetivo (ejemplo de extensión futura) */
export type PasoConTemperatura = PasoBase & {
  temperaturaC: number
}