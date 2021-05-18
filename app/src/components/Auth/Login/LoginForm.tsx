import { FC } from 'react'
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Input } from "../../UI/Form/Input/Input";

type FormType = {
  email: string
  password: string
}

export const LoginForm: FC = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<FormType>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleForm = (form: FormType) => {
    console.log(form);
  }

  return (
    <Form data-testid="login" onSubmit={handleSubmit(handleForm)}>
      <Input
        name="email"
        label="Email or username"
        type="text"
        register={register('email', { required: true })}
        invalid={!!errors.email}
        errorMessage="Email is not correct"
      />

      <Input
        name="password"
        label="Password"
        type="password"
        register={register('password', { required: true })}
        invalid={!!errors.password}
        errorMessage="Password length must be 6 or more symbols"
      />

      <Button data-testid="button" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}
