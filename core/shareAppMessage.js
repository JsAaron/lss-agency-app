import {objectToUrlParams} from "./utils";
import request from "../core/request.js";
import api from "../core/appOnLaunch.js";
import $store from "../store/index.js";

const shareAppMessage = function(args) {
    console.log(args);
    args = args || {
        title: '这是一个分享页面',
        path: '/pages/index/index',
        params: {}
    };
    if (typeof args.params === 'undefined') {
        args.params = {};
    }
    // #ifdef MP-ALIPAY
    if (typeof args.imageUrl !== 'undefined') {
        args.bgImgUrl = args.imageUrl;
    }
    // #endif
    let user_id = 0;
    if (this.$user.isLogin() && this.$store.state.user.info) {
        user_id = this.$store.state.user.info.options.user_id;
    }
    if (typeof args.path === 'undefined' || (args.path === '/pages/index/index' && typeof args.params.page_id === 'undefined')) {
        args.path = `/pages/index/index?user_id=${user_id}`;
        if (Object.keys(args.params).length != 0) {
            args.path += `&` + objectToUrlParams(args.params);
        }
    } else {
        args.params.path = args.path;
        args.params.user_id = user_id;
        args.path = `/pages/index/index?scene=share&user_id=${user_id}&params=${JSON.stringify(args.params)}`;
    }
    setTimeout(() => {
        request({
            url: api.coupon.share_coupon,
        }).then(response => {
            if (response.code === 0) {
                let coupon = {
                    list: response.data.list,
                    type: 'share'
                };
                $store.dispatch('page/actionSetCoupon', coupon);
            }
        }).catch(e => {

        });
    },1000);
    console.log(args);
    return args;
};
export default shareAppMessage;