import React , { Component } from 'react'
import { firebase } from '../../firebase'

class Home extends Component{

   
    render(){
        return(
            <section className="p-5">
                <div className="container">
                    <div className="row">
                    <div className="col-12 col-md-6">
                <div className="button-wrapper">
                    <div className="button">
                        <div className="button-header mb-4 text-center" style={{fontWeight:"100",fontSize:"40px"}}>
                          Secure Data
                        </div>
                        <div className="button-image">
                        <i className="fa fa-lock fa-5x"></i>
                         
                        </div>
                        <div className="button-text">
                          now secure your data as you will not even believ iy is posisbdnnd
                        </div>
                        <div className="button-button text-center mt-3">
                          <button className="btn btn-primary mx-auto btn-block" onClick={this.toggleSecureData} style={{width:"60%"}}>Secure</button>
                        </div>
                    </div>
                </div>   
              </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Home