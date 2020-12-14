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
		const mch_data = uni.getStorageSync('MCH2019');
		if (!mch_data) {
			uni.reLaunch({ url: '/pages/login/login' });
			return;
		}
		uni.reLaunch({
			url: '/pages/myshop/myshop'
		});
	}
};
</script>

<style lang="scss"></style>
