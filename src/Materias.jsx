import React, { Component, Fragment } from 'react'
import {
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CircularProgress
} from '@material-ui'
import axios from 'axios'

import url from './utils'
import Materia from './Materia'

export default class Materias extends Component {
  state = {
    loading: true,
    gestion: 0,
    fecha: '0000-00-00',
    curso: 0,
    paralelo: '-',
    errorMessage: '',
    materias: [],
    selectedId: null
  }
  componentDidMount = () => {
    this.props.checkLogin()
    axios({
      url: url.materias,
      method: 'get',
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then((res) => {
        if (res.data.code === 200) {
          this.setState({
            loading: false,
            gestion: res.data.content.gestion,
            fecha: res.data.content.fecha,
            curso: res.data.content.curso,
            paralelo: res.data.content.paralelo,
            materias: res.data.content.materias
          })
        } else {
          this.setState({
            loading: false,
            errorMessage: res.data.usrmsg
          })
        }
      }).catch((e) => {
        this.setState({
          loading: false,
          errorMessage: e.message
        })
      })
  }
  setSelectedId = id => () => {
    this.setState({
      selectedId: id
    })
  }
  render() {
    const {
      loading, gestion, fecha, curso, paralelo, errorMessage, materias, selectedId
    } = this.state
    if (errorMessage.length > 0) {
      return <Typography style={{ marginTop: 50 }} color="error" variant="display2">Error: {errorMessage}</Typography>
    }
    if (selectedId !== null) {
      return <Materia setSelectedId={this.setSelectedId} materiaId={selectedId} />
    }
    if (loading) {
      return <CircularProgress style={{ marginTop: 50 }} size={80} />
    }
    const contMaterias = materias.map(mat => (
      <Grid item key={mat.id} xs={12} sm={6} md={4} lg={3}>
        <Card style={{ cursor: 'pointer' }} onClick={this.setSelectedId(mat.id)}>
          <CardContent>
            <Typography color="secondary">
              {mat.nombre2}
            </Typography>
            <Typography variant="headline" component="h2">
              {mat.nombre}
            </Typography>
            <Typography color="secondary">
              Prof.: {mat.profesor}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))
    return (
      <Fragment>
        <Grid item xs={12} md={10} lg={8}>
          <Typography variant="display2" color="primary" gutterBottom>
            Mis Materias
          </Typography>
          <Paper style={{ padding: '15px' }}>
            <Typography color="primary" variant="headline" headlineMapping={{ headline: 'span' }}>
              Gesti&oacute;n:
              <Typography headlineMapping={{ headline: 'span' }} color="secondary" variant="headline" gutterBottom>
                {gestion}
              </Typography>
            </Typography>
            <Typography color="primary" variant="headline" headlineMapping={{ headline: 'span' }}>
              Fecha Inscripci&oacute;n:
              <Typography headlineMapping={{ headline: 'span' }} color="secondary" variant="headline" gutterBottom>
                {fecha}
              </Typography>
            </Typography>
            <Typography color="primary" variant="headline" headlineMapping={{ headline: 'span' }}>
              Curso:
              <Typography headlineMapping={{ headline: 'span' }} color="secondary" variant="headline" gutterBottom>
                {curso}° de Secundaria, paralelo {paralelo}
              </Typography>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={10} lg={8}>
          <Grid container spacing={24}>
            {contMaterias}
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}
