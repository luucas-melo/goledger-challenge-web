import styled, { css } from 'styled-components'
import { FlexProps } from './styles'

export const FlexBox = styled.div.attrs((props: FlexProps) => ({
  alignItems: props.alignItems,
  alignContent: props.alignContent,
  flexDirection: props.flexDirection,
  flexFlow: props.flexFlow,
  flexWrap: props.flexWrap,
  justifyContent: props.justifyContent,
  mediaJustifyContent: props.mediaJustifyContent,
  mediaAlignItems: props.mediaAlignItems,
  width: props.width,
  margin: props.margin
}))<FlexProps>`
  display: ${({ display }) => display || 'flex'};
  align-content: ${({ alignContent }) => alignContent};
  align-items: ${({ alignItems }) => alignItems};
  margin: ${({ margin }) => margin};
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
  @media (max-width: 650px) {
    justify-content: ${({ mediaJustifyContent }) => mediaJustifyContent};
    align-items: ${({ mediaAlignItems }) => mediaAlignItems};
  }
  width: ${({ width }) => width};
`
