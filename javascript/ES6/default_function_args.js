/* 
  ES5 
  method 파라미터가 없는경우 default를 설정하는 방법
  JAVA와는 달리 parameter가 달라도 똑같은 이름의 함수를 호출
*/
function makeRequest(url, method){
  if(!method){
    method = 'GET';
  }
}
makeRequest('http://hphk.io/')

/* 
  ES6 
  method 파라미터가 없는경우 default를 설정하는 방법
*/
function makeRequest(method='GET', url){
  doSomeThing(method, url);
}

/* 실습 */
function sum(a=0,b=0){
  return a+b;
}

function addOffset(style={}){
  style.offset = '10px';
  return style;
}