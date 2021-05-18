import { UseFormRegisterReturn } from "react-hook-form";
import { FormControlProps } from "react-bootstrap/FormControl";
import { FC } from "react";
import { Form } from "react-bootstrap";

type ValidateInputPropsType = {
  name: string;
  register: UseFormRegisterReturn
  label?: string
  invalid?: boolean
  errorMessage?: string
} & FormControlProps

export const Input: FC<ValidateInputPropsType> = ({
  name,
  register,
  label,
  invalid = false,
  errorMessage,
  ...inputProps
}) => (
  <Form.Group>
    {label && <Form.Label>{label}</Form.Label>}
    <Form.Control
      {...inputProps}
      {...register}
      isInvalid={invalid}
      data-testid={name}
    />
    {errorMessage && invalid && <Form.Control.Feedback type="invalid">
      {errorMessage}
    </Form.Control.Feedback>}
  </Form.Group>
)
