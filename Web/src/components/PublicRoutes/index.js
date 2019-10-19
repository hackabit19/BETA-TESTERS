import React from 'react'
import { Route , Redirect } from 'react-router-dom'

const PublicRoutes = (props) => {

    let route = null;

    console.log(props.path)
    if(props.user){

        if(props.restricted){
            
            //console.log("herere")
            console.log(props.restricted)
            return <Redirect to="/admin" />
        }
        
        return <Route path={props.path} component={props.component} exact={props.exact} user={props.user} />
    }
    
    return <Route path={props.path} component={props.component} exact={props.exact} user={props.user} />
}

export default PublicRoutes