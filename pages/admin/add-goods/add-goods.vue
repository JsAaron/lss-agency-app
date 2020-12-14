<template>
	<view>
		<app-layout>
			<view :class="[`${beMove ? 'screen' : ''}`]" :style="{ height: `${!beMove ? '100%' : height / 2 + 'px'}` }">
				<view class="title">基本信息</view>
				<view class="goods-img">
					<view class="label">
						<text>商品图片</text>
						<text class="label-info">(最多9张，可拖拽改变顺序)</text>
					</view>
					<view class="goods-list">
						<movable-area style="height: auto; width: 100%;" class="flex-wrap">
							<view
								@touchend.stop="touchend"
								@touchmove.stop="touchm"
								@longpress.stop="_longtap(item.pic_url, index, $event)"
								class="goods-item"
								v-for="(item, index) in img"
								:key="index"
							>
								<image mode="aspectFill" class="goods-cover move-img" :data-index="index" :src="item.pic_url"></image>
								<image
									@click.stop="del_img(index)"
									v-if="!beMove"
									class="del-btn"
									src="/static/image/myshop/delete.png"
								></image>
								<view v-if="index == 0 && !beMove" class="main-img">主图</view>
							</view>
							<view v-if="img.length < 9" @click.stop="add_img" class="add-goods-img">
								<image src="/static/image/myshop/add-goods.png"></image>
								<view>添加</view>
							</view>
							<movable-view
								:data-index="beginIndex"
								:x="x"
								:y="y"
								direction="all"
								:damping="5000"
								:friction="1"
								:disabled="disabled"
							>
								<image :hidden="imgHidden" mode="aspectFill" class="goods-cover img-border" :src="img_src"></image>
							</movable-view>
						</movable-area>
					</view>
				</view>
				<view class="goods-info">
					<view class="info-item cross-center main-between">
						<view class="form-label">商品名称</view>
						<input class="input" v-model="form.name" />
					</view>
					<view class="info-item cross-center main-between">
						<view class="form-label">商品分类</view>
						<view @click="chooseCat">
							<view class="cat-info dir-right-nowrap cross-center">
								<image class="to-more" src="/static/image/icon/arrow-right.png"></image>
								<text v-if="in_cat.length > 0">{{ in_cat }}</text>
								<text v-else>未选择</text>
							</view>
						</view>
					</view>
					<view class="info-item cross-center main-between">
						<view class="form-label">多商户分类</view>
						<view @click="chooseMchCat">
							<view class="cat-info dir-right-nowrap cross-center">
								<image class="to-more" src="/static/image/icon/arrow-right.png"></image>
								<text v-if="in_mch_cat.length > 0">{{ in_mch_cat }}</text>
								<text v-else>未选择</text>
							</view>
						</view>
					</view>
					<view class="info-item cross-center dir-left-nowrap">
						<view class="form-label">单位</view>
						<view class="dir-left-nowrap cross-center"><input v-model="unit" class="input" /></view>
					</view>
				</view>
				<view class="title">规格、价格及库存</view>
				<view class="goods-info">
					<view class="info-item cross-center dir-left-nowrap" style="border-top: 0">
						<view class="form-label">成本价</view>
						<view class="dir-left-nowrap price-input cross-center">
							<input type="digit" class="input" v-model="form.cost_price" />
							<view class="money">¥</view>
						</view>
					</view>
					<view class="info-item cross-center dir-left-nowrap">
						<view class="form-label">原价</view>
						<view class="dir-left-nowrap price-input cross-center">
							<input type="digit" class="input" v-model="form.original_price" />
							<view class="money">¥</view>
						</view>
					</view>
					<view v-if="attr.length == 0" class="info-item cross-center dir-left-nowrap">
						<view class="form-label">售价</view>
						<view class="dir-left-nowrap price-input cross-center">
							<input type="digit" class="input" v-model="form.price" />
							<view class="money">¥</view>
						</view>
					</view>
					<view v-if="attr.length == 0" class="info-item cross-center dir-left-nowrap">
						<view class="form-label">库存</view>
						<view class="dir-left-nowrap price-input cross-center">
							<input type="number" class="input" v-model="form.goods_num" />
						</view>
					</view>
				</view>
				<view class="attr">
					<view class="attr-info dir-right-nowrap" v-for="(idx, index) in attr" :key="index">
						<view class="attr-input">
							<view class="info-item cross-center dir-left-nowrap" style="border-top: 0">
								<view class="form-label">规格</view>
								<view class="dir-left-nowrap cross-center price-input">
									<input v-model="idx.attr_list[0].attr_name" class="input" />
								</view>
							</view>
							<view class="info-item cross-center dir-left-nowrap">
								<view class="form-label">售价</view>
								<view class="dir-left-nowrap cross-center price-input">
									<input type="digit" v-model="idx.price" class="input" />
									<view class="money">¥</view>
								</view>
							</view>
							<view class="info-item cross-center dir-left-nowrap">
								<view class="form-label">库存</view>
								<view type="digit" class="dir-left-nowrap cross-center price-input">
									<input type="number" v-model="idx.stock" class="input" />
								</view>
							</view>
							<view class="info-item cross-center dir-left-nowrap">
								<view class="form-label">货号</view>
								<view class="dir-left-nowrap cross-center price-input"><input v-model="idx.no" class="input" /></view>
							</view>
							<view class="info-item cross-center dir-left-nowrap">
								<view class="form-label">
									重量(
									<text style="color:#666666">g</text>
									)
								</view>
								<view class="dir-left-nowrap cross-center price-input">
									<input type="number" v-model="idx.weight" class="input" />
								</view>
							</view>
						</view>
						<image @click="pop(index)" class="low-attr" src="/static/image/myshop/low.png"></image>
					</view>
					<view :class="[`${attr.length > 0 ? 'attr-btn-item' : 'goods-info'}`]">
						<view class="add-attr" @click="add_attr">
							<view class="add-attr-btn main-center">
								<image src="/static/image/myshop/add.png"></image>
								<view>增加规格</view>
							</view>
						</view>
					</view>
				</view>
				<view class="title">运费、包邮及限购</view>
				<view class="goods-info">
					<view class="info-item cross-center main-between" style="border-top:0">
						<view class="form-label">运费设置</view>
						<view @click="chooseExpress">
							<view class="cat-info dir-right-nowrap cross-center">
								<image class="to-more" src="/static/image/icon/arrow-right.png"></image>
								<text v-if="bePostage.id > 0">{{ bePostage.name }}</text>
								<text v-else>未选择</text>
							</view>
						</view>
					</view>
					<view class="express-setting">
						<view class="express-input cross-center">
							<view class="integral">满件包邮</view>
							<input type="number" v-model="form.pieces" class="input" />
						</view>
						<view class="express-etc">如果设置0或空，则不支持满件包邮</view>
					</view>
					<view class="express-setting">
						<view class="express-input cross-center">
							<view class="integral">满额包邮</view>
							<input type="digit" v-model="form.forehead" class="input" />
						</view>
						<view class="express-etc">如果设置0或空，则不支持满额包邮</view>
					</view>
					<view class="info-item main-between">
						<view>限购</view>
						<switch style="transform:scale(0.7)" :value="confine" @change="confine = !confine"></switch>
					</view>
					<view v-if="confine" class="info-item cross-center dir-left-nowrap">
						<view class="form-label">限购数量</view>
						<view class="dir-left-nowrap cross-center price-input">
							<input type="number" v-model="form.confine_count" class="input" />
						</view>
					</view>
				</view>
				<view class="title">商品详情图</view>
				<view class="goods-info">
					<view class="info-item cross-center main-between" style="border-top:0">
						<view class="form-label">商品详情图</view>
						<view @click="toGoodsDetail">
							<view class="cat-info dir-right-nowrap cross-center">
								<image class="to-more" src="/static/image/icon/arrow-right.png"></image>
								<text v-if="goods_detail.length > 0">已添加</text>
								<text v-else>未添加</text>
							</view>
						</view>
					</view>
				</view>
				<view class="title">服务内容</view>
				<view class="goods-info">
					<view class="info-item cross-center main-between" style="border-top:0">
						<view class="form-label">服务内容</view>
						<view @click="chooseService">
							<view class="cat-info dir-right-nowrap cross-center">
								<image class="to-more" src="/static/image/icon/arrow-right.png"></image>
								<text v-if="beService.length > 0">已添加</text>
								<text v-else-if="service.length > 0">未添加</text>
								<text v-else>未设置</text>
							</view>
						</view>
					</view>
				</view>
				<view @click="submit"><view class="send">上架</view></view>
				<view :class="['dialog', `${iphone_x ? 'iphone_x' : ''}`]" v-if="dialog">
					<view class="picker-list">
						<view class="main-between picker-header">
							<view @click="toggle">取消</view>
							<view v-if="set_cat" @click="choose_cat(1)">确定</view>
							<view v-else-if="set_mch_cat" @click="choose_mch_cat(1)">确定</view>
							<view v-else @click="toggle(1)">确定</view>
						</view>
						<view v-if="set_cat || set_mch_cat" class="dir-left-nowrap is_cat">
							<text v-for="(item, index) in isChooseCat" :key="index">{{ item }}</text>
						</view>
						<picker-view :value="[set_postage ? postageIndex : -1]" class="picker" @change="bindChange">
							<picker-view-column>
								<view
									v-if="set_cat || set_mch_cat"
									v-for="item in choose_list"
									class="cross-center picker-text"
									:key="item.id"
								>
									{{ item.label }}
								</view>
								<view v-if="set_postage" class="cross-center picker-text" v-for="item in postage" :key="item.id">
									{{ item.name }}
								</view>
							</picker-view-column>
						</picker-view>
					</view>
				</view>
			</view>
			<view class="dialog" v-if="is_service">
				<view class="dialog-item">
					<view class="dialog-title">服务内容</view>
					<view
						v-if="is_service"
						v-for="(item, index) in service"
						:key="index"
						@click="choose(item)"
						class="dir-left-nowrap type-choose"
					>
						<image v-if="item.isChoose" class="active-status" src="/static/image/myshop/apply-ok.png"></image>
						<image v-else class="active-status" src="/static/image/icon/form-er.png"></image>
						<view :class="[`${item.isChoose ? 'active' : ''}`]">{{ item.name }}</view>
					</view>
					<view class="main-center btn-area">
						<view class="submit-btn" @click="cancelService">取消</view>
						<view class="line"></view>
						<view class="submit-btn be-submit" @click="submitService">确认</view>
					</view>
				</view>
			</view>
			<view class="dialog" v-if="modal">
				<view class="dialog-item">
					<view class="dialog-title">提示</view>
					<view class="error-info" v-if="set_cat">
						您暂未设置分类
						<br />
						请前往商城后台设置
					</view>
					<view class="error-info" v-if="set_mch_cat && mch_cat.length == 0">
						您暂未设置多商户分类
						<br />
						请前往商城后台设置
					</view>
					<view class="error-info" v-if="set_postage && postage.length == 0">
						您暂未设置运费模板
						<br />
						请前往商城后台设置
					</view>
					<view class="error-info" v-if="set_service && service.length == 0">
						您暂未设置服务内容
						<br />
						请前往商城后台设置
					</view>
					<view class="main-center btn-area"><view class="submit-btn be-submit" @click="close">确认</view></view>
				</view>
			</view>
			<view class="dialog" v-if="error">
				<view class="dialog-item">
					<view class="dialog-title">提示</view>
					<view class="error-info">{{ error }}</view>
					<view class="main-center btn-area"><view class="submit-btn be-submit" @click="close">确认</view></view>
				</view>
			</view>
			<view class="dialog" v-if="beSubmit">
				<view class="dialog-item">
					<view class="dialog-title">提示</view>
					<view class="submit-info">是否确认添加此商品</view>
					<view class="main-center btn-area">
						<view class="submit-btn" @click="cancel">取消</view>
						<view class="line"></view>
						<view class="submit-btn be-submit" @click="toSubmit">确认</view>
					</view>
				</view>
			</view>
		</app-layout>
	</view>
