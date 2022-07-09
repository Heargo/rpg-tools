<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
      <h3>Custom</h3>
      <ul class="template_specifics">
        <li>styles file [ global.scss | normalize.scss ]</li>
      </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://www.codegrepper.com/code-examples/javascript/axios+with+vue+3">axios</a></li>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">pinia</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
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

ul.template_specifics{
  display: flex;
  flex-direction: column;
}
</style>
