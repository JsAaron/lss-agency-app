<template>
	<app-layout>
		<view class="login-box">
			<!-- 			<view class="login-null dir-left-nowrap cross-center">
				<view>还没有商家账户？</view>
				<view @click="navApply"><view class="main-center cross-center apply-btn">立即申请</view></view>
			</view> -->
			<view class="login-bg">
				<image src="/static/image/logo.png"></image>
				<view></view>
			</view>
			<view class="account main-center cross-center">
				<view class="dir-left-nowrap login-form">
					<view class="box-grow-0 cross-center">账号</view>
					<input focus placeholder="请输入账号" placeholder-style="color:#bbbbbb" type="text" v-model="form.username" />
				</view>
			</view>
			<view class="password main-center cross-center">
				<view class="dir-left-nowrap login-form cross-center">
					<view class="box-grow-0 cross-center">密码</view>
					<input
						focus
						placeholder="请输入密码(6-14位)"
						placeholder-style="color:#bbbbbb"
						type="password"
						v-model="form.password"
					/>
				</view>
			</view>
			<view @click="login">
				<view class="main-center cross-center login-dl"><view class="main-center cross-center">登录</view></view>
			</view>
			<!-- 			<view class="dir-top-nowrap main-center cross-center">
				<view class="spacing main-center cross-center">
					<view class="line"></view>
					<view>或</view>
					<view class="line"></view>
				</view>
			</view> -->
		</view>
		<image class="footer" src="/static/image/footer.png"></image>
	</app-layout>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'login',

	// computed: {
	// 	...mapState({
	// 		appImg: state => state.mallConfig.plugin.mch.app_image
	// 	})
	// },
	data() {
		return {
			form: {
				username: '',
				password: ''
			}
		};
	},
	onLoad: function() {
		uni.removeStorage({ key: 'MCH2019' });
	},

	methods: {
		navApply() {
			uni.navigateTo({ url: `/pages/admin/apply/apply` });
		},
		login: function() {
			const self = this;
			self.$showLoading({ title: '登陆中' });
			self
				.$request({
					// url: 'https://lff.facess.net/web/index.php?_mall_id=1&r=plugin/mch/api/mch/login',
					url: 'https://lff.facess.net/web/index.php?_mall_id=1&r=plugin/mch/api/mch/app-login',
					method: 'POST',
					data: {
						username: self.form.username,
						password: self.form.password
					}
				})
				.then(info => {
					self.$hideLoading();
					if (info.code === 0) {
						uni.setStorageSync('_USER_ACCESS_TOKEN', info.data['x-token']);
						self.loginSuccess(info.data);
					} else {
						uni.showToast({ icon: 'none', title: info.msg });
					}
				})
				.catch(err => {
					self.$hideLoading();
				});
		},

		loginSuccess(data) {
			uni.showToast({ title: '登陆成功' });
			//缓存
			uni.setStorageSync('MCH2019', data);
			//跳转
			uni.redirectTo({
				url: '/pages/myshop/myshop'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
	
.login-box {
	background: #ffffff;
	min-height: 100vh;
	padding-top: 100rpx;
}

.login-null {
	background: #feeeee;
	height: #{80rpx};
	width: 100%;
	color: rgb(7, 128, 218);
	font-size: #{28rpx};

	> view {
		margin-left: #{24rpx};
	}
}

.account {
	margin-top: #{88rpx - 24rpx};
}

.password {
	margin-top: #{64rpx - 24rpx};
	margin-bottom: #{72rpx};
} 

.apply-btn {
	height: #{44rpx};
	width: #{162rpx};
	color: #ff4544;
	background: #feeeee;
	border: #{1rpx} solid #ff4544;
	border-radius: #{22rpx};
	font-size: #{28rpx};
	line-height: #{44rpx};
}

.login-bg {
	position: relative;
	height: #{155rpx};
	width: 155rpx;
	margin: 0 auto;
	margin-bottom: 180rpx;
}

.login-bg view {
	position: absolute; 
	left: #{200rpx};
	bottom: #{0rpx};
	width: #{0rpx};
	height: #{0rpx};
	border-left: #{24rpx} solid transparent;
	border-right: #{24rpx} solid transparent;
	border-bottom: #{40rpx} solid #ffffff;
}

.login-bg image {
	height: 100%;
	width: 100%;
}

.input-place {
	color: red;
	font-size: #{28rpx};
}

.login-form {
	color: #353535;
	width: #{560rpx};
	border-bottom: 1px solid #e2e2e2;
	padding-bottom: #{24rpx};
}

.login-form view {
	color: #bbb;
	font-size: #{28rpx};
	margin-left: #{48rpx};
	margin-right: #{32rpx};
}

.login-form input {
	color: #353535;
	font-size: #{28rpx};
	width: 100%;
}

.login-dl {
	height: #{80rpx};
	width: 100%;
}

.login-dl view {
	width: #{560rpx};
	height: 100%;
	background: rgb(8, 128, 218);
	border-radius: #{40rpx};
	color: #fff;
	font-size: #{32rpx};
	margin-top: 100rpx;
}

.spacing {
	font-size: #{24rpx};
	margin-top: #{80rpx};
	color: #bbbbbb;

	.line {
		width: #{230rpx};
		height: #{1px};
		margin: 0 #{40rpx};
		background: #e2e2e2;
	}
}

.platform-pic {
	height: #{120rpx};
	width: #{120rpx};
	margin-top: #{76rpx};
	margin-bottom: #{32rpx};
}

.platform-name {
	color: #bbbbbb;
	font-size: #{28rpx};
}

.footer{
	height: 133rpx;
	width: 100%;
	position: fixed;
	bottom: 0;
}
</style>
