pragma solidity >= 0.5.12;

contract Play {
    string public name;
    string public title = "Yeah";
    uint public age;
    mapping(address => uint) public bids;
    uint public noOfContributors;
    uint[] public digits = [1,2];
    string[] public records = ["Chris", "Alan"];
    uint[2] public arr = [2,4];
    mapping(address => uint) balance;
    
    event Transfer(address user, uint amount);
    
    constructor() public {
        name = "Jerry";
        balance[msg.sender] = 10000;
    }
    
    function balanceOf(address _account) public view returns(uint) {
        return balance[_account];
    }
    
    function transfer(uint _amount) public {
        require(balance[msg.sender] > _amount);
        balance[msg.sender] -= _amount;
        emit Transfer(msg.sender, _amount);
    }
    
    function setName(string memory _name) public {
        name = _name;
    }
    
    function contribute() payable public {
        require(msg.value > 0);
        if (bids[msg.sender] == 0) {
            bids[msg.sender] += msg.value;
            noOfContributors++;
        }
    }
    
    function addA(uint num) public {
        digits.push(num);
    }
    
    function popA() public {
        digits.pop();
    }
    
    function addR(string memory rec) public {
        records.push(rec);
    }
    
    function getArr() public view returns(uint) {
        return arr.length;
    }

}