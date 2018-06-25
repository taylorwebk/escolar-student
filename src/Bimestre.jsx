import React from 'react'
import {
  Grid,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody
} from '@material-ui'

const bimestres = ['Primer', 'Segundo', 'Tercer', 'Cuarto']
const Bimestre = ({ bim, nro }) => (
  <Grid item xs={12} md={6}>
    <Paper style={{ overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={4}>
              <Typography variant="title" color="primary">
                {bimestres[nro - 1]} Bimestre
              </Typography>
              <Typography variant="subheading" color="secondary">
                Nota Bimestral: {
                  bim.length === 0 ? 'Sin trabajos aún' : parseInt(bim.reduce((sum, trabajo) =>
                  (trabajo.nota === null ? sum : sum + trabajo.nota), 0) / bim.length, 10)
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
          {bim.map((trabajo, i) => (
            <TableRow key={`${trabajo.nombre}.${trabajo.fecha}`}>
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell>{trabajo.fecha}</TableCell>
              <TableCell>{trabajo.nombre}</TableCell>
              <TableCell>{trabajo.nota === null ? 'Sin Calificar' : trabajo.nota}</TableCell>
            </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </Paper>
  </Grid>
)
export default Bimestre
