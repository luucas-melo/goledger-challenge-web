import styled from 'styled-components'

export const Form = styled.form`
  min-height: 500px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  flex-direction: column;
  padding: 2rem 4rem;
  @media (max-width: 750px) {
    padding: 2rem 2rem;
  }
  width: 90%;

  @media (max-width: 750px) {
    width: 100%;
  }
  h1 {
    color: ${props => props.theme.colors.link};
  }

  @media (max-width: 650px) {
    justify-content: center;
  }
`

export const FormButtons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 2rem;

  @media (max-width: 750px) {
    button {
      margin: 0 auto;
    }
  }
`

export const FormHeader = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 750px) {
    flex-direction: column;
  }
  button {
    margin-top: 1rem;
  }
`

export const FormFooter = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 3rem;
  padding: 1rem;
  h4 {
    margin-bottom: 1rem;
  }
  div {
    border-bottom: 1px solid ${props => props.theme.colors.mainColor};
    margin-bottom: 1rem;
    border-radius: 0.2rem;
    display: flex;
    justify-content: space-between;
    height: 2rem;
    align-items: center;
  }
`

export const FieldWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  justify-content: space-between;
  @media (max-width: 750px) {
    flex-direction: column;
    justify-content: center;
  }
`
