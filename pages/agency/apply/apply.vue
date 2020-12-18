<template>
	<app-layout>
		<view v-if="status === -1 || form_status">
			<view class="list dir-left-wrap">
				<view class="list-item">
					<view>
						<image src="../image/apply-tj.png"></image>
						<view style="color: #FE4E4E;">基本信息</view>
					</view>
				</view>
				<view class="apply-hx" style="background-color: #FE4E4E;"></view>
				<view class="list-item">
					<view v-if="showZz">
						<image src="../image/apply-tj.png" v-if="showZz"></image>
						<view style="color: #FE4E4E;">资质信息</view>
					</view>
					<view v-else>
						<image src="../image/apply-wtj.png"></image>
						<view>资质信息</view>
					</view>
				</view>
				<view class="apply-hx" style="background-color: #FE4E4E;" v-if="showZz"></view>
				<view class="apply-hx" v-else></view>
				<view class="list-item">
					<view v-if="showYhk">
						<image src="../image/apply-tj.png"></image>
						<view style="color: #FE4E4E;">银行卡信息</view>
					</view> 
					<view v-else>
						<image src="../image/apply-wtj.png"></image>
						<view>银行卡信息</view>
					</view>
				</view>
			</view>
			<!-- 基础信息 -->
			<view class="white" v-show="basicInfo">
				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right" style="color: red;">推荐人</view>
					<view class="box-grow-1">
						<input
							@input="applyInput"
							style="color: red;"
							disabled
							data-type="mobile"
							placeholder="请填写"
							placeholder-class="plugins-mch-apply-input"
							name="mobile"
							:value="mobile"
						/>
					</view>
				</view>
				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">商户账号</view>
					<view class="box-grow-1">
						<input
							@input="applyInput"
							:disabled="form_status && status !== 2"
							data-type="username"
							placeholder-class="plugins-mch-apply-input"
							placeholder="请输入商户手机号"
							name="username"
							:value="form.username"
						/>
					</view>
				</view>
				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">登录密码</view>
					<view class="box-grow-1">
						<input
							@input="applyInput"
							:disabled="form_status && status !== 2"
							password
							data-type="password"
							placeholder-class="plugins-mch-apply-input"
							placeholder="必填"
							name="password"
							:value="form.password"
						/>
					</view>
				</view>
				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">店铺名称</view>
					<view class="box-grow-1">
						<input
							@input="applyInput"
							:disabled="form_status && status !== 2"
							data-type="name"
							placeholder-class="plugins-mch-apply-input"
							placeholder="必填"
							name="name"
							:value="form.name"
						/>
					</view>
				</view>
				<!-- 资质类型 -->
				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">资质类型</view>
					<view class="zztype">
						<label>
							<radio value="02" :checked="haveLicenseNo === '02'" @click="radiozz('02')" />
							<text>个体户</text>
						</label>
						<label style="margin-left: 20rpx;">
							<radio value="03" :checked="haveLicenseNo === '03'" @click="radiozz('03')" />
							<text>企业</text>
						</label>
					</view>
				</view>
				<!-- 资质类型 -->
				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">所售类目</view>
					<view class="box-grow-1">
						<picker
							:disabled="form_status && status !== 2"
							:range="category_list"
							range-key="name"
							class="category-picker"
							:value="form.mch_common_cat_id"
							@change="categoryChange"
						>
							<view class="cross-center dir-left-nowrap category-info">
								<view class="box-grow-1 category-select">
									{{ form.mch_common_cat_str ? form.mch_common_cat_str : `请选择` }}
								</view>
								<view class="box-grow-0 cross-center"><icon class="icon-arrow-right"></icon></view>
							</view>
						</picker>
					</view>
				</view>
				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">所在地区</view>
					<view class="box-grow-1 area-left">
						<app-area-picker
							@customevent="areaEvent"
							:ids="[area.province_id, area.city_id, area.district_id]"
						></app-area-picker>
					</view>
				</view>
				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">详细地址</view>
					<view class="box-grow-1">
						<input
							@input="applyInput"
							:disabled="form_status && status !== 2"
							data-type="address"
							placeholder-class="plugins-mch-apply-input"
							placeholder="请输入详细地址"
							name="address"
							:value="form.address"
						/>
					</view>
				</view>
				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">联系人</view>
					<view class="box-grow-1">
						<input
							@input="applyInput"
							:disabled="form_status && status !== 2"
							data-type="realname"
							placeholder-class="plugins-mch-apply-input"
							placeholder="必填"
							name="realname"
							:value="form.realname"
						/>
					</view>
				</view>
				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">联系电话</view>
					<view class="box-grow-1">
						<input
							@input="applyInput"
							:disabled="form_status && status !== 2"
							data-type="mobile"
							placeholder-class="plugins-mch-apply-input"
							placeholder="必填"
							name="mobile"
							:value="form.mobile"
						/>
					</view>
				</view>
				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">客服电话</view>
					<view class="box-grow-1">
						<input
							@input="applyInput"
							:disabled="form_status && status !== 2"
							data-type="service_mobile"
							placeholder-class="plugins-mch-apply-input"
							placeholder="必填"
							name="service_mobile"
							:value="form.service_mobile"
						/>
					</view>
				</view>
				<view class="uploaditem label-left dir-left-nowrap cross-top ">
					<view class="box-grow-0 cross-top label"><view class="name-key">店铺门头</view></view>
					<view class="box-grow-1 dir-left-wrap opload-img">
						<app-upload-image
							:value="imgList.dpmt"
							:max-num="1"
							@image-event="handleImageUploaddpmt"
							:sign="`${index}`"
							:show-number="false"
						></app-upload-image>
					</view>
				</view>
				<view class="uploaditem label-left dir-left-nowrap cross-top ">
					<view class="box-grow-0 cross-top label"><view class="name-key">店铺内景</view></view>
					<view class="box-grow-1 dir-left-wrap opload-img">
						<app-upload-image
							:value="imgList.dpnj"
							:max-num="1"
							@image-event="handleImageUploaddpnj"
							:sign="`${index}`"
							:show-number="false"
						></app-upload-image>
					</view>
				</view>
				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">商家意向折扣</view>
					<view class="box-grow-1">
						<input
							@input="applyInput"
							:disabled="form_status && status !== 2"
							data-type="intention_discount"
							placeholder-class="plugins-mch-apply-input"
							placeholder="请输入商家折扣值(70即7折)"
							name="intention_discount"
							:value="form.intention_discount"
						/>
					</view>
				</view>
				<view class="uploaditem label-left dir-left-nowrap cross-top ">
					<view class="box-grow-0 cross-top label"><view class="name-key">商户要求</view></view>
					<view class="box-grow-1 dir-left-wrap opload-img">
						<textarea
							style="font-size: 28rpx;padding-top: 16rpx;"
							placeholder="最多输入50字"
							v-model="form.requirement"
							maxlength="50"
						></textarea>
					</view>
				</view>
			</view>
			<view class="main-center submit-btn" v-show="basicInfo">
				<app-button
					@click="nextSubmit(1)"
					height="80"
					width="604"
					font-size="32"
					background="#ff4544"
					color="#FFFFFF"
					round
				>
					下一步
				</app-button>
			</view>
			<!-- 资质信息 -->
			<view class="white" v-show="legalInfo">
				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">法人姓名</view>
					<view class="box-grow-1">
						<input
							@input="applyInputadd"
							:disabled="form_status && status !== 2"
							data-type="legalname"
							placeholder-class="plugins-mch-apply-input"
							placeholder="请输入法人姓名"
							name="legalname"
							:value="form_add.legalname"
						/>
					</view>
				</view>
				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">法人身份证号</view>
					<view class="box-grow-1">
						<input
							@input="applyInputadd"
							:disabled="form_status && status !== 2"
							data-type="legalidentity"
							placeholder-class="plugins-mch-apply-input"
							placeholder="请输入法人身份证号"
							name="legalidentity"
							:value="form_add.legalidentity"
						/>
					</view>
				</view>
				<view class="uploaditem label-left dir-left-nowrap cross-top ">
					<view class="box-grow-0 cross-top label"><view class="name-key">法人身份证</view></view>
					<view class="box-grow-1 dir-left-wrap opload-img">
						<app-upload-image
							:value="imgList.identityimg[0]"
							style="margin-right: 12rpx"
							:max-num="1"
							@image-event="handleUserIdFrontUpload"
							:sign="`${index}`"
							text="身份证正面"
							:show-number="false"
							default-img="/static/image/user-id-card-front.png"
						></app-upload-image>
						<app-upload-image
							:value="imgList.identityimg[1]"
							:max-num="1"
							@image-event="handleUserIdBackUpload"
							:sign="`${index}`"
							text="身份证反面"
							:show-number="false"
							default-img="/static/image/user-id-card-back.png"
						></app-upload-image>
					</view>
				</view>

				<view class="uploaditem label-left dir-left-nowrap cross-top ">
					<view class="box-grow-0 cross-top label"><view class="name-key">营业执照</view></view>
					<view class="box-grow-1 dir-left-wrap opload-img">
						<app-upload-image
							:value="imgList.business"
							:max-num="1"
							@image-event="handleImageUploadbusiness"
							:sign="`${index}`"
							text="营业执照"
							:show-number="false"
							default-img="/static/image/company-license.png"
						></app-upload-image>
					</view>
				</view>
				<view class="uploaditem label-left dir-left-nowrap cross-top ">
					<view class="box-grow-0 cross-top label"><view class="name-key">其他资质证件照</view></view>
					<view class="box-grow-1 dir-left-wrap opload-img">
						<app-upload-image
							:value="imgList.businessqt"
							:max-num="1"
							@image-event="handleImageUploadbusinessqt"
							:sign="`${index}`"
							:show-number="false"
						></app-upload-image>
					</view>
				</view>
			</view>

			<view class="main-center submit-btn" v-show="legalInfo">
				<app-button
					@click="previousSubmit(2)"
					height="80"
					width="302"
					font-size="32"
					background="#ff4544"
					color="#FFFFFF"
					round
				>
					上一步
				</app-button>
				<app-button
					@click="nextSubmit(2)"
					height="80"
					width="302"
					font-size="32"
					background="#ff4544"
					color="#FFFFFF"
					round
				>
					下一步
				</app-button>
			</view>
			<!-- 银行卡信息 -->
			<view class="white" v-show="bankInfo">
				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">开户银行</view>
					<view class="box-grow-1">
						<input
							@input="applyInputadd"
							:disabled="form_status && status !== 2"
							data-type="bank"
							placeholder-class="plugins-mch-apply-input"
							placeholder="请输入开户银行"
							name="bank"
							:value="form_add.bank"
						/>
					</view>
				</view>
				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">开户支行</view>
					<view class="box-grow-1">
						<input
							@input="applyInputadd"
							:disabled="form_status && status !== 2"
							data-type="bankplace"
							placeholder-class="plugins-mch-apply-input"
							placeholder="请输入开户支行"
							name="bankplace"
							:value="form_add.bankplace"
						/>
					</view>
				</view>
				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">开户名</view>
					<view class="box-grow-1">
						<input
							@input="applyInputadd"
							:disabled="form_status && status !== 2"
							data-type="bankname"
							placeholder-class="plugins-mch-apply-input"
							placeholder="法人姓名"
							name="bankname"
							:value="form_add.bankname"
						/>
					</view>
				</view>
				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">银行卡号</view>
					<view class="box-grow-1">
						<input
							@input="applyInputadd"
							:disabled="form_status && status !== 2"
							data-type="banknum"
							placeholder-class="plugins-mch-apply-input"
							placeholder="请输入银行卡号"
							name="banknum"
							:value="form_add.banknum"
						/>
					</view>
				</view>
				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">预留手机号</view>
					<view class="box-grow-1">
						<input
							@input="applyInputadd"
							:disabled="form_status && status !== 2"
							data-type="bankmobile"
							placeholder-class="plugins-mch-apply-input"
							placeholder="请输入银行预留手机号"
							name="bankmobile"
							:value="form_add.bankmobile"
						/>
					</view>
				</view>
				<view class="uploaditem label-left dir-left-nowrap cross-top ">
					<view class="box-grow-0 cross-top label"><view class="name-key">银行卡照片</view></view>
					<view class="box-grow-1 dir-left-wrap opload-img">
						<app-upload-image
							:value="imgList.bankimg"
							:max-num="1"
							@image-event="handleImageUploadbankimg"
							:sign="`${index}`"
							:show-number="false"
						></app-upload-image>
					</view>
				</view>
			</view>

			<view class="main-center submit-btn" v-show="bankInfo">
				<app-button
					@click="previousSubmit(3)"
					height="80"
					width="302"
					font-size="32"
					background="#ff4544"
					color="#FFFFFF"
					round
				>
					上一步
				</app-button>
				<app-button
					@click="formSubmit"
					height="80"
					width="302"
					font-size="32"
					background="#ff4544"
					color="#FFFFFF"
					round
				>
					提交审核
				</app-button>
			</view>
			<block v-if="!form_status || status === 2">
				<view class="dir-left-nowrap cross-center rules-box">
					<view v-if="rulesStatus" class="icon" @click="rulesTap(false)"><icon class="icon-true"></icon></view>
					<view v-else class="icon" @click="rulesTap(true)"><icon class="icon-false"></icon></view>
					<view class="block">我已阅读并同意</view>
					<view @click="navApplyRules" class="blue">《入驻协议》</view>
				</view>
			</block>

			<view v-if="form_status" class="cross-center dir-top-nowrap main-center">
				<view @click="closeForm" class="result-title">查看审核结果</view>
				<!-- <view @click="navHome" class="result-home">返回首页</view> -->
			</view>
		</view>

		<!-- STATUS -->
		<block v-if="status >= 0 && !form_status">
			<view class="dir-top-nowrap main-center cross-center">
				<view class="main-center form-img">
					<image v-if="status === 0" :src="appImg.load"></image>
					<image v-else-if="status === 1" :src="appImg.success"></image>
					<image v-else-if="status === 2" :src="appImg.error"></image>
				</view>
				<view class="status-title"> 
					<view v-if="status === 0">待审核</view>
					<view v-else-if="status === 1">审核通过</view>
					<view v-else-if="status === 2">审核失败</view>
				</view>
				<view class="status-content">
					<view v-if="status === 0">您的信息已提交，请耐心等待审核。</view>
					<block v-else-if="status === 2">
						<view v-if="mch.review_remark">{{ mch.review_remark }}</view>
						<view v-else>您的信息填写不完整，请重新填写</view>
					</block>
				</view>
				<view v-if="status === 2" class="status-new main-center">
					<app-button
						@click="openForm"
						height="80"
						width="560"
						background="#FF4544"
						color="#FFFFFF"
						font-size="32"
						round
					>
						重新申请
					</app-button>
				</view>
				<view v-else class="status-submit" @click="openForm">查看提交内容</view>
			</view>
		</block>
	</app-layout>
