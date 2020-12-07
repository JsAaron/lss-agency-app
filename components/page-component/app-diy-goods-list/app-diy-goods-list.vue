<template>
	<view class="app-goods-list">
		<template v-if="showCat && catList.length > 1">
			<scroll-view class="app-scroll-view dir-left-nowrap" scroll-x scroll-with-animation>
				<text class="app-nav-item" @click="change(index)"
				      :class="{'app-active-current': catStyle === 1 && activeCurrent === index,
				      'app-active-current-round': catStyle === 2 && activeCurrent === index,
				      'app-current-round': catStyle === 2
				      }"
				      :key="index"
				      v-for="(item, index) in catList"
				>{{item.menuName}}
				</text>
			</scroll-view>
		</template>
		<template v-if="showCat && catPosition === 'left'">
		
		</template>
		<template v-else>
			<app-form-id>
				<view class="goods-list" :class="listClass">
					<block v-for="(goods, index) in newData" :key="index">
						<template v-if="listStyle === -1">
							<!-- 列表模式 -->
							<view :style="[{'background-color':`${goodsStyle != 3 ? '#fff' : ''}`}]" class="goods-item app-list-mode dir-left-nowrap" @click="jump(goods)"
							      :class="goodsStyle === 3 ? 'no-border' : goodsStyle === 2 ? 'border' : ''">
			                    <view :style="[{'border-radius': `${lisRadius}`}]" class="out-dialog" v-if="(goods.goods_stock == 0 || (goods.goods && goods.goods.goods_stock == 0)) && appSetting.is_show_stock == '1'">
			                        <image :style="[{'border-radius': `${lisRadius}`}]" :src="appSetting.is_use_stock == '1' ? appImg.plugins_out : appSetting.sell_out_pic"></image>
			                    </view>
								<view class="box-grow-0">
									<app-image
											:borderRadius="lisRadius"
											v-if="sign === 'advance'"
											:img-src="goods.goods.goodsWarehouse.cover_pic"
											width="200rpx"
											height="200rpx"
											:mode="fill === 1 ? 'aspectFill' : 'aspectFit'"
									></app-image>
									<app-image
											v-else
											:borderRadius="lisRadius"
											:img-src="goods.cover_pic"
											width="200rpx"
											height="200rpx"
								           :mode="fill === 1 ? 'aspectFill' : 'aspectFit'"
									></app-image>

								</view>
								<view class="goods-tag" v-if="showGoodsTag">
									<app-image :img-src="goodsTagPicUrl" width="64rpx" height="64rpx"></app-image>
								</view>
								<view class="right box-grow-1 dir-top-nowrap main-between">
									<view class="box-grow-0 goods-name t-omit-two">
										<text class="dir-tag-def"
										      v-if="tag && sign === 'advance'"
										>
											{{goods.people_num ? goods.people_num : ''}}{{tag}}
										</text>
										<text class="dir-tag-def"
											  v-if="tag && sign === 'pick'"
										>
											{{goods.people_num ? goods.people_num : ''}}{{tag}}
										</text>
										<text class="tag"
										      :class="theme + '-color ' + theme + '-border'"
										      v-if="tag && sign !== 'advance' && sign !== 'pick' && ((sign == 'pintuan' && goods.people_num) || sign != 'pintuan')"
										>
											{{goods.people_num ? goods.people_num : ''}}{{tag}}
										</text>
										<text v-if="sign === 'advance'">{{showGoodsName ? goods.goods.goodsWarehouse.name : ''}}</text>
										<text v-else>{{showGoodsName ? goods.name : ''}}</text>
									</view>
									<view class=" dir-top-nowrap main-around box-grow-1">
										<view class="box-grow-0 timer" v-if="showTimer">
											<app-goods-timer
													v-if="sign === 'advance'"
													 :list-style="listStyle"
									                 :start-date-time="goods.start_prepayment_at"
									                 :end-date-time="goods.end_prepayment_at"
									                 :sign="sign" :page-hide="pageHide"
											></app-goods-timer>
											<app-goods-timer
													v-else
													:list-style="listStyle"
													:start-date-time="goods.start_time"
													:end-date-time="goods.end_time"
													:sign="sign" :page-hide="pageHide"
											></app-goods-timer>
										</view>
										<view class="price dir-left-nowrap cross-bottom">
											<view class="box-grow-1" :class="theme + '-color '">
												<view v-if="goods.is_level == 1 && goods.is_negotiable != 1 && sign !== 'advance' && sign !== 'pick'">
													<app-member-price :price="goods.level_price"></app-member-price>
												</view>
												<template v-if="sign !== 'pick'">
													<app-sup-vip  :is_vip_card_user="goods.vip_card_appoint.is_vip_card_user" v-if="sign != 'advance' && goods.vip_card_appoint.discount > 0" margin="8rpx 0 0" :discount="goods.vip_card_appoint.discount"></app-sup-vip>
												</template>

												<template v-if="sign === 'advance'">
													<text class="des-price">
														定金￥{{goods.deposit}}抵￥{{goods.swell_deposit}}
													</text>
													<view class="dir-left-nowrap cross-center">
														<view class="advance-member" v-if="goods.is_level == 1 && goods.is_negotiable != 1">
															<app-member-price :price="goods.level_price"></app-member-price>
														</view>
														<app-sup-vip :is_vip_card_user="goods.vip_card_appoint.is_vip_card_user" margin="8rpx 0 0" v-if="goods.vip_card_appoint.discount > 0" :discount="goods.vip_card_appoint.discount"></app-sup-vip>
													</view>
													<view class="dir-left-nowrap main-left cross-center" v-if="showGoodsPrice">
														<view>￥{{showGoodsPrice ?
															goods.goods.price :
															''}}
														</view>
														<view class="original-price" style="margin-left: 10upx;" v-if="goods.goods.goodsWarehouse.original_price">
															￥{{goods.goods.goodsWarehouse.original_price}}
														</view>
													</view>
												</template>

												<template v-else-if="sign === 'pick'">
													<text class="tag">
														{{goods.rule_price}}元选{{goods.rule_num}}{{goods.unit}}
													</text>
													<view class="dir-left-nowrap cross-center">
