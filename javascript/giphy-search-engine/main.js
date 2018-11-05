// 1. <input> 태그안의 값을 잡는다.
const button = document.querySelector('#search_btn');
const search_input = document.querySelector('#search_input');

// button click 시 발생하는 이벤트
button.addEventListener('click', () => {
  const inputValue = document.querySelector('#search_input').value;
  push_to_dom(inputValue);
});

// input내에서 enter버튼이 입력됐을 때 발생하는 이벤트
search_input.addEventListener('keyup', (e) => {
  const key = e.which;
  if(key === 13){
    const inputValue = document.querySelector('#search_input').value;
    push_to_dom(inputValue);
  }
});

// 2. API를 활용하여 data를 받는다. 그리고 가공한다.
// 3. GIF 파일들을 div에 밀어넣는다.
const push_to_dom = (data) => {
  const result_area = document.querySelector('#result_area');
  result_area.innerHTML = data;
}