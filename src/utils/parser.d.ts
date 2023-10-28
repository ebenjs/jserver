export const enum PathType {
  directory,
  file
}

export interface ParserResponseObjectType {
  data: object[]
  metadata: {
    path: string
  }
}
