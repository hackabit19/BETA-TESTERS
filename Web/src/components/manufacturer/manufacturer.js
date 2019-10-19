import React , { Component} from 'react'
import { Button } from '@material-ui/core';

class Manufacturer extends Component{

    state = {
        address : 1234,
        balance : 1,
        transaction: 50,
        batchId : null,
        raw : null,
        desc : null,
        farmerName : null,
        Location  :null,
        Quantity : null,
        manu : null,
        status : null
    }

    componentDidMount(){
        
    }

    edithandler = (event) => {
        event.preventDefault()
        console.log("edit")
    }

    handleChange = (event,name) => {

        if(name === "raw"){
            this.setState({
                raw :  event.target.value
            })
        }

        if(name === "batchId"){
            this.setState({
                batchId : event.target.value
            })
        }

        if(name === 'desc'){
            this.setState({
                desc : event.target.value
            })
        }

        if(name === 'farmer'){
            this.setState({
                farmerName : event.target.value
            })
        }

        if(name === 'location'){
            this.setState({
                Location : event.target.value
            })
        }

        if(name === 'quantity'){
            this.setState({
                Quantity:  event.target.value
            })
        }

        if(name === 'manu'){
            this.setState({
                manu  : event.target.value
            })
        }

        if(name === 'status'){
            this.setState({
                status : event.target.value
            })
        }
        
    }

    handleValidate = () => {
        const dataToSubmit = {}

        for(let key in this.state){

            if(key === 'address' || key === 'balance' || key === `transaction`) continue;

            if(key === 'Quantity'){
                dataToSubmit[key] = +this.state[key]
                continue
            }

            dataToSubmit[key] = this.state[key]
        }


        console.log(dataToSubmit)
    }

    render(){

        console.log(this.state)
        
        return(
           <section classNmae="p-5">
                <div className="container">
                    <div className="row">
                        <div className="col text-center">
                            <h1>Manufacturer</h1>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col text-center">
                            <h3>Address : {this.state.address}</h3>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col text-center">
                            <h3>Balance : {this.state.balance}</h3>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col text-center">
                            <h3>Recent Transaction : {this.state.transaction}</h3>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col text-center">
                            <button
                            onClick={(event) => this.edithandler(event)}
                            className="btn btn-outline-success" style={{width:"40%",fontSize:"20px"}}>Edit</button>
                        </div>
                    </div>
                </div>
                <div className="container mt-5">
                    <div className="row mb-3">
                        <div className="col text-center">
                            <label className="mr-3">Raw materials : </label>
                            <input type="text" placeholder="raw packages"  onChange={(event) => this.handleChange(event,'raw')}></input>     
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col text-center">
                            <label  className="mr-3">Batch Id : </label>
                            <input  type="text" placeholder="batch Id" onChange={(event) => this.handleChange(event,'batchId')}></input>     
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col text-center">
                            <label  className="mr-3">Description : </label>
                            <input  type="text" placeholder="description"  onChange={(event) => this.handleChange(event,'desc')}></input>     
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col text-center">
                            <label  className="mr-3">Branch Name : </label>
                            <input  type="text" placeholder="Branch Name"  onChange={(event) => this.handleChange(event,'farmer')}></input>     
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col text-center">
                            <label  className="mr-3">Location : </label>
                            <input  type="text" placeholder="Location"  onChange={(event) => this.handleChange(event,'location')}></input>     
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col text-center">
                            <label  className="mr-3">Quantity : </label>
                            <input  type="text" placeholder="Quantity"  onChange={(event) => this.handleChange(event,'quantity')}></input>     
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col text-center">
                            <label  className="mr-3">Shiper Manufacturer : </label>
                            <input  type="text" placeholder="Shiper Manufacturer"  onChange={(event) => this.handleChange(event,'manu')}></input>     
                        </div>
                    </div>
                    
                    <div className="row mb-3">
                        <div className="col text-center">
                            <label  className="mr-3">Status : </label>
                            <input  type="text" placeholder="status"  onChange={(event) => this.handleChange(event,'status')}></input>     
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col text-center">
                            <button className="btn btn-block btn-danger" onClick={this.handleValidate}>Validate</button>  
                        </div>
                    </div>
                </div>
           </section>
        )
    }
}

export default Manufacturer