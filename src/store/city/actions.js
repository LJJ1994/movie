import { UPDATECITY } from './type'
import { mapMutations } from 'vuex'
import axios from 'axios'

export default {
	updateCityAsync ({ commit, state }, {city}) {
		if (!city.name) {
			city.name = state.name
			city.rN = state.rN
		}
		return axios.get(`/api/sh_hot.json/?city=${city.rN}`).then((req) => {
			let data = req.data
			let lists = data.data.returnValue
			lists.forEach((item, index) => {
				item.mId = index
			})
			city.data = lists
			commit(UPDATECITY, {city})
		})
	}
}