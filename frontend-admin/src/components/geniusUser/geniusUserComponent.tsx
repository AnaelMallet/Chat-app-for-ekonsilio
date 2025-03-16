'use client'

import { useState } from "react"
import { ApolloError, useQuery } from "@apollo/client"
import classNames from "classnames"

import { ArrowRightSVG, UserPictogramSVG } from "../svg"
import { useUser } from "../users/userProvider"
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "../utils"

import { getOtherUsersQuery } from "./graphql"

interface geniusUserProps {
  uuid: string
  firstname: string
  lastname: string
  isGenius: boolean
}

interface GeniusUserArrayProps {
  geniusUsers: [geniusUserProps]
}

function GeniusUserArray(props: GeniusUserArrayProps) {
  const [selectedConversation, setSelectedConversation] = useState<string>(getLocalStorage("receiverUserId") as string)
  const [ onlineUsers, setOnlineUsers ] = useState<string[]>([])
  const { socket } = useUser()

  socket.on("onlineUsers", (onlineUserIds) => {
    setOnlineUsers(onlineUserIds)
  })

  function SelectedConversationHandler(userId: string) {
    const selectedConversation = getLocalStorage("receiverUserId")

    if (selectedConversation) {
      removeLocalStorage("receiverUserId")
      setLocalStorage("receiverUserId", userId)
    } else {
      setLocalStorage("receiverUserId", userId)
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
                    {
                      onlineUsers.find(user => user === geniusUser.uuid) ?
                      <span className="absolute size-3 bg-green-500 rounded-full ring-2 ring-zinc-900 mt-6 ml-7"></span> :
                      <></>
                    }
                    <UserPictogramSVG />
                    <span className="text-xl">{geniusUser.firstname} {geniusUser.lastname}</span>
                    <span className="text-sm">{geniusUser.isGenius ? "(Genius)" : "(Visiteur)"}</span>
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
  if (!props.data || props.data.getOtherUsers.values.length === 0) return <p className="mt-7 flex justify-center text-lg">... Aucune contact pour le moment.</p>

  return (
    <GeniusUserArray geniusUsers={props.data.getOtherUsers.values} />
  )
}

function GeniusUserComponent() {
  const { isLogged, userContext } = useUser()
  const { loading, data, error } = useQuery(getOtherUsersQuery, { skip: !getLocalStorage("token"), context: userContext })

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