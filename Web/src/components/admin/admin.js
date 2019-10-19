import React , { Component } from 'react'
import AdminImage from '../../images/admin.png'
import Slide from 'react-reveal/Slide'
import Zoom from 'react-reveal/Zoom'
import Fade from 'react-reveal/Fade'

class Admin extends Component{

    state = {
        address : null,
        name : null,
        location : null,
        role : null
    }

    handleChange  = (event,name) => {
        if(name == 'name'){
            this.setState({
                name  :event.target.value
            })
        }
        if(name == 'location'){
            this.setState({
                location  :event.target.value
            })
        }

        if(name == 'address'){
            this.setState({
                address  :event.target.value
            })
        }

        if(name == 'role'){
            this.setState({
                role  :event.target.value
            })
        }
    }

    handleSubmit = () => {
        const dataToSubmit = {}

        for(let key in this.state){
            dataToSubmit[key] = this.state[key]
        }

        console.log(dataToSubmit)
        
    }

    render(){
        return(
            <>
            <section className="p-5" style={{
                background : "black",
                minHeight : "100vh"
            }}>


                <div className="container" style={{
                   color : "green"
                }}>
                    <Fade>
                    <div className="row mb-5">
                        <div className="col text-center">
                            <h1>Welcome Admin</h1>
                        </div>
                    </div>
                    </Fade>
                    <Zoom delay={100}>
                    <div className="row mb-5">
                        <div className="col text-center">
                        <input 
                            type="text"
                            placeholder="Enter Eth Address"
                            onChange={(event) => this.handleChange(event,'address')}
                           className="input-admin"
                        ></input>   
                        </div>
                    </div>
                    </Zoom>

                    <Zoom delay={200}>
                    <div className="row mb-5">
                        <div className="col text-center">
                            <input className="input-admin" type="text" placeholder="enter name"  onChange={(event) => this.handleChange(event,'name')}></input>     
                        </div>
                    </div>
                    </Zoom>

                    <Zoom delay={300}>
                    <div className="row mb-5">
                        <div className="col text-center">
                            <input className="input-admin" type="text" placeholder="Location"  onChange={(event) => this.handleChange(event,'location')}></input>     
                        </div>
                    </div>
                    </Zoom>

                    <Zoom delay={400}>
                        <div className="row mb-5">
                        <div className="col text-center">
                            
                            <input className="input-admin" type="text" placeholder="Role"  onChange={(event) => this.handleChange(event,'role')}></input>     
                        </div>
                        </div>
                    </Zoom>
                    <Slide delay={500} left>
                    <div className="row mb-5">
                        <div className="col text-center">
                            <button className="input-admin-button" onClick={this.handleSubmit} >Submit</button>     
                        </div>
                    </div>
                    </Slide>
                    
                </div>
            </section>
            </>
        )
    }
}

export default Admin