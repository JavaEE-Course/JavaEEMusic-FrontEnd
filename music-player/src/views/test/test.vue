<template>
  <div>
    <el-button @click="test">嗯嗯</el-button>
  </div>
</template>

<script>
import {testAPI} from '../../api/test'
import AudioTest from '../../components/AudioChen'
import AudioBar from '../../components/AudioBar'

export default {
  name: 'Test',
  components: {AudioBar, AudioTest},
  methods: {
    test () {
      const parm = {
        'id': '1'
      }
      testAPI(parm).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
.audio{
  top:50%;
}
</style>