<!--														<view class="advance-member" v-if="goods.is_level == 1 && goods.is_negotiable != 1">-->
<!--															<app-member-price :price="goods.level_price"></app-member-price>-->
<!--														</view>-->
														<app-sup-vip :is_vip_card_user="goods.vip_card_appoint.is_vip_card_user" margin="8rpx 0 0" v-if="goods.vip_card_appoint.discount > 0" :discount="goods.vip_card_appoint.discount"></app-sup-vip>
													</view>
													<view class="dir-left-nowrap main-left cross-center" v-if="showGoodsPrice">
														<view>￥{{showGoodsPrice ?
															goods.price :
															''}}
														</view>
														<view class="original-price" style="margin-left: 10upx;" v-if="goods.original_price">
															￥{{goods.original_price}}
														</view>
													</view>
												</template>

												<template v-else>
													<view class="t-omit">{{showGoodsPrice || sign !== 'goods' ?
														goods.price_content :
														''}}
													</view>
													<view class="original-price" v-if="goods.original_price && (showGoodsPrice || sign !== 'goods')">
														￥{{goods.original_price}}
													</view>
												</template>
											</view>
											<template v-if="showBuyBtn && goods.is_negotiable != 1 && goods.goods_stock != 0 && (goods.goods && goods.goods.goods_stock != 0)">
												<view @click.stop="buyProduct(goods)"
												      class="box-grow-0 buy-btn main-center cross-center"
												      :style="btnStyle"
												      :class="buyBtnClass" v-if="buyBtn === 'text' || sign !== 'goods'">
													{{buyBtnText}}
												</view>
												<icon @click.stop="buyProduct(goods)"
												      class="box-grow-0 app-button-icon"
												      :class="'app-button-icon-' + buyBtn" v-else></icon>
											</template>
										</view>
									</view>
								</view>
							</view>
						</template>
						<template v-else-if="listStyle === 0">
							<!-- 左右滑动 -->
							<view :style="[{'background-color':`${goodsStyle != 3 ? '#fff' : ''}`}]" class="goods-item app-scroll dir-top-nowrap" :class="goodsClass" @click="jump(goods)">
			                    <view :style="[{'border-radius': `${imgRadius}`}]" class="out-dialog" v-if="(goods.goods_stock == 0 || (goods.goods && goods.goods.goods_stock == 0)) && appSetting.is_show_stock == '1'">
			                        <image :style="[{'border-radius': `${imgRadius}`}]" :src="appSetting.is_use_stock == '1' ? appImg.plugins_out : appSetting.sell_out_pic"></image>
			                    </view>
								<view>
									<app-image :borderRadius="imgRadius" :img-src="goods.cover_pic" width="200rpx" height="200rpx"
									           :mode="fill === 1 ? 'aspectFill' : 'aspectFit'"></app-image>
								</view>
								<view class="goods-tag" v-if="showGoodsTag">
									<app-image :img-src="goodsTagPicUrl" width="64rpx" height="64rpx"></app-image>
								</view>
								<view class="goods-name t-omit-two" v-if="showGoodsName">{{goods.name}}</view>
								<view class="box-grow-1 dir-top-nowrap main-right price">
									<view v-if="goods.is_level == 1 && goods.is_negotiable != 1 && sign !== 'pick'">
										<app-member-price :price="goods.level_price"></app-member-price>
									</view>
									<app-sup-vip :is_vip_card_user="goods.vip_card_appoint.is_vip_card_user" margin="8rpx 0 0" v-if="goods.vip_card_appoint.discount > 0" :discount="goods.vip_card_appoint.discount"></app-sup-vip>
									<view class="dir-left-nowrap cross-center">
										<view class="box-grow-1 t-omit" :class="theme + '-color'">
											{{showGoodsPrice ? goods.price_content : ''}}
										</view>
										<template v-if="showBuyBtn && textStyle != 2 && goods.is_negotiable != 1 && goods.goods_stock != 0 && (goods.goods && goods.goods.goods_stock != 0)">
											<view @click.stop="buyProduct(goods)"
											      class="box-grow-0 buy-btn main-center cross-center" :style="btnStyle"
											      :class="buyBtnClass" v-if="buyBtn === 'text'">
												{{buyBtnText}}
											</view>
											<icon @click.stop="buyProduct(goods)" class="box-grow-0 app-button-icon"
											      :class="'app-button-icon-' + buyBtn" v-else></icon>
										</template>
									</view>
								</view>
							</view>
						</template>
						<template v-else-if="listStyle === 1">
							<!-- 一行一个 -->
							<view :style="[{'background-color':`${goodsStyle != 3 ? '#fff' : ''}`}]" class="goods-item app-column-1" :class="goodsClass" @click="jump(goods)">
								<view style="position: relative;">
				                    <view class="out-dialog" :style="[{'height':`${coverPicHeight}`,'border-radius': `${imgRadius}`}]" v-if="(goods.goods_stock == 0 || (goods.goods && goods.goods.goods_stock == 0)) && appSetting.is_show_stock == '1'">
				                        <image v-if="coverPicHeight == '468rpx'" :style="[{'height':`${coverPicHeight}`,'border-radius': `${imgRadius}`}]" :src="appSetting.is_use_stock == '1' ? appImg.rate_out : appSetting.sell_out_other_pic"></image>
				                        <image v-else :style="[{'height':`${coverPicHeight}`,'border-radius': `${imgRadius}`}]" :src="appSetting.is_use_stock == '1' ? appImg.one_out : appSetting.sell_out_pic"></image>
				                    </view>
									<view>
										<app-image :borderRadius="imgRadius" v-if="sign === 'advance'"
										           :img-src="goods.goods.goodsWarehouse.cover_pic"
										           width="100%"
										           :height="coverPicHeight"
										           :mode="fill === 1 ? 'aspectFill' : 'aspectFit'"
										></app-image>
										<app-image :borderRadius="imgRadius" v-else
										           :img-src="goods.cover_pic"
										           width="100%"
										           :height="coverPicHeight"
										           :mode="fill === 1 ? 'aspectFill' : 'aspectFit'"
										></app-image>
									</view>
									<view class="goods-tag" v-if="showGoodsTag">
										<app-image :img-src="goodsTagPicUrl"
										           width="64rpx"
										           height="64rpx"
										>
										</app-image>
									</view>
									<view class="box-grow-0 timer" v-if="showTimer">
										<template v-if="sign === 'advance'">
											<app-goods-timer
													:list-style="listStyle"
													:start-date-time="goods.start_prepayment_at"
													:end-date-time="goods.end_prepayment_at"
													:sign="sign" :page-hide="pageHide"
											></app-goods-timer>
										</template>
										<template v-else>
											<app-goods-timer
													:list-style="listStyle"
													:start-date-time="goods.start_time"
													:end-date-time="goods.end_time"
													:sign="sign" :page-hide="pageHide"
											></app-goods-timer>
										</template>
									</view>
								</view>
								<view class="goods-name t-omit" v-if="showGoodsName">
									<template v-if="sign === 'advance'">
										<text>{{showGoodsName ? goods.goods.goodsWarehouse.name : ''}}</text>
									</template>
									<template v-if="sign === 'pick'">
										<text class="tag-pick" :class="theme + '-color ' + theme + '-border'" v-if="tag && sign == 'pick'">
											{{tag}}
										</text>
										<text>{{showGoodsName ? goods.name : ''}}</text>
									</template>
									<template v-else>
										<text class="tag" :class="theme + '-color ' + theme + '-border'" v-if="tag && sign == 'pintuan' && goods.people_num">
											{{goods.people_num ? goods.people_num : ''}}{{tag}}
										</text>
										<text>{{showGoodsName ? goods.name : ''}}</text>
									</template>
								</view>
								<template v-if="sign === 'advance' ">
									<text class="des-price" style="margin-left: 24rpx;margin-top: 15rpx;">
										定金￥{{goods.deposit}}抵￥{{goods.swell_deposit}}
									</text>
								</template>
								<template v-if="sign === 'pick'">
									<text class="des-price" style="margin-left: 24rpx;margin-top: 15rpx;">
										{{goods.rule_price}}元选{{goods.rule_num}}{{goods.unit}}
									</text>
								</template>
								<view class="price dir-left-nowrap cross-center" :style="{marginTop: sign === 'advance' ? '0rpx' : '16rpx'}">
									<view class="box-grow-1 t-omit" :class="theme + '-color'">
										<view v-if="sign === 'advance'" class="dir-left-nowrap cross-center" :class="textStyle == 2 ? 'main-center' : ''">
											<view v-if="goods.goods.is_level == 1">
												<app-member-price :price="goods.level_price"></app-member-price>
											</view>
											<app-sup-vip :is_vip_card_user="goods.vip_card_appoint.is_vip_card_user" margin='0 0 0 12rpx' v-if="goods.vip_card_appoint.discount > 0" :discount="goods.vip_card_appoint.discount"></app-sup-vip>
										</view>
										<template v-if="sign === 'advance'">
											<view :class="{'dir-left-nowrap': goods.goods.is_level == 1}" v-if="showGoodsPrice">
												<view class="dir-left-nowrap cross-center" :class="{'main-center' :textStyle == 2}">
													<view style="font-size: 22rpx;height: 22rpx;line-height: 22rpx">{{showGoodsPrice ? `￥${goods.goods.price}` : ''}}</view>
												</view>
												<view class="original-price" style="font-size: 17rpx;height:17rpx;line-height: 17rpx;" v-if="goods.goods.goodsWarehouse.original_price">
													￥{{goods.goods.goodsWarehouse.original_price}}
												</view>
											</view>
										</template>
										<template v-else>
											<view class="dir-left-nowrap cross-center" :class="textStyle == 2 ? 'main-center' : ''">
												<view>{{showGoodsPrice || sign !== 'goods' ? goods.price_content : ''}}</view>
												<view class="member-price" v-if="goods.is_level == 1 && goods.is_negotiable != 1 && sign !== 'pick'">
													<app-member-price margin="" :price="goods.level_price"></app-member-price>
												</view>
												<app-sup-vip :is_vip_card_user="goods.vip_card_appoint.is_vip_card_user" margin='0 0 0 12rpx' v-if="goods.vip_card_appoint.discount > 0" :discount="goods.vip_card_appoint.discount"></app-sup-vip>
											</view>
											<view class="original-price" v-if="goods.original_price && (showGoodsPrice || sign !== 'goods')">
												￥{{goods.original_price}}
											</view>
										</template>
									</view>
									<template v-if="showBuyBtn && textStyle != 2 && goods.is_negotiable != 1 && goods.goods_stock != 0 && (goods.goods && goods.goods.goods_stock != 0)">
										<view @click.stop="buyProduct(goods)"
										      class="box-grow-0 buy-btn main-center cross-center" :style="btnStyle"
										      :class="buyBtnClass" v-if="buyBtn === 'text' || sign !== 'goods'">
											{{buyBtnText}}
										</view>
										<icon @click.stop="buyProduct(goods)" class="box-grow-0 app-button-icon"
										      :class="'app-button-icon-' + buyBtn" v-else></icon>
									</template>
								</view>
							</view>
						</template>
						<template v-else-if="listStyle === 2">
							<!-- 一行两个 -->
							<view :style="[{'background-color':`${goodsStyle != 3 ? '#fff' : ''}`}]" class="box-grow-0 dir-top-nowrap goods-item app-column-2" :class="goodsClass"
							      @click="jump(goods)">
								<view style="position: relative;">
				                    <view :style="[{'border-radius': `${imgRadius}`}]" class="out-dialog" v-if="(goods.goods_stock == 0 || (goods.goods && goods.goods.goods_stock == 0)) && appSetting.is_show_stock == '1'">
				                        <image :style="[{'border-radius': `${imgRadius}`}]" :src="appSetting.is_use_stock == '1' ? appImg.book_out : appSetting.sell_out_pic"></image>
				                    </view>
									<view class="box-grow-0">
										<template v-if="sign === 'advance'">
											<app-image :borderRadius="imgRadius" :img-src="goods.goods.goodsWarehouse.cover_pic"
											           width="100%"
											           height="342rpx"
											           :mode="fill === 1 ? 'aspectFill' : 'aspectFit'"
											></app-image>
										</template>
										<template v-else>
											<app-image :borderRadius="imgRadius" :img-src="goods.cover_pic" width="100%" height="342rpx"
											           :mode="fill === 1 ? 'aspectFill' : 'aspectFit'"></app-image>
										</template>
									</view>
									<view class="goods-tag" v-if="showGoodsTag">
										<app-image :img-src="goodsTagPicUrl" width="64rpx"
										           height="64rpx"></app-image>
									</view>
									<view class="box-grow-0 timer" v-if="showTimer">
										<template v-if="sign === 'advance'">
											<app-goods-timer :list-style="listStyle" :start-date-time="goods.start_prepayment_at"
											                 :end-date-time="goods.end_prepayment_at"
											                 :sign="sign" :page-hide="pageHide"
											></app-goods-timer>
										</template>
										<template v-else>
											<app-goods-timer :list-style="listStyle" :start-date-time="goods.start_time"
											                 :end-date-time="goods.end_time"
											                 :sign="sign" :page-hide="pageHide"
											></app-goods-timer>
										</template>
									</view>
								</view>
								<view class="box-grow-1 dir-top-nowrap main-between">
									<view class="box-grow-0 goods-name t-omit-two" v-if="showGoodsName">
										<template v-if="sign !== 'advance' && sign !== 'pick'">
											<text class="tag" :class="theme + '-color ' + theme + '-border'" v-if="tag && ((sign == 'pintuan' && goods.people_num) || sign != 'pintuan')">
												{{goods.people_num ? goods.people_num : ''}}{{tag}}
											</text>
										</template>
										<template v-if="sign === 'pick'">
											<text class="dir-tag-def">
												{{tag}}
											</text>
										</template>
