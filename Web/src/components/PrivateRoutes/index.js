import React from 'react'
import { Route , Redirect } from 'react-router-dom'

const PrivateRoutes = (props) => {

   let route = null

   console.log("here" , props.user)

   if(props.user){
       route = <Route exact={props.exact} path={props.path} render={() => <props.component user={props.user} />} />
       return route
   }

   return <Redirect to="/login" />
}

export default PrivateRoutes