<template>
  <section :class="{mask: showArea}" @click="cancelArea">
    <header class="cm-header pf">
      <div class="mint-1px-r" @click="showCityList">
        <span class="cm-icon"></span>
        <span>{{ cityName }}</span>
        <span class="city-arrow-icon vm"></span>
      </div>
      <div class="cm-area pr" @click="showAreaAction">
        <span :class="{showColor: showColor}">{{ area }}</span>
        <span class="city-arrow-icon vm" ref="arrow"></span>
      </div>
    </header>
    <ul class="area-item" v-show="showArea" @click="selectAreaAction">
      <li v-for="item in regionOrder">
        <div>
          <span ref="areaColor">
            {{item}}
          </span>
        </div>
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
      showColor: false,
      area: '区域',
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
    setSelectArea(selArea) {
      localStorage.setItem('area', selArea)
    },
    getSelectArea(area) {
      return localStorage.getItem('area')
    },
    showAreaAction() {
      this.showArea = true
      let arrow = this.$refs.arrow
      // this.showColor = !this.showColor
      // arrow.style.transform = !arrow.style.transform
      this.showColor = true
      arrow.style.transform = `rotate(180deg)`
      document.documentElement.style.overflow = 'hidden'
    },
    cancelArea(event) {
      if (event.target.nodeName.toLowerCase() === 'section') {
        this.showArea = false
        this.showColor = false
        this.$refs.arrow.style.transform = `rotate(0deg)`
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
      let arrow = this.$refs.arrow
      let reg = /([\u4e00-\u9fa5]*)/
      this.area = reg.exec(str)[1]
      this.showArea = false
      this.showColor = false
      arrow.style.transform = `rotate(0deg)`
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
  background: #fff;
  display: -webkit-box;
  box-sizing: border-box;
  color: #333;
}

/*header.cm-header>div.mint-1px-r,
header.cm-header>div.mint-1px-r>span,
ul.area-item>li,
ul.area-item>li>div,
ul.area-item>li>div>span {
  pointer-events: none;
}*/

/*header.cm-header>*,
ul.area-item>* {
  pointer-events: none;
}*/

.cm-icon {
  display: inline-block;
  position: absolute;
  top: 8px;
  left: 30px;
  height: 25px;
  width: 21px;
  background-image: url('~@/assets/images/fav.svg');
  background-color: white;
  background-size: 8.7vw;
  background-repeat: no-repeat;
  background-position: 50%;
  background-position-x: -1.9vw;
}

.cm-header>div {
  -webkit-box-flex: 1.0;
  box-sizing: border-box;
  text-align: center;
}

.cm-area::before {
  content: "";
  display: block;
  position: absolute;
  width: 1px;
  height: 1.4375rem;
  top: 0;
  bottom: 0;
  margin: auto;
  background: #e2e2e2;
  -webkit-transform: scaleX(.5);
  -ms-transform: scaleX(.5);
  transform: scaleX(.5);
}

.cm-header::after {
  position: absolute;
  content: "";
  height: 1px;
  background: #ebebeb;
  left: 0;
  right: 0;
  bottom: 0;

}

.showColor {
  color: #ff4d64
}

.area-item {
  background-color: #fff;
  font-size: 14px;
  color: #222;
  overflow: auto;
  max-height: 70%;
  padding-left: 10px;
  margin-top: 40px;
  overflow-scrolling: scroll;
  padding-top: 10px;
  padding-bottom: 11px;
  padding-right: 10px;
}

.area-item li {
  display: inline-block;
  width: 20.3vw;
  list-style: none;
  padding-bottom: 2.1vw;
  padding-left: 2.1vw;
}

.area-item li div {
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-touch-callout: none;
  color: #333;
  padding: 1.33333333vw .8vw;
  position: relative;
}

.area-item li div span {
  font-size: .8125rem;
  display: block;
  text-align: center;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
}

.area-item li div::after {
  box-sizing: border-box;
  width: 200%;
  height: 200%;
  transform: scale(.5);
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  pointer-events: none;
  transform-origin: 0 0;
}

.areaColor {
  color: #ff4d64;
}

.active {
  color: red;
}

</style>