<!--										<template v-else>-->
<!--											<text class="dir-tag-def">-->
<!--												{{tag}}-->
<!--											</text>-->
<!--										</template>-->
										<text v-if="sign === 'advance'">{{showGoodsName ? goods.goods.goodsWarehouse.name : ''}}</text>
										<text v-else>{{showGoodsName ? goods.name : ''}}</text>
									</view>
									<view v-if="sign === 'advance'">
										<text class="des-price" style="margin-left: 24rpx;">
											定金￥{{goods.deposit}}抵￥{{goods.swell_deposit}}
										</text>
									</view>
									<view v-if="sign === 'pick'">
										<text class="des-price" style="margin-left: 24rpx;">
											{{goods.rule_price}}元选{{goods.rule_num}}{{goods.unit}}
										</text>
									</view>
									<view :class="textStyle == 2 ? 'main-center' : 'dir-left-nowrap'" style="height: 15px;padding-left: 24rpx;" v-if="sign === 'advance' && goods.goods.is_level == 1 && goods.is_negotiable != 1">
										<view class="member-price">
											<app-member-price :price="goods.level_price"></app-member-price>
										</view>
									</view>
									<app-sup-vip :is_vip_card_user="goods.vip_card_appoint.is_vip_card_user" style="padding-left: 24rpx;" :class="textStyle == 2 ? 'main-center' : ''" margin="4rpx 0" v-if="goods.vip_card_appoint.discount > 0 && sign === 'advance'" :discount="goods.vip_card_appoint.discount"></app-sup-vip>
									<view class="box-grow-0 price dir-left-nowrap cross-center main-between" :style="{marginTop: sign === 'advance' ? '0rpx' : '16rpx'}">
										<template v-if="sign === 'advance'">
											<view :class="textStyle == 2 ? 'main-center advance-center' : ''" style="width: 100%" v-if="showGoodsPrice">
												<view class="dir-top-nowrap main-right cross-top" :class="theme + '-color'">
													<text class="t-omit" style="font-size: 22rpx;height: 22rpx; line-height: 22rpx">
														{{showGoodsPrice ? `￥${goods.goods.price}` : ''}}
													</text>
													<text class="original-price" style="font-size: 17rpx;height: 22rpx; line-height: 22rpx" v-if="goods.goods.goodsWarehouse.original_price">
														￥{{goods.goods.goodsWarehouse.original_price}}
													</text>
												</view>
											</view>
										</template>
										<template v-else>
											<view class="box-grow-1" :class="theme + '-color'">
												<view class="member-price" :class="textStyle == 2 ? 'main-center' : ''" v-if="goods.is_level == 1 && goods.is_negotiable != 1 && sign !== 'pick'">
													<app-member-price :price="goods.level_price"></app-member-price>
												</view>
												<view :class="textStyle == 2 ? 'main-center' : ''">
													<app-sup-vip :is_vip_card_user="goods.vip_card_appoint.is_vip_card_user" :margin="textStyle == 2 ? '0':'8rpx 0 0'" v-if="goods.vip_card_appoint.discount > 0" :discount="goods.vip_card_appoint.discount"></app-sup-vip>
												</view>
												<view class="t-omit">
													{{showGoodsPrice || sign !== 'goods' ? goods.price_content : ''}}
												</view>
												<view class="original-price" v-if="goods.original_price && (showGoodsPrice || sign !== 'goods')">
													￥{{goods.original_price}}
												</view>
											</view>
										</template>
										<template v-if="showBuyBtn && textStyle !== 2 && goods.is_negotiable != 1 && goods.goods_stock != 0 && (goods.goods && goods.goods.goods_stock != 0)">
											<view @click.stop="buyProduct(goods)"
											      class="box-grow-0 buy-btn main-center cross-center"
											      :style="btnStyle"
											      :class="buyBtnClass" v-if="buyBtn === 'text' || sign !== 'goods'">
												{{buyBtnText}}
											</view>
											<icon @click.stop="buyProduct(goods)"
											      class="box-grow-0 app-button-icon"
											      :class="'app-button-icon-' + buyBtn" v-else></icon>
										</template>
									</view>
								</view>
							</view>
						</template>
						<template v-else-if="listStyle === 3">
							<!-- 一行三个 -->
							<view :style="[{'background-color':`${goodsStyle != 3 ? '#fff' : ''}`}]" class="box-grow-0 dir-top-nowrap goods-item app-column-3" :class="goodsClass"
							      @click="jump(goods)">
			                    <view class="out-dialog" :style="[{'border-radius': `${imgRadius}`}]" v-if="(goods.goods_stock == 0 || (goods.goods && goods.goods.goods_stock == 0)) && appSetting.is_show_stock == '1'">
			                        <image :style="[{'border-radius': `${imgRadius}`}]" :src="appSetting.is_use_stock == '1' ? appImg.list_out : appSetting.sell_out_pic" :mode="fill === 1 ? 'aspectFill' : 'aspectFit'"></image>
			                    </view>
								<view class="box-grow-0">
									<app-image :borderRadius="imgRadius" :img-src="goods.cover_pic" width="100%" height="220rpx"
									           :mode="fill === 1 ? 'aspectFill' : 'aspectFit'"></app-image>
								</view>
								<view class="goods-tag" v-if="showGoodsTag">
									<app-image :img-src="goodsTagPicUrl" width="64rpx" height="64rpx"></app-image>
								</view>
								<view class="box-grow-1 dir-top-nowrap main-between">
									<view class="box-grow-0 goods-name t-omit-two" v-if="showGoodsName">
										{{goods.name}}
									</view>
									<view class="box-grow-1 dir-top-nowrap main-right">
										<view class="box-grow-0 member-price price" :class="textStyle == 2 ? 'main-center' : ''" v-if="goods.is_level == 1 && goods.is_negotiable != 1 && sign !== 'pick'">
											<app-member-price :price="goods.level_price"></app-member-price>
										</view>
										<view :class="textStyle == 2 ? 'main-center' : ''">
											<app-sup-vip :is_vip_card_user="goods.vip_card_appoint.is_vip_card_user" :margin="textStyle == 2 ? '0':'8rpx 0 0'" v-if="goods.vip_card_appoint.discount > 0" :discount="goods.vip_card_appoint.discount"></app-sup-vip>
										</view>
										<view class="box-grow-0 price dir-left-nowrap cross-center main-between">
											<view class="box-grow-1" :class="theme + '-color'">
												{{showGoodsPrice || sign !== 'goods' ? goods.price_content : ''}}
											</view>
											<template
													v-if="showBuyBtn && textStyle != 2 && buyBtn !== 'text' && goods.is_negotiable != 1 && goods.goods_stock != 0 && (goods.goods && goods.goods.goods_stock != 0)">
												<icon @click.stop="buyProduct(goods)"
													  class="box-grow-0 app-button-icon"
													  :class="'app-button-icon-' + buyBtn"></icon>
											</template>
										</view>
									</view>
								</view>
							</view>
						</template>
					</block>
				</view>
			</app-form-id>
		</template>
		<app-attr :goods="goods" :attrGroupList="goods?goods.attr_groups:null" :show="attrShow"></app-attr>
	</view>

