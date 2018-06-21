import React from 'react'
import {
  Grid,
  Typography,
  Paper
} from '@material-ui'

const styles = {
  root: {
    padding: 25,
    marginTop: 20
  }
}

const Perfil = ({ student }) => (
  <Grid item>
    <br />
    <Paper elevation={5} style={styles.root}>
      <Typography color="primary" variant="display1" gutterBottom>
        Informaci&oacute;n del Estudiante
      </Typography>
      <Typography color="primary" variant="headline">
        Nombre:
        <Typography align="center" headlineMapping={{ headline: 'span' }} color="secondary" variant="headline" gutterBottom>
          {`${student.nombres} ${student.appat} ${student.apmat}`}
        </Typography>
      </Typography>
      <Typography color="primary" variant="headline">
        Nombre de Usuario:
        <Typography align="center" headlineMapping={{ headline: 'span' }} color="secondary" variant="headline" gutterBottom>
          {student.username}
        </Typography>
      </Typography>
      <Typography color="primary" variant="headline">
        CI:
        <Typography align="center" headlineMapping={{ headline: 'span' }} color="secondary" variant="headline" gutterBottom>
          {student.ci}
        </Typography>
      </Typography>
      <Typography color="primary" variant="headline">
        Direcci&oacute;n:
        <Typography align="center" headlineMapping={{ headline: 'span' }} color="secondary" variant="headline" gutterBottom>
          {student.dir}
        </Typography>
      </Typography>
      <Typography color="primary" variant="headline">
        Celular:
        <Typography align="center" headlineMapping={{ headline: 'span' }} color="secondary" variant="headline" gutterBottom>
          {student.nrocel}
        </Typography>
      </Typography>
    </Paper>
    <Paper elevation={5} style={styles.root}>
      <Typography color="primary" variant="display1" gutterBottom>
        A tutor&iacute;a de:
      </Typography>
      <Typography color="primary" variant="headline">
        Nombre:
        <Typography align="center" headlineMapping={{ headline: 'span' }} color="secondary" variant="headline" gutterBottom>
          {student.apoderado.nombre}
        </Typography>
      </Typography>
      <Typography color="primary" variant="headline">
        N&uacute;mero de referencia:
        <Typography align="center" headlineMapping={{ headline: 'span' }} color="secondary" variant="headline" gutterBottom>
          {student.apoderado.nroref}
        </Typography>
      </Typography>
      <Typography color="primary" variant="headline">
        Parentesco:
        <Typography align="center" headlineMapping={{ headline: 'span' }} color="secondary" variant="headline" gutterBottom>
          {student.apoderado.parentesco}
        </Typography>
      </Typography>
    </Paper>
  </Grid>
)
export default Perfil
