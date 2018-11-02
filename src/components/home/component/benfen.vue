<template>
	<section id="select-city" class="pf fadeInDown" v-if="$store.state.city.show">
		<header class="city-header mint-1px-b pr">
			<span class="fb">选择城市</span>
			<span class="city-close pa">X</span>
		</header>
		<div>
			<mt-index-list>
				<mt-index-section>
					<mt-cell></mt-cell>
				</mt-index-section>
			</mt-index-list>
		</div>
	</section>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import axios from 'axios'
export default{
	name: 'city',
	data () {
		return {
			cityList: [],
			showCityList: false
		}
	},
	methods: {
		...mapActions([
			'updateCityAsync'
		]),
		...mapMutations([
			'pushLoadStack',
			'completeLoad'
		]),
		requestData (url, fn) {
			this.pushLoadStack()
			axios.get(url).then(fn).then(this.completeLoad())
		}
	},
	created () {
		this.$store.dispatch('updateCityAsync', {city: {}})
		this.requestData('/api/city.json', (req) => {
			let data = req.data
			let cityObj = data.data.returnValue
			let cityArr = Object.keys(cityObj)
			this.cityList.push({
				sort: '热门',
				data: [{
					regionName: '北京',
					id: 1,
					rN: 'bj'
				}]
			})
			cityArr.forEach((item) => {
				this.cityList.push({
					sort: item,
					data: cityObj[item]
				})
			})
		})
	}
}
</script>

<style>
	.mint-indicator-wrapper {
		z-index: 1000
	}
	#select-city {
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 9999999;
		background-color: #fff;
	}
	.city-header {
	height: 46px;
	line-height: 46px;
	text-align: center;
	color: #000;
	font-size: 16px;
	background-color: #fff;
}
.close-city {
	font-size: 28px;
	color: #666;
	display: inline-block;
	height: 46px;
	width: 50px;
	line-height: 38px;
	text-align: center;
	right: 0px;
}
</style>
