<template>
  <section style="height: 100%">
    <city></city>
    <header class="home-header border-bottom">
      <div class="city fl" @click="showCityList">
        <span class="city-name vm f14">{{ $store.state.city.name}}</span>
        <span class="city-arrow-icon vm"></span>
      </div>
      <div class="sel-lists f14 fl pr" @click="moveTab">
        <div :class="{selnav: selnav}" hot="sel">正在热映</div>
        <div :class="{selnav: !selnav}">即将上映</div>
        <span class="move pa" :style="{left: moveDistance}"></span>
      </div>
    </header>
    <section v-show="selnav" class="content">
      <swiper :imgs="homeImgs"></swiper>
      <hot :hotLists="hotLists"></hot>
    </section>
    <section v-show="!selnav" class="content">
      <coming :comingLists="comingLists"></coming>
      <div class="click-more" @click="clickLoadMore">
        <span v-show="clickLoadStatus === 'start'">点击查看更多</span>
        <div v-show="clickLoadStatus === 'loading'" class="loading-icon">
          <span>加载中</span>
          <mt-spinner style="display: inline-block" type="fading-circle" color="rgb(100, 100, 100)" :size="19"></mt-spinner>
        </div>
        <span v-show="clickLoadStatus === 'completed'">已经全部显示</span>
      </div>
    </section>
    <play-video></play-video>
  </section>
</template>
<script>
import city from './component/city'
import coming from './component/coming'
import hot from './component/hot'
import swiper from './component/swiper'
import PlayVideo from '@/components/PlayVideo'

import { mapMutations, mapGetters } from 'vuex'
import axios from 'axios'

export default {
  name: 'Home',
  data() {
    return {
      selnav: true,
      moveDistance: '6%',
      homeImgs: [],
      comingLists: [],
      loadingLists: [],
      clickLoadStatus: 'start',
      offset: 0,
      limit: 10,
      total: 0
    }
  },
  components: {
    city,
    coming,
    hot,
    swiper,
    PlayVideo
  },
  computed: {
    ...mapGetters([
      'hotLists'
    ])
  },
  methods: {
    ...mapMutations([
      'pushLoadStack',
      'completeLoad',
      'showCityList',
      'pushComingList'
    ]),
    moveTab(event) {
      event.target.getAttribute('hot') ? this.selectHotTab() : this.selectComingTab()
    },
    selectHotTab() {
      this.selnav = true
      this.moveDistance = '6%'
      this.pushComingList({ lists: [] })
    },
    selectComingTab() {
      this.selnav = false
      this.moveDistance = "56%"
      this.pushComingList({ lists: this.loadingLists })
    },
    requestData(url, fn) {
      this.pushLoadStack();
      axios.get(url).then(fn).then(this.completeLoad);
    },
    getWeekDay(num) {
      let weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      return weeks[num]
    },
    clickLoadMore() {
      if (this.clickLoadStatus != 'completed') {
        this.clickLoadStatus = 'loading'
        setTimeout(() => {
          axios.get(`/api/coming.json/?limit=${this.limit}&offset=${this.offset}`).then((req) => {
            let data = req.data
            let lists = data.data.returnValue
            this.loadingLists = this.loadingLists.concat(lists)
            //模拟索引数据id
            this.loadingLists.forEach((item, index) => {
              item.mId = index
            })
            this.pushComingList({ lists: this.loadingLists })
            this.comingLists = this.sortComingLists(this.loadingLists)
            this.offset = this.offset + this.limit
            if (this.offset < this.total) {
              this.clickLoadStatus = 'start'
            } else {
              this.clickLoadStatus = 'completed'
            }
          })
        }, 1000)
      }
    },
    sortComingLists(lists) {
      let comingLists = []
      lists.forEach((item) => {
        let hasItem = false
        for (let i = 0; i < comingLists.length; i++) {
          if (item.openTime === comingLists[i].openTime) {
            comingLists[i].movies.push(item)
            hasItem = true
            break
          }
        }
        if (!hasItem) {
          let comingItem = {
            openTime: '',
            day: '',
            movies: []
          }
          comingItem.openTime = item.openTime
          comingItem.day = this.getWeekDay(new Date(item.openTime).getDay())
          comingItem.movies.push(item)
          comingLists.push(comingItem)
        }
      })
      return comingLists
    }
  },

  mounted() {
    this.pushComingList({ lists: [] })
    this.requestData('/api/swiper.json', (response) => {
      let data = response.data.data
      this.homeImgs = data.returnValue
    })

    this.requestData(`/api/coming.json/?limit=${this.limit}&offset=${this.offset}`, (response) => {
      let data = response.data
      let lists = data.data.returnValue
      //模拟索引数据的id
      lists.forEach((item, index) => {
        item.mId = index
      })

      this.loadingLists = lists
      this.total = data.total
      this.comingLists = this.sortComingLists(lists)
      this.offset = this.offset + this.limit
    })
  }
}

</script>
<style>
.home-header {
  height: 40px;
  font-size: 14px;
  background-color: #fff;
}

.selnav {
  color: #ff4d64;
}

.city {
  width: 35%;
  height: 100%;
  line-height: 40px;
  text-align: center;
  display: inline-block;
}

.city-arrow-icon {
  margin-left: 4px;
  width: 12px;
  height: 12px;
  display: inline-block;
}

.city-arrow-icon:after {
  content: "";
  display: block;
  width: 6px;
  height: 6px;
  border: 1px solid #50505a;
  border-top: 0 none;
  border-left: 0 none;
  margin-left: 2px;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

.sel-lists {
  width: 65%;
  display: -moz-box;
  display: -webkit-box;
  display: box;
}

.sel-lists div {
  line-height: 40px;
  text-align: center;
  -webkit-box-flex: 1.0;
  -moz-box-flex: 1.0;
}

.move {
  display: inline-block;
  bottom: 2px;
  width: 40%;
  border-bottom: 3px solid #ff4d64;
  -webkit-transition: left 0.7s ease-in-out;
  transition: left .8s ease-in-out;
}

.content {
  margin-bottom: 50px
}

.click-more {
  height: 42px;
  line-height: 42px;
  text-align: center;
  color: #333;
  font-size: 15px;
  background-color: #fff;
  margin: 5px 0 8px;
}

.loading-icon span {
  vertical-align: middle;
}

</style>
