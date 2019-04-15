import Layout from '../components/MyLayout.js'


import styled from 'styled-components'


const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  position: relative;
  float: right;
`


export default function About() {
    return (
        <div>
            <Layout>
                <p>This is the test page</p>
                <Button>I am button</Button>
            </Layout>
        </div>
    )
}
