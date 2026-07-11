export interface IUser {
  id: string
  email: string
  firstName: string
  lastName: string
}

export interface IAccount extends IUser {
  password: string
}

export interface IAuthState {
  accounts: IAccount[]
  user: IUser | null
  isLoggedIn: boolean
}
