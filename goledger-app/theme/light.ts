const light = {
  title: 'light',

  colors: {
    header: '#252525',
    background: '#fafafa',
    mainColor: '#debb2f',
    text: '#2d3235',
    secondaryText: '#474c4f',
    link: '#086cae',
    linkActive: '#0095f6',
    border: '#dbdbdb',
    logo: '#343433',
    button: { color: '#086cae', hover: '#0095f6' },
    secondaryButton: {
      color: '#debb2f',
      hover: '#f0cd3d'
    }
  }
}

export type Theme = typeof light
export default light
