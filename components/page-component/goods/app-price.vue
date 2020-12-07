<template>
    <view class="app-price t-omit" v-if="actual.price != -1">
        <text :class="actual.type">{{actual.price}}</text>
    </view>
</template>

<script>
    export default {
        props: {
            max: {
                type: String,
                default() {
                    return '-1';
                }
            },
            min: {
                type: String,
                default() {
                    return '-1';
                }
            },
            defaultPrice: {
                type: String,
                default() {
                    return '-1';
                }
            },
            price: {
                type: [String, Number],
                default() {
                    return '-1';
                }
            },
            type: {
                type: String,
                default() {
                    return 'text-price'; // 目前支持text-price和text-price-all
                }
            }
        },
        data() {
            return {
                priceType: this.type,
            }
        },
        computed: {
            actual() {
                let actualPrice = -1;
                let price = -1;
                let min = -1;
                let max = -1;
                let defaultPrice = -1;
                let type = this.type;
                if (this.price != 'undefined') {
                    price = Number(this.price);
                }
                if (this.min != 'undefined') {
                    min = Number(this.min);
                }
                if (this.max != 'undefined') {
                    max = Number(this.max);
                }
                if (this.defaultPrice != 'undefined') {
                    defaultPrice = Number(this.defaultPrice);
                }
                if (price && price > 0) {
                    actualPrice = price;
                } else if (price == 0) {
                    actualPrice = '免费';
                    type = '';
                } else if (max > min && min >= 0) {
                    actualPrice = min + '-' + max;
                } else if (max == min && min >= 0) {
                    actualPrice = min;
                } else if (defaultPrice > 0) {
                    actualPrice = defaultPrice;
                } else if (defaultPrice == 0) {
                    actualPrice = '免费';
                    type = '';
                }
                return {
                    price: actualPrice,
                    type: type
                };
            }
        }
    }
</script>

<style scoped lang="scss">
	
    .text-price::before {
        content: '￥';
        font-size: 60%;
    }

    .text-price-all::before {
        content: '￥';
        font-size: 100%;
    }
</style>