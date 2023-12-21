// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionCount;

    // event for emit
    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

    // like object
    struct TransferStruct{
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transactions;

    // memory mean this data is stored in the memory
    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public{
        transactionCount += 1;
        // msg will be obtained when call the function in blockchain
        // block.timestamp mean the timestamp when the specific block executed
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }

    // view to promise not to modify the state variable of contract class
    function getAllTransactions() public view returns (TransferStruct[] memory){
        return transactions;
    }

    // uint only allow positive integer
    function getAllTransactionCount() public view returns (uint256){
        return transactionCount;
    }
}