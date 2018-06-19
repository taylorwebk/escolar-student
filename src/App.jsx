import React from 'react'
import { hot } from 'react-hot-loader'

import themeProv from './themeProv'
import Container from './Container'
// En este archivo van todas las configuraciones globales de la app
// ej. redux provider, context, etc

const App = () => (
  <div>
    <Container />
  </div>
)
export default hot(module)(themeProv(App))
