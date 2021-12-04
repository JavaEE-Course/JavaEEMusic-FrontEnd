<template>
  <div class="hello">
    <button @click="test">嗯嗯</button>
  </div>
</template>

<script>
import { testAPI } from '@/api/test'
export default {
  name: 'HelloWorld',
  data () {
    return {
      id: '1'
    }
  },
  methods: {
    test () {
      let parm = {
        'id': '1'
      }
      testAPI(parm).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
