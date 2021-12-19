<template>
  <div>
    <div class="playlist-tabs-wrap">
      <el-tabs>
        <el-tab-pane label="专辑列表">
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getSingerDetailAPI } from '@/api/getsinger'

export default {
  name: 'SingerDetail',
  created () {
    const singerID = {'id': this.$route.query.id}
    getSingerDetailAPI(singerID).then(res => {
      console.log(res)
    })
  }
}
</script>

<style scoped>
.playlist-tabs-wrap {
  margin-top: 20px;
}
</style>
