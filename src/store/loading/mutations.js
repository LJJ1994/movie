import { Indicator } from 'mint-ui'

export default{
	pushLoadStack (state) {
		Indicator.open({
			text: '加载中....嘤嘤嘤',
			spinnerType: 'triple-bounce'
		});
		state.stack.push(1)
	},
	completeLoad (state) {
		let _stack = state.stack
		_stack.pop()
		if(!_stack.length){
			setTimeout(() => {
				Indicator.close()
			}, 400)
		}
	}
}