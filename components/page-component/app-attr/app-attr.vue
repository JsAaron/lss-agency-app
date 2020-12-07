<template>
    <view class="app-attr">
        <view @click="alert">
            <slot name="button"></slot>
        </view>
	   <view class="modal" v-if="display === 'block'" @click="close">
		   <app-iphone-x>
			   <view class="content" slot="empty-area" @tap.native.stop="preventD">
				   <image src="../../../static/image/icon/close.png" class="close" @click="close"></image>
				   <view class="first dir-left-nowrap">
					   <view class="box-grow-0 img" @click="clickImg(attrPic)">
						   <app-image :img-src="attrPic" width="100%" height="100%"></app-image>
					   </view>
					   <view class="info">
						   <view class="dir-left-nowrap cross-center" :class="priceColor">
							   <view class="dir-left-nowrap cross-center">
								   <view class="dir-left-nowrap cross-center" v-if="selectAttr.extra || goods.extra">
									   <view>{{selectAttr.extra ? selectAttr.extra.value + selectAttr.extra.name :
										   goods.extra.value + goods.extra.name}}
									   </view>
									   <view v-if="!(goods.sign === 'integral_mall' && attrPrice == 0)">+</view>
								   </view>
								   <app-price v-if="!(goods.sign === 'integral_mall' && attrPrice == 0)" type="text-price-all" :price="attrPrice"
								              :default-price="goods.price"></app-price>
							   </view>
							   <view v-if="goods.level_show === 1">
								   <app-member-mark></app-member-mark>
							   </view>
						   </view>
						   <view class="stock">库存：{{attrNum}}</view>
					   </view>
				   </view>
				   <view class="second">
					   <slot name="extra"></slot>
					   <view class="attr-group" v-for="(item, index) in newAttrGroupList" :key="index">
						   <view class="attr-group-name">{{item.attr_group_name}}</view>
						   <view class="dir-left-wrap">
							   <view v-for="(attr, key) in item.attr_list" :key="key" class="attr-item"
							         :class="attr.checked ? theme + '-background active': 'attr-item-default' + (attr.attr_num_0 ? ' attr_num_0' : '')"
							         @click="storeAttrClick(attr.attr_id, item.attr_group_id)">{{attr.attr_name}}
							   </view>
						   </view>
					   </view>
					   <view v-if="chooseNumber" class="dir-left-nowrap number-box cross-center">
						   <view class="box-grow-1">数量</view>
						   <view class="block box-grow-0 cross-center main-center" @click="numberSub"
						         :class="number <= 1 ? 'disabled' : ''">-
						   </view>
						   <view class="number-input box-grow-0 cross-center main-center">
							   <app-input type="number" v-model="number" :center="true" placeholder=" " @blur="numberBlur"
							              :focus="false" width="88"></app-input>
						   </view>
						   <view class="block box-grow-0 cross-center main-center" @click="numberAdd">+</view>
					   </view>
				   </view>
				   <view class="three dir-left-nowrap">
					   <view class="box-grow-1 main-center cross-center" v-if="cartShow"
					         :class="theme + '-secondary-background'" @click="cart">{{addText}}
					   </view>
					   <view v-if="is_show_buy" class="box-grow-1 main-center cross-center buy" :class="theme + '-background'" @click="buy">
						   {{buyText}}
					   </view>
				   </view>
			   </view>
		   </app-iphone-x>
	   </view>
    </view>
</template>

