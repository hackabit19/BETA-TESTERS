pragma solidity >=0.4.25 < 0.6.0;

import './RawMaterial.sol';
contract Medicine{

    address Owner;

    enum medicineStatus {
        atcreator,
        picked4D,
        deliveredatD,
        picked4P,
        deliveredatP
    }

    string description;
    string rawmaterials;
    uint quantity;
    address shipper;
    address manufacturer;
    address distributer;
    address pharma;
    medicineStatus status;

    event ShipmentUpdate(
        address indexed BatchID,
        address indexed Shipper,
        address indexed Reciever,
        uint TransporterType,
        uint Status
    );

    constructor(
        address Manu,
        string memory Des,
        string memory RM,
        uint Quant,
        address Shpr,
        address Rcvr
    ) public {
        Owner = Manu;
        manufacturer = Manu;
        description = Des;
        rawmaterials = RM;
        quantity = Quant;
        shipper = Shpr;
        distributer = Rcvr;
    }

    function getMedicineInfo () public view returns(address, string memory, string memory, uint, address){
        return(
            manufacturer,
            description,
            rawmaterials,
            quantity,
            shipper
        );
    }

    function getWDP() public view returns(address[2] memory WDP) {
        return ([distributer,pharma]);
    }

    function getBatchIDStatus() public view returns(uint) {
        return uint(status);
    }

    function pickPackage(address shpr) public {
        require(
            shpr == shipper,
            "Only Associate Shipper can call this function"
        );
        require(
            status == medicineStatus(0),
            "Package must be at Supplier."
        );

            status = medicineStatus(1);
            emit ShipmentUpdate(address(this),shipper,distributer,1,1);
    }

    //function recievePackage()

    function sendDP(address receiver,address sender) public {
        require(
            distributer == sender,
            "this Distributer is not Associated."
        );
        pharma = receiver;
        status = medicineStatus(3);
    }

    function recieveDP(address reciever) public {
        require(
            pharma == reciever,
            "This Pharma is not Associated"
        );
        status = medicineStatus(4);
    }

}