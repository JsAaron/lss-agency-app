<template>
	<view>
		<QSInput
			:name="formName"
			variableName="account"
			required
			title="登录账号"
			tapClear
			v-model="fromValue.account"
		></QSInput>

		<QSInput
			:name="formName"
			variableName="password"
			password
			required
			title="新密码"
			labelText="密码需要字母+数字的组合(大于6位数)"
			labelStyle="top:82rpx;left:80rpx;"
			v-model="fromValue.password"
		></QSInput>

		<QSInput
			ref="code"
			:name="formName"
			variableName="code"
			title="验证码"
			ifCode
			labelText="验证码自动发送至注册的手机上"
			labelStyle="top:110rpx;left:80rpx;"
			required
			v-model="fromValue.code"
			@getCode="getCode"
		></QSInput>

		<app-watch-login
			bgColor="#ff4544"
			text="提交"
			margin="80rpx auto 30rpx auto"
			:rotate="isRotate"
			@click.native="onAmend()"
		></app-watch-login>
	</view>
</template>

<script>
import QSInput from '@/components/QS-inputs-split/elements/QS-input/index.vue';
import QSApp from '@/components/QS-inputs-split/js/app.js';
export default {
	components: { QSInput },
	data() {
		return {
			isRotate: false,
			verifyVar: {},
			phoneNum: '',
			formName: 'reset',
			fromValue: {
				account: '',
				password: '',
				code: ''
			}
		};
	},
	methods: {
		getCode() {
			if (!this.fromValue.account) {
				QSApp.showToast('请先输入登录账号');
				return;
			}

			this.$request({
				url: 'https://api.facess.net/api/app/sendSms',
				method: 'POST',
				type: 'application/json',
				data: {
					type: 2,
					username: this.fromValue.account
				}
			})
				.then(info => {
					if (info.code == 0) {
						uni.showToast({
							title: `短息已发送至手机号${info.data.phone},五分钟内有效,请注意查收`,
							icon: 'none',
							duration: 3000
						});
					}
					if (info.code == 1) {
						uni.showToast({
							title: info.msg,
							icon: 'none',
							duration: 3000
						});
					}
				})
				.catch(err => {
					console.log('err', err);
				});
		},

		checkPassWord(password) {
			var str = password;
			if (str == null || str.length < 8) {
				return false;
			}
			var reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
			if (reg.test(str)) return true;
		},

		onAmend() {
			if (this.isRotate) {
				return;
			}
			this.isRotate = true;
			QSApp.getForm(this.formName).then(res => {
				if (res.verifyErr.length > 0) {
					QSApp.showToast(res.verifyErr[0].title + '输入错误');
					this.isRotate = false;
					return;
				}
				if (res.data.password.length < 5) {
					QSApp.showToast('密码必须大于5位数');
					this.isRotate = false;
					return;
				}
				if (!this.checkPassWord(res.data.password)) {
					QSApp.showToast('密码必须是数字+字母的组合');
					this.isRotate = false;
					return;
				}
				if (res.data.code.length != 6) {
					QSApp.showToast('验证码必须是6位数');
					this.isRotate = false;
					return;
				}

				this.$request({
					url: 'https://api.facess.net/api/agent/reset-password',
					method: 'POST',
					type: 'application/json',
					data: {
						code: res.data.code,
						newPwd: res.data.password,
						username: res.data.account
					}
				})
					.then(info => {
						if (info.code == 0) {
							this.isRotate = false;
							QSApp.showToast(info.msg);
							setTimeout(function() {
								uni.navigateBack({});
							}, 1000);
							return;
						} else {
							this.isRotate = false;
							QSApp.showToast(info.msg);
						}
					})
					.catch(err => {
						this.isRotate = false;
						QSApp.showToast(err.msg);
					});
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #fff;
}
</style>
