<template>
    <app-layout>
		<view class="tip main-center cross-center">暂无数据</view>
    </app-layout>
</template>

<script>
    export default {
        data() {
            return {
                loading: null,
                list: [],
                id: null,
                page: 2
            }
        },
        methods: {
            getList() {
                let that = this;
                that.$request({
                    url: 'https://lff.facess.net/web/index.php?_mall_id=1&r=api/agent/all-list',
                    data: { },
                }).then(response=>{
                    that.$hideLoading();
                    uni.hideLoading();
                    if(response.code === 0) {
                        that.list = response.data.list;
						console.log(response.data.list);
                        for (let i in that.list) {
                            console.log(i);
                        }
                    }else {
                        uni.showToast({
                            title: response.msg,
                            icon: 'none',
                            duration: 1000
                        });
                    }
                }).catch(() => {
                    that.$hideLoading();
                    uni.hideLoading();
                    that.$event.on(that.$const.EVENT_USER_LOGIN).then(()=>{
                        that.getList();
                    });
                });
            },
            getMore() {
                let that = this;
                uni.showLoading({
                    title: '加载中...'
                });
                that.$request({
                    url: 'https://lff.facess.net/web/index.php?_mall_id=1&r=api/agent/all-list',
                    data: {
                        page: that.page
                    },
                }).then(response=>{
                    uni.hideLoading();
                    if(response.code == 0) {
                        that.loading = null;
                        for (let i in response.data.list) {
                            for (let index in that.list) {
                                if(i == index) {
                                    that.list[index].list = that.list[index].list.concat(response.data.list[index].list)
                                }
                            }
                        }
                        that.page++;
                    }else {
                        uni.showToast({
                            title: response.msg,
                            icon: 'none',
                            duration: 1000
                        });
                    }
                }).catch(() => {
                    uni.hideLoading();
                });
            },
        },

        onLoad() {
            let that = this;
            that.$showLoading({
                type: 'global',
                text: '加载中...'
            });
            that.getList();
        },
        onReachBottom() {
            this.getMore();
        }
    }
</script>

<style scoped lang="scss">
    .tip {
        width: 100%;
        color: #999999;
        height: #{500rpx};
    }
</style>