/* UI */
const UI = {
  /* Input 태그 세팅 */
  setInputArea: () => {
    const searchInput = document.querySelector("#js-search");
    searchInput.addEventListener("keyup", e => {
      if (
        e.which === 13 &&
        searchInput.value !== null &&
        searchInput.value !== ""
      ) {
        console.log(searchInput.value);
        SoundCloudAPI.getTrack(searchInput.value);
      }
    });
  },

  /* 검색버튼 세팅 */
  setSearchButton: () => {
    const submitButton = document.querySelector("#js-submit");
    submitButton.addEventListener("click", e => {
      if (searchInput.value !== null && searchInput.value !== "") {
        SoundCloudAPI.getTrack(searchInput.value);
      }
    });
  },

  /* 리셋버튼 세팅 */
  setResetButton: () => {
    const resetButton = document.querySelector("#reset_btn");
    resetButton.addEventListener("click", () => {
      UI.sideBar = document.querySelector("#listDiv");
      UI.sideBar.innerHTML = null;

      const searchResults = document.querySelector("#js-search-results");
      searchResults.innerHTML = null;

      localStorage.removeItem("playlist");
    });
  },

  /* 좌측 Playlist 세팅 */
  setPlaylist: () => {
    UI.sideBar.innerHTML = localStorage.getItem("playlist");
  },

  /* Sidebar 정의 */
  sideBar: document.querySelector("#listDiv"),
};

UI.setInputArea();
UI.setSearchButton();
UI.setResetButton();
UI.setPlaylist();

/* SoundCloudAPI */
const SoundCloudAPI = {
  /* SoundCloudAPI Setting */
  init: () => {
    SC.initialize({
      client_id: "cd9be64eeb32d1741c17cb39e41d254d"
    });
  },

  /* 검색의 기능 */
  getTrack: _track => {
    SC.get("/tracks", {
      q: _track
    }).then(function(_tracks) {
      // promise 기능
      SoundCloudAPI.renderTracks(_tracks);
    });
  },

  /* Playlist에 추가하는 기능 */
  addToList: _trackURL => {
    SC.oEmbed(_trackURL, {
      auto_play: true
    }).then(function(embed) {
      const playbox = document.createElement("div");
      playbox.innerHTML = embed.html;
      UI.sideBar.insertBefore(playbox, UI.sideBar.firstChild);

      // Local storage
      localStorage.setItem("playlist", UI.sideBar.innerHTML);
      console.log(localStorage);
    });
  },

  /* 검색 결과를 카드로 만들어 출력해주는 기능 */
  renderTracks: tracks => {
    const searchResults = document.querySelector("#js-search-results");
    searchResults.innerHTML = null;
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
          "https://fakeimg.pl/290x290/5D5D5D/?text=No_Image";

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
};

SoundCloudAPI.init();