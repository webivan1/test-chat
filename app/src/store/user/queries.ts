import { gql } from '@apollo/client'
import { client } from '../../services/client'
import { UserType } from './types'

export const FETCH_USER = gql`
  query User {
    user {
      id
      name
      email
      verified
    }
  }
`

export const autoLoginQuery = (token: string | undefined): Promise<UserType | null> => {
  if (!token) {
    return Promise.resolve(null)
  }

  return client
    .query({
      query: FETCH_USER,
      fetchPolicy: 'no-cache',
    })
    .then(({ data }) => data.user as UserType | null)
}
