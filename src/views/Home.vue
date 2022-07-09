<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Template par Heargo"/>
  </div>
</template>

<script>
import {randomName} from "@/generators/generators.name.js";
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
//import names.json from assets/json
import names from '@/assets/json/names.json'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  mounted() {
    var words = randomName(names.girls.japan,20,false);
    console.log(words)



  },
}
</script>
<style lang="scss">
</style>
