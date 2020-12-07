<template>
  <view class="app-diy-page" :class="mp_link_top ? 'mp_link_top' : ''">
    <view class="nav-search" :style="{ background: serachBackground }">
      <view class="nav-search-left" @click="jump_route()">
        <image
          class="nav-search-icon"
          src="/static/image/icon/search.png"
        ></image>
        <view>输入关键字搜索</view>
      </view>
      <view class="nav-search-right">
        <image
          class="nav-search-service"
          src="/static/image/icon/service.png"
        ></image>
        客服
      </view>
    </view>

    <view
      :style="{ background: serachBackground }"
      class="nav-bar dir-left-nowrap"
      :class="mp_link_top ? 'mp_link_top' : ''"
      v-if="newData.show_navs == 1"
    >
      <view class="nav-bar-left">
        <block v-for="(nav, index) in newData.navs" :key="index">
          <view
            class="nav-bar-one cross-center box-grow-0"
            :class="nav_active === index ? 'active' : ''"
            @click="changeNav(index)"
          >
            <view>{{ nav.name }}</view>
            <image
              v-if="nav_active === index"
              class="nav-image-triangle"
              src="/static/image/icon/triangle.png"
            ></image>
          </view>
        </block>
      </view>
      <view class="nav-bar-right" @click="jumpClassify">
        <image
          class="nav-image-classify"
          src="/static/image/icon/classify.png"
        ></image>
        <text>分类</text>
      </view>
    </view>

    <view class="diy-template">
      <block v-for="(nav, index) in newData.navs" :key="index">
        <template v-if="index === nav_active">
          <block
            v-for="(temp, temp_index) in nav.template.data"
            :key="temp_index"
          >
            <view
              v-if="temp.id === 'background'"
              class="app-diy-bg"
              :style="[
                {
                  'background-color': `${temp.data.backgroundColor}`,
                  'background-image': temp.data.backgroundPicUrl
                    ? `url(${temp.data.backgroundPicUrl})`
                    : `none`,
                  'background-size': `${
                    temp.data.backgroundWidth +
                    '% ' +
                    temp.data.backgroundHeight +
                    '%'
                  }`,
                  'background-position': `${transLabelBackgroundPosition(
                    temp.data.position
                  )}`,
                  'background-repeat': `${transLabelBackgroundRepeat(
                    temp.data.mode
                  )}`,
                },
              ]"
            ></view>
            <template v-if="temp.id === 'search'">
              <!-- <view>
                <app-search-for :value="temp.data"></app-search-for>
              </view> -->
            </template>
            <template v-else-if="temp.id === 'banner'">
              <view
                class="banner"
                :style="{ height: temp.data.height + 'rpx' }"
                v-if="temp.data.banners.length > 0"
              >
                <view
                  class="banner-border"
                  :style="{ background: serachBackground }"
                ></view>
                <view class="banner-swiper">
                  <app-swiper
                    :swiperType="temp.data.style == 2 ? true : false"
                    :swiperHeight="temp.data.height"
                    :swiperList="temp.data.banners"
                    :mode="temp.data.fill == 1 ? 'scaleToFill' : 'aspectFit'"
                    imageKey="pic_url"
                    @change="onBannerChange"
                  ></app-swiper>
                </view>
              </view>
            </template>
            <template v-else-if="temp.id === 'notice'">
              <view>
                <app-announcement
                  :background="temp.data.background"
                  :btn-color="temp.data.btnColor"
                  :btn-height="temp.data.btnHeight"
                  :btn-radius="`${temp.data.btnRadius}rpx`"
                  :btn-text="temp.data.btnText"
                  :btn-text-color="temp.data.btnTextColor"
                  :btn-width="temp.data.btnWidth"
                  :content="temp.data.content"
                  :header-url="temp.data.headerUrl"
                  :icon="temp.data.icon"
                  :name="temp.data.name"
                  :textColor="temp.data.textColor"
                ></app-announcement>
              </view>
            </template>
            <template v-else-if="temp.id === 'nav'">
              <view
                :style="[
                  {
                    'background-color': `${temp.data.backgroundColor}`,
                    'background-image': temp.data.backgroundPicUrl
                      ? `url(${temp.data.backgroundPicUrl})`
                      : `none`,
                    'background-size': `${
                      temp.data.backgroundWidth +
                      '% ' +
                      temp.data.backgroundHeight +
                      '%'
                    }`,
                    'background-position': `${transLabelBackgroundPosition(
                      temp.data.position
                    )}`,
                    'background-repeat': `${transLabelBackgroundRepeat(
                      temp.data.mode
                    )}`,
                  },
                ]"
              >
                <app-navigation-icon
                  :background="''"
                  :color="temp.data.color"
                  :rows="temp.data.rows"
                  :columns="temp.data.columns"
                  :scroll="temp.data.scroll"
                  :navs="temp.data.navs"
                ></app-navigation-icon>
              </view>
            </template>
            <template v-else-if="temp.id === 'video'">
              <view>
                <app-video
                  :pic-url="temp.data.pic_url"
                  :url="temp.data.url"
                ></app-video>
              </view>
            </template>
            <template v-else-if="temp.id === 'link'">
              <view>
                <app-associated-link
                  :arrows-switch="temp.data.arrowsSwitch"
                  :background="temp.data.background"
                  :color="temp.data.color"
                  :position="temp.data.position"
                  :style-color="temp.data.styleColor"
                  :link="temp.data.link"
                  :styleNum="temp.data.style"
                  :pic-switch="temp.data.picSwitch"
                  :pic-url="temp.data.picUrl"
                  :font-size="temp.data.fontSize"
                  :title="temp.data.title"
                ></app-associated-link>
              </view>
            </template>
            <template v-else-if="temp.id === 'topic'">
              <view v-if="temp.data.style === 'normal'">
                <app-special-topic
                  :count="temp.data.count"
                  :icon="temp.data.icon"
                  :logo_1="temp.data.logo_1"
                  :logo_2="temp.data.logo_2"
                  :topic_list="temp.data.topic_list"
                ></app-special-topic>
              </view>
              <view v-if="temp.data.style === 'list'">
                <app-special-topic-list
                  :cat-show="temp.data.cat_show"
                  :list="temp.data.list"
                  :topic-list="temp.data.topic_list"
                ></app-special-topic-list>
              </view>
            </template>
            <template v-else-if="temp.id === 'rubik'">
              <view style="position: relative">
                <app-image-ad
                  :image-style="temp.data.style"
                  :list="temp.data.list"
                  :height="temp.data.height"
                ></app-image-ad>
                <block
                  v-for="(hotspot, hotspot_index) in temp.data.hotspot"
                  :key="hotspot_index"
                >
                  <app-hotspot :hotspot="rubikHotspot(hotspot)"></app-hotspot>
                </block>
              </view>
            </template>
            <template v-else-if="temp.id === 'store'">
              <view>
                <app-shop
                  :list="temp.data.list"
                  :nav-pic-url="temp.data.navPicUrl"
                  :score-pic-url="temp.data.scorePicUrl"
                  :show-name="temp.data.showName"
                  :show-score="temp.data.showScore"
                  :show-tel="temp.data.showTel"
                  :scrollTop="scrollTop"
                ></app-shop>
              </view>
            </template>
            <template v-else-if="temp.id === 'copyright'">
              <view>
                <app-copyright
                  :background-color="temp.data.backgroundColor"
                  :text="temp.data.text"
                  :pic-url="temp.data.picUrl"
                  :link="temp.data.link"
                ></app-copyright>
              </view>
            </template>
            <template v-else-if="temp.id === 'user-info'">
              <view>
                <app-user-center
                  :top-pic-url="temp.data.backgroundPicUrl"
                  :member-pic-url="userCenter.member_pic_url"
                  :top-style="temp.data.style"
                ></app-user-center>
              </view>
            </template>
            <template v-else-if="temp.id === 'user-order'">
              <view>
                <app-my-order
                  :order_bar="temp.data.navs"
                  :background-color="temp.data.backgroundColor"
                ></app-my-order>
              </view>
            </template>
            <template v-else-if="temp.id === 'goods'">
              <view
                v-if="temp.data.catPosition === 'top'"
                :style="[
                  {
                    'background-color': `${temp.data.backgroundColor}`,
                    'background-image': temp.data.backgroundPicUrl
                      ? `url(${temp.data.backgroundPicUrl})`
                      : `none`,
                    'background-size': `${
                      temp.data.backgroundWidth +
                      '% ' +
                      temp.data.backgroundHeight +
                      '%'
                    }`,
                    'background-position': `${transLabelBackgroundPosition(
                      temp.data.position
                    )}`,
                    'background-repeat': `${transLabelBackgroundRepeat(
                      temp.data.mode
                    )}`,
                  },
                ]"
              >
                <app-diy-goods-list
                  :show-cat="temp.data.showCat"
                  :show-buy-btn="temp.data.showBuyBtn"
                  :cat-style="temp.data.catStyle"
                  :cat-list="temp.data.catList"
                  :list="temp.data.list"
                  :list-style="temp.data.listStyle"
                  :goods-cover-proportion="temp.data.goodsCoverProportion"
                  :fill="temp.data.fill"
                  :goods-style="temp.data.goodsStyle"
                  :show-goods-name="temp.data.showGoodsName"
                  :text-style="temp.data.textStyle"
                  :show-goods-price="temp.data.showGoodsPrice"
                  :buy-btn="temp.data.buyBtn"
                  :sign="temp.id"
                  :buy-btn-style="temp.data.buyBtnStyle"
                  :buy-btn-text="temp.data.buyBtnText"
                  :button-color="temp.data.buttonColor"
                  :show-goods-tag="temp.data.showGoodsTag"
                  :customize-goods-tag="temp.data.customizeGoodsTag"
                  :goods-tag-pic-url="temp.data.goodsTagPicUrl"
                  :cat-position="temp.data.catPosition"
                ></app-diy-goods-list>
              </view>
              <view
                v-else
                :style="[
                  {
                    'background-color': `${temp.data.backgroundColor}`,
                    'background-image': temp.data.backgroundPicUrl
                      ? `url(${temp.data.backgroundPicUrl})`
                      : `none`,
                    'background-size': `${
                      temp.data.backgroundWidth +
                      '% ' +
                      temp.data.backgroundHeight +
                      '%'
                    }`,
                    'background-position': `${transLabelBackgroundPosition(
                      temp.data.position
                    )}`,
                    'background-repeat': `${transLabelBackgroundRepeat(
                      temp.data.mode
                    )}`,
                  },
                ]"
              >
                <app-recommended-product-list
                  :show-cat="temp.data.showCat"
                  :show-buy-btn="temp.data.showBuyBtn"
                  :cat-style="temp.data.catStyle"
                  :cat-list="temp.data.catList"
                  :list="temp.data.list"
                  :list-style="temp.data.listStyle"
                  :goods-cover-proportion="temp.data.goodsCoverProportion"
                  :fill="temp.data.fill"
                  :goods-style="temp.data.goodsStyle"
                  :show-goods-name="temp.data.showGoodsName"
                  :show-goods-price="temp.data.showGoodsPrice"
                  :buy-btn="temp.data.buyBtn"
                  :sign="temp.id"
                  :buy-btn-style="temp.data.buyBtnStyle"
                  :buy-btn-text="temp.data.buyBtnText"
                  :show-goods-tag="temp.data.showGoodsTag"
                  :customize-goods-tag="temp.data.customizeGoodsTag"
                  :goods-tag-pic-url="temp.data.goodsTagPicUrl"
                  :button-color="temp.data.buttonColor"
                  :cat-position="temp.data.catPosition"
                ></app-recommended-product-list>
              </view>
            </template>
            <template
              v-else-if="
                temp.id === 'pintuan' ||
                temp.id === 'miaosha' ||
                temp.id === 'advance' ||
                temp.id === 'booking' ||
                temp.id === 'bargain' ||
                temp.id === 'pick' ||
                temp.id === 'lottery' ||
                temp.id === 'integral-mall'
              "
            >
              <!-- 插件商品列表 -->
              <view
                :style="[
                  {
                    'background-color': `${temp.data.backgroundColor}`,
                    'background-image': temp.data.backgroundPicUrl
                      ? `url(${temp.data.backgroundPicUrl})`
                      : `none`,
                    'background-size': `${
                      temp.data.backgroundWidth +
                      '% ' +
                      temp.data.backgroundHeight +
                      '%'
                    }`,
                    'background-position': `${transLabelBackgroundPosition(
                      temp.data.position
                    )}`,
                    'background-repeat': `${transLabelBackgroundRepeat(
                      temp.data.mode
                    )}`,
                  },
                ]"
              >
                <template
                  v-if="temp.id === 'integral-mall' && temp.data.showCoupon"
                >
                  <view>
                    <app-coupon
                      :none-color="true"
                      :coupon_list="temp.data.coupon_list"
                      :sign="temp.id"
                      :text-color="temp.data.couponColor"
                      :show-top="false"
                      :unclaimed-bg="temp.data.couponPicUrl"
                    ></app-coupon>
                  </view>
                </template>
                <app-diy-goods-list
                  :show-buy-btn="temp.data.showBuyBtn"
                  :list="temp.data.list"
                  :list-style="temp.data.listStyle"
                  :goods-cover-proportion="temp.data.goodsCoverProportion"
                  :fill="temp.data.fill"
                  :goods-style="temp.data.goodsStyle"
                  :show-goods-name="temp.data.showGoodsName"
                  :text-style="temp.data.textStyle"
                  buy-btn="text"
                  :sign="temp.id"
                  :button-color="temp.data.buttonColor"
                  :buy-btn-style="temp.data.buyBtnStyle"
                  :buy-btn-text="temp.data.buyBtnText"
                  :show-goods-tag="temp.data.showGoodsTag"
                  :page-hide="pageHide"
                  :customize-goods-tag="temp.data.customizeGoodsTag"
                  :goods-tag-pic-url="temp.data.goodsTagPicUrl"
                ></app-diy-goods-list>
              </view>
            </template>

            <!-- 优惠券 -->
            <template v-else-if="temp.id === 'coupon'">
              <view>
                <app-exclusive-coupon
                  :background="temp.data.backgroundColor"
                  :coupon_list="temp.data.coupon_list"
                  :receive-bg="temp.data.receiveBg"
                  :text-color="temp.data.textColor"
                  :show-top="false"
                  :unclaimed-bg="temp.data.unclaimedBg"
                ></app-exclusive-coupon>
              </view>
            </template>
            <template v-else-if="temp.id === 'timer'">
              <view>
                <app-diy-timer
                  :pic-url="temp.data.picUrl"
                  :start-date-time="temp.data.startDateTime"
                  :end-date-time="temp.data.endDateTime"
                  :page-hide="pageHide"
                  :link="temp.data.link"
                ></app-diy-timer>
              </view>
            </template>
            <template v-else-if="temp.id === 'mch'">
              <view
                :style="[
                  {
                    'background-color': `${temp.data.backgroundColor}`,
                    'background-image': temp.data.backgroundPicUrl
                      ? `url(${temp.data.backgroundPicUrl})`
                      : `none`,
                    'background-size': `${
                      temp.data.backgroundWidth +
                      '% ' +
                      temp.data.backgroundHeight +
                      '%'
                    }`,
                    'background-position': `${transLabelBackgroundPosition(
                      temp.data.position
                    )}`,
                    'background-repeat': `${transLabelBackgroundRepeat(
                      temp.data.mode
                    )}`,
                  },
                ]"
              >
                <app-goods-shop
                  :card-style="temp.data.cardStyle"
                  :background-color="temp.data.backgroundColor"
                  type="diy"
                  :list="temp.data.list"
                  :show-goods="temp.data.showGoods"
                ></app-goods-shop>
              </view>
            </template>
            <template v-else-if="temp.id === 'empty'">
              <view>
                <app-empty
                  :height="temp.data.height"
                  :background-color="temp.data.background"
                ></app-empty>
              </view>
            </template>
            <template v-else-if="temp.id === 'ad'">
              <view>
                <app-ad
                  :unit-id="temp.data.id"
                  :type="temp.data.type"
                  :coupon-url="coupon_url"
                  :video-url="temp.data.video_url"
                  :pic-url="temp.data.pic_url"
                  :coupon-params="nav | getObje(temp)"
                ></app-ad>
              </view>
            </template>
            <template v-else-if="temp.id === 'modal'">
              <view>
                <app-popup-ad
                  :opened="temp.data.opened"
                  :times="temp.data.times"
                  :list="temp.data.list"
                  :multiple="true"
                  :is_storage="is_storage"
                  :mark="
                    homePages.id +
                    '-' +
                    homePages.navs[nav_active].id +
                    '-' +
                    temp_index
                  "
                ></app-popup-ad>
              </view>
            </template>
            <template v-else-if="temp.id === 'quick-nav'">
              <view>
                <app-quick-navigation
                  :value="temp.data"
                  v-if="temp.data.navSwitch == 1"
                  :use-mall-config="temp.data.useMallConfig"
                ></app-quick-navigation>
              </view>
            </template>
            <!-- #ifdef MP-WEIXIN -->
            <template v-else-if="temp.id === 'mp-link'">
              <view :class="temp.data.position === 'top' ? `mp-link-top` : ``">
                <official-account
                  @load="mpLink(temp.data.position)"
                  @error="mpLinkError"
                ></official-account>
              </view>
            </template>
            <!-- #endif -->
            <!-- #ifndef MP-TOUTIAO -->
            <template v-else-if="temp.id === 'map'">
              <app-map
                :background-pic-url="temp.data.backgroundPicUrl"
                :height="temp.data.height"
                :latitude="temp.data.latitude"
                :longitude="temp.data.longitude"
                :margin-top="temp.data.marginTop"
                :margin-top-color="temp.data.marginTopColor"
                :padding-x="temp.data.paddingX"
                :padding-y="temp.data.paddingY"
              ></app-map>
            </template>
            <!-- #endif -->
            <template v-else-if="temp.id === 'check-in'">
              <view>
                <app-check-in
                  :background-pic-url="temp.data.backgroundPicUrl"
                  :hotspot="temp.data.hotspot"
                  :show-text="temp.data.showText"
                  :text-color="temp.data.textColor"
                  :text-position="temp.data.textPosition"
                ></app-check-in>
              </view>
            </template>
            <template v-else-if="temp.id === 'image-text'">
              <view>
                <app-rich :content="temp.data.content"></app-rich>
              </view>
            </template>
            <template v-else-if="temp.id === 'form'">
              <view>
                <app-diy-form
                  :title="temp.name"
                  :list="temp.data.formDialog"
                  :item-padding-x="temp.data.inputPadding"
                  :item-margin-y="temp.data.marginBottom"
                  :item-height="temp.data.height"
                  :show-item-border="false"
                  :label-position="transLabelPosition(temp.data.style)"
                  :label-color="temp.data.inputLabel"
                  label-text-align="left"
                  :show-input-border="true"
                  :input-background="temp.data.inputBackground"
                  :input-border-color="temp.data.inputBorder"
                  :input-text-color="temp.data.inputText"
                  :input-placeholder-color="temp.data.inputTip"
                  :input-radius="temp.data.radius"
                  :show-submit="true"
                  :submit-url="diyFormSubmitUrl"
                  :submit-btn-text="temp.data.borderContent"
                  :submit-btn-height="temp.data.buttonHeight"
                  :submit-btn-padding="temp.data.buttonPadding"
                  :submit-btn-margin="temp.data.buttonMargin"
                  :submit-btn-radius="temp.data.buttonRadius"
                  :submit-btn-background="temp.data.borderBackground"
                  :submit-btn-border-color="temp.data.borderBorder"
                  :submit-btn-text-color="temp.data.borderText"
                  :background-color="temp.data.backgroundColor"
                  :background-image="temp.data.backgroundPicUrl"
                  :background-width="temp.data.backgroundWidth"
                  :background-height="temp.data.backgroundHeight"
                  :background-position="
                    transLabelBackgroundPosition(temp.data.position)
                  "
                  :background-repeat="
                    transLabelBackgroundRepeat(temp.data.mode)
                  "
                  :margin-top="temp.data.marginTop"
                  :padding-top="temp.data.padding"
                  :padding-bottom="temp.data.padding"
                ></app-diy-form>
              </view>
            </template>
            <template v-else-if="temp.id === 'notice'">
              <view> </view>
            </template>
            <template v-else-if="temp.id === 'vip-card'">
              <view>
                <app-vip-card
                  :value="temp.data"
                  top="0"
                  :background="temp.data.background"
                ></app-vip-card>
              </view>
            </template>
            <template v-else-if="temp.id === 'live'">
              <view>
                <app-live :value="temp.data"></app-live>
              </view>
            </template>
          </block>
        </template>
      </block>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";
