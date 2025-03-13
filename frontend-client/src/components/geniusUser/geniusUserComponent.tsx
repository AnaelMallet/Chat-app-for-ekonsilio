'use client'

import { useState } from "react"
import { ApolloError, useQuery } from "@apollo/client"
import classNames from "classnames"

import { ArrowRightSVG, UserPictogramSVG } from "../svg"
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "../utils"
import { useUser } from "../users/userProvider"

import { getGeniusUsersQuery } from "./graphql"

interface geniusUserProps {
  uuid: string
  firstname: string
  lastname: string
}

interface GeniusUserArrayProps {
  geniusUsers: [geniusUserProps]
}

function GeniusUserArray(props: GeniusUserArrayProps) {
  const [selectedConversation, setSelectedConversation] = useState<string>(getLocalStorage("selectedConversationUserId") as string)

  function SelectedConversationHandler(userId: string) {
    const selectedConversation = getLocalStorage("selectedConversationUserId")

    if (selectedConversation) {
      removeLocalStorage("selectedConversationUserId")
      setLocalStorage("selectedConversationUserId", userId)
    } else {
      setLocalStorage("selectedConversationUserId", userId)
    }
  }

  return (
    <div className="w-3/4 pt-2 h-[43vh]">
      <ul className="space-y-2 overflow-y-auto max-h-[41.5vh] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar]:pr-3">
        {
          props.geniusUsers.map(geniusUser => {
            return (
              <li
                key={geniusUser.uuid}
              >
                <button
                  className={classNames({
                    "flex place-items-center justify-between w-full hover:bg-[#191C21] rounded-xl": true,
                    "bg-[#191C21]": selectedConversation === geniusUser.uuid
                  })}
                  onClick={() => {
                    setSelectedConversation(geniusUser.uuid)
                    SelectedConversationHandler(geniusUser.uuid)
                  }}
                >
                  <p className="flex place-items-center space-x-2 pl-2">
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
  const { isLogged, userContext } = useUser()
  const { loading, data, error } = useQuery(getGeniusUsersQuery, { skip: isLogged === false, context: userContext })

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