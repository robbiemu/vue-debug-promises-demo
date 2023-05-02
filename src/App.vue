~
<template>
  <div id="app">
    <img alt="Vue logo" src="https://vuejs.org/images/logo.png" />
    <HelloWorld :msg="payload" />
  </div>
</template>

<script>
import { defineProps, ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue';

const payload = ref('loading');
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
delay(3500).then(() => {
  // add your breakpoint in here
  payload.value = 'how to debug promises in vue';
});

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  setup() {
    return {
      payload,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
