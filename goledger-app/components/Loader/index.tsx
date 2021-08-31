import React from 'react'
import { Container, Content } from './styles'

interface ILoader {
  size?: number
  className?: string
}

const Loader: React.FC<ILoader> = ({ size = 100, className }: ILoader) => {
  return (
    <Container className={className}>
      <Content size={size}></Content>
    </Container>
  )
}

export default Loader
