import { Switch, Route } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Home from 'components/Home';
import TravelPlanEdit from 'components/TravelPlanEdit';

// Helpers
import { Routes } from 'helpers/contants';

function App() {
  return (
    <div>
      <Switch>
        <Route path={`${Routes.TRAVEL_PLAN}/:id`} component={TravelPlanEdit} />
        <Route path={Routes.HOME} component={Home} />
      </Switch>

      <ToastContainer limit={3} position="bottom-right" />
    </div>
  );
}

export default App;
