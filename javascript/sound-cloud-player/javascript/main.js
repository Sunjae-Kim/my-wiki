/* 1. 검색 */

/* 2. SoundCloud API  사용하기 */

SC.initialize({
  client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
});

// find all sounds of buskers licensed under 'creative commons share alike'
SC.get('/tracks', {
  q: 'buskers', license: 'cc-by-sa'
}).then(function(tracks) {
  console.log(tracks);
});
/* 3. 카드 보여주기 */

/* 4. Playlist 에 추가하고 실제로 재생하기 */