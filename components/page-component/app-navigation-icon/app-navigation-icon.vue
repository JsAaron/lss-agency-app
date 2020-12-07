<template>
	<view class="app-navigation-icon" :style="{backgroundColor: background, height: height}">
		<swiper class="app-swiper">
			<swiper-item class="app-swiper-item dir-top-nowrap" v-for="(item, itemIndex) in newData" :key="itemIndex">
				<view v-for="(rows, rowsIndex) in item" class="app-rows dir-left-nowrap" :key="rowsIndex">
					<view v-for="(columns, columnsIndex) in rows" :key="columnsIndex" class="app-item dir-top-nowrap cross-center" :style="{width: width}">
						<app-jump-button form :url="columns.link_url" :open_type="columns.open_type"  arrangement="column">
							<image class="app-icon" :src="columns.icon_url" :lazy-load="true"></image>
							<text :style="{color: color}" class="app-text">{{columns.name}}</text>
						</app-jump-button>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
    export default {
        name: 'app-navigation-icon',
	    data() {
            return {
                width: uni.upx2px(0)+ 'px',
	            height: uni.upx2px(0)+ 'px',
            }
	    },
	    props: {
            background: {
				type: String,
				default() {
				    return '#ffffff';
				}
			},
            color: {
				type: String,
				default() {
				    return '';
				}
			},
            columns: {
				type: Number,
				default() {
				    return 3;
				}
			},
            rows: {
				type: Number,
				default() {
				    return 4;
				}
			},
            scroll: {
				type: Boolean,
				default() {
				    return false;
				}
			},
            navs: {
				type: Array,
				default() {
				    return [
                    ]
				}
			}
	    },
	    computed: {
            newData: function() {
                this.width = `${uni.upx2px(750/this.columns)}px`;
                let menus = [];
                let newMenus = [];
                let num = Number(this.columns)* this.rows;
                if (this.scroll === true) {
                   for (let i = 0; i < Math.ceil(this.navs.length/num); i++) {
                       menus.push(this.navs.slice(i*num, (i+1)*num));
                   }
                   for (let i = 0; i < menus.length;i++) {
                       let arr = [];
                       for (let j = 0; j < Math.ceil(menus[i].length/ Number(this.columns)); j++) {
                           arr.push(menus[i].slice(j* Number(this.columns), (j+1)* Number(this.columns)));
                       }
                       newMenus.push(arr);
                   }
               } else {
                    if (this.rows === -1) {
                        menus = [this.navs];
					} else {
                        menus.push(this.navs.slice(0, num));
					}
                    for (let i = 0; i < menus.length;i++) {
                        let arr = [];
                        for (let j = 0; j < Math.ceil(menus[i].length/ Number(this.columns)); j++) {
                            arr.push(menus[i].slice(j* Number(this.columns), (j+1)* Number(this.columns)));
                        }
                        newMenus.push(arr);
                    }
               }
                this.height = `${uni.upx2px(newMenus[0].length * 156)}px`;
                return newMenus;
            }
	    }
    }
</script>

<style scoped lang="scss">
	.app-navigation-icon {
		width: #{750rpx};
		.app-swiper-item {
			width: #{750rpx};
		}
		.app-rows {
			width: #{750rpx};
			margin-top: #{28rpx};
			margin-bottom: #{4rpx};
		}
		.app-icon {
			width: #{90rpx};
			height: #{90rpx};
		}
		.app-text {
			font-size: #{24rpx};
			color: #353535;
			height: #{24rpx};
			line-height: #{24rpx};
			text-align: center;
			margin-top: #{8rpx};
			word-break: break-all;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
			overflow: hidden;
		}
		.app-swiper {
			height: 100% !important;
		}
	}
</style>