import { FlexBox as IconContainer } from '../FlexBox/flex'
import React from 'react'
import { Container, IconDiv, SecondaryP } from './styles'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

interface ICard {
  title: string
  main?: string
  secondary?: string
  children?: React.ReactNode
  editAction?: () => void
  deleteAction?: () => void
}
const Card = ({
  title,
  main,
  secondary,
  children,
  editAction,
  deleteAction
}: ICard) => {
  return (
    <Container>
      <IconContainer flexDirection="row-reverse">
        <IconDiv>
          <EditIcon onClick={editAction} />
          <DeleteIcon onClick={deleteAction} />
        </IconDiv>
      </IconContainer>
      {children}
      <h4>{title}</h4>
      <p>{main}</p>
      <SecondaryP>{secondary}</SecondaryP>
    </Container>
  )
}

export default Card