import appSearchFor from "../../page-component/app-search-for/app-search-for.vue";
import appSwiper from "../../page-component/app-swiper/swiper.vue";
import appAnnouncement from "../../page-component/app-announcement/app-announcement.vue";
import appNavigationIcon from "../../page-component/app-navigation-icon/app-navigation-icon.vue";
import appVideo from "../../page-component/app-video/app-video.vue";
import appAssociatedLink from "../../page-component/app-associated-link/app-associated-link.vue";
import appSpecialTopic from "../../page-component/app-special-topic/app-special-topic-normal.vue";
import appSpecialTopicList from "../../page-component/app-special-topic/app-special-topic-list.vue";
import appImageAd from "../../page-component/app-image-ad/app-image-ad.vue";
import appHotspot from "../../basic-component/app-hotspot/app-hotspot.vue";
import appShop from "../../page-component/app-shop/app-shop.vue";
import appCopyright from "../../page-component/app-copyright/app-copyright.vue";
import appUserCenter from "../../page-component/app-user-center-top/app-user-center-top.vue";
import appMyOrder from "../../page-component/app-my-order/app-my-order.vue";
import appRecommendedProduct from "../../page-component/app-recommended-product/app-recommended-product.vue";
import appRecommendedProductList from "../../page-component/app-recommended-product/app-recommended-product-list.vue";
import appExclusiveCoupon from "../../page-component/app-exclusive-coupon/app-exclusive-coupon.vue";
import appDiyTimer from "../../page-component/app-diy-timer/app-diy-timer.vue";
import appGoodsShop from "../../page-component/app-good-shop-recommendation/app-good-shop-recommendation.vue";
import appGroupGoods from "../../page-component/app-group-goods/app-group-goods.vue";
import appEmpty from "../../basic-component/app-empty/app-empty.vue";
import appPopupAd from "../../page-component/app-popup-ad/app-popup-ad.vue";
import appQuickNavigation from "../../page-component/app-quick-navigation/app-quick-navigation.vue";
import appCheckIn from "../../page-component/app-check-in/app-check-in.vue";
import appRich from "../../basic-component/app-rich/parse.vue";
import appReservation from "../../page-component/app-reservation/app-reservation.vue";
import appSpike from "../../page-component/app-spike/app-spike.vue";
import appDiyGoodsList from "../../page-component/app-diy-goods-list/app-diy-goods-list.vue";
import appDiyForm from "../../page-component/app-diy-form/app-diy-form.vue";
import appMap from "../../page-component/app-map/app-map.vue";
import appVipCard from "../../page-component/app-vip-card/app-vip-card.vue";
import appAd from "../../page-component/app-ad/app-ad";
import appLive from "../../page-component/app-live/app-live.vue";

