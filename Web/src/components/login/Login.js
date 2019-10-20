import React , { Component } from 'react'
import Particles from 'react-particles-js'
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom'
import { firebase } from '../../firebase'

const particlesOpt = {
        particles : {
            number : {
                value : 150,
                density : {
                    enable : true,
                    value_area : 800
                }
            }
        }
}

class Login extends Component{

    state = {
        email : '',
        password : ""
    }

   loginHandler = () => {
        const email = this.state.email;
        const password = this.state.password;

        console.log(email)
        console.log(password)

        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(user => {
            console.log("success")
            console.log(user)
            console.log(this.props)
            this.props.history.replace("/admin")
        })
        .catch(err => {
            console.log("error")
            console.log(err)
        })

    }

    handleChange = (event,target) => {

        if(target === 'email'){
            this.setState({
                email : event.target.value
            })
        }else{
            this.setState({
                password : event.target.value
            })
        }
    }

    render(){

        return(
            <div>
               
                <div className="container p-5" style={{background:"white",marginTop:"60px",width:"30%",borderRadius:"15px"}}>
                    <div className="row mb-5">
                        <div className="col text-center common-heading" style={{ textTransform:'uppercase' }}>
                            Login
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-center">
                        <input 
                            style={{width:"80%"}}
                            placeholder="Enter email"
                            onChange={(event) => this.handleChange(event,'email')}
                            className="inputLogin"
                        ></input>
                        </div>
                    </div>
                    <div className="row mt-4">  
                        <div className="col text-center">
                        <input 
                            style={{width:"80%"}}
                            type="password"
                            placeholder="Enter password"
                            onChange={(event) => this.handleChange(event,'password')}
                            className="inputLogin"
                        ></input>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col text-right" style={{marginRight:"30px",color:"gray",fontSize:"14px"}}>
                            <p>Forgot Password?</p>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col text-center">
                            <Button className="btn btn-block btn-outline-danger mx-auto" 
                            style={{width:"80%" ,background:"linear-gradient(to right,rgba(205,52,181),rgba(68,166,187))",borderRadius:"10px"}}
                            onClick={this.loginHandler}>LOGIN</Button>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col text-center">
                        <i className="fa fa-facebook mx-3 text-primary fa-2x"></i>
                        <i class="fa fa-twitter mx-3 text-primary fa-2x"></i>
                        <i class="fa fa-google mx-3 text-danger fa-2x"></i>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col text-center" style={{color:"gray",fontSize:"14px"}}>
                            Have not account yet ?
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col text-center" style={{color:"gray",fontSize:"14px"}}>
                            <NavLink to="/singup">
                            <Button className="btn btn-block btn-outline-danger mx-auto" 
                            style={{width:"80%" ,background:"linear-gradient(to right,rgba(205,52,181),rgba(68,166,187))",borderRadius:"10px"}}
                            onClick={this.loginHandler}>Signup</Button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            
                <Particles params={particlesOpt} style={{height : "200vh" ,background : 'linear-gradient(to right,rgba(205,52,181),rgba(68,166,187))' ,position :"absolute" , top:"0" , left : "0", zIndex:"-10"}} />
               

            </div>
            
                
                    

            
        )
        
       
    }
}

export default Login