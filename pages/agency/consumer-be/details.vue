<template>
    <app-layout>
		<view v-if="list == null" class="tip main-center cross-center">暂无收益详情</view>
		<view class="page" v-else>
			<view class="info-top" v-if="list.income_price == null || list.income_price == 0">￥0.00</view>
			<view class="info-top">
					￥{{mathnum((list.income_price)*0.01)}}
			</view>
			<view class="info-bd">
				<view class="title">交易类型：
					<text v-if="list.type ==1">代理升级费</text>
					<text v-if="list.type ==2">升级分润</text>
					<text v-if="list.type ==3">管理津贴</text>
					<text v-if="list.type ==4">分润扣款</text>
					<text v-if="list.type ==5">刷脸支付佣金营收</text>
					<text v-if="list.type ==6">刷脸佣金分润</text>
					<text v-if="list.type ==7">商品消费佣金营收</text>
					<text v-if="list.type ==8">商品消费佣金</text>
					<text v-if="list.type ==9">提现</text>
				</view>
				<view class="title">业务编号：<text>{{list.order_sn}}</text></view>
				<view class="title">商家名称：<text>{{list.name}}</text></view>
				<view class="title">交易时间：<text>{{list.created_at}}</text></view>
				<view class="title">备注：<text>{{list.remake}}</text></view>
			</view>
		</view>
    </app-layout>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        data() {
            return {
                list: {},
            }
        },
        computed: {
            ...mapState({
                theme: state => state.mallConfig.theme,
            })
        },
        methods: {
			mathnum(num){
				if(num){
					var n = num.toFixed(2);
					return n;
				}
			},
            getList(id) {
                let that = this;
                that.$showLoading({
                    type: 'global',
                    text: '加载中...'
                });
                let para = {
                    id: id
                };
                that.$request({
                    url: 'https://lff.facess.net/web/index.php?_mall_id=1&r=api/agent/order-log',
                    data: para
                }).then(response => {
                    that.$hideLoading();
                    if (response.code === 0) {
                        that.list = response.data.list;
                    } else {
                        uni.showToast({
                            title: response.msg,
                            icon: 'none',
                            duration: 1000
                        });
                    }
                }).catch(() => {
                    that.$hideLoading();
                });
            },
        },
        onLoad(option) {
            this.getList(option.id);
        },
    }
</script>

<style scoped lang="scss">
    .page {
        background-color: #fff;
        margin: #{25rpx} #{25rpx} 0;
        padding-top: #{60rpx};
        border-radius: #{25rpx};
        color: #353535;
        font-size: #{32rpx};
    }
	.info-top {
		text-align: center;
		font-size: #{56rpx};
		margin-top: #{28rpx};
		margin-bottom: #{10rpx};
	}
	.info-bd{
		padding: 25rpx;
		margin-left: 14rpx;
		.title {
		    color: #b0b0b0;
		    font-size: #{26rpx};
		    margin-bottom: #{25rpx};
		    margin-top: #{50rpx};
		}
		text{
			color: #353535;
			font-size: #{28rpx};
		}
	}
	.tip {
	    width: 100%;
	    color: #999999;
	    height: #{500rpx};
	}
</style>