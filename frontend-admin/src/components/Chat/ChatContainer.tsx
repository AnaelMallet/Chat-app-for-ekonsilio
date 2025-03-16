import { Field, Form, Formik } from "formik"
import { useEffect, useRef, useState } from "react"
import { ApolloError, useMutation, useQuery } from "@apollo/client"

import { useUser } from "../users/userProvider"
import { getLocalStorage } from "../utils"
import { SendMessageSVG } from "../svg"
import client from "../graphql-api"
import { addNotification, useNotification } from "../notifications/NotificationProvider"

import { getMessagesQuery, SendMessageMutation } from "./graphql"
import { initialValues, validationSchema } from "./api"
import { skip } from "node:test"

interface Message {
  uuid: string
  senderId: string
  text: string
}

interface MessageArrayProps {
  messages: Message[]
  userId: string | null
}

function MessageArray(props: MessageArrayProps) {
  const { socket } = useUser()
  const [ stateMessages, setStateMessages ] = useState<Message[]>(props.messages)
  const messageEndRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    socket.on("newMessage", (message) => {
      const newMessage: Message = {
        uuid: message.uuid,
        senderId: message.props.senderId,
        text: message.props.text
      }

      setStateMessages([ ...stateMessages, newMessage ])
    })

    return () => {
      socket.off("newMessage")
    }
  }, [socket, stateMessages])

  useEffect(() => {
    if (messageEndRef.current && stateMessages) {
      messageEndRef.current.scrollIntoView({ 
        block: "nearest",
        inline: "start",
        behavior: "smooth"
      })
    }
  }, [messageEndRef, stateMessages])

  useEffect(() => {
    setStateMessages([ ...props.messages ])
  }, [props.messages])

  return (
    <div className="space-y-2 pt-2">
      {
        stateMessages.map((message: any) => {
          return (
            <div
              key={message.uuid}
              className={`chat ${message.senderId === props.userId ? "chat-end" : "chat-start"}`}
              ref={messageEndRef}
            >
              <span className={`text-white chat-bubble ${message.senderId === props.userId ? "bg-cyan-400" : "bg-zinc-500"}`}>{message.text}</span>
            </div>
          )
        })
      }
    </div>
  )
}

interface MessageQueryInfo {
  loading: boolean,
  error: ApolloError | undefined
  data: any
  receiverId: string | null
  userId: string | null
}

function MessageContainer( props: MessageQueryInfo ) {
  if (!props.receiverId) return <p className="mt-7 flex justify-center text-lg">La discussion s'affichera ici...</p>
  if (props.loading) return <p className="mt-7 flex justify-center text-lg">Chargement de la discussion...</p>
  if (props.error) return <p className="mt-7 flex justify-center text-lg">Une erreur est survenu.</p>
  if (!props.data || props.data.getMessages.values.length === 0) return <p className="mt-7 flex justify-center text-lg">... Aucun message pour le moment.</p>

  return (
    <MessageArray
      messages={props.data.getMessages.values}
      userId={props.userId}
    />
  )
}

function ChatContainer() {
  const { userId, userContext } = useUser()
  const { dispatch } = useNotification()
  const [receiverId, setReceiverId] = useState<string | null>(null)

  const [mutateFunction] = useMutation(SendMessageMutation, { client, context: userContext })
  const { loading: queryLoading, data, error: queryError, refetch } = useQuery(getMessagesQuery, { variables: { receiverId } , context: userContext, skip: !getLocalStorage("token") || !receiverId })

  useEffect(() => {
    const handleStorage = () => {
      const receiverUserId = getLocalStorage("receiverUserId")

      setReceiverId(receiverUserId)
      
      if (getLocalStorage("token") || receiverId) {
        refetch({ variables: { receiverId } })
      }
    }

    handleStorage()
    window.addEventListener("storage", handleStorage)

    return () => window.removeEventListener("storage", handleStorage)
  }, [receiverId, refetch])

  return (
    <div className="absolute inset-x-[45vh] ml-[10vh] mt-[2vh] h-[98%] flex flex-col bg-zinc-200 rounded-xl">
      <div className="justify-center place-items-center h-[95%] pb-2">
        <div className="w-[95%] h-full overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar]:pr-3">
          <MessageContainer
            loading={queryLoading}
            error={queryError}
            data={data}
            receiverId={receiverId}
            userId={userId}
          />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            if (values.text === "") return

            const response = await mutateFunction({ variables: { input: values } })
            const responseErrors = response.data.sendMessage.errors
            
            if (responseErrors.length > 0) {
              dispatch(addNotification(responseErrors[0].message, false))
            }

            resetForm()
            refetch()
          }}
        >
          {({ setFieldValue }) => (
            <Form
              className="w-[95%]"
            >
              <div className="flex justify-center place-items-center space-x-1">
              <Field
                  className="pl-2 rounded-xl border-[1px] border-zinc-400 focus:border-[1px] focus:border-zinc-400 bg-transparent w-full text-black"
                  id="text"
                  name="text"
                  type="text"
                  placeholder="Votre message..."
                />
                <Field
                  type="hidden"
                  id="receiverId"
                  name="receiverId"
                  value={""}
                />
                <button
                  type="submit"
                  onClick={() => setFieldValue("receiverId", receiverId)}
                  className="rounded-full size-10 hover:bg-zinc-300 flex justify-center place-items-center"
                ><SendMessageSVG/></button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default ChatContainer