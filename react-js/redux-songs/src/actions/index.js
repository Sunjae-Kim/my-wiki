/* 
  Action Creator: function
  Action: object 
*/

/* 
  Action creator 가 Action 을 반환하는 모습 
  export <function> ( named export )
  - 다른 곳에서 import { function } from '/directory'; 
    형식의 호출이 가능하다.
*/
export const selectSong = song => {
  return {
    type: 'SONG_SELECTED',
    payload: song,
  }; 
}