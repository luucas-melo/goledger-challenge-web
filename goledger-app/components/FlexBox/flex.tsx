import styled, { css } from 'styled-components'
import { FlexProps } from './styles'

export const FlexBox = styled.div.attrs((props: FlexProps) => ({
  alignItems: props.alignItems,
  alignContent: props.alignContent,
  flexDirection: props.flexDirection,
  flexFlow: props.flexFlow,
  flexWrap: props.flexDirection,
  justifyContent: props.justifyContent,
  width: props.width
}))<FlexProps>`
  display: ${({ display }) => display || 'flex'};
  align-content: ${({ alignContent }) => alignContent};
  align-items: ${({ alignItems }) => alignItems};
  ${({ flexFlow }) =>
    !flexFlow &&
    css`
      flex-direction: ${({ flexDirection }: FlexProps) =>
        flexDirection || 'row'};
      flex-wrap: ${({ flexWrap }: FlexProps) => flexWrap};
    `}
  ${({ flexFlow }) =>
    flexFlow &&
    css`
      flex-flow: ${flexFlow};
    `}
  justify-content: ${({ justifyContent }) => justifyContent};
  width: ${({ width }) => width};
`
