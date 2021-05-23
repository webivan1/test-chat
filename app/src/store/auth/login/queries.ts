import { gql } from '@apollo/client'
import { client } from '../../../services/client'
import { AuthResponseType } from '../types'
import { LoginFormType } from './types'

export const LOGIN_USER = gql`
  mutation Register($input: LoginInput!) {
    login(input: $input) {
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

export const loginQuery = (form: LoginFormType): Promise<AuthResponseType> =>
  client
    .mutate({
      mutation: LOGIN_USER,
      variables: { input: form },
      fetchPolicy: 'no-cache',
    })
    .then(({ data }) => data.login as AuthResponseType)
