import React , { Component } from 'react'
import AdminImage from '../../images/admin.png'
import Slide from 'react-reveal/Slide'
import Zoom from 'react-reveal/Zoom'
import Fade from 'react-reveal/Fade'
import Web3 from 'web3'
import supply from '../../abis/SupplyChain.json'

class Admin extends Component{

    state = {
        address : null,
        name : null,
        location : null,
        role : null,
        account : null,
        contract : null
    }

    async componentWillMount(){
        await this.loadBlockchainData();
    }

    async loadBlockchainData(){
        const web3 = window.web3
        const account = await web3.eth.getAccounts();
        //const balance = web3.eth.getBalance(this.state.address);
        console.log(account);
        this.setState({account: account[0]});
        const networkId = await web3.eth.net.getId()
        const networkData = supply.networks[networkId]
        //if(networkData){
          const abi = [
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_BatchID",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_Shipper",
                        "type": "address"
                    }
                ],
                "name": "pickDP",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_BatchID",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_Receiver",
                        "type": "address"
                    }
                ],
                "name": "recieveDP",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "BatchID",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "Sender",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "Shipper",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "Receiver",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getBatchIDStatus",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }
        ];
          const address = "0x715c220362f1f1eC3D098a3715eCa7d36ee379fB";
          console.log(address);
          const contract = web3.eth.Contract(abi, address)
          this.setState({contract})
        //}else{
         // window.alert('Smart contract not deployed')
        //}
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

        this.state.contract.methods.registerUser(this.state.address, this.state.name, this.state.location, this.state.role).send({from: this.state.account})
        
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