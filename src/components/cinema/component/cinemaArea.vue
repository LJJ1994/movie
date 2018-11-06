<template>
  <section :class="{mask: showArea}" @click="cancelArea" v-show="area">
    <header class="cm-header pf">
      <div class="mint-1px-r" @click="showCityList">
        <span>{{ cityName }}</span>
        <span class="city-arrow-icon vm"></span>
      </div>
      <div @click="showAreaAction">
        <span>{{ area }}</span>
        <span class="city-arrow-icon vm"></span>
      </div>
    </header>
    <ul class="area-item" v-show="showArea" @click="selectAreaAction">
      <li>所有区域 ({{allArea.length}})</li>
      <li v-for="item in regionOrder">
        {{item}} ({{regionCinemas[item].length}})
      </li>
    </ul>
  </section>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import axios from 'axios'
export default {
  name: 'CinemaArea',
  data() {
    return {
      area: '所有区域',
      showArea: false,
      allArea: [],
      regionOrder: [],
      regionCinemas: {}
    }
  },
  computed: {
    ...mapGetters([
      'cityName'
    ])
  },
  methods: {
    ...mapMutations([
      'pushLoadStack',
      'completeLoad',
      'showCityList',
      'updateAreaData'
    ]),
    showAreaAction() {
      this.showArea = true
      document.documentElement.style.overflow = 'hidden'
    },
    cancelArea(event) {
      if (event.target.className === 'mask') {
        this.showArea = false;
        document.documentElement.style.overflow = 'scroll'
      }
    },
    requestData(url, fn) {
      this.pushLoadStack()
      axios.get(url).then(fn).then(this.completeLoad())
    },
    getAreaData(cityName) {
      this.allArea = []
      this.requestData('/api/bj_cinema.json', (req) => {
        let data = req.data
        let regionOrder = data.data.returnValue.regionOrder
        let regionCinemas = data.data.returnValue.regionCinemas
        this.regionOrder = regionOrder
        this.regionCinemas = regionCinemas
        regionOrder.forEach((item) => {
          regionCinemas[item].forEach((cinema) => {
            this.allArea.push(cinema)
          })
        })
      })
    },
    selectAreaAction(event) {
      let str = event.target.innerHTML.trim()
      let reg = /([\u4e00-\u9fa5]*)/
      this.area = reg.exec(str)[1]
      this.showArea = false
      document.documentElement.style.overflow = 'scroll'
    }
  },
  watch: {
    area() {
      if (this.area === '所有区域') {
        this.updateAreaData({ area: this.allArea })
      } else {
        this.updateAreaData({ area: this.regionCinemas[this.area] })
      }
    },
    cityName() {
      this.getAreaData(this.cityName)
      this.area = '所有区域'
      setTimeout(() => {
        this.updateAreaData({ area: this.allArea })
      }, 0)
    }
  },
  created() {
    this.getAreaData(this.$store.state.city.name)
    setTimeout(() => {
      this.updateAreaData({ area: this.allArea })
    }, 0)
  }
}

</script>
<style>
.cm-header {
  width: 100%;
  height: 40px;
  top: 0;
  left: 0;
  right: 0;
  padding: 8 0;
  line-height: 40px;
  font-size: 14px;
  background: #fafafa;
  display: -webkit-box;
  box-sizing: border-box;
  color: #333;
}

.cm-header>div {
  -webkit-box-flex: 1.0;
  box-sizing: border-box;
  text-align: center;
}

.area-item {
  background-color: #fff;
  font-size: 14px;
  color: #222;
  box-sizing: border-box;
  max-height: 70%;
  padding-left: 15px;
  margin-top: 40px;
  overflow-y: scroll;
}

.area-item li {
  padding: 14px 0;
  border-bottom: 1px solid #ebebeb;
}

</style>
