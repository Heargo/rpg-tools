<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Template par Heargo"/>
  </div>
</template>

<script>
import { profile } from "@/generators/generators.profile.js";
import HelloWorld from '@/components/HelloWorld.vue';
import {Quest} from '@/generators/generators.quest.js';
import {Item} from '@/generators/generators.item.js';

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  mounted() {
    var pnj = profile();
    // console.log(pnj);
    // console.log(monster());
    console.log(new Quest(pnj));
    console.log(new Item("weapons"));
  },
}
</script>
<style lang="scss">
</style>
