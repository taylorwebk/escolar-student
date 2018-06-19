import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, IconButton, MenuItem, Menu } from '@material-ui'
import AccountCircle from '@material-ui/icons/AccountCircle'

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  }
}

class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      anchorEl: null
    }
  }

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  };

  render() {
    const { classes, student, studentLogout } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              {student}
            </Typography>
            <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Perfil</MenuItem>
                <MenuItem onClick={studentLogout}>Salir</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
export default withStyles(styles, { withTheme: true })(Header)
