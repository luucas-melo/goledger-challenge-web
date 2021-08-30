const light = {
  title: 'light',

  colors: {
    header: '#252525',
    background: '#fafafa',
    mainColor: '#fdd947',
    text: '#2d3235',
    secondaryText: '#474c4f',
    link: '#086cae',
    linkActive: '#0095f6',
    border: '#dbdbdb',
    logo: '#343433',
    button: { color: '#086cae', hover: '#0095f6' },
    secondaryButton: {
      color: '#5469d6',
      hover: '#3c49bd'
    }
  }
}

export type Theme = typeof light
export default light
