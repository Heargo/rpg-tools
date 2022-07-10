<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Template par Heargo"/>
  </div>
</template>

<script>
import {description} from "@/generators/generators.description.js";
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
    var words = description("Tom",16,"boy",{wealth:6,intelligence:5,strength:3,creativity:8});
    console.log(words)
    //add a new words
    



    
    







  },
}
</script>
<style lang="scss">
</style>
