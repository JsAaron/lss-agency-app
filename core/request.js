import Vue from 'vue';
import {
	popAll
} from './formId.js';
import {
	platform
} from './config.js';
import apiUrl from './apiUrl.js';
import {
	objectValues
} from './utils.js';
import $store from '../store/index.js';

const request = async function(args) {
	const header = {
		'X-App-Platform': (args.header && args.header['X-App-Platform']) ? args.header['X-App-Platform'] : platform,
		'X-Form-Id-List': JSON.stringify(popAll()),
		'X-Requested-With': (args.header && args.header['X-Requested-With']) ? args.header['X-Requested-With'] : 'XMLHttpRequest',
		'X-App-Version': Vue.prototype.$appVersion,
		'content-type': 'application/x-www-form-urlencoded'
	};

	await $store.dispatch('user/loadAccessTokenFormCache');

	if ($store.state.user && $store.state.user.accessToken) {
		header['X-Access-Token'] = $store.state.user.accessToken;
	}
	if ($store.state.user && $store.state.user.tempParentId !== 0) {
		header['X-User-Id'] = $store.state.user.tempParentId + '';
	}

	//多商户Token
	let obj = {};
	args.url.replace(/([^=&]+)=([^&]*)/g, function(m, key, value) {
		obj[decodeURIComponent(key)] = decodeURIComponent(value);
	});
	if (objectValues(apiUrl.mch).indexOf(obj.r) !== -1) {
		const mch_storage = uni.getStorageSync('MCH2019');
		header['Mch-Access-Token'] = mch_storage.token;
	}
	
	// console.log(args,header)  
	const [error, response] = await uni.request({
		url: args.url,
		method: args.method || 'get',
		data: args.data,
		header: header,
	});

	if (error) {
		let msg = {
			code: 400,
			msg: error.errMsg,
			data: error,
		};
		alertError(msg);
		return Promise.reject(msg);
	} else {
		return distinguishStatusCode(response);
	}
};

// #ifndef MP-ALIPAY
const reloadPage = function() {
	let pages = getCurrentPages();
	let page = pages[pages.length - 1];
	let options = page.options || {};
	let route = page.route || '';
	if (route.indexOf('/') !== 0) {
		route = '/' + route;
	}
	let query = '';
	for (let k in options) {
		query = query + `${k}=${options[k]}&`;
	}
	uni.redirectTo({
		url: route + (query ? `?${query}` : ``),
	});
};
// #endif

const alertError = function(error) {
	let confirmText = '刷新页面';
	// #ifdef MP-ALIPAY
	confirmText = '确认';
	// #endif
	uni.showModal({
		title: '网络错误',
		content: '网络开了小差，请刷新重试下哦~',
		cancelText: '复制错误',
		confirmText: confirmText,
		success: (e) => {
			if (e.cancel) {
				let data = `code: ${error.code}, \r\nmsg: ${error.msg}, \r\ndetail: ` +
					(error.data ? (typeof error.data === 'string' ? error.data : JSON.stringify(error.data)) : null);
				uni.setClipboardData({
					data: data,
					fail(e) {
						console.log('错误复制失败', e);
					},
				});
			}
			if (e.confirm) {
				// #ifndef MP-ALIPAY
				reloadPage();
				// #endif
			}
		},
	});
};

const distinguishDataCode = function(response) {
	if (response.data) {
		let { 
			msg,
			code
		} = response.data;
		// console.log(555555,response.data)
		if (code >= 400) {
			alertError({
				code: code,
				msg: msg,
				data: response.data.error || (response.data.data || msg),
			});
			return Promise.reject(msg);
		} else if (code === -1) {
			$store.dispatch('user/logout');
			$store.dispatch('user/accessToken');
			return Promise.reject(msg);
		} else if (code === -2) {
			uni.redirectTo({
				url: '/pages/disabled/disabled?text=' + response.data.data.text
			});
		} else if (code === -3) {
			uni.redirectTo({
				url: '/plugins/mch/mch/login/login'
			});
			return Promise.reject(msg);
		} else {
			return Promise.resolve(response.data);
		}
	} else {
		return Promise.reject({
			code: 200,
			msg: '数据不存在',
			data: response,
		});
	}
};

const distinguishStatusCode = function(response) {
	let msg = {
		code: 500,
		msg: '服务器内部错误',
		data: response,
	};
	switch (response.statusCode) {
		case 200:
			return distinguishDataCode(response);
		case 404:
			msg = {
				code: 404,
				msg: '资源获取不到',
				data: response,
			};
			break;
		case 500:
			msg = {
				code: 500,
				msg: '服务器内部错误',
				data: response,
			};
			break;
		case 503:
			msg = {
				code: 503,
				msg: '服务不可用',
				data: response,
			};
			break;
		case 504:
			msg = {
				code: 504,
				msg: '网关超时',
				data: response,
			};
			break;
		case 400:
			msg = {
				code: 400,
				msg: '服务器不理解请求的语法',
				data: response,
			};
			break;
		case 403:
			msg = {
				code: 403,
				msg: '服务器拒绝请求',
				data: response,
			};
			break;
		case 405:
			msg = {
				code: 405,
				msg: '方法禁用',
				data: response,
			};
			break;
		case 406:
			msg = {
				code: 406,
				msg: '无法使用请求的内容特性响应请求的网页',
				data: response,
			};
			break;
		case 407:
			msg = {
				code: 407,
				msg: '需要代理授权',
				data: response,
			};
			break;
		case 408:
			msg = {
				code: 408,
				msg: '请求超时',
				data: response,
			};
			break;
		case 409:
			msg = {
				code: 409,
				msg: '冲突',
				data: response,
			};
			break;
		case 410:
			msg = {
				code: 410,
				msg: '已删除',
				data: response,
			};
			break;
		case 411:
			msg = {
				code: 411,
				msg: '需要有效长度',
				data: response,
			};
			break;
		case 412:
			msg = {
				code: 412,
				msg: '服务器未满足请求者在请求中设置的其中一个前提条件',
				data: response,
			};
			break;
		case 413:
			msg = {
				code: 413,
				msg: '请求实体过大',
				data: response,
			};
			break;
		case 414:
			msg = {
				code: 414,
				msg: '求情URI过长',
				data: response,
			};
			break;
		case 415:
			msg = {
				code: 415,
				msg: '不支持的媒体类型',
				data: response,
			};
			break;
		case 416:
			msg = {
				code: 416,
				msg: '请求范围不符合要求',
				data: response,
			};
			break;
		case 417:
			msg = {
				code: 417,
				msg: '未满足期望值',
				data: response,
			};
			break;
		default:
			break;
	}
	alertError(msg);
	return Promise.reject(msg);
};

export default request;