<script>
    import { mapState, mapGetters } from "vuex";
    import appMemberMark from "../../page-component/app-member-mark/app-member-mark.vue";
    import appPrice from "../../page-component/goods/app-price.vue";
    import appInput from "../../basic-component/app-input/app-input.vue";
    import appImage from "../../basic-component/app-image/app-image.vue";
	import appIphoneX from '../../basic-component/app-iphone-x/app-iphone-x.vue';

    export default {
        name: "app-attr",
        components: {
            appMemberMark,
            appPrice,
            appInput,
            'app-image': appImage,
	        'app-iphone-x': appIphoneX,
        },
        props: {
            goods: Object,
            attrGroupList: Array,
            attrCart: {
                type: Array,
                default() {
                    return [];
                }
            },
            cartShow: {
                type: [Boolean,Number],
                default() {
                    return true
                }
            },
            previewUrl: String,
            submitUrl: String,
            goodsId: {
                type:Number,
                default() {
                    return 0
                }
            },
            show: Number,
            buyText: {
                type: String,
                default() {
                    return '立即购买';
                }
            },
            plugin: {
                default: '',
            },
	        theme: {
                type: String,
		        default: 'classic-red',
	        },
            chooseNumber: {
                type: Boolean,
                default: true,
            },
            noPay: {
                type: Boolean,
	            default: false,
            },
			buyClick: {
                type: Boolean,
				default: false,
			},
			addText: {
				type: String,
				default: '加入购物车',
			},
			is_show_buy: {
				type: Boolean,
				default: true,
			}
        },
        data() {
            return {
                display: 'none',
                number: 1,
                selectAttr: null,
                newAttrGroupList: null,
				pic_url: null,
            };
        },
        watch: {
            show() {
                this.alert();
            },
            newData: {
                handler() {
                    this.$emit('attr', this.newData)
                },
                immediate: true,
            },
            attrGroupList: {
                handler() {
					this.newAttrGroupList = this.attrGroupList;
					if (this.display == 'block') {
                        this.alert();
					}
				},
				immediate: true
			},
	        goods: {
                handler() {
                    if (this.display == 'block') {
                        this.alert();
                    }
                },
		        immediate: true
	        }
        },
        methods: {
            alert() {
                if (this.attrGroupList.length === 0) {
                    return;
                }
                let attr_group_list = this.attrGroupList;
                let attrs = this.goods.attr;
                let select_attr = null;
                this.number = 1;
                if (attr_group_list.length === 1) {
                    for (let i in attrs) {
                        for (let j in attr_group_list[0].attr_list) {
                            if (attr_group_list[0].attr_list[j].attr_id == attrs[i].attr_list[0].attr_id) {
                                if (attrs[i].stock > 0) {
                                    if (attrs.length === 1) {
                                        attr_group_list[0].attr_list[j].checked = true;
                                    }
                                    attr_group_list[0].attr_list[j].attr_num_0 = false;
                                    this.pic_url = attr_group_list[0].attr_list[j].pic_url;
                                } else {
                                    this.number = 0;
                                    attr_group_list[0].attr_list[j].checked = false;
                                    attr_group_list[0].attr_list[j].attr_num_0 = true;
                                }
							}
						}
                    }
                    if (attrs.length === 1) {
                        select_attr = attrs[0];
                        this.$emit('attrtap', select_attr);
                    }
                }
                this.display = 'block';
                this.newAttrGroupList = attr_group_list;
                this.selectAttr = select_attr;
            },
            close() {
                this.display = 'none';
            },
            preventD() {
            },
            storeAttrClick(attr_id, attr_group_id) {
                let attr_group_list = JSON.parse(JSON.stringify(this.newAttrGroupList));
                let attrs = this.goods.attr;
                let checkedAttr = [];
                let attr_cart = this.attrCart;
                for (let i in attr_group_list) {
                    for (let j in attr_group_list[i].attr_list) {
                        let temp = attr_group_list[i].attr_list[j];
                        if (parseInt(attr_group_list[i].attr_group_id) == parseInt(attr_group_id)) {
                            if (parseInt(temp.attr_id) === parseInt(attr_id)) {
                                if (temp.checked) {
                                    temp.checked = false;
                                } else {
                                    temp.checked = true;
                                }
                                if (temp.attr_num_0) {
                                    return;
                                }
                            } else {
                                temp.checked = false;
                            }
                        }
                        if (temp.checked) {
                            if (i == 0) {
                                this.pic_url = attr_group_list[0].attr_list[j].pic_url;
							}
                            checkedAttr.push(attr_group_list[i].attr_group_id + '-' + temp.attr_id);
                        }
                    }
                }

                function inArray(val, arr) {
                    return arr.some(function (v) {
                        return val == v;
                    })
                }

                let attrNum_0 = [];
                let select_attr = null;
                let number = 1;
                for (let i in attrs) {
                    let arr = [];
                    let sign = 0;
                    for (let j in attrs[i].attr_list) {
                        let param = attrs[i].attr_list[j].attr_group_id + '-' + attrs[i].attr_list[j].attr_id;
                        if (!inArray(param, checkedAttr)) {
                            sign += 1;
                            arr.push(param);
                        }
                    }
                    if (attrs[i].stock == 0 && sign <= 1) {
                        attrNum_0 = attrNum_0.concat(arr);
                    }
                    if (sign == 0) {
                        if (!select_attr) {
                            select_attr = {};
                        }
                        select_attr = attrs[i];
                        attr_cart.forEach(item => {

                            if (item.attr_id == select_attr.id) {
                                number = item.num;
                            }
                        });
                        if (select_attr.stock <= 0) {
                            uni.showToast({
                                title: '库存不足',
                                icon: 'none'
                            });
                            return;
                        }
                        if (select_attr.stock <= number) {
                            number = select_attr.stock;
                        }
                    }
                }
                if (checkedAttr.length == 0) {
                    select_attr = null;
                }

                //库存为0的规格添加标识
                for (let i in attr_group_list) {
                    for (let j in attr_group_list[i].attr_list) {
                        let cAttr = attr_group_list[i].attr_list[j];
                        let cParam = attr_group_list[i].attr_group_id + '-' + cAttr.attr_id;
                        if (inArray(cParam, attrNum_0) && !inArray(cParam, checkedAttr)) {
                            cAttr.attr_num_0 = true;
                        } else {
                            cAttr.attr_num_0 = false;
                        }
                    }
                }
                this.newAttrGroupList = attr_group_list;
                this.selectAttr = select_attr;
                this.number = number;
                this.$emit('attrtap', this.selectAttr);
            },
            numberBlur(number) {
                number = parseInt(number.value);
                if (number > this.attrNum) {
                    uni.showToast({
                        title: '库存不足',
                        icon: 'none'
                    });
                    number = this.attrNum;
                }
                this.$emit('attrtap', this.selectAttr);
                return this.number = number;
            },
            numberSub() {
                let number = this.number;
                if (number <= 1) {
                    return true;
                }
                number--;
                this.number = number;
                this.$emit('attrtap', this.selectAttr);
            },
            numberAdd() {
                let number = this.number;
                number++;
                if (number > this.attrNum) {
                    uni.showToast({
                        title: '库存不足',
                        icon: 'none'
                    });
                    this.number = this.attrNum;
                    return;
                }
                this.number = number;
                this.$emit('attrtap', this.selectAttr);
            },
            cart() {
                if (!this.submit()) {
                    return false;
                }
                let select_attr = this.selectAttr;
                if (this.goods.sign === 'pick') {
                	this.$emit('add', select_attr, this.number);
                	return;
				}
                if (this.goods.sign === 'miaosha') {
                    this.$request({
                        url: this.$api.miaosha.add_cart,
                        data: {
                            miaosha_goods_id: select_attr.goods_id,
                            attr_id: select_attr.id,
                            num: this.number
                        },
                        method: 'post'
                    }).then(e => {
                        uni.showToast({
                            title: e.msg,
                            type: 'success'
                        });
                        this.display = 'none';
                        this.selectAttr.number = this.number;
                        this.$emit('selectNumber', this.selectAttr);
                    }).catch(e => {
                        this.display = 'none';
                    });
                } else {
                    this.$request({
                        url: this.$api.cart.add,
                        data: {
                            goods_id: select_attr.goods_id,
                            attr: select_attr.id,
                            num: this.number
                        },
                        method: 'post'
                    }).then(e => {
                        uni.showToast({
                            title: e.msg,
                            type: 'success'
                        });
                        this.display = 'none';
                        this.selectAttr.number = this.number;
                        this.$emit('selectNumber', this.selectAttr);
                    }).catch(e => {
                        this.display = 'none';
                    });
                }
            },
            buy() {
                if (!this.submit()) return false;
                
                if (this.noPay) {
                    this.$emit('pay', this.number);
                    return;
                }

                if (this.buyClick) {
                    this.display = 'none';
                    this.selectAttr.number = this.number;
                    this.$emit('buyClick', this.selectAttr);
                    return false;
				}
                
                let goods = this.goods;
                console.log('goods---', goods);
                let number = this.number;
                let select_attr = this.selectAttr;
                let goods_attr_id = select_attr.id;
                let attr = [];
                for (let i in select_attr.attr_list) {
                    attr.push({
                        attr_id: select_attr.attr_list[i].attr_id,
                        attr_group_id: select_attr.attr_list[i].attr_group_id
                    });
                }
                
                let mch_list = [{
                    mch_id: goods.mch_id ? goods.mch_id : 0,
                    goods_list: [{
                        id: this.goodsId ? this.goodsId: goods.id,
                        attr: attr,
                        num: number,
                        cat_id: 0,
                        goods_attr_id: goods_attr_id
                    }]
                }];
               
                let page_url = `/pages/order-submit/order-submit?mch_list=${JSON.stringify(mch_list)}`;
                if (this.submitUrl && this.previewUrl) {
                    page_url += `&preview_url=${encodeURIComponent(this.previewUrl)}&submit_url=${encodeURIComponent(this.submitUrl)}&plugin=${this.plugin}`;
                }
                uni.navigateTo({
	                url: page_url
                })
            },
            submit() {
                let goods = this.goods;
                let number = this.number;
                let select_attr = this.selectAttr;
                if (!select_attr) {
                    uni.showToast({
                        title: '请先选规格',
                        icon: 'none'
                    });
                    return false;
                }
                if (select_attr.stock <= 0) {
                    uni.showToast({
                        title: '库存不足',
                        icon: 'none'
                    });
                    return false;
				}
                if (number <= 0) {
                    uni.showToast({
                        title: '数量不能为0',
                        icon: 'none'
                    });
                    return false;
                }
                if (!goods) {
                    return false;
                }
                
                return true;
            },
            clickImg(src) {
                uni.previewImage({
                    current: 0,
                    urls: [src]
                });
            },
        },
        computed: {
            ...mapState({
                gConfig: state => state.gConfig,
            }),
            attrPic() {
                if (this.pic_url) {
                    return this.pic_url;
                } else {
                    if (this.goods) {
                        return this.goods.cover_pic;
                    } else {
                        return ``;
                    }
                }
            },
            priceColor() {
                if (this.goods && this.goods.level_show === 1) {
                    return `member`;
                } else {
                    return this.theme + '-color';
                }
            },
            attrNum() {
                if (this.selectAttr) {
                    return this.selectAttr.stock;
                } else {
                    if (this.goods) {
                        return this.goods.goods_num;
                    } else {
                        return 0;
                    }
                }
            },
            attrPrice() {
                if (this.selectAttr) {
                    if (this.goods.level_show === 1) {
                        return this.selectAttr.price_member;
                    } else {
                        return this.selectAttr.price;
                    }
                } else {
                    if (this.goods) {
                        return this.goods.price;
                    } else {
                        return 0;
                    }
                }
            },
            newData() {
                const { number, display, selectAttr } = this;
                return {
                    number,
                    display,
                    selectAttr
                }
            },
	        ...mapGetters('iPhoneX', {
                boolEmpty: 'getBoolEmpty'
	        })
        }
    }