</template>

<script>
import { mapState } from 'vuex';

export default {
	data() {
		return {
			postageIndex: -1,
			height: 0,
			beSubmit: false,
			form: {},
			forehead: -1,
			unit: '件',
			iphone_x: false,
			modal: false,
			error: false,
			set_cat: false,
			set_mch_cat: false,
			set_postage: false,
			set_service: false,
			confine: false,
			is_service: false,
			img: [],
			cat: [],
			mch: 0,
			mch_cat: [],
			goods_detail: [],
			beMove: false,
			service: [],
			postage: [],
			beCat: [
				{
					label: '未选择'
				}
			],
			beMchCat: [
				{
					label: '未选择'
				}
			],
			isChooseCat: ['未选择'],
			bePostage: '',
			beService: [],
			in_cat: '',
			in_mch_cat: '',
			newIndex: '0',
			index: '0',
			attr: [],
			have_children: false,
			disabled: true,
			imgHidden: true,
			flag: false,
			x: 0,
			y: 0,
			first_service: true,
			choose_list: [],
			elements: [],
			img_src: '',
			dialog: false,
			loading: false
		};
	},

	computed: {
		...mapState({
			theme: state => state.mallConfig.theme,
			userInfo: state => state.user.info
		})
	},
	methods: {
		toSubmit() {
			let that = this;
			if (that.loading) {
				return false;
			}
			uni.showLoading({
				title: '提交中...'
			});
			that.beSubmit = false;
			that.loading = true;
			that
				.$request({
					url: that.$api.mch.edit,
					data: {
						form: JSON.stringify(that.form),
						mch_id: that.mch_id
					},
					method: 'post'
				})
				.then(response => {
					that.loading = false;
					that.$hideLoading();
					if (response.code == 0) {
						that.$hideLoading();
						uni.hideLoading();
						if (response.code == 0) {
							uni.showToast({
								title: response.msg,
								duration: 1000
							});
							uni.setStorage({
								key: 'goods_status',
								data: '保存成功'
							});
							setTimeout(function() {
								uni.navigateBack();
							}, 500);
						} else {
							uni.showToast({
								title: response.msg,
								icon: 'none',
								duration: 1000
							});
						}
					} else {
						uni.showToast({
							title: response.msg,
							icon: 'none',
							duration: 1000
						});
					}
				})
				.catch(() => {
					that.loading = false;
					that.$hideLoading();
					uni.hideLoading();
				});
		},

		submit() {
			let pass = false;
			let that = this;
			let form = that.form;
			if (that.img.length > 0) {
				form.pic_url = that.img;
			} else {
				that.error = '请上传商品图片';
				return false;
			}
			if (!form.name) {
				that.error = '请设置商品名称';
				return false;
			}
			form.cats = [];
			if (that.beCat[0].label == '未选择') {
				that.error = '请设置商品分类';
				return false;
			} else {
				that.beCat.forEach(function(row) {
					form.cats.push(row.value);
				});
			}
			if (that.beMchCat[0].label == '未选择') {
				that.error = '请设置多商户分类';
				return false;
			} else {
				that.beMchCat.forEach(function(row) {
					form.cats.push(row.value);
				});
			}
			if (!that.unit) {
				that.error = '请设置商品单位';
				return false;
			} else {
				if (!form.unit) {
					form.unit = that.unit;
				}
			}
			if (!form.cost_price) {
				that.error = '请设置商品成本价';
				return false;
			}
			if (form.cost_price < 0) {
				that.error = '成本价不得小于零';
				return false;
			}
			if (!form.original_price) {
				that.error = '请设置商品原价';
				return false;
			}
			if (form.original_price < 0) {
				that.error = '商品原价不得小于零';
				return false;
			}
			if (that.attr.length > 0) {
				form.use_attr = 1;
				form.goods_num = 0;
				that.attr.forEach(function(row, index) {
					if (!that.attr[index].attr_list[0].attr_name) {
						that.error = '请输入规格名';
						return false;
					} else if (!that.attr[index].price) {
						that.error = '请输入规格售价';
						return false;
					} else if (!that.attr[index].stock) {
						that.error = '请输入规格库存';
						return false;
					} else {
						if (index == that.attr.length - 1) {
							pass = true;
						}
					}
				});
				form.attr = that.attr;
			} else {
				form.use_attr = 0;
				form.attr = [];
				if (!form.price) {
					that.error = '请设置商品售价';
					return false;
				} else if (!form.goods_num) {
					that.error = '商品库存不得为空';
					return false;
				} else if (form.goods_num < 0) {
					that.error = '商品库存不得小于零';
					return false;
				} else if (form.price < 0.01) {
					that.error = '商品售价不得小于零';
					return false;
				} else {
					pass = true;
				}
			}
			form.services = [];
			if (that.beService.length > 0) {
				form.services = that.beService;
			}
			form.status = 0;
			form.virtual_sales = 0;
			form.cover_pic = '';
			form.sort = 100;
			form.accumulative = 1;
			form.member_price = {};
			form.mchCats = [];
			if (that.goods_detail.length > 0) {
				form.detail = '';
				that.goods_detail.forEach(function(row) {
					form.detail += '<p><img src=' + row.pic_url + '></p>';
				});
			} else {
				that.error = '请设置图文描述';
				return false;
			}
			if (form.forehead_integral) {
				if (form.forehead_integral > 0) {
					form.forehead_integral_type == 1;
				} else {
					form.forehead_integral_type == 2;
					form.forehead_integral = form.forehead_integral.replace('%', '');
				}
			}
			if (form.give_integral) {
				if (form.give_integral > 0) {
					form.give_integral_type == 1;
				} else {
					form.give_integral_type == 2;
					form.give_integral = form.give_integral.replace('%', '');
				}
			}
			form.freight_id = that.bePostage.id;
			form.freight = that.bePostage;
			form.individual_share = 0;
			form.is_level = 0;
			form.individual_share = 0;
			form.mch_id = that.mch_id;
			form.sign = 'mch';
			form.video_url = '';
			if (pass) {
				that.form = form;
				that.beSubmit = true;
			}
		},

		close() {
			this.error = null;
			this.set_cat = false;
			this.set_mch_cat = false;
			this.set_postage = false;
			this.set_service = false;
			this.modal = false;
		},

		inputAttr(index) {
			this.attr[index].attr_list[0].attr_id = (+index + 2).toString();
		},

		_longtap: function(img_src, index, e) {
			let that = this;
			let query = uni.createSelectorQuery();
			let nodesRef = query.selectAll('.move-img');
			nodesRef
				.fields(
					{
						dataset: true,
						rect: true
					},
					result => {
						that.elements = result;
					}
				)
				.exec();
			// const detail = e.detail;
			that.img[index].pic_url = '';
			that.x = e.currentTarget.offsetLeft;
			that.y = e.currentTarget.offsetTop;
			that.imgHidden = false;
			that.flag = true;
			that.beMove = true;
			that.img_src = img_src;
			that.beginIndex = index;
		},
		//触摸结束
		touchend: function(e) {
			let that = this;
			if (!that.flag) {
				return;
			}
			const x = e.changedTouches[0].pageX;
			const y = e.changedTouches[0].pageY;
			const list = that.elements;
			let data = that.img;
			const beginIndex = that.beginIndex;
			for (var j = 0; j < list.length; j++) {
				const item = list[j];
				if (x > item.left && x < item.right && y > item.top && y < item.bottom) {
					const endIndex = item.dataset.index;
					//向后移动
					if (beginIndex < endIndex) {
						let tem = data[beginIndex];
						for (let i = beginIndex; i < endIndex; i++) {
							data[i] = data[i + 1];
						}
						data[endIndex] = tem;
					}
					//向前移动
					if (beginIndex > endIndex) {
						let tem = data[beginIndex];
						for (let i = beginIndex; i > endIndex; i--) {
							data[i] = data[i - 1];
						}
						data[endIndex] = tem;
					}
					data[endIndex].pic_url = that.img_src;
					that.img = data;
				}
			}
			if (!that.img[beginIndex].pic_url) {
				that.img[beginIndex].pic_url = that.img_src;
			}
			that.imgHidden = true;
			that.flag = false;
			that.beMove = false;
			that.beginIndex = null;
		},
		//滑动
		touchm: function(e) {
			if (this.flag) {
				const x = e.touches[0].pageX;
				const y = e.touches[0].pageY;
				this.x = x - 60;
				this.y = y - 129;
			}
		},
		cancelService() {
			let beService = this.beService;
			let service = this.service;
			if (beService.length > 0) {
				service.forEach(function(res) {
					res.isChoose = false;
					beService.forEach(function(row) {
						if (row.id == res.id) {
							res.isChoose = true;
						}
					});
				});
			} else {
				service.forEach(function(res) {
					res.isChoose = false;
				});
			}
			this.beService = beService;
			this.service = service;
			this.set_service = false;
			this.is_service = false;
		},

		submitService() {
			let beService = [];
			this.service.forEach(function(row) {
				if (row.isChoose) {
					beService.push(row);
				}
			});
			this.beService = beService;
			this.set_service = false;
			this.is_service = false;
		},
		choose(item) {
			let that = this;
			that.service.forEach(function(row) {
				if (row.id == item.id) {
					row.isChoose = !row.isChoose;
					that.$forceUpdate();
				}
			});
		},
		toGoodsDetail() {
			uni.navigateTo({
				url: '/pages/admin/goods-detail/goods-detail'
			});
		},
		add_img() {
			let that = this;
			let num = 9 - that.img.length;
			uni.chooseImage({
				count: num,
				sizeType: ['original', 'compressed'],
				sourceType: ['album', 'camera'],
				success(res) {
					// tempFilePath可以作为img标签的src属性显示图片
					const tempFilePaths = res.tempFilePaths;
					let img = that.img;
					tempFilePaths.forEach(function(row, index) {
						uni.showLoading({
							title: '上传中...'
						});
						let fileName = '';

						// #ifdef MP-BAIDU
						fileName = row.substr(row.lastIndexOf('/') + 1);
						// #endif
						uni.uploadFile({
							url: that.$api.upload.file,
							filePath: row,
							name: 'file',
							fileType: 'image',
							formData: {
								file: row,
								file_name: fileName
							},
							success(res) {
								// #ifndef MP-BAIDU
								const imgInfo = JSON.parse(res.data);
								// #endif
								// #ifdef MP-BAIDU
								const imgInfo = res.data;
								// #endif
								let para = {
									pic_url: imgInfo.data.url,
									id: imgInfo.data.id
								};
								if (imgInfo.code == 0) {
									img.push(para);
								}
								that.img = img;
								if (index == tempFilePaths.length - 1) {
									uni.hideLoading();
								}
							},
							fail(res) {
								uni.showToast({
									title: res.msg,
									icon: 'none',
									duration: 1000
								});
							}
						});
					});
				}
			});
		},
		del_img(index) {
			this.img.splice(index, 1);
		},
		chooseCat() {
			this.set_cat = true;
			if (this.cat.length == 0) {
				this.modal = true;
			} else {
				this.dialog = true;
				this.in_cat = null;
				this.index = 0;
				this.have_children = false;
				this.beCat = [{ label: '未选择' }];
				this.isChooseCat = ['未选择'];
				this.choose_list = this.cat;
				this.$forceUpdate();
			}
		},
		chooseMchCat() {
			this.set_mch_cat = true;
			if (this.mch_cat.length == 0) {
				this.modal = true;
			} else {
				this.dialog = true;
				this.in_mch_cat = null;
				this.index = 0;
				this.have_children = false;
				this.beMchCat = [{ label: '未选择' }];
				this.isChooseCat = ['未选择'];
				this.choose_list = this.mch_cat;
				this.$forceUpdate();
			}
		},
		bindChange(e) {
			this.newIndex = e.detail.value[0];
		},
		choose_cat() {
			let that = this;
			let beCat = that.beCat;
			// let isChooseCat = [];
			let have_children = false;
			let arr = that.cat[that.newIndex];
			let index = that.index;
			if (that.have_children) {
				arr = beCat[index - 1].children[that.newIndex - 1];
			}
			beCat[index] = arr;
			index++;
			if (arr) {
				let isChooseCat = [];
				beCat.forEach(function(row) {
					isChooseCat.push(row.label);
				});
				isChooseCat.push('未选择');
				that.isChooseCat = isChooseCat;
				if (arr.children) {
					that.choose_list = [{ label: '不选择' }];
					setTimeout(function() {
						arr.children.forEach(function(row) {
							that.choose_list.push(row);
						});
					}, 0);
					have_children = true;
				} else {
					let in_cat;
					beCat.forEach(function(row, index) {
						if (row.label.length > 5) {
							row.label = row.label.slice(0, 4) + '...';
						}
						if (index == 0) {
							in_cat = row.label;
						} else {
							in_cat += '/' + row.label;
						}
					});
					that.in_cat = in_cat;
					that.dialog = false;
					that.set_cat = false;
				}
			} else {
				beCat.pop();
				let in_cat;
				beCat.forEach(function(row, index) {
					if (index == 0) {
						in_cat = row.label;
					} else {
						in_cat += '/' + row.label;
					}
				});
				that.in_cat = in_cat;
				that.dialog = false;
				that.set_cat = false;
			}
			that.newIndex = '0';
			that.beCat = beCat;
			that.index = index;
			that.have_children = have_children;
		},
		choose_mch_cat() {
			let that = this;
			let beMchCat = that.beMchCat;
			// let isChooseCat = [];
			let have_children = false;
			let arr = that.mch_cat[that.newIndex];
			let index = that.index;
			if (that.have_children) {
				arr = beMchCat[index - 1].children[that.newIndex - 1];
			}
			beMchCat[index] = arr;
			index++;
			if (arr) {
				let isChooseCat = [];
				beMchCat.forEach(function(row) {
					isChooseCat.push(row.label);
				});
				isChooseCat.push('未选择');
				that.isChooseCat = isChooseCat;
				if (arr.children) {
					that.choose_list = [{ label: '不选择' }];
					setTimeout(function() {
						arr.children.forEach(function(row) {
							that.choose_list.push(row);
						});
					}, 0);
					have_children = true;
				} else {
					let in_mch_cat;
					beMchCat.forEach(function(row, index) {
						if (row.label.length > 5) {
							row.label = row.label.slice(0, 4) + '...';
						}
						if (index == 0) {
							in_mch_cat = row.label;
						} else {
							in_mch_cat += '/' + row.label;
						}
					});
					that.in_mch_cat = in_mch_cat;
					that.dialog = false;
					that.set_mch_cat = false;
				}
			} else {
				beMchCat.pop();
				let in_mch_cat;
				beMchCat.forEach(function(row, index) {
					if (index == 0) {
						in_mch_cat = row.label;
					} else {
						in_mch_cat += '/' + row.label;
					}
				});
				that.in_mch_cat = in_mch_cat;
				that.dialog = false;
				that.set_cat = false;
			}
			that.newIndex = '0';
			that.beMchCat = beMchCat;
			that.index = index;
			that.have_children = have_children;
		},
		toggle(status) {
			this.choose_list = [];
			this.dialog = false;
			this.set_cat = false;
			this.set_mch_cat = false;
			if (status == 1) {
				if (this.set_postage) {
					this.bePostage = this.postage[this.newIndex];
				}
			} else {
				this.set_postage = false;
			}
		},
		add_attr() {
			let attr_content = {
				attr_list: [
					{
						attr_group_id: '1',
						attr_group_name: '规格',
						attr_id: 0,
						attr_name: ''
					}
				],
				stock: '',
				price: '',
				no: '',
				weight: '',
				pic_url: '',
				share_commission_first: 0,
				share_commission_second: 0,
				share_commission_third: 0,
				member_price: {}
			};
			this.attr.push(attr_content);
		},
		pop(index) {
			this.attr.splice(index, 1);
		},
		chooseService() {
			let that = this;
			if (that.first_service) {
				that
					.$request({
						url: that.$api.mch.service,
						data: {
							mch_id: that.mch_id
						}
					})
					.then(response => {
						that.$hideLoading();
						if (response.code == 0) {
							that.service = response.data.list;
							if (response.data.list.length == 0) {
								that.modal = true;
							} else {
								that.is_service = true;
							}
							let beService = [];
							response.data.list.forEach(function(row) {
								row.isChoose = false;
								if (row.is_default == 1) {
									beService.push(row);
									row.isChoose = true;
								}
							});
							that.set_service = true;
							that.beService = beService;
							that.first_service = false;
						} else {
							uni.showToast({
								title: response.msg,
								icon: 'none',
								duration: 1000
							});
						}
					})
					.catch(() => {
						that.$hideLoading();
					});
			} else {
				if (that.service.length == 0) {
					that.modal = true;
				} else {
					that.is_service = true;
				}
			}
		},
		chooseExpress() {
			let that = this;
			that
				.$request({
					url: that.$api.mch.postage,
					data: {
						mch_id: that.mch_id
					}
				})
				.then(response => {
					that.$hideLoading();
					if (response.code == 0) {
						if (response.data.list.length == 0) {
							that.set_postage = true;
							that.modal = true;
							that.postage = response.data.list;
						} else {
							let arr = [];
							response.data.list.forEach(function(row, index) {
								arr.push(response.data.list[index].id);
							});
							let index = arr.indexOf(that.bePostage.id);
							if (index > -1) {
								that.postageIndex = index;
								that.newIndex = index;
							} else {
								that.bePostage = '';
							}
							that.set_postage = true;
							that.dialog = true;
							that.postage = response.data.list;
						}
					} else {
						uni.showToast({
							title: response.msg,
							icon: 'none',
							duration: 1000
						});
					}
				})
				.catch(() => {
					that.$hideLoading();
				});
		},
		getCat() {
			let that = this;
			that
				.$request({
					url: that.$api.mch.cat,
					data: {
						mch_id: that.mch_id
					}
				})
				.then(response => {
					that.$hideLoading();
					if (response.code == 0) {
						that.cat = response.data.list;
					} else {
						uni.showToast({
							title: response.msg,
							icon: 'none',
							duration: 1000
						});
					}
				})
				.catch(() => {
					that.$hideLoading();
				});
		},
		getMchCat() {
			let that = this;
			that
				.$request({
					url: that.$api.mch.mch_cat,
					data: {
						mch_id: that.mch_id
					}
				})
				.then(response => {
					that.$hideLoading();
					if (response.code == 0) {
						that.mch_cat = response.data.list;
					} else {
						uni.showToast({
							title: response.msg,
							icon: 'none',
							duration: 1000
						});
					}
				})
				.catch(() => {
					that.$hideLoading();
				});
		},
		getService() {
			let that = this;
			that
				.$request({
					url: that.$api.mch.service,
					data: {
						mch_id: that.mch_id
					}
				})
				.then(response => {
					that.$hideLoading();
					if (response.code == 0) {
						that.service = response.data.list;
						that.beService = [];
						response.data.list.forEach(function(row) {
							row.isChoose = false;
							if (row.is_default == 1) {
								that.beService.push(row);
								row.isChoose = true;
							}
						});
					} else {
						uni.showToast({
							title: response.msg,
							icon: 'none',
							duration: 1000
						});
					}
				})
				.catch(() => {
					that.$hideLoading();
				});
		},
		getPostage() {
			let that = this;
			that
				.$request({
					url: that.$api.mch.postage,
					data: {
						mch_id: that.mch_id
					}
				})
				.then(response => {
					that.$hideLoading();
					if (response.code == 0) {
						that.postage = response.data.list;
						that.bePostage = '';
						response.data.list.forEach(function(row) {
							if (row.status == 1) {
								that.bePostage = row;
							}
						});
					} else {
						uni.showToast({
							title: response.msg,
							icon: 'none',
							duration: 1000
						});
					}
				})
				.catch(() => {
					that.$hideLoading();
				});
		}
	},

	onLoad(options) {
		let that = this;
		uni.getSystemInfo({
			success: function(res) {
				if (
					res.model.indexOf('iPhone X') > -1 ||
					res.model.indexOf('iPhone 11') > -1 ||
					res.model.indexOf('iPhone11') > -1 ||
					res.model.indexOf('iPhone12') > -1 ||
					res.model.indexOf('Unknown Device') > -1
				) {
					that.iphone_x = true;
				}
			}
		});
		that.mch_id = options.mch_id;
		uni.getSystemInfo({
			success: function(res) {
				let clientHeight = res.windowHeight;
				let clientWidth = res.windowWidth;
				let ratio = 750 / clientWidth;
				that.height = clientHeight * ratio;
			}
		});
		that.getCat();
		that.getService();
		that.getPostage();
		that.getMchCat();
		uni.removeStorage({
			key: 'goods_mch_detail',
			success() {
				that.goods_detail = [];
			}
		});
	},
	onShow() {
		let that = this;
		uni.getStorage({
			key: 'goods_mch_detail',
			success(res) {
				that.goods_detail = res.data;
			}
		});
	}
};
</script>

