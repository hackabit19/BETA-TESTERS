import React , {Component} from 'react';
import { Route , Switch } from 'react-router-dom'

import Manufacturer from './components/manufacturer/manufacturer'
import Login from './components/login/Login'
import PublicRoutes from './components/PublicRoutes/index'
import PrivateRoutes from './components/PrivateRoutes/index'
import Admin from './components/admin/admin'
import Distributor from './components/Distributor/distributor'
import Home from './components/home/home'
import AppBar from './components/common/appbar'

class App extends Component{
  render(){
    console.log(this.props.user)
      
    return(
      <>
      <AppBar user={this.props.user}/>
      <Switch>
        <PublicRoutes path="/" component={Home} exact restricted={false} user={this.props.user} />
        <PublicRoutes path="/login" component={Login} exact restricted={true} user={this.props.user} />
        <PrivateRoutes path="/admin" component={Admin} exact user={this.props.user} />
        <PublicRoutes path="/manufacturer" component={Manufacturer} exact user={this.props.user} restricted={false} />
        <PublicRoutes path="/distributor" component={Distributor} exact user={this.props.user} restricted={false} />
      </Switch>
      </>
    )
  }
}


export default App;
