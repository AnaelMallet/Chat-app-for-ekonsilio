'use client'

import { useRouter } from "next/navigation"
import { Form, Formik, Field } from "formik"
import classNames from "classnames"
import { useMutation } from "@apollo/client"

import { addNotification, useNotification } from "../../components/notifications/NotificationProvider"
import TextTitle from "../../components/text"

import client from "../graphql-api"

import { initialValues, validationSchema } from "./api"
import { createUserMutation } from "./graphql"

function RegsiterPage() {
  const router = useRouter()

  const [mutateFunction, { loading }] = useMutation(createUserMutation, { client })
  const { dispatch } = useNotification()

  return (
    <main className=" h-screen flex place-content-center place-items-center">
      <div className="w-1/3 bg-[#282c34] rounded-lg">
        <TextTitle/>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async values => {
            const response = await mutateFunction({ variables: { input: values } })
            const responseErrors = response.data.createUser.errors

            if (responseErrors.length > 0) {
              dispatch(addNotification(responseErrors[0].message, false))
            } else {
              dispatch(addNotification("Votre compte a bien été créé.", true))
              router.push("/")
            }
          }}
        >
          {({ handleSubmit, isSubmitting, errors, touched }) => (
            <Form
              className="grid grid-cols-1 gap-y-10 w-full text-white"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit()
                }
              }}
            >
              <div className="grid grid-cols-2 gap-x-5 px-5">
                <div>
                  <label className="bg-transparent" htmlFor="firstname">Prénom <span className="text-red-500">*</span></label>
                  <Field
                    className={classNames({
                      "bg-transparent border-2 rounded-2xl h-9 w-full mt-3 pl-2 focus:outline-none": true,
                      "border-red-500": errors.firstname && touched.firstname,
                      "border-white": !errors.firstname
                    })}
                    id="firstname"
                    type="text"
                    placeholder="Prénom"
                    name="firstname"
                  />
                  { errors.firstname && touched.firstname ? <div className="text-red-500 text-xs -mb-4">{ errors.firstname }</div> : <></> }
                </div>
                <div>
                  <label className="bg-transparent" htmlFor="lastname">Nom <span className="text-red-500">*</span></label>
                  <Field
                    className={classNames({
                      "bg-transparent border-2 rounded-2xl h-9 w-full mt-3 pl-2 focus:outline-none": true,
                      "border-red-500": errors.lastname && touched.lastname,
                      "border-white": !errors.lastname
                    })}
                    id="lastname"
                    type="text"
                    placeholder="Nom"
                    name="lastname"
                  />
                  { errors.lastname && touched.lastname ? <div className="text-red-500 text-xs -mb-4">{ errors.lastname }</div> : <></> }
                </div>
              </div>
              <div className="gap-x-5 px-5">
                <div>
                  <label className="bg-transparent" htmlFor="email">Adresse email <span className="text-red-500">*</span></label>
                  <Field
                    className={classNames({
                      "bg-transparent border-2 rounded-2xl h-9 w-full mt-3 pl-2 focus:outline-none": true,
                      "border-red-500": errors.email && touched.email,
                      "border-white": !errors.email
                    })}
                    id="email"
                    type="text"
                    placeholder="Adresse email"
                    name="email"
                  />
                  { errors.email && touched.email ? <div className="text-red-500 text-xs -mb-4">{ errors.email }</div> : <></> }
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-5 px-5">
                <div>
                  <label className="bg-transparent" htmlFor="password">Mot de passe <span className="text-red-500">*</span></label>
                  <Field
                    className={classNames({
                      "bg-transparent border-2 rounded-2xl h-9 w-full mt-3 pl-2 focus:outline-none": true,
                      "border-red-500": errors.password && touched.password,
                      "border-white": !errors.password
                    })}
                    id="password"
                    type="password"
                    placeholder="Mot de passe"
                    name="password"
                    autoComplete="on"
                  />
                  { errors.password && touched.password ? <div className="text-red-500 text-xs -mb-4">{ errors.password }</div> : <></> }
                </div>
                <div>
                  <label className="bg-transparent" htmlFor="confirmationPassword">Confirmation du mot de passe <span className="text-red-500">*</span></label>
                  <Field
                    className={classNames({
                      "bg-transparent border-2 rounded-2xl h-9 w-full mt-3 pl-2 focus:outline-none": true,
                      'border-red-500': errors.confirmationPassword && touched.confirmationPassword,
                      "border-white": !errors.confirmationPassword
                    })}
                    id="confirmationPassword"
                    type="password"
                    placeholder="Confirmation du mot de passe"
                    name="confirmationPassword"
                    autoComplete="on"
                  />
                  { errors.confirmationPassword && touched.confirmationPassword ? <div className="text-red-500 text-xs -mb-4">{ errors.confirmationPassword }</div> : <></> }
                </div>
              </div>
              <div className="flex justify-center pb-6 space-x-10">
                <button disabled={isSubmitting || loading} type="submit" className="bg-purple-600 font-bold hover:bg-purple-700 rounded-md p-2">Valider</button>
                <button type="button" onClick={() => router.push("/")} className="font-bold p-2 border-white border-2 rounded-md">Annuler</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  )
}

export default RegsiterPage