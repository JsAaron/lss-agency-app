<template>
	<view></view>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	components: {},
	data() {
		return {};
	},
	props: {},
	created() {},
	onLoad() {
		const self = this;
		const token_data = uni.getStorageSync('LSSAGENCY_USER_ACCESS_TOKEN');
		if (!token_data) {
			uni.reLaunch({ url: '/pages/login/login' });
			return;
		}

		// 1天有效期
		let lastLoginTime = uni.getStorageSync('LSSAGENCY_LOGIN_TIME');
		if (lastLoginTime) {
			const nowDate = new Date();
			if (nowDate.getTime() - lastLoginTime >= 1 * 24 * 60 * 60 * 1000) {
				uni.removeStorageSync('LSSAGENCY_LOGIN_TIME');
				uni.reLaunch({ url: '/pages/login/login' });
				return;
			}
		}

		uni.reLaunch({
			url: '/pages/main/main'
		});
	}
};
</script>

<style lang="scss"></style>
