<template>
	<section ref="city" id="select-city" class="pf fadeInDown" v-if="$store.state.city.show">
		<header class="city-header mint-1px-b pr">
			<span class="fb">选择城市</span>
			<span class="city-close pa" @click="cancelCityList">X</span>
		</header>
		<div ref="city" @click="selectCity">
			<mt-index-list>
				<mt-index-section :index="city.sort" v-for="city in cityList" :key="city.id">
					<mt-cell :title="name.regionName" v-for="name in city.data" :key="name.id"></mt-cell>
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
		},
		changeCityData (data) {
			this.pushLoadStack()
			this.$refs.city.className = 'fadeOutTop'
			this.$store.dispatch('updateCityAsync', data).then(this.completeLoad())
		},
		matchCityRn (str) {
			let randomList = ['bj', 'sh', 'gz']
			let randomCity = randomList[Math.floor(Math.random()*3)]
			switch (str) {
				case '北京': return 'bj'
				case '上海': return 'sh'
				case '广州': return 'gz'
				default: return randomCity
			}
		},
		selectCity (event) {
			let el = event.target
			let className = el.className
			let name = ''
			if (className === 'mint-indexsection-index' || className === 'mint-indexlist-nav' || className === 'mint-indexlist-navitem') {
				name = ''
			} else if (className === 'mint-cell-wrapper') {
				name = el.children[0].children[0].innerHTML
			} else if (className === 'mint-cell-title') {
				name = el.children[0].innerHTML
			} else {
				name = el.innerHTML
			};
			if (name) {
				this.changeCityData({
					city: {
						name: name,
						rN: this.matchCityRn(name)
					}
				})
			} else {
				return false
			}
		},
		cancelCityList () {//有点不明白这里
			this.changeCityData({city: {}})
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
		z-index: 100
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
	font-size: 15px;
	background-color: #fff;
}
.city-close {
	font-size: 20px;
  color: #666;
  display: inline-block;
  height: 34px;
  width: 30px;
  line-height: 42px;
  text-align: center;
  right: 10px;
}
@-webkit-keyframes fadeInDown {
	0% {
		opacity: .5;
		transform: translateY(-100px);
		-webkit-transform: translateY(-100px);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
		-webkit-transform: translateY(0);
	}
}
@keyframes fadeInDown {
	0% {
		opacity: .5;
		transform: translateX(100px);
		-ms-transform: translateX(100px);
		-webkit-transform: translateX(100px);
	}
	100% {
		opacity: 1;
		transform: translateX(0);
		-ms-transform: translateX(0);
		-webkit-transform: translateX(0);
	}
}
.fadeInDown {
	animation: fadeInDown .5s;
	-webkit-animation: fadeInDown .5s;
}
@-webkit-keyframes fadeOutTop {

}
@keyframes fadeOutTop {
	0% {
		opacity: 1;
		transform: translateX(0);
		-webkit-transform: translateX(0);
		-ms-transform: translateX(0);
	}
	100% {
		opacity: 0;
		transform: translateX(-100px);
		-webkit-transform: translateX(-100px);
		-ms-transform: translateX(-100px);
	}
}
@-webkit-keyframes fadeOutTop {
	0% {
		opacity: 1;
		transform: translateY(0);
		-webkit-transform: translateY(0);
	}
	100% {
		opacity: 0;
		transform: translateY(-100px);
		-webkit-transform: translateY(-100px);
	}
}
.fadeOutTop {
	animation: fadeOutTop .5s;
	-webkit-animation: fadeOutTop .5s;
}
</style>
