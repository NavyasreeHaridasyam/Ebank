import {Switch, Route} from 'react-router-dom'
import './App.css'

import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/ebank/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