</template>

<script>
    import { mapState, mapGetters } from "vuex";
    import appPrice from "../../page-component/goods/app-price.vue";
    import appGoodsTimer from "./app-goods-timer.vue";
    import appAttr from "../../page-component/app-attr/app-attr.vue";
    import appMemberPrice from "../app-member-mark/app-member-price.vue";
	import appSupVip from '../app-sup-vip/app-sup-vip.vue';
	
    export default {
        name: "app-diy-goods-list",
        components: {
            'app-price': appPrice,
            'app-goods-timer': appGoodsTimer,
            'app-attr': appAttr,
            'app-member-price': appMemberPrice,
	        'app-sup-vip': appSupVip,
        },
        props: {
            catPosition: {
                type: String,
                default() {
                    return 'top';
                }
            },
            showCat: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            catList: {
                type: Array,
                default() {
                    return [];
                }
            },
            catStyle: {
                type: Number,
                default() {
                    return 1;
                }
            },
            list: {
                type: Array,
                default() {
                    return [];
                }
            },
            goodsStyle: {
                type: Number,
                default() {
                    return 1;
                }
            },
            textStyle: {
                type: Number,
                default() {
                    return 1;
                }
            },
            listStyle: {
                type: Number,
                default() {
                    return -1;
                }
            },
            showBuyBtn: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            buyBtn: {
                type: String,
                default() {
                    return 'cart';
                }
            },
            buyBtnText: {
                type: String,
                default() {
                    return '购买';
                }
            },
            buyBtnStyle: {
                type: Number,
                default() {
                    return 1;
                }
            },
            fill: {
                type: Number,
                default() {
                    return 1;
                }
            },
            showGoodsName: {
                type: Boolean,
                default() {
                    return true;
                }
            },
            showGoodsPrice: {
                type: Boolean,
                default() {
                    return true;
                }
            },
            showGoodsTag: {
                type: Boolean,
                default() {
                    return true;
                }
            },
            goodsCoverProportion: {
                type: String,
                default() {
                    return '1-1';
                }
            },
            customizeGoodsTag: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            goodsTagPicUrl: String,
            sign: String,
            buttonColor: {
                type: String,
                default() {
                    return '#ff4544';
                }
            },
			pageHide: Boolean,
        },
        data() {
            return {
                activeCurrent: 0,
                goods: null,
                imgRadius: '16rpx 16rpx 0 0',
                lisRadius: '16rpx',
                attrShow: 0,
            };
        },
        computed: {
            ...mapState({
                appImg: state => state.mallConfig.__wxapp_img.mall,
                appSetting: state => state.mallConfig.mall.setting,
                theme: state => state.mallConfig.theme
            }),
            ...mapGetters('mallConfig',{
                vip: 'getVip',
				getVideo: 'getVideo'
            }),
            newData() {
                if (this.showCat) {
                    return this.catList[this.activeCurrent].goodsList
                } else {
                    return this.list;
                }
            },
            listClass() {
                let listClass = ``;
                if (this.listStyle === 0) {
                    return `dir-left-nowrap scroll`;
                } else if (this.listStyle === 2) {
                    return `dir-left-wrap column-2 main-between `;
                } else if (this.listStyle === 3) {
                    return `dir-left-wrap column-3 `;
                }
                return listClass;
            },
            buyBtnClass() {
                let buyBtnClass = ``;
                if (this.buyBtnStyle === 2 || this.buyBtnStyle === 4) {
                    buyBtnClass += `buy-btn-border `;
                }
                if (this.buyBtnStyle === 4 || this.buyBtnStyle === 3) {
                    buyBtnClass += `buy-btn-radius`;
                }
                return buyBtnClass;
            },
            btnStyle() {
                let btnStyle = ``;
                if (this.buyBtnStyle === 1 || this.buyBtnStyle === 3) {
                    btnStyle += `background-color: ${this.buttonColor};color: #ffffff;`;
                } else {
                    btnStyle += `border-color: ${this.buttonColor};color: ${this.buttonColor};`;
                }
                return btnStyle;
            },
            coverPicHeight() {
                if (this.goodsCoverProportion === '1-1') {
                    return `702rpx`;
                } else {
                    return `468rpx`;
                }
            },
            goodsClass() {
                let goodsClass = ``;
                if (this.goodsStyle === 2) {
                    goodsClass += `border `;
                }
                if (this.textStyle === 2) {
                    goodsClass += `text-center `;
                }
                return goodsClass;
            },
            tag() {
                let tag = '';
                if (this.sign === 'miaosha') {
                    tag = '秒杀';
                } else if (this.sign === 'bargain') {
                    tag = '砍价';
                } else if (this.sign === 'pintuan') {
                    tag = '人团';
                } else if (this.sign === 'advance') {
                    tag = '预售';
                } else if (this.sign === 'pick') {
                	tag = 'N元任选'
				} else {
					tag = null;
				}
                return tag;
            },
            showTimer() {
                if (this.sign === 'miaosha' || this.sign === 'bargain' || this.sign === 'lottery' || this.sign === 'advance') {
                    return true;
                } else {
                    return false;
                }
            }
        },
        methods: {
            change(index) {
                this.activeCurrent = index;
            },
            jump(data) {
            	console.log(data);
				// #ifndef MP-BAIDU
				if (data.video_url && this.getVideo == 1 && data.sign !== 'lottery' && data.sign !== 'bargain') {
					let id = data.id;
					if (data.sign === 'advance') {
						id = data.goods_id;
					}
					uni.navigateTo({
						url: `/pages/goods/video?goods_id=${id}&sign=${data.sign}`
					});
				} else {
					uni.navigateTo({
						url: data.page_url
					});
				}
				// #endif

				// #ifdef MP-BAIDU
				uni.navigateTo({
					url: data.page_url
				});
				// #endif
            },
            buyProduct(goods) {
                if (!(this.sign == 'goods' || this.sign == 'mch') || (typeof goods.is_negotiable != 'undefined' && goods.is_negotiable == 1)) {
                    this.jump(goods);
                    return;
                }
                uni.showLoading();
                let url = this.$api.goods.detail;
                if (goods.mch_id > 0) {
                    url = this.$api.mch.goods_detail;
                }
                this.$request({
                    url: url,
                    data: {
                        id: goods.id,
                        mch_id: goods.mch_id,
                    }
                }).then(response => {
                    uni.hideLoading();
                    if (response.code === 0) {
                        if (goods.mch_id > 0) {
                            this.goods = response.data.detail;
                        } else {
                            this.goods = response.data.goods;
                        }
                        this.attrShow = Math.random();
                    } else {
                        uni.showModal({
                            title: '提示',
                            content: response.msg,
                            showCancel: false
                        });
                    }
                }).catch(e => {
                    uni.hideLoading();
                });
            },
        }
    }
