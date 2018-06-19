import React, { Component } from 'react'
import axios from 'axios'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
  InputAdornment,
  IconButton,
  FormControl,
  Input,
  InputLabel,
  CircularProgress,
  Typography
} from '@material-ui'
import { withStyles } from '@material-ui/core/styles'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import url from './utils'

const styles = theme => ({
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative'
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
})


class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      showPassword: false,
      loading: false,
      errorMessage: ''
    }
  }
  handleSubmit = () => {
    const { studentLogin } = this.props
    this.setState({
      loading: true
    })
    const data = (({ username, password }) => ({ username, password }))(this.state)
    axios.post(url.login, data).then((res) => {
      if (res.data.code === 200) {
        localStorage.setItem('token', res.data.content.token)
        this.setState({
          loading: false,
          errorMessage: ''
        })
        studentLogin(res.data.content.data)
      } else {
        this.setState({
          loading: false,
          errorMessage: res.data.usrmsg,
          password: ''
        })
      }
    }).catch((e) => {
      this.setState({
        loading: false,
        errorMessage: e.message,
        password: ''
      })
    })
  }
  handleChange = prop => (event) => {
    this.setState({
      [prop]: event.target.value
    })
  }
  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    })
  }
  render() {
    const { fullScreen, classes } = this.props
    const {
      username, password, showPassword, loading, errorMessage
    } = this.state
    return (
      <Dialog
        open
        fullScreen={fullScreen}
      >
        <DialogTitle>Inicia Sesi&oacute;n</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Accede al sistema para ver tus notas.
          </DialogContentText>
          {(errorMessage.length > 0) && <Typography variant="subheading" color="error">{errorMessage}</Typography>}
          <br />
          <FormControl fullWidth>
            <InputLabel htmlFor="username">Nombre de Usuario</InputLabel>
            <Input
              required
              autoFocus
              id="username"
              type="text"
              value={username}
              onChange={this.handleChange('username')}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              required
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={this.handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                    onMouseDown={this.handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <div className={classes.wrapper}>
            <Button disabled={loading} color="primary" onClick={this.handleSubmit} variant="contained">
            Ingresar
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </DialogActions>
      </Dialog>
    )
  }
}
export default withStyles(styles)(withMobileDialog()(Login))
// export default withMobileDialog()(Login)
