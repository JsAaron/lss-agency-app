import user from '../../core/user.js';
import $store from '../../store/index.js';

const state = {
	accessToken: '',
	info: null,
	showLoginModal: false,
	tempParentId: 0,
	applyApiUrl: 'https://api.facess.net'
};

const getters = {
	accessToken(state) {
		state.accessToken = data;
	},
	info(state) {
		return state.info;
	},
	showLoginModal(state) {
		return state.showLoginModal;
	},
	tempParentId(state) {
		return state.tempParentId;
	},
	is_vip(state) {
		return state.is_vip_card_user;
	}
};

const mutations = {
	accessToken(state, data) {
		state.accessToken = data;
	},
	info(state, data) {
		if (data.ck == null) {
			data.ck = {
				level_name: "普通用户"
			}
		}
		state.info = data;
	},
	showLoginModal(state, data) {
		state.showLoginModal = data;
	},
	tempParentId(state, data) {
		state.tempParentId = data;
	},
};

const actions = {
	accessToken(context) {
		if (!user.isLogin()) {
			context.commit('accessToken', null);
		}
		user.getAccessToken().then(accessToken => {
			context.commit('accessToken', accessToken);
		}).catch(e => {});
	},
	info(context) {
		if (!user.isLogin()) {
			context.commit('accessToken', null);
		}
		user.getAccessToken().then(accessToken => {
			context.commit('accessToken', accessToken);
			user.getInfo().then(data => {
				context.commit('info', data);
			}).catch(e => {});
		}).catch(e => {});
	},
	refreshInfo(context) {
		if (!user.isLogin()) {
			context.commit('accessToken', null);
		}
		user.getAccessToken().then(accessToken => {
			context.commit('accessToken', accessToken);
			user.getInfo({
				refresh: true,
			}).then(data => {
				context.commit('info', data);
			}).catch(e => {});
		}).catch(e => {});
	},
	setTempParentId(context, data) {
		context.commit('tempParentId', data);
	},
	loadAccessTokenFormCache(context) {
		if (context.accessToken) return;
		user.getAccessToken({
			cacheOnly: true,
		}).then(accessToken => {
			if (!accessToken) return;
			context.commit('accessToken', accessToken);
		}).catch(e => {});
	},
	logout(context) {
		uni.removeStorageSync('LSSAGENCY_LOGIN_TIME')
		$store.dispatch('mallConfig/actionClear');
		context.commit('accessToken', null);
		user.loginByToken(null);
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
