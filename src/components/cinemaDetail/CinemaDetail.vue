<template>
  <section id="cm-detail">
    <header class="cm-d-header">
      <div>
        <p class="tddd f16">{{cinemaData.cinemaName}}</p>
        <p class="tddd f13 c6">{{cinemaData.address}}</p>
      </div>
    </header>
    <section class="film-info">
      <film :lists="filmLists"></film>
      <div class="sel-film">
        <p class="self-name">{{selFilm.showName}}</p>
        <div class="full-star pr cm-start">
          <div class="score-start" :style="{width: `${selFilm.remark*10}%`}"></div>
          <span class="score pa">{{ selFilm.remark }}</span>
        </div>
      </div>
      <div class="sel-date pr">
        <ul @click="selectDataTab">
          <li :data-num="item.num" v-for="item in playDate">
            <span :data-num="item.num">{{item.date}}</span>
            <span :data-num="item.num" class="font-icon">惠</span>
          </li>
        </ul>
        <span class="move pa" :style="{left: `${10+105*seleDataNum}px`}"></span>
      </div>
      <div class="cm-d-welfare">
        <span class="label-mod label-orange">新</span>
        <span class="label-mod">特惠活动每人仅限参加1次，单次限购1张</span>
      </div>
    </section>
    <PlayDate :dataNum="seleDataNum"></PlayDate>
  </section>
</template>
<script>
import film from './component/film'
import PlayDate from './component/PlayDate'
import { mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name: 'CinemaDetail',
  data() {
    return {
      cinemaData: {},
      filmLists: [],
      itemId: 0,
      selFilm: {},
      value_rate: 0,
      seleDataNum: 0,
      playDate: [
        { date: '今天 12-15', num: 0 },
        { date: '明天 12-16', num: 1 },
        { date: '后天 12-17', num: 2 },
        { date: '周五 12-18', num: 3 }
      ]
    }
  },
  components: {
    film,
    PlayDate
  },
  watch: {
    itemId() {
      this.selFilm = this.getDataById(this.filmLists, this.itemId)
    }
  },
  methods: {
    ...mapMutations([
      'pushLoadStack',
      'completeLoad',
      'updateAreaData',
      'showCityList'

    ]),
    requestData(url, fn) {
      this.pushLoadStack()
      this.$http.get(url).then(fn).then(this.completeLoad)
    },
    getDataById(area, id) {
      for (let i = 0; i < area.length; i++) {
        if (area[i].id === id) {
          return area[i]
        }
      }
    },
    selectDataTab(event) {
      let num = +event.target.getAttribute('data-num')
      this.seleDataNum = num
    }
  },
  created() {
    this.requestData('/api/cinema_detail.json', (req) => {
      let data = req.data
      this.filmLists = data.data.returnValue.shows
      this.selFilm = this.filmLists[0]
    })
    this.cinemaData = this.getDataById(this.$store.state.cinema.area, this.$route.params.id)
    if (!this.cinemaData) {
      this.$router.push('/')
    }
  }
}

</script>
<style>
#cm-detail {
  background: #fff;
  height: 100%;
}

.cm-d-header {
  padding: 10px 0 4px 15px;
  box-sizing: border-box;
}

.cm-d-header>div {
  padding: 0 15px 13px 0;
  border-bottom: 1px solid #ebebeb;
}

.cm-d-header p:last-child {
  margin-top: 6px;
  color: #999;
}

.cm-d-welfare {
  padding: 13px 15px 10px;
  background: #fff;
  color: gray;
  font-size: 10px;

}

.film-info {
  background-color: #4685a4;
  border-bottom: 1px solid #ebebeb;
}

.sel-film {
  text-align: center;
  background-color: #fff;
  padding: 5px 0;
  border-bottom: 1px solid #ebebeb;
}

.self-name {
  color: #776751;
}

.sel-film p {
  font-size: 16px;
}

.cm-start {
  display: inline-block;
  margin: 3px 0 0 -29px;
  height: 15px;
  width: 73px;
}

.cm-start .score {
  right: -24px;
  font-size: 13px;
  top: 1px;
}

.sel-date {
  width: 100%;
  overflow: hidden;
  overflow-x: scroll;
  border-bottom: 1px solid #ebebeb;
  background: #fff;
}

.sel-date ul {
  width: 480px;
}

.sel-date li {
  float: left;
  width: 100px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  font-size: 13px;
  color: #555;
  padding-left: 5px;
}

.font-icon {
  color: #fff;
  height: 20px;
  border-radius: 3px;
  background-color: #ff9201;
  margin-left: 5px;
}

.sel-date .move {
  width: 50px;
  transition: left .3s ease-in-out;
  left: 3px
}

</style>
