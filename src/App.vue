<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>

  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        isRouterAlive: true
      }
    },
    // mounted() {
    //   if (window.history && window.history.pushState) {

    //     this.$router.push({path:'login'});
    //     window.addEventListener('popstate', this.goBack, false);    //false阻止默认事件    this.fun是指返回按建实际要执行的方法
    //   }
    // },
    // destroyed() {
    //   window.removeEventListener('popstate', this.goBack, false);//false阻止默认事件
    //   // sessionStorage.setItem('isSign', '1')
    // },
    methods: {
      // goBack() {
      //   this.$router.push({path:'login'});
      // }
    },
  }
</script>

<style>
  html,
  body,
  #app {
    width: 100%;
    height: 100%;

  }

  body {
    margin: 0;
  }

  a {
    color: #000000;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }


  input::-webkit-input-placeholder {
    color: #c0c4cc;
  }

  input::-moz-input-placeholder {
    color: #c0c4cc;
  }

  input::-ms-input-placeholder {
    color: #c0c4cc;
  }
</style>