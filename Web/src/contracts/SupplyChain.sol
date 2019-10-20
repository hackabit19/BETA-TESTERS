pragma solidity >=0.4.25 < 0.6.0;

import './Medicine.sol';
import './Distributer.sol';
import './RawMaterial.sol';

contract SupplyChain {
     address public Owner;

    constructor () public {
        Owner = msg.sender;
    }
/********************************************** Owner Section *********************************************/

    modifier onlyOwner() {
        require(
            msg.sender == Owner,
            "Only owner can call this function."
        );
        _;
    }

    enum roles {
        norole,
        supplier,
        transporter,
        manufacturer,
        distributer,
        pharma,
        revoke
    }

    event UserRegister(address indexed EthAddress, string Name);
    event UserRoleRevoked(address indexed EthAddress, string Name, uint Role);
    event UserRoleRessigne(address indexed EthAddress, string Name, uint Role);

    function registerUser(address EthAddress,string memory Name,string memory Location,uint Role) public onlyOwner{
        require(UsersDetails[EthAddress].role == roles.norole, "User Already registered");
        UsersDetails[EthAddress].name = Name;
        UsersDetails[EthAddress].location = Location;
        UsersDetails[EthAddress].ethAddress = EthAddress;
        UsersDetails[EthAddress].role = roles(Role);
        users.push(EthAddress);
        emit UserRegister(EthAddress, Name);
    }
    
    function revokeRole(address userAddress) public onlyOwner {
        require(UsersDetails[userAddress].role != roles.norole, "User not registered");
        emit UserRoleRevoked(userAddress, UsersDetails[userAddress].name,uint(UsersDetails[userAddress].role));
        UsersDetails[userAddress].role = roles(6);
    }
    
    function reassigneRole(address userAddress, uint Role) public onlyOwner {
        require(UsersDetails[userAddress].role != roles.norole, "User not registered");
        UsersDetails[userAddress].role = roles(Role);
        emit UserRoleRessigne(userAddress, UsersDetails[userAddress].name,uint(UsersDetails[userAddress].role));
    }

    /********************************************** User Section **********************************************/
    struct UserInfo {
        string name;
        string location;
        address ethAddress;
        roles role;
    }

    
    mapping(address => UserInfo) UsersDetails;
    address[] users;

    function getUserInfo(address User) public view returns(string memory name,string memory location,address ethAddress,roles role) {
        return (
            UsersDetails[User].name,
            UsersDetails[User].location,
            UsersDetails[User].ethAddress,
            UsersDetails[User].role);
    }

    
    function getUsersCount() public view returns(uint count){
        return users.length;
    }

    function getUserbyIndex(uint index) public view returns(string memory name,string memory location,address ethAddress,roles role) {
        return getUserInfo(users[index]);
    }

    /********************************************** Supplier Section ******************************************/

    mapping(address => address[]) supplierRawProductInfo;
    event RawSupplyInit(
        address indexed ProductID,
        address indexed Supplier,
        address Shipper,
        address indexed Receiver
    );

    function createRawPackage(
        string memory Des,
        string memory FN,
        string memory Loc,
        uint Quant,
        address Shpr,
        address Rcvr
        ) public {
        require(
            UsersDetails[msg.sender].role == roles.supplier,
            "Only Supplier Can call this function "
        );
        RawMaterial rawData = new RawMaterial(
            msg.sender,
            Des,
            FN,
            Loc,
            Quant,
            Shpr,
            Rcvr
            );
        supplierRawProductInfo[msg.sender].push(address(rawData));
        emit RawSupplyInit(address(rawData), msg.sender, Shpr, Rcvr);
    }

    function getPackagesCountS() public view returns (uint count){
        require(
            UsersDetails[msg.sender].role == roles.supplier,
            "Only Supplier Can call this function "
        );
        return supplierRawProductInfo[msg.sender].length;
    }

    function getPackageIdByIndexS(uint index) public view returns(address packageID) {
        require(
            UsersDetails[msg.sender].role == roles.supplier,
            "Only Supplier Can call this function "
        );
        return supplierRawProductInfo[msg.sender][index];
    }

    /********************************************** Transporter Section ******************************************/

    function loadConsingment(
        address pid, //Package or Batch ID
        uint transportertype,
        address cid
        ) public {
        require(
            UsersDetails[msg.sender].role == roles.transporter,
            "Only Transporter can call this function"
        );
        require(
            transportertype > 0,
            "Transporter Type must be define"
        );

        if(transportertype == 1) {  // Supplier to Manufacturer
            RawMaterial(pid).pickPackage(msg.sender);
        } else if(transportertype == 2) {   // Manufacturer to Distributer
            Medicine(pid).pickPackage(msg.sender);
        // } else if(transportertype == 3) {   // Wholesaler to Distributer
        //     MedicineW_D(cid).pickWD(pid,msg.sender);
        } else if(transportertype == 3) {   // Distrubuter to Pharma
            Distributer(cid).pickDP(pid,msg.sender);
        }
    }

    /********************************************** Manufacturer Section ******************************************/
    
    mapping(address => address[]) RawPackagesAtManufacturer;
    mapping(address => string) Hash;

    function  rawPackageReceived(address pid) public {
        require(
            UsersDetails[msg.sender].role == roles.manufacturer,
            "Only manufacturer can call this function"
        );

        RawMaterial(pid).receivedPackage(msg.sender);
        RawPackagesAtManufacturer[msg.sender].push(pid);
    }

    function getPackagesCountM() public view returns(uint count){
        require(
            UsersDetails[msg.sender].role == roles.manufacturer,
            "Only manufacturer can call this function"
        );
        return RawPackagesAtManufacturer[msg.sender].length;
    }

    function getPackageIDByIndexM(uint index) public view returns(address BatchID){
        require(
            UsersDetails[msg.sender].role == roles.manufacturer,
            "Only manufacturer can call this function"
        );
        return RawPackagesAtManufacturer[msg.sender][index];
    }

    mapping(address => address[]) ManufactureredMedicineBatches;
    event MedicineNewBatch(
        address indexed BatchId,
        address indexed Manufacturer,
        address shipper,
        address indexed Receiver
    );

    function manufacturMadicine(string memory Des,string memory RM,uint Quant,address Shpr,address Rcvr) public {
        require(
            UsersDetails[msg.sender].role == roles.manufacturer,
            "Only manufacturer can call this function"
        );

        Medicine m = new Medicine(
            msg.sender,
            Des,
            RM,
            Quant,
            Shpr,
            Rcvr
        );

        ManufactureredMedicineBatches[msg.sender].push(address(m));
        emit MedicineNewBatch(address(m), msg.sender, Shpr, Rcvr);
    }

    function getBatchesCountM() public view returns (uint count){
        require(
            UsersDetails[msg.sender].role == roles.manufacturer,
            "Only Manufacturer Can call this function."
        );
        return ManufactureredMedicineBatches[msg.sender].length;
    }

    function getBatchIdByIndexM(uint index) public view returns(address packageID) {
        require(
            UsersDetails[msg.sender].role == roles.manufacturer,
            "Only Manufacturer Can call this function."
        );
        return ManufactureredMedicineBatches[msg.sender][index];
    }

    function setHash(string memory _hash) public {
        Hash[msg.sender] = _hash;
    }

    function getHash() public view returns(string memory){
        return Hash[msg.sender];
    }

    /********************************************** Distributer Section ******************************************/
    mapping(address => address[]) MedicineBatchAtDistributer;
    mapping(address => address[]) MedicineDtoP;

    mapping(address => address) MedicineDtoPTxContract;

    function transferMadicineDtoP(
        address BatchID,
        address Shipper,
        address Receiver
    ) public {
        require(
            UsersDetails[msg.sender].role == roles.distributer &&
            msg.sender == Medicine(BatchID).getWDP()[1],
            "Only Distributer or current owner of package can call this function"
        );
        Distributer dp = new Distributer(
            BatchID,
            msg.sender,
            Shipper,
            Receiver
        );
        MedicineDtoP[msg.sender].push(address(dp));
        MedicineDtoPTxContract[BatchID] = address(dp);
    }

    function getBatchesCountDP() public view returns (uint count){
        require(
            UsersDetails[msg.sender].role == roles.distributer,
            "Only Distributer Can call this function."
        );
        return MedicineDtoP[msg.sender].length;
    }

    function getBatchIdByIndexDP(uint index) public view returns(address packageID) {
        require(
            UsersDetails[msg.sender].role == roles.distributer,
            "Only Distributer Can call this function."
        );
        return MedicineDtoP[msg.sender][index];
    }

    function getSubContractDP(address BatchID) public view returns (address SubContractDP) {
        // require(
        //     UsersDetails[msg.sender].role == roles.distributer,
        //     "Only Distributer Can call this function."
        // );
        return MedicineDtoPTxContract[BatchID];
    }

    /********************************************** Pharma Section ******************************************/
    
    mapping(address => address[]) MedicineBatchAtPharma;

    
    function medicineRecievedAtPharma(address batchid,address cid) public {
        require(
            UsersDetails[msg.sender].role == roles.pharma,
            "Only Pharma Can call this function."
        );
        Distributer(cid).recieveDP(batchid, msg.sender);
        MedicineBatchAtPharma[msg.sender].push(batchid);
        sale[batchid] = salestatus(1);
    }

    enum salestatus {
        notfound,
        atpharma,
        sold,
        expire,
        damaged
    }

    mapping(address => salestatus) sale;

    event MedicineStatus(
        address BatchID,
        address indexed Pharma,
        uint status
    );

    function updateSaleStatus(
        address BatchID,
        uint Status
    ) public {
        require(
            UsersDetails[msg.sender].role == roles.pharma &&
            msg.sender == Medicine(BatchID).getWDP()[1],
            "Only Pharma or current owner of package can call this function"
        );
        require(sale[BatchID] == salestatus(1), "madicine Must be at Pharma");
        sale[BatchID] = salestatus(Status);

        emit MedicineStatus(BatchID, msg.sender, Status);
    }

    function salesInfo(
        address BatchID
    ) public
    view
    returns(
        uint Status
    ){
        return uint(sale[BatchID]);
    }

    function getBatchesCountP() public view returns(uint count){
        require(
            UsersDetails[msg.sender].role == roles.pharma,
            "Only Wholesaler or current owner of package can call this function"
        );
        return  MedicineBatchAtPharma[msg.sender].length;
    }

    function getBatchIdByIndexP(uint index) public view returns(address BatchID){
        require(
            UsersDetails[msg.sender].role == roles.pharma,
            "Only Wholesaler or current owner of package can call this function"
        );
        return MedicineBatchAtPharma[msg.sender][index];
    }

}