<style scoped lang="scss">
.title {
	font-size: #{28rpx};
	color: #999;
	margin: #{30rpx} #{24rpx} #{13rpx};
}

.goods-img {
	background-color: #fff;
	padding: #{32rpx} #{24rpx};
}

.goods-list {
	margin-top: #{8rpx};
	margin-left: #{-24rpx};
}

.goods-item {
	position: relative;
	margin-left: #{24rpx};
	margin-top: #{24rpx};
	height: #{218rpx};
	width: #{218rpx};
}

.label {
	font-size: #{28rpx};
	color: #999;
}

.goods-cover {
	height: #{218rpx};
	width: #{218rpx};
}

.del-btn {
	height: #{40rpx};
	width: #{40rpx};
	position: absolute;
	right: #{-8rpx};
	top: #{-16rpx};
}

.main-img {
	height: #{40rpx};
	line-height: #{40rpx};
	width: #{218rpx};
	text-align: center;
	font-size: #{24rpx};
	color: #fff;
	background-color: rgba(255, 69, 68, 0.5);
	position: absolute;
	bottom: 0;
	left: 0;
}

.add-goods-img {
	background-color: #f4f5f9;
	position: relative;
	margin-left: #{24rpx};
	margin-top: #{24rpx};
	height: #{218rpx};
	width: #{218rpx};
	font-size: #{24rpx};
	color: #999;
	text-align: center;
	z-index: 100;
}

