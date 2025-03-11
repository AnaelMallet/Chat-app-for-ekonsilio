'use client'

import { ApolloProvider } from '@apollo/client'

import client from "./graphql-api"

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <ApolloProvider client={client}>
          {children}
    </ApolloProvider>
  )
}

function Home() {
  return (
    <>
      <p>frontend client</p>
    </>
  )
}

export default Home
