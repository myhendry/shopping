pragma solidity >= 0.5.12;

contract Play {
    string public name;
    uint public age;
    
    constructor() public {
        name = "Jerry";
    }
    
    function setName(string memory _name) public {
        name = _name;
    }

}