</template>
 
<script>
import { mapState } from 'vuex';
import appAreaPicker from '@/components/page-component/app-area-picker/app-area-picker';
import AppUploadImage from '@/components/basic-component/app-upload-image/app-upload-image';

export default {
	name: 'apply',
	components: { appAreaPicker, AppUploadImage },
	computed: {
		...mapState({
			appImg: state => state.mallConfig.plugin.mch.app_image
		})
	},
	data() {
		return {
			// myList: newList,
			imgList: {
				dpmt: null,
				dpnj: null,
				identityimg: [],
				identityz: null,
				identityf: null,
				business: null,
				businessqt: null,
				bankimg: null
			},
			form_add: {
				legalname: '',
				legalidentity: '',
				bank: '',
				bankplace: '',
				bankname: '',
				banknum: '',
				bankmobile: ''
			},
			showZz: false,
			showYhk: false,
			basicInfo: true,
			legalInfo: false,
			bankInfo: false,
			mch_id: -1,
			category_list: [],
			express_list: null,
			form_data: null,
			form_status: false,
			rulesStatus: false,
			area: {
				province_id: 0,
				city_id: 0,
				district_id: 0
			},
			setting: null,
			status: -2,
			form: {
				realname: '',
				mobile: '',
				wechat: '',
				username: '',
				password: '',
				checkPass: '',
				address: '',
				name: '',
				service_mobile: '',
				mch_common_cat_str: '',
				mch_common_cat_id: 0,
				shopname: '',
				intention_discount: '',
				requirement: ''
			},
			formStatus: {
				errors: [],
				hasError: false
			},
			submit_status: false,
			template_message_list: null,
			mobile: '',
			agent_parent_id: '',
			haveLicenseNo: '02'
		};
	},
	onLoad: function(options) {
		this.mch_id = options.mch_id;
		if (options.agent_parent_id) {
			this.agent_parent_id = options.agent_parent_id;
		}

		this.getCategory();
	},

	methods: {
		hangleForm(form_data) {
			this.form.form_data = form_data;
		},
		navApplyRules() {
			uni.navigateTo({ url: `/pages/agency/apply_rules/apply_rules?rules=` + this.setting.desc });
		},
		navHome() {
			uni.navigateTo({ url: `/pages/index/index` });
		},
		loadData: function() {
			const self = this;
			self.$showLoading();
			self
				.$request({
					url: self.$api.mch.mch_status
				})
				.then(info => {
					self.$hideLoading();
					if (info.code === 0) {
						self.mch = info.data.mch;
						self.status = self.mch ? self.mch.review_status : -1;
						self.template_message_list = info.data.template_message_list;
						if (self.mch) {
							self.formInfo(self.mch.id);
						} else {
							self.getSetting();
						}
					}
				})
				.catch(e => {
					self.$hideLoading();
				});
		},

		//FUNCTION
		getCategory: function() {
			const self = this;
			self
				.$request({
					url: self.$api.mch.category,
					data: {
						id: self.mch_id,
						parent_id: self.agent_parent_id
					}
				})
				.then(info => {
					if (info.code === 0) {
						self.category_list = info.data.list;
						self.mobile = info.data.mobile;
						self.loadData();
					}
				});
		},

		getExpress: function() {
			const self = this;
			self
				.$request({
					url: self.$api.mch.express_list
				})
				.then(info => {
					if (info.code === 0) {
						self.express_list = info.data.list;
					}
				});
		},

		getSetting: function() {
			const self = this;
			self
				.$request({
					url: self.$api.mch.setting
				})
				.then(info => {
					self.$hideLoading();
					if (info.code === 0) {
						self.setting = info.data.setting;
						self.form_data = info.data.setting.form_data;
					}
				});
		},

		//INFO
		formInfo(mch_id) {
			const self = this;
			self.getExpress();

			self
				.$request({
					url: self.$api.mch.detail,
					data: {
						id: mch_id,
						is_review_status: 1
					}
				})
				.then(info => {
					if (info.code === 0) {
						const detail = info.data.detail;

						let mch_common_cat_str = '';
						//类目
						self.category_list.forEach(v => {
							if (v.id == detail.mch_common_cat_id) mch_common_cat_str = v.name;
						});
						if (self.status === 2) {
							self.getSetting();
						}
						self.form_data = detail.form_data;
						console.log('1111', self.form_data);
						self.form_add = {
							legalname: self.form_data[1].value,
							legalidentity: self.form_data[2].value,
							bank: self.form_data[5].value,
							bankplace: self.form_data[7].value,
							bankname: self.form_data[8].value,
							banknum: self.form_data[10].value,
							bankmobile: self.form_data[9].value
						};
						//店铺门头
						self.imgList.dpmt = self.form_data[11].value;
						self.imgList.dpnj = self.form_data[12].value;
						self.imgList.identityz = self.form_data[0].value[0];
						self.imgList.identityimg.push(self.imgList.identityz);
						self.imgList.identityf = self.form_data[0].value[1];
						self.imgList.identityimg.push(self.imgList.identityf);
						self.imgList.business = self.form_data[3].value;
						self.imgList.businessqt = self.form_data[14].value;
						self.imgList.bankimg = self.form_data[4].value;
						self.form = {
							mch_id: detail.id,
							realname: detail.realname,
							mobile: detail.mobile,
							wechat: detail.wechat,
							username: detail.mchUser.username,
							password: '000000',
							checkPass: '000000',
							address: detail.store.address,
							name: detail.store.name,
							service_mobile: detail.store.mobile,
							mch_common_cat_str: mch_common_cat_str,
							mch_common_cat_id: detail.mch_common_cat_id,
							intention_discount: detail.intention_discount,
							requirement: detail.requirement
						};

						self.area = {
							province_id: detail.store.province_id,
							city_id: detail.store.city_id,
							district_id: detail.store.district_id
						};
						self.agent_parent_id = detail.store.parent_id;
						if (detail.store.parent_id !== null) {
							self.mobile = detail.store.parent_id;
						}
						if (detail.store.haveLicenseNo && detail.store.haveLicenseNo !== null) {
							self.haveLicenseNo = detail.store.haveLicenseNo;
						}
					}
				});
		},

		//INPUT
		applyInput: function(e) {
			let name = e.currentTarget.dataset.type;
			this.form[name] = e.detail.value;
		},
		applyInputadd: function(e) {
			let name = e.currentTarget.dataset.type;
			this.form_add[name] = e.detail.value;
		},

		categoryChange(e) {
			const item = this.category_list[e.detail.value];

			this.form.mch_common_cat_id = item.id;
			this.form.mch_common_cat_str = item.name;
		},

		//地址处理
		areaEvent(data) {
			if (data) {
				this.area.province_id = data.province.id;
				this.area.city_id = data.city.id;
				this.area.district_id = data.district.id;
			}
		},

		validateForm: function(e) {
			this.formStatus = e;
		},
		subscribe(callback) {
			this.$subscribe(this.template_message_list)
				.then(res => {
					let tpl_id = this.template_message_list[0];
					if (res[tpl_id] === 'accept') {
						uni.showModal({
							title: '提示',
							content: '订阅成功',
							showCancel: false,
							success(res) {
								callback();
							}
						});
					} else {
						uni.showModal({
							title: '提示',
							content: '取消订阅',
							showCancel: false,
							success(res) {
								callback();
							}
						});
					}
				})
				.catch(res => {
					callback();
				});
		},
		//SUBMIT
		formSubmit: function(e) {
			const self = this;
			let form = self.form;
			let form_add = self.form_add;
			let imgList = self.imgList;
			let form_data = self.form_data;
			for (var i = 0; i < form_data.length; i++) {
				var imgvalue = form_data[i];
				if (form_data[i].name == '店铺门头') {
					imgvalue.value = [imgList.dpmt];
					imgvalue.label = form_data[i].name;
					form_data[i] == imgvalue;
				}
				if (form_data[i].name == '店铺内景') {
					imgvalue.value = [imgList.dpnj];
					imgvalue.label = form_data[i].name;
					form_data[i] == imgvalue;
				}
				if (form_data[i].name == '营业执照') {
					imgvalue.value = [imgList.business];
					imgvalue.label = form_data[i].name;
					form_data[i] == imgvalue;
				}
				if (form_data[i].name == '食品卫生许可证（餐饮食品行业必填）') {
					imgvalue.value = [imgList.businessqt];
					imgvalue.label = form_data[i].name;
					form_data[i] == imgvalue;
				}
				if (form_data[i].name == '法人银行卡') {
					imgvalue.value = [imgList.bankimg];
					imgvalue.label = form_data[i].name;
					form_data[i] == imgvalue;
				}
				if (form_data[i].name == '法人身份证') {
					imgvalue.value = imgList.identityimg;
					imgvalue.label = form_data[i].name;
					form_data[i] == imgvalue;
				}
				if (form_data[i].name == '法人姓名') {
					imgvalue.value = form_add.legalname;
					imgvalue.label = form_data[i].name;
					form_data[i] == imgvalue;
				}
				if (form_data[i].name == '证件号码') {
					imgvalue.value = form_add.legalidentity;
					imgvalue.label = form_data[i].name;
					form_data[i] == imgvalue;
				}
				if (form_data[i].name == '开户银行') {
					imgvalue.value = form_add.bank;
					imgvalue.label = form_data[i].name;
					form_data[i] == imgvalue;
				}
				if (form_data[i].name == '开户支行') {
					imgvalue.value = form_add.bankplace;
					imgvalue.label = form_data[i].name;
					form_data[i] == imgvalue;
				}
				if (form_data[i].name == '开户名称') {
					imgvalue.value = form_add.bankname;
					imgvalue.label = form_data[i].name;
					form_data[i] == imgvalue;
				}
				if (form_data[i].name == '银行卡号') {
					imgvalue.value = form_add.banknum;
					imgvalue.label = form_data[i].name;
					form_data[i] == imgvalue;
				}
				if (form_data[i].name == '手机号码') {
					imgvalue.value = form_add.bankmobile;
					imgvalue.label = form_data[i].name;
					form_data[i] == imgvalue;
				}
			}
			console.log('formdata', JSON.stringify(form_data));
			let area = self.area;
			let rulesStatus = self.rulesStatus;

			let content = (function() {
				if (!rulesStatus) {
					return '请同意入驻协议';
				}
				if (!form.realname) {
					return '联系人不能为空';
				}
				if (!form.mobile) {
					return '联系电话不能为空';
				}
				if (!form.username) {
					return '账号不能为空';
				}
				if (!form.password) {
					return '密码不能为空';
				}
				if (!form.mch_common_cat_id) {
					return '类目不能为空';
				}
				if (!form.name) {
					return '店铺名称不能为空';
				}
				if (!form.username) {
					return '商户账号不能为空';
				} else {
					var reg = /^[1-9]\d*$|^0$/; // 注意：故意限制了 0321 这种格式，如不需要，直接reg=/^\d+$/;
					if (reg.test(form.username) !== true) {
						return '商户账号请填写手机号';
					}
				}
				if (!form.intention_discount) {
					return '商家意向折扣不能为空';
				}
				if (!form_add.legalname) {
					return '法人姓名不能为空';
				}
				if (!form_add.legalidentity) {
					return '法人身份证不能为空';
				}
				if (!form_add.bank) {
					return '开户银行不能为空';
				}
				if (!form_add.bankplace) {
					return '开户支行不能为空';
				}
				if (!form_add.bankname) {
					return '开户名不能为空';
				}
				if (!form_add.banknum) {
					return '银行卡号不能为空';
				}
				if (!form_add.bankmobile) {
					return '预留手机号不能为空';
				}
				if (self.submit_status) {
					return '提交中';
				}
				return false;
			})();

			if (content) {
				uni.showToast({ title: content, icon: 'none' });
				return;
			}
			self.subscribe(() => {
				self.$showLoading({ text: `提交中` });
				self.submit_status = true;
				self
					.$request({
						url: self.$api.mch.apply,
						data: {
							id: form.mch_id ? form.mch_id : 0,
							realname: form.realname,
							mobile: form.mobile,
							wechat: form.wechat,
							username: form.username,
							password: form.password,
							name: form.name,
							province_id: area.province_id,
							city_id: area.city_id,
							district_id: area.district_id,
							mch_common_cat_id: form.mch_common_cat_id,
							address: form.address,
							service_mobile: form.service_mobile,
							form_data: form_data ? JSON.stringify(form_data) : JSON.stringify([]),
							is_update_apply: self.status === 2 ? 1 : 0,
							parent_id: self.agent_parent_id,
							requirement: form.requirement,
							intention_discount: form.intention_discount,
							haveLicenseNo: self.haveLicenseNo
						},
						method: 'POST'
					})
					.then(info => {
						self.submit_status = false;
						self.$hideLoading();
						if (info.code === 0) {
							self.loadData();
							self.form_status = false;
						} else {
							uni.showToast({ title: info.msg, icon: 'none' });
						}
					})
					.catch(e => {
						self.submit_status = false;
					});
			});
		},

		rulesTap: function(status) {
			this.rulesStatus = status;
		},

		closeForm() {
			this.form_status = false;
		},

		openForm() {
			this.form_status = true;
		},
		previousSubmit(value) {
			if (value == 3) {
				this.basicInfo = false;
				this.legalInfo = true;
				this.bankInfo = false;
				this.showYhk = false;
			}
			if (value == 2) {
				this.basicInfo = true;
				this.legalInfo = false;
				this.bankInfo = false;
				this.showYhk = false;
				this.showZz = false;
			}
		},
		nextSubmit(value) {
			if (value == 1) {
				this.basicInfo = false;
				this.legalInfo = true;
				this.showZz = true;
			}
			if (value == 2) {
				this.basicInfo = false;
				this.legalInfo = false;
				this.bankInfo = true;
				this.showYhk = true;
			}
		},
		// 图片上传
		handleImageUploaddpmt(e) {
			if (e.imageList.length > 0) {
				this.imgList.dpmt = e.imageList[0];
				console.log(this.imgList.dpmt);
			}
		},
		handleImageUploaddpnj(e) {
			if (e.imageList.length > 0) {
				this.imgList.dpnj = e.imageList[0];
				console.log(this.imgList.dpnj);
			}
		},
		handleUserIdFrontUpload(e) {
			if (e.imageList.length > 0) {
				this.imgList.identityz = [e.imageList[0]];
				this.imgList.identityimg.push(this.imgList.identityz);
				console.log(this.imgList.identityimg);
			}
		},
		handleUserIdBackUpload(e) {
			if (e.imageList.length > 0) {
				this.imgList.identityf = [e.imageList[0]];
				this.imgList.identityimg.push(this.imgList.identityf);
				console.log(this.imgList.identityf);
			}
		},
		handleImageUploadbusiness(e) {
			if (e.imageList.length > 0) {
				this.imgList.business = e.imageList[0];
				console.log(this.imgList.business);
			}
		},
		handleImageUploadbusinessqt(e) {
			if (e.imageList.length > 0) {
				this.imgList.businessqt = e.imageList[0];
				console.log(this.imgList.businessqt);
			}
		},
		handleImageUploadbankimg(e) {
			if (e.imageList.length > 0) {
				this.imgList.bankimg = e.imageList[0];
				console.log(this.imgList.bankimg);
			}
		},
		radiozz(e) {
			this.haveLicenseNo = e;
		}
	}
};
</script>

