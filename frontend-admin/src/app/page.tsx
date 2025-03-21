'use client'

import { useRouter } from 'next/navigation'
import { ApolloProvider } from '@apollo/client'

import NotificationProvider from "../components/notifications/NotificationProvider"
import UserProvider, { useUser } from "../components/users/userProvider"
import Sidebar from '../components/sidebar'
import ChatContainer from '../components/Chat/ChatContainer'

import client from "./graphql-api"

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <ApolloProvider client={client}>
      <NotificationProvider>
        <UserProvider>
          {children}
        </UserProvider>
      </NotificationProvider>
    </ApolloProvider>
  )
}

function Home() {
  const router = useRouter()
  const {
    isLogged,
    logout,
    user,
    userId
  } = useUser()

  return (
    <>
      <Sidebar />
      <ChatContainer />
      <div className="absolute inline space-x-4 right-0 m-5 text-white">
        {!isLogged || !user ?
          <>
            <button onClick={() => router.push("/login")} className="bg-[#282c34] font-bold rounded-md p-2">Se connecter</button>
            <button onClick={() => router.push("/register")} className="bg-cyan-400 font-bold hover:bg-cyan-500 rounded-md p-2">S'inscrire</button>
          </>
          :
          <>
            <button onClick={() => router.push(`/${userId}`)} className="bg-cyan-400 font-bold hover:bg-cyan-500 rounded-md p-2">Bonjour {user.firstname} {user.lastname}</button>
            <button onClick={() => { logout() }} className="bg-[#282c34] font-bold rounded-md p-2">Se déconnecter</button>
          </>
        }
      </div>
    </>
  )
}

export default Home
