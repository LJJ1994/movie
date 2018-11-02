<template>
	<section style="height: 100%">
		<city></city>
		<header class="home-header border-bottom">
			<div class="city fl" @click="showCityList">
				<span class="city-name vm f14">{{ $store.state.city.name}}</span>
				<span class="city-arrow-icon vm"></span>
			</div>
			<div class="sel-lists f14 fl pr">
				<div :class="{selnav: selnav}">正在热映</div>
				<div :class="{selnav: !selnav}">即将上映</div>
				<span class="move pa" :style="{left: moveDistance}"></span>
			</div>
		</header>
		<section v-show="selnav" class="content">
			<swiper :imgs="homeImgs"></swiper>
			<hot :hotLists="hotLists"></hot>
		</section>
		<section>
			<coming></coming>
			<div>
				<span>点击查看更多</span>
				<div>
					<span>加载中</span>

				</div>
				<span>已经全部显示</span>
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

	export default{
		name: 'Home',
		data () {
			return {
				selnav: true,
				moveDistance: '6%',
				homeImgs: []
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
				'showCityList'
			]),
			requestData (url, fn) {
				this.pushLoadStack();
				axios.get(url).then(fn).then(this.completeLoad);
			}
		},
		mounted () {
			this.requestData('/api/swiper.json', (response) => {
				let data = response.data.data
				this.homeImgs = data.returnValue
			})
		}
	}
</script>

<style>
	.home-header{
		height: 40px;
		font-size: 14px;
		background-color: #fff;
	}
	.selnav{
		color: #ff4d64;
	}
	.city{
		width: 35%;
		height: 100%;
		line-height: 40px;
		text-align: center;
		display: inline-block;
	}
	.city-arrow-icon{
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
	.sel-lists{
		width: 65%;
		display: -moz-box;
		display: -webkit-box;
		display: box;
	}
	.sel-lists div{
		line-height: 40px;
		text-align: center;
		-webkit-box-flex: 1.0;
		-moz-box-flex: 1.0;
	}
	.move{
		display: inline-block;
	  bottom: 2px;
	  width: 40%;
	  border-bottom: 3px solid #ff4d64;
	  -webkit-transition: left 0.7s ease-in-out;
	  transition: left 0.7s ease-in-out;
	}

</style>