<style lang="scss">
.plugins-mch-apply-input {
	color: #bbb;
	font-size: #{28rpx};
}
</style>
<style scoped lang="scss">
.list {
	padding: 0 30rpx;
	background-color: #fff;
	width: 100%;
}
.list-item {
	height: #{220rpx};
	width: #{134rpx};
	text-align: center;
	padding-top: #{57rpx};
	font-size: #{24rpx};
	color: #666;
	flex: 1;
}
.list-item image {
	height: #{61rpx};
	width: #{61rpx};
	vertical-align: top;
	margin-top: #{-10rpx};
	margin-bottom: #{10rpx};
}
.apply-hx {
	height: 3rpx;
	width: 100rpx;
	background-color: #b3b6be;
	margin-top: 70rpx;
}
.color-red {
	background-color: #fe4e4e;
}
.uploaditem {
	padding: 0 12px;
	margin-bottom: 0px;
	border-bottom: 1rpx solid #e2e2e2;
	height: auto !important;
	overflow: auto;
	.label {
		min-width: 125rpx;
		padding: 24rpx 12rpx 24rpx 0;
		height: 100%;
		position: relative;
		.name-key {
			width: 100%;
			text-align: right;
			font-size: 28rpx;
			text-align: right;
			color: #666666;
			max-width: 200rpx;
		}
	}
	.opload-img {
		padding: 6px 6px;
	}
}