.add-goods-img image {
	height: #{40rpx};
	width: #{40rpx};
	margin: #{70rpx} auto #{10rpx};
}

.goods-info {
	background-color: #fff;
	padding: 0 #{24rpx};
}

.form-label {
	width: #{176rpx};
}

.info-item {
	border-top: #{1rpx} solid #e2e2e2;
	height: #{88rpx};
	line-height: #{88rpx};
	font-size: #{28rpx};
	color: #353535;
}

.input {
	width: #{526rpx};
	background-color: #fff;
	padding-left: #{25rpx};
}

.cat-info {
	width: #{526rpx};
	color: #666;
}

.to-more {
	height: #{24rpx};
	width: #{12rpx};
	margin-left: #{10rpx};
}

.price-input {
	position: relative;
	color: #666;
	height: #{88rpx};
	width: #{462rpx};
}

.money {
	position: absolute;
	height: #{88rpx};
	line-height: #{88rpx};
	width: #{20rpx};
	left: 0;
	top: 0;
}

.attr-info {
	background-color: #fff;
	padding: 0 #{24rpx};
	margin-top: #{20rpx};
}

.attr-input {
	width: #{638rpx};
}

.attr-input .input {
	color: #666;
	width: #{462rpx};
}

.low-attr {
	margin-top: #{24rpx};
	height: #{40rpx};
	width: #{40rpx};
	margin-right: #{24rpx};
}

