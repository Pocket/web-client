export interface ExtCookieAuth {
  sess_user_id?: string
  sess_exttok?: string
}

export interface ExtAuth {
  userId?: string
  token?: string
}

export interface V3AuthorizationResponse {
  access_token: string
  account: {
    premium_status: string
  }
  username: string
}

export interface JWTResponse {
  jwt: string
}
