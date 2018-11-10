const http = require('http');
const url = 'http://www.csszengarden.com/'

http.get(url, response => {
  let chunkCount = 0;
  response.on('data', chunk => {
    chunkCount++;
    console.log('====================')
    console.log(chunk.toString('utf8'))
  })

  response.on('end', () => {
    console.log(`res가 ${chunkCount}로 나눠졌어요.`)
  })
})