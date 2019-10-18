pragma solidity >=0.4.25 <0.6.0;

import './Medicine.sol';

contract Distributer{

    address Owner;

    enum packageStatus { atcreator, picked, delivered}

    address batchid;
    address sender;
    address shipper;
    address receiver;
    packageStatus status;

    constructor(
        address BatchID,
        address Sender,
        address Shipper,
        address Receiver
    ) public {
        Owner = Sender;
        batchid = BatchID;
        sender = Sender;
        shipper = Shipper;
        receiver = Receiver;
        status = packageStatus(0);
    }

    function pickDP(address BatchID,address Shipper) public {
        require(
            Shipper == shipper,
            "Only Associated shipper can call this function."
        );
        status = packageStatus(1);

        Medicine(BatchID).sendDP(
            receiver,
            sender
        );
    }

    function recieveDP(address BatchID,address Receiver) public {
        require(
            Receiver == receiver,
            "Only Associated receiver can call this function."
        );
        status = packageStatus(2);

        Medicine(BatchID).recievedDP(
            Receiver
        );
    }

    function getBatchIDStatus() public view returns(uint) {
        return uint(status);
    }
}