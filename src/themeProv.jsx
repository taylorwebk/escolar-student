import React from 'react'
import {
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles'
import cyan from '@material-ui/core/colors/cyan'
import blueGrey from '@material-ui/core/colors/blueGrey'
import CssBaseline from '@material-ui/core/CssBaseline'

import 'typeface-roboto' // eslint-disable-line

const theme = createMuiTheme({
  palette: {
    primary: {
      light: cyan[700],
      main: cyan[800],
      dark: cyan[900]
    },
    secondary: {
      light: blueGrey[300],
      main: blueGrey[500],
      dark: blueGrey[700]
    }
  }
})
/**
* Set theme provider to Component
* @param {Component} Component component to inject theme
* @returns {function} function to inject theme to Component
*/
export default function themeProv(Component) {
  /**
  * function component that injects theme
  * @param {Object} props the props of the component
  * @returns {Component} returns a component
  */
  function WithRoot(props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    )
  }
  return WithRoot
}

