import React from 'react'
import { FormField, FormWrapper, InputError } from './styles'
import { InputAdornment, SvgIconProps } from '@material-ui/core'

interface ICustomFormField {
  className?: string
  icon?: SvgIconProps
  type?: string
  label: string
  InputLabelProps?: boolean
  name?: string
  shrink?: boolean
  variant?: 'outlined' | 'filled' | 'standard'
  inputRef?: React.Ref<any>
  register?: any
  errors?: any
  disabled?: boolean
  value?: any
  width?: string
  defaultValue?: string | number
  multiline?: boolean
  maxRow?: number
  readOnly?: boolean
  onFocus?: () => void
}
const CustomFormField: React.FC<ICustomFormField> = ({
  className,
  icon,
  type = 'text',
  label,
  name,
  InputLabelProps = false,
  variant = 'outlined',
  inputRef,
  errors,
  disabled,
  width,
  value,
  defaultValue,
  multiline = false,
  maxRow = 3,
  readOnly = false,

  onFocus
}: ICustomFormField) => {
  return (
    <FormWrapper>
      <FormField
        className={className}
        type={type}
        label={label}
        name={name}
        inputRef={inputRef}
        variant={variant}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        multiline={multiline}
        minRows={3}
        maxRows={maxRow}
        width={width}
        onFocus={onFocus}
        InputLabelProps={
          InputLabelProps
            ? {
                shrink: true
              }
            : null
        }
        InputProps={{
          endAdornment: icon && (
            <InputAdornment position="end">{icon}</InputAdornment>
          ),
          readOnly: readOnly
        }}
      />
      <InputError>
        {errors && errors[name] ? <span>{errors[name].message}</span> : <br />}
      </InputError>
    </FormWrapper>
  )
}

export default CustomFormField
