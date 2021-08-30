import { Theme } from './light'
import 'styled-components'
declare module 'styled-components' {
  export interface DefaultTheme extends MyTheme {
    title: string
    colors: {
      header: string
      mainColor: string
      background: string
      text: string
      secondaryText: string
      link: string
      linkActive: string
      border: string
      logo: string
      button: { color: string; hover: string }
      secondaryButton: { color: string; hover: string }
    }
  }
}

export default light
