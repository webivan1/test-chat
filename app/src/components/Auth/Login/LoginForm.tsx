import { FC } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { Input } from '../../UI/Form/Input/Input'
import { useLogin } from './useLogin'
import { AuthModalForms } from '../../../store/auth/modal/types'
import { emailRegex } from "../../../helpers/validation";

export const LoginForm: FC = () => {
  const {
    error,
    loader,
    register,
    formState: { errors },
    handleSubmit,
    handleForm,
    handleChangeForm,
  } = useLogin()

  const moveToRegisterForm = () => handleChangeForm(AuthModalForms.register)
  const moveToRestorePasswordForm = () => handleChangeForm(AuthModalForms.password)

  return (
    <Form data-testid="login" onSubmit={handleSubmit(handleForm)}>
      <h3 className="text-center mb-2">Sigh in</h3>

      <Input
        name="email"
        label="Email"
        type="text"
        register={register('email', { required: true, pattern: emailRegex, maxLength: 150 })}
        invalid={!!errors.email}
        errorMessage="Email is not correct"
      />

      <Input
        name="password"
        label="Password"
        type="password"
        register={register('password', { required: true, minLength: 6, maxLength: 64 })}
        invalid={!!errors.password}
        errorMessage="Password length must be 6 or more symbols"
      />

      {error && (
        <Alert data-testid="error" variant="danger">
          {error}
        </Alert>
      )}

      <div className="text-center">
        <Button disabled={loader} data-testid="button" variant="primary" type="submit">
          Login
        </Button>

        <div className="mt-2">
          <Button variant="link" size="sm" onClick={moveToRegisterForm}>
            You can create an account
          </Button>
          <br />
          <Button variant="link" size="sm" onClick={moveToRestorePasswordForm}>
            Did you forget a password?
          </Button>
        </div>
      </div>
    </Form>
  )
}
