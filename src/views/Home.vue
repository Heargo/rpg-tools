<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Template par Heargo"/>
  </div>
</template>

<script>
import { stats } from "../generators/generator.stats";
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
//import names.json from assets/json
// import names from '@/assets/json/names.json'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  mounted() {
    // var h = stats.wealth()
    // console.log("wealth: " + h)
    //foreach stats 
    for (var key in stats) {
      console.log(stats[key].name,stats[key].generate())
    }
    



    
    







  },
}
</script>
<style lang="scss">
</style>
