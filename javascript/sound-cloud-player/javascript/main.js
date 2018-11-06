/* 1. 검색 */

/* 2. SoundCloud API  사용하기 : Object 안에 key, value 형태로 구축한다.*/
const SoundCloudAPI = {
  init: () => {
    SC.initialize({
      client_id: "cd9be64eeb32d1741c17cb39e41d254d"
    });
  },

  getTrack: (_track) => {
    SC.get("/tracks", {
      q: _track
    }).then(function(_tracks) {
      console.log(_tracks);
    });
  },
};

SoundCloudAPI.init();
SoundCloudAPI.getTrack('coffee');

/* 3. 카드 보여주기 */

/* 4. Playlist 에 추가하고 실제로 재생하기 */
