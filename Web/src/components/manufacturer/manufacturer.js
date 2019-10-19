import React , { Component} from 'react'
import { Button } from '@material-ui/core';
import Back from '../../images/background2.jpg'
import Web3 from 'web3';
import supply from '../../abis/SupplyChain.json'


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

    async loadBlockchainData(){
        const web3 = window.web3
        const account = await web3.eth.getAccounts()
        this.setState({account: account[0]})
        const networkId = await web3.eth.net.getId()
        const networkData = supply.networks[networkId]
        if(networkData){
          const abi = supply.abi;
          const address = networkData.address;
          console.log(address);
          const contract = web3.eth.Contract(abi, address)
          this.setState({contract})
        }else{
          window.alert('Smart contract not deployed')
        }
      }
    
      async loadWeb3() {
        if(window.ethereum){
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }if(window.web3){
          window.web3 = new Web3(window.web3.currentProvider)
        }else{
          window.alert('Please use Metamask!')
        }
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
           <section classNmae="p-5" style={{
                background:`url(${Back}`,
                backgroundSize : "cover",
                backgroundRepeat : "no-repeat",
                backgroundPosition :"center"}}>
                <div className="manu-col">
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
                        <Button className="btn btn-block btn-outline-danger mx-auto" 
                            onClick={(event) => this.edithandler(event)}
                            style={{width:"60%" ,background:"linear-gradient(to right,rgba(205,52,181),rgba(68,166,187))",borderRadius:"10px"}}
                            >Edit</Button>
                        </div>
                    </div>
                </div>
                <div className="container mt-5">
                    <div className="row mb-3">
                        <div className="col text-center">
                            
                            <input className="input-manu" type="text" placeholder="raw packages"  onChange={(event) => this.handleChange(event,'raw')}></input>     
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col text-center">
                           
                            <input className="input-manu" type="text" placeholder="batch Id" onChange={(event) => this.handleChange(event,'batchId')}></input>     
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col text-center">

                            <input className="input-manu" type="text" placeholder="description"  onChange={(event) => this.handleChange(event,'desc')}></input>     
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col text-center">
                           
                            <input className="input-manu"  type="text" placeholder="Farmer Name"  onChange={(event) => this.handleChange(event,'farmer')}></input>     
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col text-center">
                           
                            <input className="input-manu"  type="text" placeholder="Location"  onChange={(event) => this.handleChange(event,'location')}></input>     
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col text-center">
                           
                            <input className="input-manu"  type="text" placeholder="Quantity"  onChange={(event) => this.handleChange(event,'quantity')}></input>     
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col text-center">
                          
                            <input className="input-manu" type="text" placeholder="Shiper Manufacturer"  onChange={(event) => this.handleChange(event,'manu')}></input>     
                        </div>
                    </div>
                    
                    <div className="row mb-3">
                        <div className="col text-center">
                          
                            <input className="input-manu"  type="text" placeholder="status"  onChange={(event) => this.handleChange(event,'status')}></input>     
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col text-center mb-4">
                        <Button className="btn btn-block btn-outline-danger mx-auto" 
                            style={{width:"60%" ,background:"linear-gradient(to right,rgba(205,52,181),rgba(68,166,187))",borderRadius:"10px"}}
                            >Validate</Button>
                        </div>
                    </div>
                </div>
                </div>
           </section>
        )
    }
}

export default Manufacturer