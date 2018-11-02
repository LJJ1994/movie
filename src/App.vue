<template>
  <div class="app" :style="{height: '100%'}">
    <div class="main" :style="{height: '100%'}">
      <router-view/></router-view>
    </div>
    <footer-nav></footer-nav>
  </div>
</template>

<script>
import FooterNav from '@/components/footerNav'
export default{
  name: 'App',
  data () {
    return {
      showNav: true
    }
  },
  components: {
    FooterNav
  },
  watch: {
    '$route': function() {
      this.routeChange()
    }
  },
  methods: {
    routeChange () {
      var path = this.$route.path
      if(path === '/' || path === '/cinema' || path ==='/me'){
        this.showNav == true
      }else {
        this.showNav == false
      }
    }
  },
  created () {
    this.routeChange()
  },
  mounted () {
    window.setTimeout(() => {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }, 250)
  }
}
</script>

<style>

</style>