export default {
  name: "app-diy-page",
  components: {
    "app-search-for": appSearchFor,
    "app-swiper": appSwiper,
    "app-announcement": appAnnouncement,
    "app-navigation-icon": appNavigationIcon,
    "app-video": appVideo,
    "app-associated-link": appAssociatedLink,
    "app-special-topic": appSpecialTopic,
    "app-special-topic-list": appSpecialTopicList,
    "app-image-ad": appImageAd,
    "app-hotspot": appHotspot,
    "app-shop": appShop,
    "app-copyright": appCopyright,
    "app-user-center": appUserCenter,
    "app-my-order": appMyOrder,
    "app-recommended-product": appRecommendedProduct,
    "app-recommended-product-list": appRecommendedProductList,
    "app-exclusive-coupon": appExclusiveCoupon,
    "app-diy-timer": appDiyTimer,
    "app-goods-shop": appGoodsShop,
    "app-group-goods": appGroupGoods,
    "app-empty": appEmpty,
    "app-popup-ad": appPopupAd,
    "app-quick-navigation": appQuickNavigation,
    "app-check-in": appCheckIn,
    "app-rich": appRich,
    "app-reservation": appReservation,
    "app-spike": appSpike,
    "app-diy-goods-list": appDiyGoodsList,
    "app-diy-form": appDiyForm,
    "app-vip-card": appVipCard,
    appMap,
    appAd,
    appLive,
  },
  props: {
    homePages: {
      type: Object,
      default() {
        return {};
      },
    },
    scrollTop: {
      type: Number,
      default() {
        return 0;
      },
    },
    is_storage: Boolean,
    pageHide: Boolean,
  },
  computed: {
    newData() {
      uni.setNavigationBarTitle({
        title: this.homePages.title,
      });
      for (let i = 0; i < this.homePages.navs.length; i++) {
        let navs = this.homePages.navs[i];
        for (let j = 0; j < navs.length; j++) {}
      }
      // console.log("homePages", this.homePages);
      return this.homePages;
    },
    ...mapState({
      userCenter: (state) => state.mallConfig.user_center,
      themeColor: (state) => state.mallConfig.theme_cfg.color,
    }),
    diyFormSubmitUrl() {
      return this.$api.diy.page_store;
    },
  },

  mounted() {
    switch (uni.getSystemInfoSync().platform) {
      case "android":
        this.platform = "android";
        break;
      case "ios":
        this.platform = "ios";
        break;
      default:
        // console.log("运行在开发者工具上");
        break;
    }
  },

  data() {
    return {
      serachBackground: "",
      nav_active: 0,
      mp_link_top: false,
      coupon_url: this.$api.diy.receive,
      coupon_params: {},
    };
  },

  filters: {
    getObje(data, temp) {
      return {
        template_id: data.template_id,
      };
    },
  },

  methods: {
    changeNav(index) {
      this.nav_active = index;
      this.mp_link_top = false;
    },
    rubikHotspot(hotspot) {
      if (hotspot && hotspot.link) {
        hotspot.link.url = hotspot.link.value;
        hotspot.link.openType = hotspot.link.open_type;
      }
      return hotspot;
    },
    mpLink(position) {
      if (position === "top") {
        this.mp_link_top = true;
      }
    },
    transLabelPosition(val) {
      if (val == 3) {
        return "top";
      }
      if (val == 2) {
        return "inset";
      }
      return "left";
    },
    transLabelBackgroundPosition(val) {
      if (val == 1) return "left top";
      if (val == 2) return "center top";
      if (val == 3) return "right top";
      if (val == 4) return "left center";
      if (val == 5) return "center center";
      if (val == 6) return "right center";
      if (val == 7) return "left bottom";
      if (val == 8) return "center bottom";
      if (val == 9) return "right bottom";
      return "center";
    },
    transLabelBackgroundRepeat(val) {
      if (val == 1) return "no-repeat";
      if (val == 2) return "repeat-x";
      if (val == 3) return "repeat-y";
      if (val == 4) return "repeat";
      return "no-repeat";
    },
    mpLinkError() {
      this.mp_link_top = false;
    },
    jump_route() {
      uni.navigateTo({
        url: "/pages/search/search",
      });
    },

    /**
     * 跳分类
     */
    jumpClassify() {
      uni.redirectTo({
        url: "/pages/cats/cats",
      });
    },

    /**
     * 适配配色
     */
    updateAdaptive(value) {
      uni.setNavigationBarColor({
        frontColor: "#ffffff",
        backgroundColor: value,
      });
      uni.setBackgroundColor({
        backgroundColor: value,
        backgroundColorTop: value,
      });
      if (this.platform == "ios") {
        uni.setBackgroundTextStyle({
          textStyle: "dark",
        });
      }
      this.serachBackground = value;
    },

    onBannerChange(e) {
      // 页面隐藏
      if (this.pageHide) {
        return;
      }
      if (this.themeColor.length) {
        this.updateAdaptive(this.themeColor[e.detail.current]);
      }
    },
  },
};
</script>

