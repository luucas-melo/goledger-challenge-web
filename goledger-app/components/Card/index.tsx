import { FlexBox as IconContainer } from '../FlexBox/flex'
import React from 'react'
import { Container, IconDiv, SecondaryP } from './styles'
import VisibilityIcon from '@material-ui/icons/Visibility'
import DeleteIcon from '@material-ui/icons/Delete'

interface ICard {
  title: string
  main?: string
  secondary?: string
  children?: React.ReactNode
  viewAction?: () => void
  deleteAction?: () => void
}
const Card = ({
  title,
  main,
  secondary,
  children,
  viewAction,
  deleteAction
}: ICard) => {
  return (
    <Container>
      {deleteAction || viewAction ? (
        <IconContainer flexDirection="row-reverse">
          <IconDiv>
            {viewAction && <VisibilityIcon onClick={viewAction} />}
            {deleteAction && <DeleteIcon onClick={deleteAction} />}
          </IconDiv>
        </IconContainer>
      ) : null}
      {children}
      <h4>{title}</h4>
      <p>{main}</p>
      <SecondaryP>{secondary}</SecondaryP>
    </Container>
  )
}

export default Card
