export type attributes = { [key: string]: string }

export type tagOption = {
  classList?: string[],
  listener?: (() => void) | ((target: Event) => void),
  event?: string,
  attributes?: attributes,
  children?: (HTMLElement | string)[],
}
