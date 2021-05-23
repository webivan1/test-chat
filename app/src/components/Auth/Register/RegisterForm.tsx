import { FC } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { Input } from '../../UI/Form/Input/Input'
import { emailRegex } from '../../../helpers/validation'
import { AuthModalForms } from '../../../store/auth/modal/types'
import { useRegister } from './useRegister'

export const RegisterForm: FC = () => {
  const {
    error,
    loader,
    register,
    watch,
    formState: { errors },
    handleSubmit,
    handleForm,
    handleChangeForm,
  } = useRegister()

  const moveToLoginForm = () => handleChangeForm(AuthModalForms.login)
  const moveToRestorePasswordForm = () => handleChangeForm(AuthModalForms.password)

  return (
    <Form data-testid="register" onSubmit={handleSubmit(handleForm)}>
      <h3 className="text-center mb-2">Sigh up</h3>

      <Input
        name="name"
        label="Name"
        type="text"
        register={register('name', { required: true, minLength: 3, maxLength: 100 })}
        invalid={!!errors.name}
        errorMessage="Name is required. Length must be more 3 and less than 100 symbols"
      />

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

      <Input
        name="password_confirmation"
        label="Repeat password"
        type="password"
        register={register('password_confirmation', {
          required: true,
          minLength: 6,
          maxLength: 64,
          validate: (value: string) => value === watch('password'),
        })}
        invalid={!!errors.password_confirmation}
        errorMessage="Repeat to correct the password"
      />

      {error && (
        <Alert data-testid="error" variant="danger">
          {error}
        </Alert>
      )}

      <div className="text-center">
        <Button disabled={loader} data-testid="button" variant="primary" type="submit">
          Register
        </Button>

        <div className="mt-2">
          <Button variant="link" size="sm" onClick={moveToLoginForm}>
            Do you have an account?
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
