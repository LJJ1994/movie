<template>
  <section id="cinema">
    <city></city>
    <cinema-area></cinema-area>
    <cinema></cinema>
  </section>
</template>
<script>
import city from '@/components/home/component/city.vue'
import CinemaArea from './component/cinemaArea.vue'
import cinema from './component/cinema.vue'
export default {
  name: 'Cinema',
  data() {
    return {}
  },
  components: {
    city,
    CinemaArea,
    cinema,
  }
}

</script>
<style>
</style>
