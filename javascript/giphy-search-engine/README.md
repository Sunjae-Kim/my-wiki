# Giphy Search Engine

### 1. HTML

``` html
<!-- TV 창 -->
<div id="tv" class="container container-padding50">

</div>

<!-- 검색창 -->
<div class="container container-padding50">
    <input type="text" id="search_input" class="container-textinput">
    <button id="search_btn" class="container-button">Search</button>
</div>

<!-- 결과창 -->
<div id="result_area" class="container container-padding50">

</div>
```

<br>

### 2. Javascript

```js
// 1. <input> 태그안의 값을 잡는다.
const button = document.querySelector("#search_btn");
const search_input = document.querySelector("#search_input");

// button click 시 발생하는 이벤트
button.addEventListener("click", () => {
  const inputValue = document.querySelector("#search_input").value;
  print_gif(inputValue);
});

// input내에서 enter버튼이 입력됐을 때 발생하는 이벤트
search_input.addEventListener("keyup", e => {
  const key = e.which;
  if (key === 13) {
    const inputValue = document.querySelector("#search_input").value;
    print_gif(inputValue);
  }
});

// 2. API를 활용하여 data를 받는다. 그리고 가공한다.
const API_KEY = "841D6ajyMBrRob1F0IPNa74yjxOOSodb";
const print_gif = keyword => {
  const URL = `https://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${API_KEY}`;

  // Ajax request
  const GiphyAJAXCall = new XMLHttpRequest(); // 첫 글자만 대문자인 경우는 class를 생성하는 경우
  GiphyAJAXCall.open("GET", URL);
  GiphyAJAXCall.send();

  // 요청에 따른 응답이 load가 되었을 때 실행하겠다.
  GiphyAJAXCall.addEventListener("load", e => {
    const rawData = e.target.response;
    const parsedData = JSON.parse(rawData);
    push_to_dom(parsedData);
  });
};

// 3. GIF 파일들을 div에 밀어넣는다.
const push_to_dom = parsed_data => {
  const result_area = document.querySelector("#result_area");
  result_area.innerHTML = null;
  const DataSet = parsed_data.data;
  DataSet.forEach(imageData => {
    let imageUrl = imageData.images.fixed_height.url;
    let alt = imageData.title;
    result_area.innerHTML += `<img src="${imageUrl}" alt="${alt}">`;
  });
};
```

<br>

### 3. Screen Capture

#### 3.1 Main Page

![Main Page](https://github.com/Sunjae-Kim/TIL/tree/master/javascript/giphy-search-engine/img/main.png)

#### 3.2 Search Page

![Search Page](https://github.com/Sunjae-Kim/TIL/tree/master/javascript/giphy-search-engine/img/search.png)
