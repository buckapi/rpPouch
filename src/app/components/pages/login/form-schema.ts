import * as yup from "yup";

export const RegisterFormSchema = yup.object().shape({
  firstname: yup.string().required().trim().min(2).max(50),
  lastname: yup.string().trim().min(2).max(80),
  email: yup.string().email(),
  age: yup.number()
});
