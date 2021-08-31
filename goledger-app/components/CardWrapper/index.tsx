import ArrowBack from '@material-ui/icons/ArrowBack'
import React from 'react'
import { CardContent } from './styles'

interface ICardWrapper {
  children?: React.ReactNode
  arrowAction: () => any
}
const CardWrapper: React.FC<ICardWrapper> = ({
  children,
  arrowAction
}: ICardWrapper) => {
  return (
    <CardContent>
      <ArrowBack fontSize="large" onClick={arrowAction} />
      {children}
    </CardContent>
  )
}

export default CardWrapper