.add-attr {
	height: #{120rpx};
	background-color: #fff;
	padding-top: #{24rpx};
	border-top: #{1rpx} solid #e2e2e2;
}

.add-attr-btn {
	height: #{72rpx};
	width: #{320rpx};
	border-radius: #{36rpx};
	border: #{1rpx} solid #ff4544;
	margin: 0 auto;
	color: #ff4544;
	font-size: #{26rpx};
	line-height: #{72rpx};
}

.add-attr-btn image {
	height: #{28rpx};
	width: #{28rpx};
	margin-right: #{12rpx};
	margin-top: #{22rpx};
}

.express-setting {
	height: #{136rpx};
	padding: #{16rpx} 0 #{20rpx};
	border-top: #{1rpx} solid #e2e2e2;
}

.express-input {
	position: relative;
}

.express-input .input {
	width: #{702rpx};
	padding-left: #{216rpx};
}

.express-input view {
	position: absolute;
	left: 0;
	z-index: 10;
}

.express-etc {
	color: #999;
	font-size: #{24rpx};
	margin-top: #{16rpx};
}

.send {
	height: #{80rpx};
	line-height: #{80rpx};
	text-align: center;
	width: #{702rpx};
	margin: #{80rpx} #{24rpx};
	font-size: #{28rpx};
	color: #fff;
	background-color: #ff4544;
	border-radius: #{40rpx};
}

