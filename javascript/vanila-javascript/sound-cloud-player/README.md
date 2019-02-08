# Sound Cloud Player
- [Sound Cloud Player](#sound-cloud-player)
  - [1. API활용](#1-api%ED%99%9C%EC%9A%A9)
    - [1.1 SDK (Software Development Kit) Setting](#11-sdk-software-development-kit-setting)
    - [1.2 Initializing](#12-initializing)
    - [1.3 Searching](#13-searching)
    - [1.4 Rendering](#14-rendering)
    - [1.5 Adding To Playlist](#15-adding-to-playlist)
    - [1.6 Saving and Loading the Playlist](#16-saving-and-loading-the-playlist)
    - [1.7 Reset](#17-reset)
  - [2. Core method](#2-core-method)
    - [2.1 Refactoring](#21-refactoring)
    - [2.2 Promise](#22-promise)
    - [2.3 Handling HTML Tag](#23-handling-html-tag)
    - [2.4 ETC.](#24-etc)

## 1. API활용

### 1.1 SDK (Software Development Kit) Setting

최초 Sound Cloud API를 이용하기 위해 HTML에 script파일을 추가한다.

``` html
<body>
    ...

    <!-- Body의 끝 부분에 Sound Cloud SDK를 추가한다. -->
    <script src="https://connect.soundcloud.com/sdk/sdk-3.3.0.js"></script>
</body>
```

<br>

### 1.2 Initializing

가이드에 따라 SC객체를 통해 API_KEY를 넣어 API를 초기화 시켜준다.

```js
/* main.js */
init: () => {
    SC.initialize({
        client_id: "Your-API-Key"
    });
},
```

> `SoundCloudAPI.init()` 				

<br>

### 1.3 Searching

API의 검색기능

```js
  getTrack: keyword => { // keyword를 통해 검색한다.
    SC.get("/tracks", {
      q: keyword
    }).then(function(_tracks) { // 비동기의 promise 기능
      console.log(_tracks); // keyword를 통해 찾은 sound cloud검색 결과
    });
  },
```

> `SoundCloudAPI.getTrack('keyword')` 

<br>

### 1.4 Rendering

1.3에서 검색한 결과를 parameter로 받은 뒤 음악들을 출력해준다.

```js
renderTracks: tracks => {
    
    // 검색결과를 출력해주는 div를 선택해서 가져옴
    const searchResults = document.querySelector("#js-search-results");
    
    // 매 검색 시 초기화 시켜줌 
    searchResults.innerHTML = null;
    
    // 검색 결과들을 한 곡씩 card안에 담아서 div안에 담아주는 작업
    tracks.forEach(track => {
      if (track !== null) {
          
        // Card
        const card = document.createElement("div");
        card.classList.add("card");

        // Image
        const imageDiv = document.createElement("div");
        imageDiv.classList.add("image");
        const imageImg = document.createElement("img");
        imageImg.classList.add("image_img");
        imageImg.src =
          track.artwork_url ||
          "https://fakeimg.pl/290x290/5D5D5D/?text=No_Image"; // 사진이 없을 때
        imageDiv.appendChild(imageImg);

        // Content
        const content = document.createElement("div");
        content.classList.add("content");
        const header = document.createElement("header");
        header.classList.add("header");
        const link = document.createElement("a");
        link.href = track.permalink_url;
        link.target = "_blank"; // Open in new tab
        link.innerHTML = track.title;
        content.appendChild(header);
        header.appendChild(link);

        // Button
        const buttonDiv = document.createElement("div");
        buttonDiv.classList.add(
          "ui",
          "bottom",
          "attached",
          "button",
          "js-button"
        );
        const icon = document.createElement("i");
        icon.classList.add("add", "icon");
        const buttonText = document.createElement("span");
        buttonText.innerHTML = "Add to playlist";
        buttonDiv.appendChild(icon);
        buttonDiv.appendChild(buttonText);
        buttonDiv.addEventListener("click", () => {
          SoundCloudAPI.addToList(track.permalink_url);
        });

        // AppendChild
        card.appendChild(imageDiv);
        card.appendChild(content);
        card.appendChild(buttonDiv);
        searchResults.appendChild(card);
      }
    });
  }
```

> `SoundCloudAPI.renderTracks(_tracks);`

<br>

### 1.5 Adding To Playlist

1.4에서 'Add to playlist' 버튼을 통해 플레이 리스트에 추가한다.

```js
addToList: _trackURL => {
    SC.oEmbed(_trackURL, {
      auto_play: true
    }).then(function(embed) {
      	// playlist를 담을 div를 만든다.
      const playbox = document.createElement("div");
        // 각 track별 담겨있는 iframe html을 넣어준다.
      playbox.innerHTML = embed.html;
        // box를 sidebar의 첫번째로 담는다.
      UI.sideBar.insertBefore(playbox, UI.sideBar.firstChild);
        ...
```

<br>

### 1.6 Saving and Loading the Playlist

1.5에서 만든 playlist를 저장 및 불러온다.

```js
		// Continue from above
		// Local storage
      localStorage.setItem("playlist", UI.sideBar.innerHTML);
      console.log(localStorage);
    });
},
 
setPlaylist: () => {
    UI.sideBar.innerHTML = localStorage.getItem("playlist");
},
  
```

> 브라우저 쿠키에(`localStorage`) Side Bar에 기억된 playlist를 저장한다.
>
> `localStorage` 변수를 통해 저장된 값을 Side Bar에 옮긴다.

<br>

### 1.7 Reset

검색한 모든 결과와 저장된 playlist를 초기화한다.

```js
setResetButton: () => {
      // reset버튼을 생성
    const resetButton = document.querySelector("#reset_btn");
    resetButton.addEventListener("click", () => {
      	// sideBar의 playlist 삭제
      UI.sideBar = document.querySelector("#listDiv");
      UI.sideBar.innerHTML = null;
		// 검색결과 내용 삭제
      const searchResults = document.querySelector("#js-search-results");
      searchResults.innerHTML = null;
		// 쿠키에 저장된 playlist 기록 삭제
      localStorage.removeItem("playlist");
    });
},
```





## 2. Core method

### 2.1 Refactoring

작업의 마지막에 UI별로, API별로 필요한 기능들을 한개의 상수에 묶어서 object로 정리한다.

```js
const UI = {
  sideBar: document.querySelector("#listDiv"),
  setInputArea: () => {
      ...
  },
  ...
};
UI.setInputArea();
      
const SoundCloudAPI = {
	init: () => {},
    ...
}
SoundCloudAPI.init();
```

<br>

### 2.2 Promise

비동기 함수의 최종 종료시점에 동작하는 함수

```js
/* 
  promise
  비동기 함수가 끝나고 then 안의 작업을 수행한다.
*/
('비동기함수').then(fuction(){
  // your script
});
```

<br>

### 2.3 Handling HTML Tag

| Code                                               | Description                             |
| -------------------------------------------------- | --------------------------------------- |
| `const new_tag = document.createElement('tag');`   | html tag를 생성                         |
| `new_tag.classList.add('add', 'icon');`            | 새로운 tag의 class를 지정               |
| `const exist_tag = document.querySelector('#id');` | 기존의 tag를 호출                       |
| `exist_tag.appendChild(new_tag);`                  | 기존 태그안에 new_tag를 append          |
| `exist_tag.insertBefore(new_tag, refChild);`       | 기존 태그의 refChild에 new_tag를 insert |

<br>

### 2.4 ETC.

| Code                      | Description                          |
| ------------------------- | ------------------------------------ |
| `const result = a \|\| b ;` | a가 true면 a를 반환, 아니면 b를 반환 |


