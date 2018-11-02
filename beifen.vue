<template>
  <section id="hot">
    <ul>
      <li :class="{'border-bottom': hotLists[hotLists.length-1] != item}" v-for="item in hotLists">
        <figure class="m-img ml pr fl" @click="playMovieVideo(item.preview[0].iphoneUrl, `https://gw.alicdn.com/${item.poster}`)">
          <img v-lazy="`https://gw.alicdn.com/${item.poster}`">
          <div class="play-icon pa">
            <img src="https://gw.alicdn.com/tps/TB1PH2uLXXXXXaLaXXXXXXXXXXX-60-60.png">
          </div>
        </figure>
        <div class="mr border-bottom">
          <div class="m-buy fr">
            <button class="buy-btn f12" v-if="item.openTime < '2016-12-09'">购买</button>
            <button class="forward-buy-btn f12" v-else>预售</button>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
  import { mapMutations } from 'vuex'
export default{
  name: 'hot',
  data () {
    return {

    }
  },
  props: {
    'hotLists': {
      type: Array,
      default: () => []
    }
  },
  methods: {
    ...mapMutations([
      'playVideo'
    ]),
    playMovieVideo (url, cover) {
      this.playVideo({audio: {
        url,
        cover
      }})
    }
  }
}
</script>

<style>
  #hot {
    padding-left: 15px;
    box-sizing: border-box;
    margin-bottom: 10px;
    background: #fff;
  }
  #hot li {
    padding-top: 15px;
    box-sizing: border-box;
  }
  .m-img {
    width: 60px;
    height: 90px;
  }
  .m-img img {
    opacity: 1;
    transition: opacity .7s ease-in;
  }
  .m-img img,
  .play-icon img {
    width: 100%;
    height: 100%;
  }
  .play-icon {
    width: 17px;
    height: 17px;
    left: 50%;
    top: 50%;
    margin-left: -8.5px;
    margin-top: -8.5px;
  }
  .mr {
    margin-right: 76px;
    padding: 0 15px 20px 0;
    box-sizing: border-box;
  }
  .m-buy {
    margin-top: 30px;
  }
  .buy-btn,
  .forward-buy-btn {
    height: 23px;
    width: 40px;
    line-height: 23px;
    text-align: center;
    background-color: #fff;
    outline: none;
    border-radius: 3px;
    font-weight: bold;
  }
  .buy-btn {
    border: 1px solid #ff4d64;
    color: #ff4d64;
  }
  .forward-buy-btn  {
    border: 1px solid #37b7ff;
    color: #37b7ff;
  }
</style>