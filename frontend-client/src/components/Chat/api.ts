import * as Yup from "yup"

const initialValues = {
  receiverId: "",
  text: ""
}

const validationSchema = Yup.object().shape({
  receiverId: Yup.string(),
  text: Yup.string()
})

export {
  initialValues,
  validationSchema
} 