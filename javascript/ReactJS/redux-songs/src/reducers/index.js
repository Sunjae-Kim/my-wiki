import { combineReducers } from 'redux';

// 가지고 있는 모든 song 모두를 그대로 전달만 하는 reducer
const songsReducer = () => {
  return [
    { title: 'lo-fi', artist: 'under', duration: '2:12' },
    { title: 'hiphop', artist: 'rapper', duration: '3:30' },
    { title: 'beat', artist: 'loptimist', duration: '4:12' },
  ];
};

// 1개의 노래만 전달하는 reducer
const selectedSongReducer = (selectedSong=null, action) => {
  if(action.type === 'SONG_SELECTED') {
    return action.payload
  } else {
    return selectedSong;
  } 
};

export default combineReducers({
  songs: songsReducer,
  selectedSong: selectedSongReducer
});