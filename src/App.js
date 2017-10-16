import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import lightBlue from 'material-ui/colors/lightBlue';
import deepOrange from 'material-ui/colors/deepOrange';
import red from 'material-ui/colors/red';
import Button from 'material-ui/Button';
import 'typeface-roboto'

import List from './components/showList/List';

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: {
      ...deepOrange,
      A400: '#00e677',
    },
    error: red,
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App constainer-flui">
          <List />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
