import mallConfig from '../../core/mallConfig.js';

const state = {
	// 主题配置，2020.10.16
	theme_cfg: {
		color: ["#8B0303", "#0F7383", "#382388"]
	},
	auth_page: {},
	bar_title: {},
	cat_style: {},
	copyright: {},
	mall: {
		setting: {

		}
	},
	navbar: {
		navs: []
	},
	plugin: {
		mch: {
			app_image: {
				alipay: "https://lff.facess.net/plugins/mch/assets/img/alipay.png",
				baidu: "https://lff.facess.net/plugins/mch/assets/img/baidu.png",
				banner_image: "https://lff.facess.net/plugins/mch/assets/img/banner.jpg",
				byte_dance: "https://lff.facess.net/plugins/mch/assets/img/byte-dance.png",
				error: "https://lff.facess.net/plugins/mch/assets/img/error.png",
				load: "https://lff.facess.net/plugins/mch/assets/img/load.png",
				mch_account_header_bg: "https://lff.facess.net/plugins/mch/assets/img/mch-account-header-bg.png",
				mch_login_bg: "https://lff.facess.net/plugins/mch/assets/img/mch-login-bg.png",
				qrcode_header_bg: "https://lff.facess.net/plugins/mch/assets/img/qrcode-header-bg.png",
				shop_logo: "https://lff.facess.net/plugins/mch/assets/img/shop-logo.png",
				success: "https://lff.facess.net/plugins/mch/assets/img/success.png",
				wechat: "https://lff.facess.net/plugins/mch/assets/img/wechat.png"
			}
		}
	},
	share_setting: [],
	share_setting_custom: {},
	user_center: {},
	__wxapp_img: {},
	theme: "classic-red",
	windowHeight: {
		height: 0,
		width: 0,
		boolean: false
	},
};

const getters = {
	getNavBar(state) {
		// console.log(111,state)
		return state.navbar;
	},
	getNavBarNavs(state) {
		for (let i = 0, len = state.navbar.navs.length; i < len; i++) {}
	},
	getUserCenter(state) {
		return state.user_center;
	},
	getWxappImg(state) {
		return state.__wxapp_img;
	},
	getCatStyle(state) {
		return state.cat_style;
	},
	getVip(state) {
		return state.plugin.vip_card;
	},
	getVideo(state) {
		return state.mall.setting.is_goods_video;
	},
	getShowCart(state) {
		return state.mall.setting.is_show_cart;
	}
};

const mutations = {
	mutSetConfig(state, data) {
		for (let item in data) {
			if (item === 'navbar') {
				for (let i = 0; i < data[item].navs.length; i++) {
					data[item].navs[i].id = i;
				}
			}
			state[item] = data[item];
		}
	},
	mutSetHeight(state, data) {
		state.windowHeight = data;
	}
};

const actions = {
	actionGetConfig(context) {
		mallConfig.getConfig().then(response => {
			context.commit('mutSetConfig', response);
		}).catch(error => {
			console.log(error);
		});
	},
	actionHeight(context, data) {
		context.commit("mutSetHeight", data);
	},
	actionResetConfig(context) {
		mallConfig.resetConfig();
		mallConfig.getConfig().then(response => {
			context.commit('mutSetConfig', response);
		}).catch(error => {
			console.log(error);
		});
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
