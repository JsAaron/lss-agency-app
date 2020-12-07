<template>
	<form report-submit v-on:submit="getFormId">
		<view class="page-width sort-rule dir-left-nowrap">
			<button class="box-grow-1 item" v-on:click="setSort(1)" :class="[`${sort === 1 ? theme + `-color` : ``}`]" formType="submit">综合</button>
			<button class="box-grow-1 item" v-on:click="setSort(2)" :class="[`${sort === 2 ? theme + `-color` : ``}`]" formType="submit">最新</button>
			<button class="box-grow-1 item dir-left-nowrap main-center cross-center" :class="[`${sort === 3 ? theme + `-color` : ``}`]"
			        v-on:click="setSort(3)" formType="submit">
				<text class="price">价格</text>
				<image v-show="loading" @load="loading=true" :class="[`${theme}-background`, `icon`]"
				       :src="sort_type === -1 ? `/static/image/icon/price-sort-default.png` : sort_type ===  2 ? `/static/image/icon/tall.png` : sort_type === 1 ? `/static/image/icon/low.png` : ``"></image>
			</button>
			<button class="box-grow-1 item"  :class="[`${sort === 4 ? theme + `-color` : ``}`]" v-on:click="setSort(4)" formType="submit">销量</button>
		</view>
	</form>
</template>

<script>

    export default {
        name: 'sort-rule',

        props: {
            theme: String,
        },

        data() {
            return {
                sort: 1,
                sort_type: -1,
				loading: false,
            }
        },

		computed: {
			classObject: function() {
				return {
					default: this.sort_type === -1,
					tall: this.sort_type === 2,
					low: this.sort_type === 1,
					icon: true,
					'default-background': true
				}
			}
		},
        methods: {
            getFormId(data) {
                console.log(data);
            },

            setSort(data) {
                this.sort = data;
                if (data !== 3) {
                    this.sort_type = -1;
                } else {
					this.loading = true;
                    switch (this.sort_type) {
                        case -1:
                            this.sort_type = 1;
                            break;
                        case 1:
                            this.sort_type = 2;
                            break;
                        case 2:
                            this.sort_type = 1;
                    }
                }
                this.$emit('sort', data, this.sort_type);
            }
        },
    }
</script>

<style scoped lang="scss">
	
	/*排序*/
	.sort-rule {
		height: #{96upx};
		width: #{750upx};
		background-color: #ffffff;
		.item {
			line-height: #{96upx};
			text-align: center;
			background-color: #ffffff;
			font-size: #{26upx};
			border: none;
		}
		.icon {
			width: #{16upx};
			height: #{22upx};
			margin-left: #{5upx};
			background-size: 100% 100%;
			background-repeat: no-repeat;
		}
		.price {
			margin-right: #{5upx};
		}
	}
	.default-color {
		color: #ff4544;
	}
	
	.default-background {
		background-color: #ff4544;
	}

	.default {
		background-image: url('../../../static/image/icon/price-sort-default.png');
	}
	.tall {
		background-image: url('../../../static/image/icon/tall.png');
	}
	.low {
		background-image: url('../../../static/image/icon/low.png');
	}
</style>