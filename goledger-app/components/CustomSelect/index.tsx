import React from 'react'
import { Select } from './styles'

interface ISelect {
  inputRef?: any
  name: string
  selected?: boolean | string
  selectedText?: string
  defaultValue?: string
  children?: React.ReactNode
  disabled?: boolean
}

const CustomSelect: React.FC<ISelect> = ({
  inputRef,
  name,
  selected = false,
  defaultValue,
  children,
  disabled = false
}: ISelect) => {
  return (
    <Select
      name={name}
      inputRef={inputRef}
      defaultValue={defaultValue}
      disabled={disabled}
    >
      {children}
    </Select>
  )
}

export default CustomSelect
