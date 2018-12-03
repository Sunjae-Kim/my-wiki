const assert = require('assert');
const Web3 = require('web3');
const ganache = require('ganache-cli');
const { bytecode, interface } = require('./compile');

const web3 = new Web3(ganache.provider());

let accounts;
let result;
/* 
  1. ganache-cli 이더리움 가상 로컬 네트워크에 배포
  2. 배포된 코드와 interact 하면서 코드 테스트
*/
beforeEach( async ()=>{
  accounts = await web3.eth.getAccounts();
  result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: '0x' + bytecode, arguments: ['hphk'] })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Note Contract', () => {

  it('Deploy', () => {
    console.log(result);
  })

});