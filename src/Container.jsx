import React, { Component, Fragment } from 'react'
import { Grid } from '@material-ui'
import Header from './Header'
import Login from './Login'
import Perfil from './Perfil'
import Materias from './Materias'
// perfil, materias(default), materia, loginform
export default class Container extends Component {
  constructor() {
    super()
    this.state = {
      logged: false,
      student: {},
      selected: 0
    }
  }
  componentDidMount = () => {
    this.checkLogin()
  }
  checkLogin = () => {
    const tokenstr = localStorage.getItem('token')
    if (tokenstr === null) {
      this.setState({ logged: false })
    } else {
      this.setState({ logged: true })
    }
  }
  studentLogin = (studentData) => {
    this.setState({
      student: studentData,
      logged: true
    })
  }
  studentLogout = () => {
    localStorage.removeItem('token')
    this.setState({
      logged: false,
      student: {}
    })
  }
  changeContent = nro => () => {
    this.setState({
      selected: nro
    })
  }
  render() {
    const { logged, student, selected } = this.state
    let contenido
    switch (selected) {
      case 0:
        contenido = <Perfil student={student} />
        break
      case 1:
        contenido = <Materias checkLogin={this.checkLogin} />
        break
      default:
        contenido = null
        break
    }
    return (
      <Fragment>
        {logged &&
          <Header
            studentLogout={this.studentLogout}
            changeContent={this.changeContent}
            student={`${student.appat} ${student.apmat} ${student.nombres}`}
          />
        }
        {!logged && <Login studentLogin={this.studentLogin} />}
        <Grid container spacing={24} alignContent="space-between" justify="space-around">
          { logged && contenido }
        </Grid>
      </Fragment>
    )
  }
}
