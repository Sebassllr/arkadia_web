import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Dashboard from './Dashboard';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true
  }
})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Dashboard />
    </MuiThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
