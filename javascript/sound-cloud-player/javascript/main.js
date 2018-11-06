const playlist = document.querySelector('#listDiv');
playlist.innerHTML = localStorage.getItem('playlist');

/* 1. 검색 */
const searchInput = document.querySelector("#js-search");
const submitButton = document.querySelector("#js-submit");

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

submitButton.addEventListener("click", e => {
  if (searchInput.value !== null && searchInput.value !== "") {
    SoundCloudAPI.getTrack(searchInput.value);
  }
});

/* 2. SoundCloud API  사용하기 : Object 안에 key, value 형태로 구축한다.*/
const SoundCloudAPI = {
  init: () => {
    SC.initialize({
      client_id: "cd9be64eeb32d1741c17cb39e41d254d"
    });
  },

  getTrack: _track => {
    SC.get("/tracks", {
      q: _track
    }).then(function(_tracks) { // promise 기능
      SoundCloudAPI.renderTracks(_tracks);
    });
  },

  addToList: _trackURL => {
    SC.oEmbed(_trackURL, {
      auto_play: true
    }).then(function(embed) {
      const listDiv = document.querySelector("#listDiv");
      const playbox = document.createElement('div');
      playbox.innerHTML = embed.html;
      listDiv.insertBefore(playbox, listDiv.firstChild);

      // Local storage
      localStorage.setItem('playlist', listDiv.innerHTML);
      console.log(localStorage);
    });
  }
};

/* 3. 카드 보여주기 */
SoundCloudAPI.renderTracks = tracks => {
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
        track.artwork_url || "https://fakeimg.pl/290x290/5D5D5D/?text=No_Image";

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
};

/* 4. Playlist 에 추가하고 실제로 재생하기 */
SoundCloudAPI.init();

/* 5. Reset 구현하기 */
const resetButton = document.querySelector("#reset_btn");
resetButton.addEventListener("click", () => {
  const listDiv = document.querySelector("#listDiv");
  listDiv.innerHTML = null;

  const searchResults = document.querySelector("#js-search-results");
  searchResults.innerHTML = null;

  localStorage.removeItem('playlist');
});