.dialog {
	position: fixed;
	height: 100%;
	width: 100%;
	bottom: 0;
	left: 0;
	z-index: 200;
	background-color: rgba(0, 0, 0, 0.3);
}

.dialog.iphone_x .picker-list {
	padding-bottom: #{50rpx};
}

.picker {
	width: 100%;
	height: #{440rpx};
	color: #999999;
}

.dialog.iphone_x .picker {
	height: #{490rpx};
}

.picker-list {
	background-color: #fff;
	padding-top: #{20rpx};
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
}

.picker-header {
	padding: 0 #{24rpx};
	color: #ff4544;
	font-size: #{32rpx};
}

.is_cat {
	padding: #{50rpx} 0 0 #{24rpx};
	color: #666666;
	font-size: #{28rpx};
	border-bottom: #{1rpx} solid #e2e2e2;
}

.is_cat text {
	margin-right: #{48rpx};
	display: inline-block;
	max-width: #{130rpx};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.is_cat text:last-of-type {
	padding-bottom: #{24rpx};
	color: #ff4544;
	border-bottom: #{2rpx} solid #ff4544;
}

.type-choose {
	padding: 0 #{24rpx} 0 #{72rpx};
	height: #{36rpx};
	line-height: #{36rpx};
	color: #353535;
	font-size: #{32rpx};
	text-align: left;
	margin: #{35rpx} 0 #{50rpx};
}

