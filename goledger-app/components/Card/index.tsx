import { FlexBox } from '../FlexBox/flex'
import React from 'react'
import { Container, SecondaryP } from './styles'

interface ICard {
  title: string
  main?: string
  secondary?: string
}
const Card = ({ title, main, secondary }: ICard) => {
  return (
    <Container>
      <h4>{title}</h4>
      <p>{main}</p>
      <SecondaryP>{secondary}</SecondaryP>
    </Container>
  )
}

export default Card
