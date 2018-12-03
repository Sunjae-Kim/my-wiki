/* Note.sol 파일에 들어간 내용을 가져오기 위함 */
const fs = require('fs');
const path = require('path');

const solc = require('solc');

/* path 와 fs 를 통해 Note.sol 의 내용을 가져온다. */
const filePath = path.resolve(__dirname, 'Note.sol')
const note = fs.readFileSync(filePath, { encoding: 'utf8' });

/* 
  Solidity file 을 complie 한다. 
  Remix 의 contract details에서 확인할 수 있는 내용들이 출력된다.
*/
const source = solc.compile(note, 1);

/* Complier 한 source에서 필요한 data 추출 후 export */
module.exports = source.contracts[':NoteManager'];