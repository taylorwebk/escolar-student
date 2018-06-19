import React, { Component, Fragment } from 'react'
import { Grid } from '@material-ui'
import Header from './Header'
import Login from './Login'
import Perfil from './Perfil'
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
  render() {
    const { logged, student, selected } = this.state
    console.log(student, this.state)
    let contenido
    switch (selected) {
      case 0:
        contenido = <Perfil student={student} />
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
