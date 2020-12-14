<template>
	<app-layout>
		<view class="rule"><text class="text" space="nbsp" v-text="rules"></text></view>
	</app-layout>
</template>

<script>
export default {
	name: 'apply_rules',

	data() {
		return {
			rules: ''
		};
	},
	onLoad: function(options) {
		if (options.rules) {
			this.rules = options.rules;
		}
	}
};
</script>

<style scoped lang="scss">
.rule {
	padding: #{30rpx};

	.text {
		word-break: break-all;
		text-align: justify;
	}
}
</style>
