export type attributes = { [key: string]: string }

export type tagOption = {
  classList?: string[],
  listener?: () => void,
  event?: string,
  attributes?: attributes,
  children?: (HTMLElement | string)[],
}
