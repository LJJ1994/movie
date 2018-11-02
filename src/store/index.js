import Vue from 'vue'
import Vuex from 'vuex'

import comingMutations from './coming/mutations'
import loadingMutations from './loading/mutations'
import cityMutations from './city/mutations'
import cityActions from './city/actions'
import videoMutations from './video/mutations'
Vue.use(Vuex);

const coming = {
	stata: {
		lists: []
	},
	mutations: comingMutations
}

const loading = {
	state: {
		stack: []
	},
	mutations: loadingMutations
}

const cityGetters = {
	hotLists: state => state.data,
	cityNames: state => state.name
}

const city = {
	state: {
		name: '北京',
		show: false,
		rN: 'bj',
		data: []
	},
	mutations: cityMutations,
	actions: cityActions,
	getters: cityGetters
}

const videoGetters = {
	showMask: state => state.platStatus
}

const video = {
	state: {
		url: '',
		cover: '',
		platStatus: false
	},
	mutations: videoMutations,
	getters: videoGetters
}
export default new Vuex.Store({
	modules: {
		coming,
		loading,
		city,
		video
	}
})