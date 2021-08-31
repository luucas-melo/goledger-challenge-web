const light = {
  title: 'light',

  colors: {
    header: '#252525',
    background: '#fafafa',
    mainColor: '#debb2f',
    text: '#2d3235',
    secondaryText: '#474c4f',
    link: '#086cae',
    linkActive: '#227fba',
    border: '#dbdbdb',
    logo: '#343433',
    button: { color: '#086cae', hover: '#227fba' },
    secondaryButton: {
      color: '#474c4f',
      hover: '#3a3e40'
    }
  }
}

export type Theme = typeof light
export default light
