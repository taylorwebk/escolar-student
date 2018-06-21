import React, { Component } from 'react'
import {
  Grid,
  IconButton,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Paper
} from '@material-ui'
import axios from 'axios'
import ArrowBack from '@material-ui/icons/ArrowBack'
import url from './utils'

export default class Materia extends Component {
  state = {
    loading: true,
    errorMessage: '',
    campo: '',
    materia: '',
    materia2: '',
    gestion: 0,
    curso: '',
    paralelo: '',
    profesor: '',
    t1bim: [],
    t2bim: [],
    t3bim: [],
    t4bim: []
  }
  componentDidMount = () => {
    const { materiaId } = this.props
    axios({
      url: url.materia(materiaId),
      method: 'get',
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then((res) => {
        if (res.data.code === 200) {
          this.setState({
            campo: res.data.content.campMateria,
            materia: res.data.content.nomMateria,
            materia2: res.data.content.nom2Materia,
            gestion: res.data.content.gestion,
            curso: res.data.content.curso,
            paralelo: res.data.content.paralelo,
            profesor: res.data.content.profesor,
            t1bim: res.data.content.trabajos.filter(trabajo => (trabajo.bimestre === 1)),
            t2bim: res.data.content.trabajos.filter(trabajo => (trabajo.bimestre === 2)),
            t3bim: res.data.content.trabajos.filter(trabajo => (trabajo.bimestre === 3)),
            t4bim: res.data.content.trabajos.filter(trabajo => (trabajo.bimestre === 4)),
            loading: false,
            errorMessage: ''
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

  render() {
    const {
      loading, errorMessage, campo, materia, materia2, gestion, curso, paralelo, profesor,
      t1bim, t2bim, t3bim, t4bim
    } = this.state
    const { setSelectedId } = this.props
    if (errorMessage.length > 0) {
      return <Typography style={{ marginTop: 50 }} color="error" variant="display2">Error: {errorMessage}</Typography>
    }
    if (loading) {
      return <CircularProgress style={{ marginTop: 50 }} size={80} />
    }
    return (
      <Grid item xs={12} md={10} lg={8}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <IconButton style={{ width: 80, height: 80 }} onClick={setSelectedId(null)}>
              <ArrowBack />
            </IconButton>
            <Typography variant="display2" color="primary" gutterBottom>
              {materia2}
            </Typography>
            <Typography variant="subheading" color="primary" gutterBottom>
              {materia} - {campo}
            </Typography>
            <Card>
              <CardContent>
                <Typography variant="subheading" color="secondary">
                  <b>Gesti&oacute;n: </b>{gestion}
                </Typography>
                <Typography variant="subheading" color="secondary">
                  <b>Curso: </b>{`${curso}° de Secundaria paralelo ${paralelo}`}
                </Typography>
                <Typography variant="subheading" color="secondary">
                  <b>Profesor: </b>{profesor}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper style={{ overflowX: 'auto' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Typography variant="title" color="primary">
                        Primer Bimestre
                      </Typography>
                      <Typography variant="subheading" color="secondary">
                        Nota Bimestral: {
                          t1bim.length === 0 ? 'Sin trabajos aún' : parseInt(t1bim.reduce((sum, trabajo) =>
                          (sum + trabajo.nota), 0) / t1bim.length, 10)
                        }
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableHead>
                  <TableRow>
                    <TableCell numeric>Nro.</TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell numeric>Nota</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {t1bim.map((trabajo, i) => (
                    <TableRow key={`${trabajo.nombre}.${trabajo.fecha}`}>
                      <TableCell component="th" scope="row">
                        {i}
                      </TableCell>
                      <TableCell>{trabajo.fecha}</TableCell>
                      <TableCell>{trabajo.nombre}</TableCell>
                      <TableCell numeric>{trabajo.nota}</TableCell>
                    </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper style={{ overflowX: 'auto' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Typography variant="title" color="primary">
                        Segundo Bimestre
                      </Typography>
                      <Typography variant="subheading" color="secondary">
                        Nota Bimestral: {
                          t2bim.length === 0 ? 'Sin trabajos aún' : parseInt(t2bim.reduce((sum, trabajo) =>
                          (sum + trabajo.nota), 0) / t2bim.length, 10)
                        }
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableHead>
                  <TableRow>
                    <TableCell numeric>Nro.</TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell numeric>Nota</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {t2bim.map((trabajo, i) => (
                    <TableRow key={`${trabajo.nombre}.${trabajo.fecha}`}>
                      <TableCell component="th" scope="row">
                        {i}
                      </TableCell>
                      <TableCell>{trabajo.fecha}</TableCell>
                      <TableCell>{trabajo.nombre}</TableCell>
                      <TableCell numeric>{trabajo.nota}</TableCell>
                    </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper style={{ overflowX: 'auto' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Typography variant="title" color="primary">
                        Tercer Bimestre
                      </Typography>
                      <Typography variant="subheading" color="secondary">
                        Nota Bimestral: {
                          t3bim.length === 0 ? 'Sin trabajos aún' : parseInt(t3bim.reduce((sum, trabajo) =>
                          (sum + trabajo.nota), 0) / t3bim.length, 10)
                        }
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableHead>
                  <TableRow>
                    <TableCell numeric>Nro.</TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell numeric>Nota</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {t3bim.map((trabajo, i) => (
                    <TableRow key={`${trabajo.nombre}.${trabajo.fecha}`}>
                      <TableCell component="th" scope="row">
                        {i}
                      </TableCell>
                      <TableCell>{trabajo.fecha}</TableCell>
                      <TableCell>{trabajo.nombre}</TableCell>
                      <TableCell numeric>{trabajo.nota}</TableCell>
                    </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper style={{ overflowX: 'auto' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Typography variant="title" color="primary">
                        Cuarto Bimestre
                      </Typography>
                      <Typography variant="subheading" color="secondary">
                        Nota Bimestral: {
                          t4bim.length === 0 ? 'Sin trabajos aún' : parseInt(t4bim.reduce((sum, trabajo) =>
                          (sum + trabajo.nota), 0) / t4bim.length, 10)
                        }
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableHead>
                  <TableRow>
                    <TableCell numeric>Nro.</TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell><b>Nombre</b></TableCell>
                    <TableCell numeric>Nota</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {t4bim.map((trabajo, i) => (
                    <TableRow key={`${trabajo.nombre}.${trabajo.fecha}`}>
                      <TableCell component="th" scope="row">
                        {i}
                      </TableCell>
                      <TableCell>{trabajo.fecha}</TableCell>
                      <TableCell>{trabajo.nombre}</TableCell>
                      <TableCell numeric>{trabajo.nota}</TableCell>
                    </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
