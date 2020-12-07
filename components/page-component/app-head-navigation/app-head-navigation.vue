<template>
	<scroll-view scroll-x class="app-head-navigation dir-left-nowrap cross-center">
		<view class="app-text" :class="{'app-active': item.active === true}" v-for="(item, index) in list" :key="index" @click="active(item)">
			<app-form-id>
				{{item.name}}
			</app-form-id>
		</view>
	</scroll-view>
</template>

<script>
    export default {
        name: 'app-head-navigation',
	    props: {
            list: {
                type: Array,
	            default: function() {
	                return [];
	            }
            }
	    },
	    methods: {
            active(item) {
                this.$emit('click', item);
            }
	    }
    }
</script>

<style scoped lang="scss">
	.app-head-navigation {
		width: #{750rpx};
		height: #{100rpx};
		line-height: #{100rpx};
		border-top: #{1rpx} solid #e2e2e2;
		border-bottom: #{1rpx} solid #e2e2e2;
		padding: #{0 24rpx};
		white-space:nowrap;
		background-color: #ffffff;
		.app-text {
			display: inline-block;
			height: #{56rpx};
			padding: 0 #{20rpx};
			font-size: #{28rpx};
			line-height: #{56rpx};
			border-radius: #{28rpx};
			margin-right: #{32rpx};
			white-space:nowrap;
		}
		.app-active {
			background-color:#ff4544;
			color: white;
		}
	}
</style>