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
        <div class="full-start pr cm-start">
          <div class="score-start" :style="{width: `${selFilm.remark*10}%`}"></div>
          <span class="score pa">{{ selFilm.remark }}</span>
        </div>
      </div>
      <div></div>
    </section>
  </section>
</template>
<script>
import film from './component/film'
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
      value_rate: 0
    }
  },
  components: {
    film
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

.film-info {
  background-color: #4685a4;
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

</style>