</script>

<style scoped lang="scss">
    .app-attr {
        background-color: #ffffff;

        .modal {
            background-color: rgba(0, 0, 0, 0.5);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1601;

            .content {
                width: 100%;
                /*position: fixed;*/
                /*left: 0;*/
                /*bottom: 0;*/
                background-color: #ffffff;
                border-radius: #{16rpx} #{16rpx} 0 0;

                .close {
                    width: #{30rpx};
                    height: #{30rpx};
                    position: absolute;
                    right: #{24rpx};
                    top: #{24rpx};
					background-color: #ffffff;
                }

                .first {
                    margin: 0 #{24rpx};
                    border-bottom: #{1rpx} solid #e2e2e2;

                    .img {
                        width: #{200rpx};
                        height: #{200rpx};
                        border: #{4rpx} solid #ffffff;
                        border-radius: #{8rpx};
                        margin-top: #{-64rpx};
                        display: block;
                    }

                    .info {
                        margin: #{36rpx} 0 #{26rpx} #{24rpx};
                        font-size: $uni-font-size-import-two;
                        line-height: 1;

                        .stock {
                            font-size: $uni-font-size-weak-one;
                            color: $uni-general-color-two;
                            margin-top: #{18rpx};
                        }

                        view {
                            &:first-child {
                                margin-right: #{12rpx};
                            }
                        }

                        .member {
                            color: #f39800;
                        }
                    }
                }

                .second {
                    max-height: #{650rpx};
                    overflow-y: auto;
                    padding: #{4rpx} #{24rpx};
                    font-size: $uni-font-size-general-two;

                    .attr-group {
                        padding: #{32rpx} 0;
                        border-bottom: #{1rpx} solid #e2e2e2;

                        .attr-group-name {
                            color: $uni-general-color-one;
                            margin-bottom: #{20rpx};
                        }

                        .attr-item {
                            margin-right: #{20rpx};
                            padding: #{15rpx 24rpx};
                            border-radius: #{8rpx};
                            margin-bottom: #{20rpx};

                            &.attr-item-default {
                                background-color: #f2f2f2;
                                color: $uni-important-color-black;
                            }

                            &.active {
                                color: #ffffff;
                            }

                            &.attr_num_0 {
                                color: #cdcdcd;
                                background-color: #f7f7f7;
                            }
                        }
                    }

                    .number-box {
                        color: $uni-general-color-one;
                        height: #{124rpx};

                        .block {
                            width: #{60rpx};
                            height: #{60rpx};
                            margin: 0 #{4rpx};
                            background-color: $uni-weak-color-two;

                            &.disabled {
                                background-color: #fbfbfb;
                                color: $uni-general-color-two;
                            }
                        }

                        .number-input {
                            width: #{88rpx};
                            height: #{60rpx};
                            color: $uni-important-color-black;
                            font-size: $uni-font-size-general-one;
                            background-color: $uni-weak-color-two;
                        }
                    }
                }

                .three {
                    height: #{110rpx};
                    width: 100%;
                    font-size: $uni-font-size-general-one;
                }
            }
        }
    }
	.buy {
		color: #ffffff;
	}
</style>