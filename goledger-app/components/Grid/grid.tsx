import styled, { css } from 'styled-components'
import { GridProps } from './styles'

export const Grid = styled.div.attrs((props: GridProps) => ({
  columnsTemplate: props.columnsTemplate,
  rowsTemplate: props.rowsTemplate,
  gap: props.gap,
  mediaColumns: props.mediaColumns,
  mediaRows: props.mediaRows,
  mediaGap: props.mediaGap
}))<GridProps>`
  display: grid;
  grid-template-columns: ${({ columnsTemplate }) => columnsTemplate};
  grid-template-rows: ${({ rowsTemplate }) => rowsTemplate};
  gap: ${({ gap }) => gap};

  @media (max-width: 750px) {
    grid-template-columns: ${({ mediaColumns }) => mediaColumns};
    grid-template-rows: ${({ mediaRows }) => mediaRows};
    gap: ${({ mediaGap }) => mediaGap};
  }
`
