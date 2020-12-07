<script>
export default {
	onLaunch: function(options) {
		// console.log('app onLaunch--->'); // 公众号文章进小程序无底部导航调试，请勿删除
		// console.log(options); // 公众号文章进小程序无底部导航调试，请勿删除
		// console.log('<---app onLaunch'); // 公众号文章进小程序无底部导航调试，请勿删除
		if (options && options.scene) {
			this.$appScene = options.scene;
		}
		this.$store.dispatch('mallConfig/actionGetConfig');
		let _this = this;
		wx.getSystemInfo({
			success: function(response) {
				_this.$store.dispatch('gConfig/setSystemInfo', response);
				_this.$store.dispatch('iPhoneX/setIphone', response);
			}
		});
		// #ifdef MP_WEIXIN
		if (
			options.scene == '1011' ||
			options.scene == '1012' ||
			options.scene == '1013' ||
			options.scene == '1047' ||
			options.scene == '1048' ||
			options.scene == '1049'
		) {
			this.$store.dispatch('page/actionSetIsScanQrCode', true);
		}
		// #endif
		// #ifdef MP-ALIPAY
		if (typeof options.query != 'undefined') {
			this.$store.dispatch('page/actionSetQeury', options.query);
		}
		// #endif
		if (options.query && typeof options.query.user_id !== 'undefined') {
			this.$store.dispatch('user/setTempParentId', options.query.user_id);
		}
	},
	onShow(options) {
		// console.log('app onShow--->'); // 公众号文章进小程序无底部导航调试，请勿删除
		// console.log(options); // 公众号文章进小程序无底部导航调试，请勿删除
		// console.log('<---app onShow'); // 公众号文章进小程序无底部导航调试，请勿删除
		if (options && options.scene) {
			this.$appScene = options.scene;
		}
	}
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "./uni.scss";
@import './static/css/flex.scss';
@import './static/css/themeColor.scss';
@import './static/css/text.scss';
@import './static/css/image.scss';
@import './static/css/parse.scss';
@import './static/css/gift.scss';
</style>
