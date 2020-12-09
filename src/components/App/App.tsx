import { Switch, Route } from 'react-router-dom';
import './App.css';

// Components
import Home from 'components/Home';

// Helpers
import { Routes } from 'helpers/contants';

function App() {
  return (
    <div>
      <Switch>
        <Route path={Routes.HOME} component={Home} />
      </Switch>
    </div>
  );
}

export default App;
