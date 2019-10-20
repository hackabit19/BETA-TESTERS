# BETA-TESTERS
This project showcases the journey of Medicine on blockchain.

The Pharmaceutical supply chain is the sequence of activities and process to bring raw drugs and matrials from supplier(farms) to processed medicine in Pharm.

#### Problems in Exixting System
---
- Shipment visibility
- Expiration
- Slow Process and Error prone paper work
- Mutable and Invalid source
- Lack of coordination

#### What we are providing
---
- Accurate information across the entire chain at any point and at any location
- Instant access to real-time updates and alerts if issues are detected
- Visibility of all handovers in the supply chain
- Traceability back to source of all materials
- Seamless collaboration between all parties
- Reduce paper work and Speedup process



#### Roles
---
1. Admin
2. Supplier
3. Transfporter
4. Manufacturer
5. Distributer
6. Pharma

A manufacturer produces the drugs and adds the QR code to it, containing essential information like timestamp, item name, location and manufacturing and expiry date. The information added by the manufacturer gets stored on the blockchain, making it possible for other stakeholders to to trace the drugs’ supply chain transparently. Once the information is added to the blockchain, a hash ID is produced that can be used for tracking back the transactions. Once the logistics service providers deliver the drugs to distributors, they can verify the origin of medicines with the help of hash ID stored on the blockchain. Distributors validate the received medicines and sign the transaction digitally which is then added to the blockchain.

The signed transactions trigger the smart contracts to send drugs to the hospitals/pharmacists. Pharmacists get the drugs which can be traced back to know its origination using the hash ID saved on the blockchain. If any illegal distributor tries to sell counterfeit drugs with fake drug ID to pharmacists or patients, the transaction is considered invalid because of the fraudulent information added about the drug. Patients buy the drugs and scan the QR code to trace back its source

**Conclusion**: A blockchain solution provided by our team of will help in empowering the entire drug supply chain with enhanced tracking and traceability.
---
#### Tools and Technologies
---
- Solidity (Ethereum Smart Contract Language)
- Metamask (Ethereum wallet)
- Ganache
- Truffle
- Infura
- Web3JS
- ReactJS

#### Prerequisites
---
- Nodejs v8.12 or above
- Truffle v5.0.0 (core: 5.0.0) (http://truffleframework.com/docs/getting_started/installation)
- Solidity v0.5.0
- Metamask (https://metamask.io)
- Ganache (https://truffleframework.com/docs/ganache/quickstart)

#### Contract Deployment Steps:
---
**Setting up Ethereum Smart Contract:**

```
git clone https://github.com/hackabit19/BETA-TESTERS.git
cd BETA-TESTERS/
```
**Update truffle.js **

```
require('babel-register');
require('babel-polyfill');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
```
Go to your project folder in terminal then execute :

```
rm -rf build/
truffle compile
truffle migrate
```
**Please note:**
1. After successfully deployment you will get response in bash terminal like below
```
Starting migrations...
======================
> Network name:    'development'
> Network id:      5777
> Block gas limit: 6721975


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x22a002f941602ff792cb66ea26b7c9acea8fbde14a7343789e0ae4b349a9ff75
   > Blocks: 1            Seconds: 109
   > contract address:    0xC30C388ceD2f27691B1aD0E70c1B51D726343acb
   > account:             0x9DD35e3b3F7704E86F946443F4Ca44053Eae05a8
   > balance:             4.00294387495
   > gas used:            283300
   > gas price:           60 gwei
   > value sent:          0 ETH
   > total cost:          0.016998 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:            0.016998 ETH


2_deploy_contracts.js
=======================
[ '0x9DD35e3b3F7704E86F946443F4Ca44053Eae05a8' ]

   Deploying 'SupplyChain'
   -----------------------
   > transaction hash:    0xd05404fd8a8481e4c867052760f14b5b290473848a9956873df52785819e4946
   > Blocks: 2            Seconds: 9
   > contract address:    0xE384741Cb0346543D8f7d5b72d0ff3663FC548d4
   > account:             0x9DD35e3b3F7704E86F946443F4Ca44053Eae05a8
   > balance:             3.61046395495
   > gas used:            6499304
   > gas price:           60 gwei
   > value sent:          0 ETH
   > total cost:          0.38995824 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.38995824 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.40695624 ETH

```



