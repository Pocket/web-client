export interface GraphQlData {
  [key: string]: unknown
  [index: number]: never
}

export interface GraphQlResponse<T extends GraphQlData> {
  data: T
  errors?: { message: string }[]
}

export interface GraphQlRequest {
  query: string
  variables?: object
}