</script>

<style scoped lang="scss">
	.advance-member {
		margin-right: #{12rpx};
	}

	.advance-center .original-price {
		width: 100%;
		text-align: center;
	}

    .app-goods-list {
        .app-scroll-view {
            white-space: nowrap;
            width: #{750-5-5rpx};
            margin: 0 #{5rpx};
            height: #{99-1rpx};
            // background-color: #ffffff;
            // border-bottom: #{1rpx} solid #e2e2e2;
            /* #ifdef MP-ALIPAY */
            .app-nav-item {
                display: inline-block;
                height: #{97rpx};
                min-width: #{60rpx};
                line-height: #{97rpx};
                font-size: #{26rpx};
                color: #666666;
                margin: 0 #{44rpx};
                border-bottom: #{1rpx} solid transparent;
            }

            /* #endif */
            /* #ifndef MP-ALIPAY */
            .app-nav-item {
                display: inline-block;
                height: #{97rpx};
                line-height: #{97rpx};
                font-size: #{26rpx};
                color: #666666;
                margin: 0 #{44rpx};
                border-bottom: #{1rpx} solid transparent;
            }

            /* #endif */
            .app-active-current {
                border-bottom-color: #ff5c5c;
                color: #ff5c5c;
            }

            /* #ifdef MP-ALIPAY */
            .app-current-round {
                height: #{56rpx};
                padding-left: #{24rpx};
                min-width: #{100rpx};
                padding-right: #{24rpx};
                border-radius: #{30rpx};
                line-height: #{56rpx};
                margin: #{21.5rpx} #{24rpx};
            }

            /* #endif */
            /* #ifndef MP-ALIPAY */
            .app-current-round {
                height: #{56rpx};
                padding-left: #{24rpx};
                padding-right: #{24rpx};
                border-radius: #{30rpx};
                line-height: #{56rpx};
                margin: #{21.5rpx} #{24rpx};
            }

            /* #endif */
            .app-active-current-round {
                background-color: #ff5c5c;
                color: white;
            }

        }

        %background-image {
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
        }

        .goods-list {
            padding: #{24rpx};
            font-size: $uni-font-size-general-one;

            .border {
                border: #{1rpx} solid #e2e2e2;
            }

            .goods-item {
                position: relative;

                .app-button-icon {
                    width: #{36rpx};
                    height: #{36rpx};
                    display: block;
                    @extend %background-image;
                }

                .app-button-icon-cart {
                    background-image: url('../../../static/image/icon/shopping-cart.png');
                }

                .app-button-icon-add {
                    background-image: url('../../../static/image/icon/add-to.png');
                }

                .buy-btn {
                    height: #{48rpx};
                    padding: 0 #{20rpx};
                }

                .buy-btn-radius {
                    border-radius: #{24rpx};
                }

                .buy-btn-border {
                    border: #{1rpx} solid;
                }

                .goods-tag {
                    position: absolute;
                    left: 0;
                    top: 0;
                    z-index: 10;
                    width: #{64rpx};
                    height: #{64rpx};
                }

                .original-price {
                    font-size: $uni-font-size-weak-two;
                    color: $uni-general-color-two;
                    text-decoration: line-through;
                }

                .tag {
                    padding: 0 #{10rpx};
                    margin-right: #{8rpx};
                    font-size: $uni-font-size-weak-two;
                    border-radius: #{28rpx};
                    border: #{2rpx} solid;
                }

                .timer {
                    width: 100%;
                }

                .pintuan-tag {
                    font-size: $uni-font-size-weak-two;
                    margin: #{16rpx} #{12rpx} 0 0;
                    padding: 0 #{24rpx};

                    .people {
                        width: #{70rpx};
                        text-align: center;
                        border: #{1rpx} solid;
                        border-radius: #{2rpx};
                        padding: #{2rpx} 0;
                    }
                }
            }

            .app-list-mode {
                margin-bottom: #{32rpx};
                position: relative;
                border-radius: #{16rpx};

                .right {
                    padding: #{12rpx} #{24rpx} #{12rpx} #{32rpx};
					height: #{200rpx};
                }

                &:last-child {
                    margin-bottom: 0;
                }

                .pintuan-tag {
                    padding: 0;
                }

                .out-dialog {
			        width: #{200rpx};
			        height: 100%;
			        position: absolute;
			        z-index: 10;
			        top: 0;
			        left: 0;
			        background-color: rgba(0,0,0,.5);
			        image {
			            width: #{200rpx};
			            height: #{200rpx};
			        }
                }
            }

            .app-column-1 {
                margin-bottom: #{24rpx};
                padding-bottom: #{24rpx};
                border-radius: #{16rpx};
			    .out-dialog {
			        width: 100%;
			        height: #{702rpx};
			        z-index: 10;
			        position: absolute;
			        top: 0;
			        left: 0;
			        background-color: rgba(0,0,0,.5);
			        image {
			            width: #{702rpx};
			            height: #{702rpx};
			        }
			    }

                .goods-name {
                    margin-top: #{28rpx};
                    padding: 0 #{24rpx};
                    line-height: 1.4;
                }

                .price {
                    margin-top: #{16rpx};
                    padding: 0 #{24rpx};
                    max-width: #{702rpx};

                    .member-price {
                        margin-left: #{10rpx};
                    }
                }

                .timer {
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    z-index: 10;
                }

                .pintuan-tag {
                    margin: 0;
                    padding-left: 0;

                }
            }

            &.scroll {
                overflow-x: auto;
                padding: #{24rpx};
                .app-scroll {
                	border-radius: #{16rpx};
                    margin-right: #{16rpx};
                    padding-bottom: #{16rpx};
                    width: #{200rpx};
		            position: relative;
				    .out-dialog {
				        width: 100%;
				        height: #{200rpx};
				        z-index: 10;
				        position: absolute;
				        top: 0;
				        left: 0;
				        background-color: rgba(0,0,0,.5);
				        image {
				            width: #{200rpx};
				            height: #{200rpx};
				        }
				    }
                    .goods-name {
                        margin-top: #{16rpx};
                        width: #{200rpx};
                        line-height: 1.4;
                    }

                    .price {
                        padding: 0 #{12rpx};
                        max-width: #{200rpx};
                    }
                }
            }

            &.column-2 {
				padding: #{24rpx} #{23rpx} 0 #{23rpx};
				.app-column-2 {
					margin-bottom: #{24rpx};
                    padding-bottom: #{24rpx};
                	border-radius: #{16rpx};
					width: #{346rpx};
				    .out-dialog {
				        width: 100%;
				        height: #{342rpx};
				        position: absolute;
				        z-index: 10;
				        top: 0;
				        left: 0;
				        background-color: rgba(0,0,0,.5);
				        image {
				            width: #{342rpx};
				            height: #{342rpx};
				        }
				    }

                    .goods-name {
                        margin-top: #{24rpx};
                        padding: 0 #{24rpx};
                        width: #{344rpx};
                        line-height: 1.4;
                    }

                    .price {
                        margin-top: #{16rpx};
                        padding: 0 #{24rpx};
                        max-width: #{344rpx};
                    }

                    .pintuan-tag ~ .price {
                        margin-top: #{16rpx};
                    }

                    .timer {
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        z-index: 10;
                    }
                }
            }

            &.column-3 {
				padding: #{8rpx} #{24rpx} #{24rpx} #{24rpx};
				.app-column-3 {
					margin-top: #{16rpx};
                	border-radius: #{16rpx};
                    padding-bottom: #{16rpx};
					width: #{224rpx};
				    .out-dialog {
				        width: 100%;
				        height: #{220rpx};
				        position: absolute;
				        z-index: 10;
				        top: 0;
				        z-index: 10;
				        left: 0;
				        background-color: rgba(0,0,0,.5);
				        image {
				            width: #{220rpx};
				            height: #{220rpx};
				        }
				    }
					&:nth-child(3n+2) {
						margin-right: #{15rpx};
						margin-left: #{15rpx};
					}

                    .goods-name {
                        padding: 0 #{12rpx};
                        width: #{224rpx};
                        line-height: 1.4;
                    }

                    .price {
                        padding: 0 #{12rpx};
                        max-width: #{222rpx};
                    }
                }
            }
        }
    }
    .des-price {
	    display: inline-block;
	    padding: #{4rpx 4rpx};
	    border: #{1rpx} solid #ff4544;
	    border-radius: #{8rpx};
	    font-size: #{20rpx};
	    color: #ff4544;
	    line-height: 1;
    }
    .dir-tag-def {
	    padding: 0 #{10rpx};
	    margin-right: #{8rpx};
	    font-size: $uni-font-size-weak-two;
	    border-radius: #{28rpx};
	    background-color: #feeeee;
	    color: #ff4544
    }
	.seheight {
		height: #{110rpx};
		width: #{430rpx};
	}
	.tag-pick {
		padding: 0 #{10rpx};
		margin-right: #{8rpx};
		font-size: $uni-font-size-weak-two;
		border-radius: #{28rpx};
		background-color: #feeeee;
		color: #ff4d4c;
	}
</style>