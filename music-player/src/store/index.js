import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 基本信息
    musicPhoto: '',
    playProcess: 0,
    musicCurrentTime: '0:00',
    musicLastTime: '--:--',
    musicTime: '--:--',
    pauseVisible: false,
    playVisible: true,
    musicURL: '',
    musicName: '',
    totalTime: 0,
    currentSongId: 0,
    // 歌单相关
    currentSongNumber: 0,
    musicList: [],
    songPathList: [],
    songCoverList: [],
    songNameList: [],
    chooseSongVisible: false,
    radio: 0,
    // 播放类型
    typePic: require('../assets/musicPlay/order.png'),
    typeNumber: 0,
    // 定时播放相关
    clock: '',
    // 目前的播放时间
    currentTime: 0
  },
  mutations: {
    setMusicPhoto (state, value) {
      state.musicPhoto = value
    },
    setPlayProcess (state, value) {
      state.playProcess = value
    },
    setCurrentTime (state, value) {
      state.currentTime = value
    },
    setMusicCurrentTime (state, value) {
      state.musicCurrentTime = value
    },
    setMusicLastTime (state, value) {
      state.musicLastTime = value
    },
    setMusicTime (state, value) {
      state.musicTime = value
    },
    setPauseVisible (state, value) {
      state.pauseVisible = value
    },
    setPlayVisible (state, value) {
      state.playProcess = value
    },
    setMusicURL (state, value) {
      state.musicURL = value
    },
    setMusicName (state, value) {
      state.musicName = value
    },
    setTotalTime (state, value) {
      state.totalTime = value
    },
    setCurrentSongId (state, value) {
      state.currentSongId = value
    },
    // 歌单相关
    setCurrentSongNumber (state, value) {
      state.currentSongNumber = value
    },
    setMusicList (state, value) {
      state.musicList = value
    },
    setSongPathList (state, value) {
      state.songPathList = value
    },
    setSongCoverList (state, value) {
      state.songCoverList = value
    },
    setSongNameList (state, value) {
      state.songNameList = value
    },
    setChooseSongVisible (state, value) {
      state.chooseSongVisible = value
    },
    setRadio (state, value) {
      state.radio = value
    },
    // 播放类型
    setTypePic (state, value) {
      state.typePic = value
    },
    setTypeNumber (state, value) {
      state.typeNumber = value
    },
    // 定播放相关
    setClock (state, value) {
      state.clock = value
    }
  },
  getters: {
    getMusicPhoto: state => state.musicPhoto,
    getPlayProcess: state => state.playProcess,
    getMusicCurrentTime: state => state.musicCurrentTime,
    getCurrentTime: state => state.currentTime,
    getMusicLastTime: state => state.musicLastTime,
    getMusicTime: state => state.musicTime,
    getPauseVisible: state => state.pauseVisible,
    getPlayVisible: state => state.playProcess,
    getMusicURL: state => state.musicURL,
    getMusicName: state => state.musicName,
    getTotalTime: state => state.totalTime,
    getCurrentSongId: state => state.currentSongId,
    // 歌单相关
    getCurrentSongNumber: state => state.currentSongNumber,
    getMusicList: state => state.musicList,
    getSongPathList: state => state.songPathList,
    getSongCoverList: state => state.songCoverList,
    getSongNameList: state => state.songNameList,
    getChooseSongVisible: state => state.chooseSongVisible,
    getRadio: state => state.radio,
    // 播放类型
    getTypePic: state => state.typePic,
    getTypeNumber: state => state.typeNumber,
    // 定播放相关
    getClock: state => state.clock
  }
})
export default store
