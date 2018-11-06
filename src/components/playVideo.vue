<template>
	<section class="video-mask mask" v-show="showMask" @click="cancelMask">
		<div class="video-box pa">
			<div class="v-cover">
				<video ref="video" :src="$store.state.video.url" :poster="$store.state.video.cover" class="v-content"></video> <!-- 这里绑定poster为背景图片 -->
			</div>
			<!-- <div class="v-icon pa iconfont" @click="videoStart" v-if="showIcon">&#xe6ea;</div> -->
			<div class="v-icon pa iconfont" @click="videoStart" v-if="showIcon">
				<icon name="play_1" scale="10"></icon>
			</div>
		</div>
	</section>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default{
	name: 'PlayVideo',
	data () {
		return {
			showIcon: true
		}
	},
	computed: {
		...mapGetters([
			'showMask'
		])
	},
	methods: {
		...mapMutations([
			'pauseVideo'
		]),
		cancelMask (event) {
			if (event.target.className === 'video-mask mask') {
				this.videoStop()
				this.pauseVideo()
			}
		},
		videoStart () {
			this.showIcon = false
			let video = this.$refs.video
			video.play()
		},
		videoStop () {
			this.showIcon = true
			let video = this.$refs.video
			video.pause()
		}
	}
}
</script>

<style>
	.video-box {
		width: 100%;
		height: 200px;
		top: 20%;
		padding: 0 20px;
		box-sizing: border-box;
	}
	.v-cover {
		height: 100%;
		background-color: #000;
		background-repeat: no-repeat;
		background-size: auto 100%;
		background-position: center; 
	}
	.v-content {
		width: 100%;
		height: 100%;
	}
	.iconfont {
    width: 101px;
    height: 110px;
    left: 48%;
    top: 46%;
    margin-left: -40px;
    margin-top: -45px;
/*		background: url('~@/assets/images/play.png') -2px -2px no-repeat;*/
	}
</style>
