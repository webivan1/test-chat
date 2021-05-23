import { gql } from '@apollo/client'
import { client } from '../../../services/client'
import { RegisterFormType } from './types'
import { AuthResponseType } from '../types'

export const REGISTER_USER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      status
      errorMessage
      accessToken
      user {
        id
        name
        email
        verified
      }
    }
  }
`

export const registerQuery = (form: RegisterFormType): Promise<AuthResponseType> =>
  client
    .mutate({
      mutation: REGISTER_USER,
      variables: { input: form },
      fetchPolicy: 'no-cache',
    })
    .then(({ data }) => data.register as AuthResponseType)
