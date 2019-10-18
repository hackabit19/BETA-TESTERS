pragma solidity >=0.4.25 <0.6.0;

contract Manufacturer{
    string id;

    function setId(string memory _id) public {
        id = _id;
    }

    function getId() public view returns(string memory){
        return id;
    }

    struct Medicine{
        string name;
        string dateOfManufacturing;
        string dateOfExpire;
        string manufacturerName;
        string location;
        uint timestamp;
    }

    
}