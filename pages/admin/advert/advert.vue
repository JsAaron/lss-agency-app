<template>
	<app-layout><view class="tip main-center cross-center">暂未开放</view></app-layout>
</template>

<script>
import { mapState } from 'vuex';

export default {
	data() {
		return {};
	},
	computed: {
		...mapState({
			theme: state => state.mallConfig.theme,
			userInfo: state => state.user.info
		})
	},
	methods: {},
	onLoad() {}
};
</script>

<style scoped lang="scss">
.tip {
	width: 100%;
	color: #999999;
	height: #{500rpx};
}
</style>