.type-choose .active {
	color: #ff4544;
}

.active-status {
	width: #{36rpx};
	height: #{36rpx};
	display: block;
	margin-right: #{24rpx};
}

.attr-btn-item {
	padding-left: #{88rpx};
	background-color: #fff;
}

.dialog {
	position: fixed;
	height: 100%;
	width: 100%;
	bottom: 0;
	left: 0;
	z-index: 200;
	background-color: rgba(0, 0, 0, 0.3);
}

.dialog-item {
	padding-top: #{20rpx};
	position: fixed;
	top: 30%;
	left: 0;
	right: 0;
	margin: 0 auto;
	width: #{620rpx};
	border-radius: #{16rpx};
	background-color: #fff;
}

.btn-area {
	height: #{88rpx};
	position: relative;
	border-top: #{1rpx} solid #e2e2e2;
}

.btn-area .line {
	height: #{32rpx};
	width: #{1rpx};
	background-color: #e2e2e2;
	position: absolute;
	top: #{28rpx};
	left: 0;
	right: 0;
	margin: 0 auto;
}

.submit-btn {
	height: #{88rpx};
	line-height: #{88rpx};
	font-size: #{32rpx};
	color: #666;
	width: #{310rpx};
	text-align: center;
}

.submit-btn.be-submit {
	color: #ff4544;
}

.dialog-title {
	text-align: center;
	margin: #{15rpx} 0 #{50rpx};
}

.img-border {
	height: #{250rpx};
	width: #{250rpx};
	margin-top: #{-16rpx};
	margin-left: #{-16rpx};
}

.screen {
	height: 100%;
	overflow: hidden;
}

.error-info {
	text-align: center;
	margin: #{50rpx};
}

.submit-info {
	text-align: center;
	margin-bottom: #{60rpx};
}

.picker-text {
	line-height: #{88rpx};
	color: #ff4544;
	font-size: #{32rpx};
	padding-left: #{24rpx};
}

.integral {
	font-size: #{28rpx};
	color: #353535;
}

.integral-info .express-setting {
	height: #{164rpx};
}

.integral-info .express-setting:first-of-type {
	border-top: 0;
}

.label-info {
	font-size: #{24rpx};
	color: #999999;
}
</style>
