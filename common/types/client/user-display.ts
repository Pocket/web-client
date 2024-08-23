import type { User } from '../pocket'

export interface UserDisplayData {
  firstName?: User['firstName']
  lastName?: User['lastName']
  email?: User['email']
  avatarUrl?: User['avatarUrl']
  id?: User['id']
  accountCreationDate?: User['accountCreationDate']
}
