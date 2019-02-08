// 1. API를 활용하여 data를 받는다. 그리고 가공한다.
const API_KEY2 = "841D6ajyMBrRob1F0IPNa74yjxOOSodb";
const keywords = ["cat", "dog", "bird", "horse"];

const print_gif2 = keyword => {
  const URL = `https://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${API_KEY}`;

  // Ajax request
  const GiphyAJAXCall = new XMLHttpRequest(); // 첫 글자만 대문자인 경우는 class를 생성하는 경우
  GiphyAJAXCall.open("GET", URL);
  GiphyAJAXCall.send();

  // 요청에 따른 응답이 load가 되었을 때 실행하겠다.
  GiphyAJAXCall.addEventListener("load", e => {
    const rawData = e.target.response;
    const parsedData = JSON.parse(rawData);
    push_to_dom2(parsedData);
  });
}

// 2. GIF 파일들을 div에 밀어넣는다.
const push_to_dom2 = parsed_data => {
  const tv = document.querySelector("#tv");
  tv.innerHTML = "";
  const DataSet = parsed_data.data;
  const rand_num = Math.floor(Math.random() * DataSet.length);
  const imageData = DataSet[rand_num];
  let imageUrl = imageData.images.fixed_height.url;
  let alt = imageData.title;
  tv.innerHTML = `<img class="img-center" src="${imageUrl}" alt="${alt}">`;
};

let i = 0, howManyTimes = keywords.length;
function f() {
  if(i >= howManyTimes){
    i = 0;
  }
  print_gif2(keywords[i]);
    i++;
    if( i <= howManyTimes ){
        setTimeout( f, 3000 );
    }
}
f();