import request from '../../core/request.js';

const state = {
  theme: '',
  address_id: '',
  store_id: '',
  form_data: {},
  big_gift_pic: '',
};

const getters = {};

const mutations = {
  addressId(state, data) {
    state.address_id = data;
  },
  storeId(state, data) {
    state.store_id = data;
  },
  setGiftPic(state, data) {
    state.big_gift_pic = data;
  },
  setTheme(state, data) {
    switch (data) {
      case 1:
        state.theme = 'streamer-gold-gift';
        break;
      case 2:
        state.theme = 'romantic-powder-gift';
        break;
      case 3:
        state.theme = 'taste-red-gift';
        break;
      case 4:
        state.theme = 'elegant-purple-gift';
        break;
      case 5:
        state.theme = 'fresh-green-gift';
        break;
      case 6:
        state.theme = 'business-blue-gift';
        break;
      default:
        state.theme = 'streamer-gold-gift';
    }
  },
  setFormData(state, data) {
    state.form_data = data;
  }
};

const actions = {
  // 获取后台 Gift插件 参数配置
  getConfig(content, data) {
    // uni.showLoading({
    //     title: '加载中',
    // });
    request({
      url: data,
      method: 'get',
    }).then(res => {
      uni.hideLoading();
      if (res.code === 0) {
        context.commit('setTheme', Number(res.data.theme.id));
        // uni.setNavigationBarTitle({
        //     title: res.data.title,
        // });
      } else if (res.code === 1) {
        console.log(res);
      }
    }).catch(() => {
      uni.hideLoading();
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