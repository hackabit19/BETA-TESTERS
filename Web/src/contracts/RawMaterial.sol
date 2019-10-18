pragma solidity >=0.4.25 <0.6.0;

contract RawMaterial{

    address Owner;

    enum packageStatus { atcreator, picked, delivered}
    event ShippmentUpdate(
        address indexed BatchID,
        address indexed Shipper,
        address indexed Manufacturer,
        uint TransporterType,
        uint Status
    );
    address productid;
    bytes32 description;
    bytes32 farmer_name;
    bytes32 location;
    uint quantity;
    address shipper;
    address manufacturer;
    address supplier;
    packageStatus status;
    bytes32 packageReceiverDescription;

    constructor (
        address Splr,
        bytes32 Des,
        bytes32 FN,
        bytes32 Loc,
        uint Quant,
        address Shpr,
        address Rcvr
    ) public {
        Owner = Splr;
        productid = address(this);
        description = Des;
        farmer_name = FN;
        location = Loc;
        quantity = Quant;
        shipper = Shpr;
        manufacturer = Rcvr;
        supplier = Splr;
        status = packageStatus(0);
    }

    function getSuppliedRawMatrials () public view returns(
        bytes32 Des,
        bytes32 FN,
        bytes32 Loc,
        uint Quant,
        address Shpr,
        address Rcvr,
        address Splr
    ) {
        return(
            description,
            farmer_name,
            location,
            quantity,
            shipper,
            manufacturer,
            supplier
        );
    }

    function getRawMatrialsStatus() public view returns(uint) {
        return uint(status);
    }

    function pickPackage(address shpr) public {
        require(
            shpr == shipper,
            "Only Associate Shipper can call this function"
        );
        require(
            status == packageStatus(0),
            "Package must be at Supplier."
        );
        status = packageStatus(1);
        emit ShippmentUpdate(address(this),shipper,manufacturer,1,1);
    }

    function receivedPackage(address manu) public {
        require(
            manu == manufacturer,
            "Only Associate Manufacturer can call this function"
        );

        require(
            status == packageStatus(1),
            "Product not picked up yet"
        );
        status = packageStatus(2);
        emit ShippmentUpdate(address(this),shipper,manufacturer,1,2);
    }
}