// 头部图标
.apply-change {
	image {
		width: 80rpx;
		height: 80rpx;
	}
}
.apply-com {
	padding-top: #{30rpx};
	padding-left: #{24rpx};
	height: #{72rpx};
	color: #999;
	font-size: #{26rpx};
	background: #f7f7f7;
	width: 100%;
}

.white {
	background: #ffffff;

	.form-input {
		margin: 0 #{24rpx};
		border-bottom: 1px solid #e2e2e2;
		height: #{100rpx};
	}

	.box-grow-1 input {
		height: 100%;
		padding: 0 #{32rpx};
		color: #666666;
		font-size: #{28rpx};
	}

	.form-label {
		padding-left: #{3rpx};
		font-size: #{28rpx};
		color: #353535;
		min-width: #{125rpx};
	}

	> view:last-child {
		border-bottom: none;
	}

	.icon-arrow-right {
		background-image: url('../../../static/image/icon/arrow-right.png');
		height: #{22rpx};
		width: #{12rpx}; 
		background-size: 100% auto;
		background-repeat: no-repeat;
	}

	.area-left {
		padding-left: #{32rpx};
		text-align: right;
		margin-left: auto;
	}

	.category-picker {
		height: 100%;
		width: 100%;
	}

	.category-info {
		height: 100%;
		width: 100%;
		min-height: #{98rpx};
	}

	.category-select {
		font-size: #{28rpx};
		color: #666666;
		text-align: right;
		padding-right: #{24rpx};
	}
}

