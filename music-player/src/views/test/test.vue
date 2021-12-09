<template>
  <el-button @click="test">嗯嗯</el-button>
</template>

<script>
import {testAPI} from '../../api/test'

export default {
  name: 'Test',
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

</style>
