<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Template par Heargo"/>
  </div>
</template>

<script>
import { profile } from "@/generators/generators.profile.js";
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
    console.log(profile());
    



    
    







  },
}
</script>
<style lang="scss">
</style>