<style  lang="scss">
.app-diy-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.app-diy-page {
  width: 100%;
  height: 100%;

  //搜索
  .nav-search {
    background-color: #8b0303;
    width: 100%;
    height: #{50px};
    display: flex;
    align-items: center;
    padding-top: 10rpx;

    .nav-search-service {
      width: #{36rpx};
      height: #{36rpx};
      margin-bottom: 5rpx;
    }
    .nav-search-left {
      display: flex;
      flex: 1;
      align-items: center;
      font-size: 25rpx;
      color: #fff;
      border-radius: 20px;
      background-color: rgba(200, 200, 200, 0.2);
      margin: 0 0 0 20rpx;
      height: 38px;
    }
    .nav-search-right {
      width: 80rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 20rpx;
      color: #fff;
    }
    .nav-search-icon {
      margin-right: #{12rpx};
      margin-left: #{20rpx};
      width: #{32rpx};
      height: #{32rpx};
    }
  }

  .nav-bar {
    // position: fixed;
    // left: 0;
    // top: 0;
    // z-index: 1500;
    // background-color: #ffffff;
    background-color: #8b0303;
    width: 100%;
    height: #{54px};
    padding-left: #{30rpx};
    // border-bottom: #{1rpx} solid #e2e2e2;
    display: flex;

    .nav-bar-left {
      display: flex;
      flex: 1;
      height: 100%;
      overflow-x: auto;
      &::-webkit-scrollbar {
        display: none;
      }
    }

    .nav-bar-right {
      width: #{120rpx};
      height: #{30px};
      margin-top: 6rpx;
      border-radius: 20px;
      background-color: rgba(200, 200, 200, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: #{28rpx};
      margin-right: 10rpx;
    }

    .nav-image-classify {
      width: #{22rpx};
      height: #{22rpx};
      margin-right: #{10rpx};
    }

    .nav-bar-one {
      width: auto;
      margin-right: #{30rpx};
      padding: 0 #{15rpx};
      color: #fff;
      flex-direction: column;
      margin-top: 15rpx;
      &.normal {
        font-size: #{28rpx};
      }
      &.active {
        font-weight: bolder;
        font-size: #{36rpx};
      }
    }

    .nav-image-triangle {
      width: 26rpx;
      height: 26rpx;
    }

    &.mp_link_top {
      top: #{84px};
    }

    &.mp_link_top ~ .diy-template {
      // margin-top: #{44px + 84px};
      margin-top: #{84px};
    }

    // & ~ .diy-template {
    // margin-top: #{44px};
    // }
  }

  .mp-link-top {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1500;
    width: 100%;
  }

  &.mp_link_top {
    margin-top: #{168rpx};
  }
}

.banner {
  position: relative;
  // 广告
  .banner-border {
    width: 100%;
    height: 100rpx;
    background-color: #8b0303;
    position: relative;
    border-radius: 0 0 50% 50%;
    // &:after {
    //   position: absolute;
    //   left: 0;
    //   right: 0;
    //   bottom: -50rpx;
    //   z-index: 1;
    //   content: " ";
    //   height: 50rpx;
    //   width: 100%;
    //   border-radius: 0 0 50% 50%;
    //   background: #8b0303;
    // }
  }

  .banner-swiper {
    position: absolute;
    width: 90%;
    left: 5%;
    z-index: 2;
    top: 0;
  }
}
</style>