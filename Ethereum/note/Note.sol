pragma solidity ^0.4.25;

contract NoteManager{
    
    address public owner;
    
    mapping(string => string) note;
    
    modifier onlyWriters(){
        require(msg.sender == owner);
        _;
    }
    
    constructor(string _input) public{
        note["README"] = _input;
        owner = msg.sender;
    }
    
    function writeNote(string _page, string _input) onlyWriters public {
        note[_page] = _input;
    }
    
    function readNote(string _page) onlyWriters public constant returns(string){
        return note[_page];
    }
    
}