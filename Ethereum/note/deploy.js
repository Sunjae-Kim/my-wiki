const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

// 배포하기 위한 컨트랙 컴파일 결과물을 가져온다.
const { bytecode, interface } = require('./compile');

// 나의 계정에서 Infura를 통해서 deploy를 할 것이다.
const provider = new HDWalletProvider(
  'casino pink someone second mansion flight fortune bomb cherry bicycle mixed become', 
  'https://ropsten.infura.io/v3/875698661ce64ebab6a4ede298db7be2'
);

// Ethereum 서버와 연동하자.
const web3 = new Web3(provider);

const deploy = async () =>{
  const [ account ] = await web3.eth.getAccounts();
  console.log(account);

   const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: '0x' + bytecode, arguments: ['Happy Hacking'] })
    .send({ from: account, gas: '1000000', gasPrice: web3.utils.toWei('2', 'gwei')});
    console.log(result.options.address);
  }

deploy();