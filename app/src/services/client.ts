import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import Cookies from 'js-cookie'

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL || '',
  // credentials: 'include'
})

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get(process.env.REACT_APP_STORAGE_TOKEN_NAME ?? '')

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
