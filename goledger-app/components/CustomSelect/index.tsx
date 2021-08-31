import React from 'react'
import { Select } from './styles'

interface ISelect {
  inputRef?: any
  name: string
  selected?: boolean | string
  selectedText?: string
  defaultValue?: string
  children?: React.ReactNode
}

const CustomSelect: React.FC<ISelect> = ({
  inputRef,
  name,
  selected = false,
  defaultValue,
  children
}: ISelect) => {
  return (
    <Select name={name} inputRef={inputRef} defaultValue={defaultValue}>
      {children}
    </Select>
  )
}

export default CustomSelect
