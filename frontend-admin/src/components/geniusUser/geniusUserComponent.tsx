'use client'

import { ApolloError, useQuery } from "@apollo/client"

import { ArrowRightSVG, UserPictogramSVG } from "../svg"

import { useUser } from "../users/userProvider"

import { getGeniusUsersQuery } from "./graphql"
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "../utils"

interface geniusUserProps {
  uuid: string
  firstname: string
  lastname: string
}

interface GeniusUserArrayProps {
  geniusUsers: [geniusUserProps]
}

function GeniusUserArray(props: GeniusUserArrayProps) {

  function SelectedConversationHandler(geniusUserUuid: string) {
    const selectedConversation = getLocalStorage("geniusUserUuid")

    if (selectedConversation) {
      removeLocalStorage("geniusUserUuid")
      setLocalStorage("geniusUserUuid", geniusUserUuid)
    } else {
      setLocalStorage("geniusUserUuid", geniusUserUuid)
    }
  }

  return (
    <div className="w-full overflow-y-auto border-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar]:pr-3">
      <ul className="">
        {
          props.geniusUsers.map(geniusUser => {
            return (
              <li
                className=""
                key={geniusUser.uuid}
              >
                <button
                  className="flex place-items-center justify-between w-full"
                  onClick={() => {
                    SelectedConversationHandler(geniusUser.uuid)
                  }}
                >
                  <p className="flex place-items-center space-x-2">
                    <UserPictogramSVG />
                    <span className="text-xl">{geniusUser.firstname} {geniusUser.lastname}</span>
                  </p>
                  <ArrowRightSVG />
                </button>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

interface QueryInfo {
  loading: boolean
  error: ApolloError | undefined
  data: any
  userIsLogged: boolean
}

function GeniusUserArrayComponent(props: QueryInfo) {

  if (!props.userIsLogged) return <p className="mt-7 flex justify-center text-lg">Connectez-vous pour voir vos contact.</p>
  if (props.loading) return <p className="mt-7 flex justify-center text-lg">Chargement ...</p>
  if (props.error) return <p className="mt-7 flex justify-center text-lg">Une erreur est survenu.</p>
  if (!props.data || props.data.getGeniusUsers.values.length === 0) return <p className="mt-7 flex justify-center text-lg">... Aucune contact pour le moment.</p>

  return (
    <GeniusUserArray geniusUsers={props.data.getGeniusUsers.values} />
  )
}

function GeniusUserComponent() {
  const { isLogged } = useUser()
  const { loading, data, error } = useQuery(getGeniusUsersQuery, { skip: isLogged === false })

  return (
    <GeniusUserArrayComponent
      data={data}
      loading={loading}
      error={error}
      userIsLogged={isLogged}
    />
  )
}

export default GeniusUserComponent