.rules-box {
	background: #f7f7f7;
	margin: #{32rpx} #{24rpx};
	font-size: #{28rpx};
	justify-content: center;

	.icon {
		height: #{32rpx};
		width: #{32rpx};
		margin-right: #{16rpx};
	}

	.icon-true {
		height: #{32rpx};
		width: #{32rpx};
		background-repeat: no-repeat;
		background-image: url('../image/apply-ok.png');
		background-size: 100% 100%;
	}

	.icon-false {
		height: #{32rpx};
		width: #{32rpx};
		background-repeat: no-repeat;
		background-image: url('../image/apply-er.png');
		background-size: 100% 100%;
	}

	.block {
		color: #353535;
	}

	.blue {
		color: #5292ed;
	}
}

.submit-btn {
	margin-top: #{52rpx - 32rpx};
	margin-bottom: #{24rpx};
}

.result-title {
	color: #387ee8;
	font-size: #{28rpx};
	margin-top: #{32rpx};
}

.result-home {
	color: #666;
	font-size: #{28rpx};
	padding: #{24rpx};
}

.form-img {
	width: 100%;
	margin-top: #{150rpx};
	margin-bottom: #{72rpx};

	image {
		height: #{270rpx};
		width: #{380rpx};
	}
}

.status-title {
	font-size: #{36rpx};
	color: #666666;
}

.status-content {
	margin-top: #{24rpx};
	color: #666666;
	width: #{560rpx};

	view {
		text-align: center;
	}
}

.status-new {
	margin-top: #{88rpx};
}

.status-submit {
	color: #5292ed;
	font-size: #{28rpx};
	margin-top: #{66rpx};
}
.zztype {
	display: flex;
	padding: 0 #{32rpx};
	color: #666666;
	font-size: #{28rpx};
	input {
		display: inline-block;
	}
}
</style>
