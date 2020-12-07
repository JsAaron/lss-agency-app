const state = {
  id: null,
  showPayment: false,
  payData: null,
  payType: null,
  resolve: null,
  reject: null,
  cashier_appid:'wx1c46301d57c0dc5f',
  cashier_path:'/pages/public/paynext/paynext',
  envVersion:'dev',
};

const getters = {
  id(state) {
    return state.id;
  },
  showPayment(state) {
    return state.showPayment;
  },
  payData(state) {
    return state.payData;
  },
  payType(state) {
    return state.payType;
  },
  resolve(state) {
    return state.resolve;
  },
  reject(state) {
    return state.reject;
  },
};

const mutations = {
  id(state, data) {
    state.id = data;
  },
  showPayment(state, data) {
    state.showPayment = data;
  },
  payData(state, data) {
    state.payData = data;
  },
  payType(state, data) {
    state.payType = data;
  },
  resolve(state, data) {
    state.resolve = data;
  },
  reject(state, data) {
    state.reject = data;
  },
  setAll(state, data) {
    for (let k in data) {
      state[k] = data[k];
    }
    console.log('in payment.js setAll ok:', state);
  },
};

const actions = {
  reset(context) {
    context.commit('id', null);
    context.commit('showPayment', false);
    context.commit('payData', null);
    context.commit('payType', null);
    context.commit('resolve', null);
    context.commit('reject', null);
  },
  go_cashier_page(context,data){
	  console.log("go_cashier_page"+JSON.stringify(data))
	  uni.navigateToMiniProgram({
	      appId: context.state.cashier_appid,
	      path: context.state.cashier_path,
		  extraData:data.extraData,
		  envVersion:context.state.envVersion,
	      success(e) {
	          console.log('打开小程序成功', e);
	      },
	      fail(e) {
	          console.log('打开小程序失败', e);
	      }
	  });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};