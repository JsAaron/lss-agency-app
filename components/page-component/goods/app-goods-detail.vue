<template>
    <view class="app-goods-detail" v-if="goods">
        <view class="comments">
            <app-comments
                    :goods-id="goods.id"
            ></app-comments>
        </view>
        <view class="detail" v-if="newDetail">
            <image src="/static/image/icon/goods-detail.png"></image>
            <view>
                <app-rich-text
                        :content="newDetail"
                        @preview="preview" @navigate="navigate"
                ></app-rich-text>
            </view>
        </view>
    </view>
</template>

<script>
    import appRichText from "../../basic-component/app-rich/parse";
    import appComments from "../../page-component/app-comments/app-comments.vue";

    export default {
        name: "app-goods-detail",
        data() {
            return {
                // newDetail: ''
            }
        },
	    methods: {
            preview(src, e) {
            },
            navigate(href, e) {
            },
	    },
        components: {
            'app-rich-text': appRichText,
            'app-comments': appComments,
        },
        props: {
            goods: {
                type: Object,
	            default() {
                    return {
                    
                    }
	            }
            },
            detail: {
                type: String,
	            default() {
                    return '';
                }
            },
        },
	    created() {
            this.$store.dispatch('gConfig/setImageWidth', 48);
	    },
        computed: {
            newDetail() {
                let detail = '正在加载数据，模拟网络延迟2秒😝';
                if (this.goods && typeof this.goods.detail != 'undefined') {
                    detail = this.goods.detail;
                } else if (this.detail) {
                    detail = this.detail;
                }
                return detail;
            },
        },
        // watch: {
        //     goods: {
        //         handler(v) {
        //             if (this.goods && typeof this.goods.detail != 'undefined') {
        //                 this.newDetail = this.goods.detail;
        //             }
        //         },
        //         immediate: true,
        //     },
        //     detail: {
        //         handler(v) {
        //             this.newDetail = v;
        //         },
        //         immediate: true
        //     }
        // }
    }
</script>

<style scoped lang="scss">
    .comments {
        margin-bottom: #{20rpx};
        background-color: #ffffff;
    }

    .detail {
        background-color: #ffffff;
		padding: #{0 24upx};
        image {
            width: 100%;
            height: #{80rpx};
            display: block;
        }
    }
</style>