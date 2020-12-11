// Providers
import { MuiThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';

// Componenets
import App from './App';
import { lightTheme } from './theme';

const AppWrapper = () => {
  return (
    <MuiThemeProvider theme={lightTheme}>
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <App />
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
};

export default AppWrapper;
