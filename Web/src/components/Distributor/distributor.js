import React , { Component } from 'react'
import Image from '../../images/distributor.png'
import { Button } from '@material-ui/core'

class Distributor extends Component{

    state = {
        address : 1234,
        balance : 124,
        name : `harshit`,
        location : "171717",
        role : "developer",
        batchId  : 1,
        desc : `hi there`,
        farmer : "jindal",
        location : "delhi",
        quantity  :15,
        shipper : 'anubhav',
        mname : "harshit",
        maddress : "ranchi",
        mlocation : "dehradun"
    }

    componentDidMount(){

    }

    render(){
        return(
            <section className="" style={{
                background:"linear-gradient(to right,rgba(205,52,181),rgba(68,166,187))",
                paddingBottom:"20px"
            }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12 col-md-6">
                            <img src={Image} />
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="row mb-5">
                                <div className="col text-center">
                                    <h2 className="display-2">Distributor</h2>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col pl-5">
                                <h2 className="distributor-text">Eth Address : <span className="distributor-text-sec">
                                    {this.state.address}</span></h2>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col pl-5">
                                    <h2 className="distributor-text">Balance : <span className="distributor-text-sec">
                                    {this.state.balance}</span></h2>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col pl-5">
                                <h2 className="distributor-text">Name : <span className="distributor-text-sec">
                                    {this.state.name}</span></h2>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col pl-5">
                                <h2 className="distributor-text">Location : <span className="distributor-text-sec">
                                    {this.state.location}</span></h2>
                                </div>
                            </div>
                            {/* <div className="row mb-3">
                                <div className="col pl-5">
                                <h2 className="distributor-text">Name : <span className="distributor-text-sec">
                                    {this.state.role}</span></h2>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="container" style={{
                   
                }}>
                    <div className="row mt-5 p-2">
                        <div className="col-12 col-md-5 p-4" style={{
                             border: `1px solid yellow`
                        }}>
                        <div className="row mb-3">
                                <div className="col pl-5">
                                <h2 className="distributor-text">BatchId : <span className="distributor-text-sec">
                                    {this.state.batchId}</span></h2>
                                </div>
                        </div>
                        <div className="row mb-3">
                                <div className="col pl-5">
                                <h2 className="distributor-text">Description : <span className="distributor-text-sec">
                                    {this.state.desc}</span></h2>
                                </div>
                        </div>
                        <div className="row mb-3">
                                <div className="col pl-5">
                                <h2 className="distributor-text">Farmer Name : <span className="distributor-text-sec">
                                    {this.state.farmer}</span></h2>
                                </div>
                        </div>
                        <div className="row mb-3">
                                <div className="col pl-5">
                                <h2 className="distributor-text">Location : <span className="distributor-text-sec">
                                    {this.state.location}</span></h2>
                                </div>
                        </div>
                        <div className="row mb-3">
                                <div className="col pl-5">
                                <h2 className="distributor-text">Quantity : <span className="distributor-text-sec">
                                    {this.state.quantity}</span></h2>
                                </div>
                        </div>
                        <div className="row mb-3">
                                <div className="col pl-5">
                                <h2 className="distributor-text">Shipper : <span className="distributor-text-sec">
                                    {this.state.shipper}</span></h2>
                                </div>
                        </div>
                        </div>
                        <div className="col-12 col-md-5 p-4 ml-auto" style={{
                             border: `1px solid yellow`
                        }}>
                        <div className="row mb-3">
                                <div className="col pl-5">
                                <h2 className="distributor-text">Manufacturer Name : <span className="distributor-text-sec">
                                    {this.state.mname}</span></h2>
                                </div>
                        </div>
                        <div className="row mb-3">
                                <div className="col pl-5">
                                <h2 className="distributor-text">Manufacturer Address : <span className="distributor-text-sec">
                                    {this.state.maddress}</span></h2>
                                </div>
                        </div>
                        <div className="row mb-3">
                                <div className="col pl-5">
                                <h2 className="distributor-text">Manufacturer Location : <span className="distributor-text-sec">
                                    {this.state.mlocation}</span></h2>
                                </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                <div className="col text-center">
                    <Button className="btn btn-block btn-outline-danger mx-auto" 
                            style={{width:"60%" ,background:"linear-gradient(to right,rgba(205,52,181),rgba(0,0,0))",borderRadius:"10px"}}
                            >Validate</Button>
                </div>
                </div>
            </section>
        )
    }
}

export default Distributor