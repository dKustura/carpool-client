// Providers
import { MuiThemeProvider } from '@material-ui/core/styles';

// Componenets
import App from './App';
import { lightTheme } from './theme';

const AppWrapper = () => {
  return (
    <MuiThemeProvider theme={lightTheme}>
      <App />
    </MuiThemeProvider>
  );
};

export default AppWrapper;
