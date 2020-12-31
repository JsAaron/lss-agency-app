<template>
	<app-layout>
		<view class="list dir-left-wrap">
			<!-- 顶部导航 -->
			<view class="list-item ">
				<view>
					<image src="/static/image/agency/apply-tj.png"></image>
					<view style="color: #FE4E4E;">基本信息</view>
				</view>
			</view>
			<view class="apply-hx" style="background-color: #FE4E4E;"></view>
			<view class="list-item">
				<view v-if="showZz">
					<image src="/static/image/agency/apply-tj.png" v-if="showZz"></image>
					<view style="color: #FE4E4E;">资质信息</view>
				</view>
				<view v-else>
					<image src="/static/image/agency/apply-wtj.png"></image>
					<view>资质信息</view>
				</view>
			</view>
			<view class="apply-hx" style="background-color: #FE4E4E;" v-if="showZz"></view>
			<view class="apply-hx" v-else></view>
			<view class="list-item">
				<view v-if="showYhk">
					<image src="/static/image/agency/apply-tj.png"></image>
					<view style="color: #FE4E4E;">银行卡信息</view>
				</view>
				<view v-else>
					<image src="/static/image/agency/apply-wtj.png"></image>
					<view>银行卡信息</view>
				</view>
			</view>
			<!-- 顶部导航end -->

			<!-- 基础信息 -->
			<view class="white" v-if="basicInfo">
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
							:value="agent_name"
						/>
					</view>
				</view>
				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">商户账号</view>
					<view class="box-grow-1">
						<input
							@input="applyInput"
							:disabled="edit == 1"
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
							:disabled="edit == 1"
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
							<input
								:disabled="true"
								data-type="address"
								placeholder-class="plugins-mch-apply-input"
								placeholder="请选择所售类目"
								name="address"
								:value="form.mch_common_cat_str"
							/>
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
							text="店铺门头"
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
							text="店铺内景"
							:sign="`${index}`"
							:show-number="false"
						></app-upload-image>
						<!-- <app-upload-image
							:value="imgList.syt"
							:max-num="1"
							@image-event="handleImageUploadsyt"
							text="收银台照"
							:sign="`${index}`"
							:show-number="false"
						></app-upload-image> -->
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
			<view class="submit-btn" v-if="basicInfo">
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
			<!-- 基础信息end -->
			<!-- 资质信息 -->
			<view class="white" v-if="legalInfo">
				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">商户经营类目1级</view>
					<view class="box-grow-1">
						<picker mode="selector" range-key="name" :range="mcc.allList" @change="pick_mcc_level1">
							<input
								:disabled="true"
								placeholder-class="plugins-mch-apply-input"
								placeholder="选择商户经营类目1级"
								name="mcc_level1_name"
								:value="mcc.level1.name"
							/>
						</picker>
					</view>
				</view>
				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">商户经营类目2级</view>
					<view class="box-grow-1">
						<picker mode="selector" range-key="name" :range="mcc.level1.list" @change="pick_mcc_level2">
							<input
								:disabled="true"
								placeholder-class="plugins-mch-apply-input"
								placeholder="选择商户经营类目2级"
								name="mcc_level2_name"
								:value="mcc.level2.name"
							/>
						</picker>
					</view>
				</view>

				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">商户经营类目3级</view>
					<view class="box-grow-1">
						<picker mode="selector" range-key="name" :range="mcc.level2.list" @change="pick_mcc_level3">
							<input
								:disabled="true"
								placeholder-class="plugins-mch-apply-input"
								placeholder="选择商户经营类目3级"
								name="mcc_level3_name"
								:value="mcc.level3.name"
							/>
						</picker>
					</view>
				</view>

				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">法人姓名</view>
					<view class="box-grow-1">
						<input
							@input="applyInputcert_card"
							:disabled="form_status && status !== 2"
							data-type="legal_person_name"
							placeholder-class="plugins-mch-apply-input"
							placeholder="请输入法人姓名"
							name="legal_person_name"
							:value="cert_card.legal_person_name"
						/>
					</view>
				</view>
				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">法人身份证号</view>
					<view class="box-grow-1">
						<input
							@input="applyInputcert_card"
							:disabled="form_status && status !== 2"
							data-type="cert_no"
							placeholder-class="plugins-mch-apply-input"
							placeholder="请输入法人身份证号"
							name="cert_no"
							:value="cert_card.cert_no"
						/>
					</view>
				</view>

				<view class="uploaditem label-left dir-left-nowrap cross-top ">
					<view class="box-grow-0 cross-top label"><view class="name-key">法人身份证</view></view>
					<view class="box-grow-1 dir-left-wrap opload-img">
						<app-upload-image
							:value="imgList.identityz"
							style="margin-right: 12rpx"
							:max-num="1"
							@image-event="handleUserIdFrontUpload"
							:sign="`${index}`"
							text="身份证正面"
							:show-number="false"
							default-img="/static/image/user-id-card-front.png"
						></app-upload-image>

						<app-upload-image
							:value="imgList.identityf"
							:max-num="1"
							@image-event="handleUserIdBackUpload"
							:sign="`${index}`"
							text="身份证反面"
							:show-number="false"
							default-img="/static/image/user-id-card-back.png"
						></app-upload-image>
					</view>
				</view>

				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">身份证起始日期</view>
					<view class="box-grow-1">
						<picker mode="date" @change="bind_picker_change_cert_start_time">
							<input
								:disabled="true"
								placeholder-class="plugins-mch-apply-input"
								placeholder="请选择身份证起始日期"
								name="legalname"
								:value="cert_card.cert_start_time"
							/>
						</picker>
					</view>
				</view>

				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">身份证是否长期</view>
					<view class="box-grow-1">
						<switch
							style="margin-left: 400rpx;"
							:checked="cert_card.cert_end_longtime"
							@change="onchange_cert_end_longtime"
						></switch>
					</view>
				</view>
				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">身份证结束日期</view>
					<view v-if="cert_card.cert_end_longtime" class="box-grow-1">
						<input
							:disabled="true"
							placeholder-class="plugins-mch-apply-input"
							placeholder="请选择身份证结束日期"
							name="cert_end_time"
							value="长期"
						/>
					</view>
					<view v-else class="box-grow-1">
						<picker mode="date" @change="bind_picker_change_cert_end_time">
							<input
								:disabled="true"
								placeholder-class="plugins-mch-apply-input"
								placeholder="请选择身份证结束日期"
								name="cert_end_time"
								:value="cert_card.cert_end_time"
							/>
						</picker>
					</view>
				</view>
				<!-- 资质类型 -->
				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">资质类型</view>
					<view class="zztype">
						<radio-group style="margin-left: 30rpx;" @change="onchange_haveLicenseNo">
							<radio value="2" :checked="haveLicenseNo === 2">个体户</radio>
							<radio style="margin-left: 30rpx;" value="3" :checked="haveLicenseNo === 3">企业</radio>
						</radio-group>
					</view>
				</view>
				<!-- 资质类型 -->

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

				<block v-if="haveLicenseNo == 2">
					<view class="dir-left-nowrap cross-center form-input">
						<view class="box-grow-0 form-label main-right">注册日期</view>
						<view class="box-grow-1">
							<picker mode="date" @change="bind_picker_change_business_license_start_time">
								<input
									:disabled="true"
									placeholder-class="plugins-mch-apply-input"
									placeholder="请选择注册日期"
									name="business_license_start_time"
									:value="business_license.business_license_start_time"
								/>
							</picker>
						</view>
					</view>
					<view class="dir-left-nowrap cross-center form-input">
						<view class="box-grow-0 form-label main-right">营业执照号</view>
						<view class="box-grow-1">
							<input
								@input="applyInputbusiness_license"
								placeholder-class="plugins-mch-apply-input"
								placeholder="输入营业执照号"
								data-type="business_license_no"
								:value="business_license.business_license_no"
							/>
						</view>
					</view>
					<view class="dir-left-nowrap cross-center form-input">
						<view class="box-grow-0 form-label main-right">营业执照全称</view>
						<view class="box-grow-1">
							<input
								@input="applyInputbusiness_license"
								placeholder-class="plugins-mch-apply-input"
								placeholder="输入营业执照全称"
								data-type="business_license_name"
								:value="business_license.business_license_name"
							/>
						</view>
					</view>
				</block>
				<block v-else-if="haveLicenseNo == 3">
					<view class="dir-left-nowrap cross-center form-input">
						<view class="box-grow-0 form-label main-right">营业执照开始时间</view>
						<view class="box-grow-1">
							<picker mode="date" @change="bind_picker_change_business_license_start_time">
								<input
									:disabled="true"
									placeholder-class="plugins-mch-apply-input"
									placeholder="请选择营业期限开始时间"
									name="business_license_start_time"
									:value="business_license.business_license_start_time"
								/>
							</picker>
						</view>
					</view>
					<view class="dir-left-nowrap cross-center form-input">
						<view class="box-grow-0 form-label main-right">营业执照截止时间</view>
						<view class="box-grow-1">
							<picker mode="date" @change="bind_picker_change_business_license_end_time">
								<input
									:disabled="true"
									placeholder-class="plugins-mch-apply-input"
									placeholder="请选择营业期限截止时间"
									name="business_license_end_time"
									:value="business_license.business_license_end_time"
								/>
							</picker>
						</view>
					</view>
					<view class="dir-left-nowrap cross-center form-input">
						<view class="box-grow-0 form-label main-right">营业执照号</view>
						<view class="box-grow-1">
							<input
								@input="applyInputbusiness_license"
								placeholder-class="plugins-mch-apply-input"
								placeholder="输入营业执照号"
								data-type="business_license_no"
								:value="business_license.business_license_no"
							/>
						</view>
					</view>
					<view class="dir-left-nowrap cross-center form-input">
						<view class="box-grow-0 form-label main-right">营业执照全称</view>
						<view class="box-grow-1">
							<input
								@input="applyInputbusiness_license"
								placeholder-class="plugins-mch-apply-input"
								placeholder="输入营业执照全称"
								data-type="business_license_name"
								:value="business_license.business_license_name"
							/>
						</view>
					</view>
				</block>

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

			<view class="submit-btn" v-if="legalInfo">
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
			<!-- 资质信息end -->
			<!-- 银行卡信息 -->
			<view class="white" v-if="bankInfo">
				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">是否法人结算</view>
					<view class="box-grow-1">
						<radio-group style="margin-left: 30rpx;" @change="onchange_not_legal_settlement">
							<radio :checked="bank_card.not_legal_settlement == 0" value="0">法人结算</radio>
							<radio style="margin-left: 20rpx;" :checked="bank_card.not_legal_settlement == 1" value="1">
								非法人结算
							</radio>
						</radio-group>
					</view>
				</view>
				<view v-if="bank_card.not_legal_settlement == 1" class="uploaditem label-left dir-left-nowrap cross-top ">
					<view class="box-grow-0 cross-top label"><view class="name-key">非法人结算授权函照片</view></view>
					<view class="box-grow-1 dir-left-wrap opload-img">
						<app-upload-image
							:value="bank_card.not_legal_settlement_pic"
							style="margin-right: 12rpx"
							:max-num="1"
							@image-event="handle_not_legal_settlement_pic"
							text="授权书"
							:show-number="false"
							default-img="/static/image/user-id-card-front.png"
						></app-upload-image>
					</view>
				</view>

				<view v-if="bank_card.not_legal_settlement == 1" class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">结算人身份证号</view>
					<view class="box-grow-1">
						<input
							@input="applyInputsettlement_cert_no"
							:disabled="form_status && status !== 2"
							data-type="cert_no"
							placeholder-class="plugins-mch-apply-input"
							placeholder="请输入结算人身份证号"
							name="cert_no"
							:value="bank_card.settlement_cert_no"
						/>
					</view>
				</view>
				<view v-if="bank_card.not_legal_settlement == 1" class="uploaditem label-left dir-left-nowrap cross-top ">
					<view class="box-grow-0 cross-top label"><view class="name-key">结算人身份证</view></view>
					<view class="box-grow-1 dir-left-wrap opload-img">
						<app-upload-image
							:value="bank_card.settlement_cert_front_pic"
							style="margin-right: 12rpx"
							:max-num="1"
							@image-event="handleBandcardfrontUpload"
							text="身份证正面"
							:show-number="false"
							default-img="/static/image/user-id-card-front.png"
						></app-upload-image>
						<app-upload-image
							:value="bank_card.settlement_cert_back_pic"
							:max-num="1"
							@image-event="handleBandcardBackUpload"
							text="身份证反面"
							:show-number="false"
							default-img="/static/image/user-id-card-back.png"
						></app-upload-image>
					</view>
				</view>
				<view v-if="bank_card.not_legal_settlement == 1" class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">结算人身份证起始日期</view>
					<view class="box-grow-1">
						<picker mode="date" @change="bind_picker_change_settlement_cert_start_time">
							<input
								:disabled="true"
								placeholder-class="plugins-mch-apply-input"
								placeholder="请选择结算人身份证起始日期"
								name="legalname"
								:value="bank_card.settlement_cert_start_time"
							/>
						</picker>
					</view>
				</view>

				<view v-if="bank_card.not_legal_settlement == 1" class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">身份证是否长期</view>
					<view class="box-grow-1">
						<switch
							style="margin-left: 300rpx;"
							:checked="bank_card.cert_end_longtime"
							@change="onchange_settment_cert_end_longtime"
						></switch>
					</view>
				</view>
				<view v-if="bank_card.not_legal_settlement == 1" class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">结算人身份证结束日期</view>
					<view v-if="bank_card.cert_end_longtime" class="box-grow-1">
						<input
							:disabled="true"
							placeholder-class="plugins-mch-apply-input"
							placeholder="请选择身份证结束日期"
							name="cert_end_time"
							value="长期"
						/>
					</view>
					<view v-else class="box-grow-1">
						<picker mode="date" @change="bind_picker_change_settlement_cert_end_time">
							<input
								:disabled="true"
								placeholder-class="plugins-mch-apply-input"
								placeholder="请选择身份证结束日期"
								name="cert_end_time"
								:value="bank_card.settlement_cert_end_time"
							/>
						</picker>
					</view>
				</view>
				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">对公对私</view>
					<view class="box-grow-1">
						<radio-group style="margin-left: 30rpx;" @change="onchange_settlementtype">
							<radio :checked="bank_card.settlement_type == 0" value="0">对公</radio>
							<radio style="margin-left: 20rpx;" :checked="bank_card.settlement_type == 1" value="1">对私</radio>
						</radio-group>
					</view>
				</view>

				<view v-if="bank_card.settlement_type == 0" class="uploaditem label-left dir-left-nowrap cross-top ">
					<view class="box-grow-0 cross-top label"><view class="name-key">开户许可</view></view>
					<view class="box-grow-1 dir-left-wrap opload-img">
						<app-upload-image
							:value="bank_card.open_account_pic"
							style="margin-right: 12rpx"
							:max-num="1"
							@image-event="handle_open_account_pic"
							text="开户许可"
							:show-number="false"
							default-img="/static/image/user-id-card-front.png"
						></app-upload-image>
					</view>
				</view>

				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">开户银行</view>
					<view class="box-grow-1">
						<picker
							mode="selector"
							range-key="bank_name"
							:range="bank_card.banklist"
							@change="pick_settlement_banklist"
						>
							<input
								:disabled="true"
								placeholder-class="plugins-mch-apply-input"
								placeholder="请选择开户银行"
								name="cert_end_time"
								:value="bank_card.selectBank.bank_name"
							/>
						</picker>
					</view>
				</view>

				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">开户银行省份</view>
					<view class="box-grow-1">
						<picker
							mode="selector"
							range-key="bank_province_name"
							:range="bank_card.bankProvincelist"
							@change="pick_settlement_bankProvincelist"
						>
							<input
								:disabled="true"
								placeholder-class="plugins-mch-apply-input"
								placeholder="请选择开户银行省份"
								name="cert_end_time"
								:value="bank_card.selectProvinceBank.bank_province_name"
							/>
						</picker>
					</view>
				</view>

				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">开户银行市区</view>
					<view class="box-grow-1">
						<picker
							mode="selector"
							range-key="bank_city_name"
							:range="bank_card.bankCitylist"
							@change="pick_settlement_bankCitylist"
						>
							<input
								:disabled="true"
								placeholder-class="plugins-mch-apply-input"
								placeholder="请选择开户银行市区"
								name="cert_end_time"
								:value="bank_card.selectCityBank.bank_city_name"
							/>
						</picker>
					</view>
				</view>

				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">开户银行支行</view>
					<view class="box-grow-1">
						<picker
							mode="selector"
							range-key="branch_bank_name"
							:range="bank_card.bankBranchlist"
							@change="pick_settlement_bankBranchlist"
						>
							<input
								:disabled="true"
								placeholder-class="plugins-mch-apply-input"
								placeholder="请选择开户银行支行"
								name="cert_end_time"
								:value="bank_card.selectBranchBank.branch_bank_name"
							/>
						</picker>
					</view>
				</view>

				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">开户名</view>
					<view class="box-grow-1">
						<input
							@input="applyInputaddBankCard"
							:disabled="form_status && status !== 2"
							data-type="account_name"
							placeholder-class="plugins-mch-apply-input"
							placeholder="开户名"
							name="account_name"
							:value="bank_card.account_name"
						/>
					</view>
				</view>
				<view class="dir-left-nowrap cross-center form-input">
					<view class="box-grow-0 form-label main-right">银行卡号</view>
					<view class="box-grow-1">
						<input
							@input="applyInputaddBankCard"
							:disabled="form_status && status !== 2"
							data-type="account_no"
							placeholder-class="plugins-mch-apply-input"
							placeholder="请输入银行卡号"
							name="account_no"
							:value="bank_card.account_no"
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

			<view class="submit-btn" v-if="bankInfo">
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
					@click="submitAll"
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

			<!-- 银行卡信息end -->
		</view>
	</app-layout>
</template>

<script>
import { mapState } from 'vuex';
import appAreaPicker from '../../../components/page-component/app-area-picker/app-area-picker';
import AppUploadImage from '../../../components/basic-component/app-upload-image/app-upload-image';
var baseUrl = 'https://api.facess.net';
export default {
	name: 'apply',
	components: { appAreaPicker, AppUploadImage },
	computed: {
		...mapState({
			appImg: state => state.mallConfig.plugin.mch.app_image,
			applyApiUrl: state => state.user.applyApiUrl
		})
	},
	data() {
		return {
			// myList: newList,
			edit: 0,
			imgList: {
				dpmt: null, //店铺门头
				dpnj: null, //店铺内径
				syt: null, //收银台
				business_bank_identity_back: null, // 非法人办理身份证
				business_bank_identity_front: null,
				identityimg: [], // 身份证
				identityz: [],
				identityf: [],
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

			mcc: {
				allList: [],
				level1: {},
				level2: {},
				level3: {},
				mcc_no: 0
			},

			//身份证
			cert_card: {
				cert_start_time: '',
				cert_end_time: '',
				cert_end_longtime: false, //身份证有效期是否是长期
				cert_back_pic: '',
				cert_front_pic: '',
				cert_no: '',
				cert_type: 1, //只能使用身份证
				legal_person_name: ''
			},
			//营业执照
			business_license: {
				business_license_end_time: '',
				business_license_name: '',
				business_license_no: '',
				business_license_pic: '',
				business_license_start_time: ''
			},
			bank_card: {
				bank_card_back_pic: '',
				bank_card_front_pic: '',
				bank_city_no: '',
				bank_name: '',
				bank_province_no: '',
				branch_bank_name: '',
				branch_bank_no: '',

				//选择结算卡银行start
				banklist: [],
				bankProvincelist: [],
				bankCitylist: [],
				bankBranchlist: [],
				selectBank: {},
				selectProvinceBank: {},
				selectCityBank: {},
				selectBranchBank: {},
				//结算卡银行end

				settlement_cert_back_pic: '',
				settlement_cert_end_time: '',
				settlement_cert_front_pic: '',
				settlement_cert_no: '',
				settlement_cert_start_time: '',
				not_legal_settlement: 0, //对公,1对私
				settlement_type: 0, //0法人结算，1非法人结算
				cert_end_longtime: false, //结算人身份证是否长期
				open_account_pic: null,
				account_name: null,
				account_no: null
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
			haveLicenseNo: 2, //资质类型
			agent_id: 0,
			agent_name: '',
			id: 0
		};
	},
	onLoad: function(options) {
		if (options.edit == 1) {
			let params = JSON.parse(decodeURIComponent(options.data));
			// console.log(params);
			this.mch_id = params.mch_id;
			this.edit = 1;
			this.resetParam(params);
		}
		if (options.agent_id) {
			this.agent_id = options.agent_id;
			this.agent_name = options.agent_name;
		}
		this.getBankList();
		this.getCategory();
		this.getMccList();
	},

	methods: {
		// ocr
		ocr_success_identityz(e) {
			// console.log(e);
		},
		// ocr end

		getCategory: function() {
			const self = this;
			self
				.$request({
					url: self.$api.mch.category,
					data: {
						id: self.mch_id
					}
				})
				.then(info => {
					if (info.code === 0) {
						self.category_list = info.data.list;
						self.category_list.map(item => {
							if (self.form.mch_common_cat_id == item.id) {
								self.form.mch_common_cat_str = item.name;
							}
						});
					}
				});
		},

		onchange_haveLicenseNo(e) {
			this.haveLicenseNo = Number(e.detail.value);
			// console.log(e, this.haveLicenseNo);
		},

		onchange_settlementtype(e) {
			// console.log(e);
			this.bank_card.settlement_type = e.detail.value;
		},
		load_bank_no() {},
		hangleForm(form_data) {
			this.form.form_data = form_data;
		},
		navApplyRules() {
			uni.navigateTo({
				url: `/plugins/mch/apply_rules/apply_rules?rules=` + this.setting.desc
			});
		},
		navHome() {
			uni.navigateTo({ url: `/pages/index/index` });
		},

		onchange_cert_end_longtime(e) {
			this.cert_card.cert_end_longtime = e.target.value;
			if (this.cert_card.cert_end_longtime) {
				this.cert_card.cert_end_time = '2999-12-31';
			} else {
				this.cert_card.cert_end_time = null;
			}
		},
		bind_picker_change_cert_start_time(e) {
			console.log(e);
			this.cert_card.cert_start_time = e.detail.value;
		},
		bind_picker_change_cert_end_time(e) {
			console.log(e);
			this.cert_card.cert_end_time = e.detail.value;
		},

		//结算人
		bind_picker_change_settlement_cert_end_time(e) {
			console.log(e);
			this.bank_card.settlement_cert_end_time = e.detail.value;
		},

		bind_picker_change_settlement_cert_start_time(e) {
			console.log(e);
			this.bank_card.settlement_cert_start_time = e.detail.value;
		},
		/**
		 * 结算人身份证是否长期
		 * @param {Object}
		 */
		onchange_settment_cert_end_longtime(e) {
			this.bank_card.cert_end_longtime = e.target.value;
			if (this.bank_card.cert_end_longtime) {
				this.bank_card.settlement_cert_end_time = '2999-12-31';
			} else {
				this.bank_card.settlement_cert_end_time = null;
			}
		},

		//营业执照
		bind_picker_change_business_license_start_time(e) {
			if (this.haveLicenseNo == 2) {
				//个体
				this.business_license.business_license_start_time = e.detail.value;
				this.business_license.business_license_end_time = '2999-12-31';
			} else {
				this.business_license.business_license_start_time = e.detail.value;
			}
		},
		//营业执照
		bind_picker_change_business_license_end_time(e) {
			this.business_license.business_license_end_time = e.detail.value;
		},

		//INPUT
		applyInput: function(e) {
			let name = e.currentTarget.dataset.type;
			this.form[name] = e.detail.value;
		},

		applyInputaddBankCard(e) {
			let name = e.currentTarget.dataset.type;
			this.bank_card[name] = e.detail.value;
		},
		/**
		 * 法人结算
		 */
		onchange_not_legal_settlement(e) {
			this.bank_card.not_legal_settlement = e.detail.value;
		},

		applyInputcert_card(e) {
			let name = e.currentTarget.dataset.type;
			this.cert_card[name] = e.detail.value;
		},

		applyInputsettlement_cert_no(e) {
			this.bank_card.settlement_cert_no = e.detail.value;
		},

		applyInputbusiness_license(e) {
			let name = e.currentTarget.dataset.type;
			this.business_license[name] = e.detail.value;
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
			console.log(data);
			if (data) {
				this.area.province_id = data.province.province_id;
				this.area.city_id = data.city.city_id;
				this.area.district_id = data.district.county_id;
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

			// if (content) {
			// 	uni.showToast({ title: content, icon: 'none' });
			// 	return;
			// }
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

		handleImageUploadsyt(e) {
			console.log(e);
			if (e.imageList.length > 0) {
				this.imgList.syt = e.imageList[0];
			}
		},
		handle_open_account_pic(e) {
			console.log(e);
			if (e.imageList.length > 0) {
				this.bank_card.open_account_pic = e.imageList[0];
			}
		},
		// 图片上传
		handle_not_legal_settlement_pic(e) {
			console.log(e);
			if (e.imageList.length > 0) {
				this.bank_card.not_legal_settlement_pic = e.imageList[0];
			}
		},

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
		/**
		 * 法人身份证正面
		 * @param {Object} e
		 */
		handleUserIdFrontUpload(e) {
			console.log('正面', e);
			if (e.imageList.length > 0) {
				this.imgList.identityz = [e.imageList[0]];
				this.imgList.identityimg.push(this.imgList.identityz);
				console.log(this.imgList.identityimg);
				///api/ocr/baidu/index
				this.submitORC(1, 1, e.localpath, 'front');
			}
		},
		/**
		 * 法人身份证反面
		 * @param {Object} e
		 */
		handleUserIdBackUpload(e) {
			if (e.imageList.length > 0) {
				this.imgList.identityf = [e.imageList[0]];
				this.imgList.identityimg.push(this.imgList.identityf);
				console.log(this.imgList.identityf);
				this.submitORC(1, 1, e.localpath, 'back');
			}
		},
		/**
		 * 营业执照
		 * @param {Object} e
		 */
		handleImageUploadbusiness(e) {
			if (e.imageList.length > 0) {
				this.imgList.business = e.imageList[0];
				console.log(this.imgList.business);
				this.submitORC(2, 3, e.localpath);
			}
		},
		/**
		 * 银行卡
		 * @param {Object} e
		 */
		handleImageUploadbankimg(e) {
			if (e.imageList.length > 0) {
				this.imgList.bankimg = e.imageList[0];
				console.log(this.imgList.bankimg);
				this.submitORC(3, 2, e.localpath);
			}
		},
		/**
		 * 非法人结算 身份证反面
		 * @param {Object} e
		 */
		handleBandcardBackUpload(e) {
			console.log(e);
			if (e.imageList.length > 0) {
				this.bank_card.settlement_cert_back_pic = e.imageList[0];
				this.submitORC(4, 1, e.localpath, 'back');
			}
		},
		/**
		 * 非法人结算 身份证正面
		 * @param {Object} e
		 */
		handleBandcardfrontUpload(e) {
			console.log(11111, e);
			if (e.imageList.length > 0) {
				this.bank_card.settlement_cert_front_pic = e.imageList[0];
				this.submitORC(4, 1, e.localpath, 'front');
			}
		},
		/**
		 * @param {Object} biz 1 法人身份证  2 营业执照，3银行卡  4 非法人结算身份
		 * @param {Object} type 1身份证  2银行卡 3营业执照
		 * @param {Object} path
		 * @param {Object} side
		 */
		submitORC(biz, type, path, side) {
			let self = this;
			self.$showLoading({ text: `识别中...` });
			uni.uploadFile({
				url: this.applyApiUrl + '/api/ocr/baidu/index',
				filePath: path,
				name: 'file',
				fileType: 'image',
				formData: {
					side: side,
					type: type
				},
				success(res) {
					self.$hideLoading();
					// console.log('success', res);
					let data = JSON.parse(res.data);
					if (data.code != 0) {
						uni.showModal({
							title: '提示',
							content: '识别失败，请重新上传或手动填写！'
						});
						return;
					}
					if (biz == 1) {
						if (side == 'front') {
							/**
							 * "{"code":0,"msg":"SUCCESS","data":{"姓名":"罗海涛",
							 * "民族":"汉","住址":"湖南省浏阳市普迹镇普花村大中片老屋湾组289号",
							 * 、"公民身份号码":"430123196205083725","出生":"19620508","性别":"女"}}"
							 */
							// console.log(data.data);
							self.cert_card.cert_no = data.data.公民身份号码;
							self.cert_card.legal_person_name = data.data.姓名;
						} else {
							let data = JSON.parse(res.data);
							// data":{"失效日期":"20270228","签发机关":"浏阳市公安局","签发日期":"20070228"}}"
							// console.log(data.data);
							self.cert_card.cert_start_time =
								data.data.签发日期.slice(0, 4) +
								'-' +
								data.data.签发日期.slice(4, 6) +
								'-' +
								data.data.签发日期.slice(6);
							if (data.data.失效日期 == '长期') {
								self.cert_card.cert_end_time = '2999-12-31';
								self.cert_card.cert_end_longtime = true;
							} else {
								self.cert_card.cert_end_longtime = false;
								self.cert_card.cert_end_time =
									data.data.失效日期.slice(0, 4) +
									'-' +
									data.data.失效日期.slice(4, 6) +
									'-' +
									data.data.失效日期.slice(6);
							}
						}
					} else if (biz == 3) {
						// 银行卡
						self.bank_card.account_no = data.data.bank_card_number;
					} else if (biz == 2) {
						//营业执照

						let leixing = data.data.类型;
						self.business_license.business_license_end_time = '2999-12-31';
						if (leixing == '个体工商户') {
							self.haveLicenseNo = 2;
							self.business_license.business_license_no = data.data.社会信用代码;
							self.business_license.business_license_start_time = data.data.成立日期
								.replace('年', '-')
								.replace('月', '-')
								.replace('日', '');
							self.business_license.business_license_end_time = '2999-12-31';
							self.business_license.business_license_name = data.data.单位名称;
						} else {
							self.haveLicenseNo = 3;
							self.business_license.business_license_start_time = data.data.成立日期
								.replace('年', '-')
								.replace('月', '-')
								.replace('日', '-');
							self.business_license.business_license_no = data.data.社会信用代码;
							self.business_license.business_license_name = data.data.单位名称;
						}
					} else if (biz == 4) {
						if (side == 'front') {
							/**
							 * "{"code":0,"msg":"SUCCESS","data":{"姓名":"罗海涛",
							 * "民族":"汉","住址":"湖南省浏阳市普迹镇普花村大中片老屋湾组289号",
							 * 、"公民身份号码":"430123196205083725","出生":"19620508","性别":"女"}}"
							 */
							console.log(data.data);
							self.bank_card.settlement_cert_no = data.data.公民身份号码;
						} else {
							// data":{"失效日期":"20270228","签发机关":"浏阳市公安局","签发日期":"20070228"}}"
							console.log(data.data);
							self.bank_card.settlement_cert_start_time =
								data.data.签发日期.slice(0, 4) +
								'-' +
								data.data.签发日期.slice(4, 6) +
								'-' +
								data.data.签发日期.slice(6);
							if (data.data.失效日期 == '长期') {
								self.bank_card.settlement_cert_end_time = '2999-12-31';
								self.bank_card.cert_end_longtime = true;
							} else {
								self.bank_card.cert_end_longtime = false;
								self.bank_card.settlement_cert_end_time =
									data.data.失效日期.slice(0, 4) +
									'-' +
									data.data.失效日期.slice(4, 6) +
									'-' +
									data.data.失效日期.slice(6);
							}
						}
					}
				},
				fail(e) {
					console.log('fail', res);
					self.$hideLoading();
					uni.showModal({
						title: '提示',
						content: '识别失败，请重新上传或手动填写！'
					});
				}
			});
		},

		handleImageUploadbusinessqt(e) {
			if (e.imageList.length > 0) {
				this.imgList.businessqt = e.imageList[0];
				console.log(this.imgList.businessqt);
			}
		},

		radiozz(e) {
			this.haveLicenseNo = e;
		},

		//选择结算银行
		pick_settlement_banklist(e) {
			this.bank_card.selectBank = this.bank_card.banklist[e.detail.value];
			console.log(this.bank_card.selectBank);
			this.getBankProvinceList();
		},
		///设置银行卡
		pick_settlement_bankProvincelist(e) {
			this.bank_card.selectProvinceBank = this.bank_card.bankProvincelist[e.detail.value];
			console.log(this.bank_card.selectBank);
			this.getBankCityList();
		},

		pick_settlement_bankCitylist(e) {
			this.bank_card.selectCityBank = this.bank_card.bankCitylist[e.detail.value];
			console.log(this.bank_card.selectCityBank);
			this.getBranchBankList();
		},

		pick_settlement_bankBranchlist(e) {
			this.bank_card.selectBranchBank = this.bank_card.bankBranchlist[e.detail.value];
			console.log(this.bank_card.selectBranchBank);
		},

		//FUNCTION 
		getBankList: function() {
			const self = this;
			self.$showLoading();
			uni.request({
				url: this.applyApiUrl + '/api/mch/apply/getBankList',
				success: res => {
					console.log(res);
					if (res.data.code == 0) {
						self.bank_card.banklist = res.data.data;
						if (self.edit == 1) {
							self.bank_card.banklist.map(item => {
								if (item.bank_name == self.bank_card.selectBank.bank_name) {
									self.bank_card.selectBank = item;
									self.getBankProvinceList();
								}
							});
						}
					} else {
						uni.showModal({
							content: '获取配置信息失败，请重新进入页面'
						});
					}
				},
				complete: () => {
					self.$hideLoading();
				}
			});
		},
		getBankProvinceList: function() {
			const self = this;
			self.$showLoading();
			uni.request({
				url: this.applyApiUrl + '/api/mch/apply/getBankProvinceList',
				data: {
					bankCode: self.bank_card.selectBank.bank_code
				},
				method: 'GET',
				success: res => {
					console.log(res);
					if (res.data.code == 0) {
						self.bank_card.bankProvincelist = res.data.data;
						if (self.edit == 1) {
							self.bank_card.bankProvincelist.map(item => {
								if (item.bank_province_id == self.bank_card.selectProvinceBank.bank_province_id) {
									self.bank_card.selectProvinceBank = item;
									self.getBankCityList();
								}
							});
						}
					} else {
						uni.showModal({
							content: '获取配置信息失败，请重新进入页面'
						});
					}
				},

				complete: () => {
					self.$hideLoading();
				}
			});
		},

		getBankCityList: function() {
			const self = this;
			self.$showLoading();
			uni.request({
				url: this.applyApiUrl + '/api/mch/apply/getBankCityList',
				data: {
					bankCode: self.bank_card.selectBank.bank_code,
					provinceId: self.bank_card.selectProvinceBank.bank_province_id
				},
				method: 'GET',
				success: res => {
					console.log(res);
					if (res.data.code == 0) {
						self.bank_card.bankCitylist = res.data.data;
						if (self.edit == 1) {
							self.bank_card.bankCitylist.map(item => {
								if (item.bank_city_id == self.bank_card.selectCityBank.bank_city_id) {
									self.bank_card.selectCityBank = item;
								}
							});
						}
					} else {
						uni.showModal({
							content: '获取配置信息失败，请重新进入页面'
						});
					}
				},
				complete: () => {
					self.$hideLoading();
				}
			});
		},
		getBranchBankList: function() {
			const self = this;
			self.$showLoading();
			uni.request({
				url: this.applyApiUrl + '/api/mch/apply/getBranchBankList',
				data: {
					bankCode: self.bank_card.selectBank.bank_code,
					provinceId: self.bank_card.selectProvinceBank.bank_province_id,
					cityId: self.bank_card.selectCityBank.bank_city_id
				},
				method: 'GET',
				success: res => {
					console.log(res);
					if (res.data.code == 0) {
						self.bank_card.bankBranchlist = res.data.data;
					} else {
						uni.showModal({
							content: '获取配置信息失败，请重新进入页面'
						});
					}
				},
				complete: () => {
					self.$hideLoading();
				}
			});
		},
		getMccList: function() {
			const self = this;
			self.$showLoading();
			uni.request({
				url: this.applyApiUrl + '/api/mch/apply/getMccList',
				method: 'GET',
				success: res => {
					console.log(res);
					if (res.data.code == 0) {
						self.mcc.allList = res.data.data;
						if (self.mcc.mcc_no) {
							self.mcc.allList.map((l1, i1) => {
								l1.list.map((l2, i2) => {
									l2.list.map((l3, i3) => {
										if (l3.mcc_no == self.mcc.mcc_no) {
											console.log(l3);
											self.mcc.level1 = l1;
											self.mcc.level2 = l2;
											self.mcc.level3 = l3;
										}
									});
								});
							});
						}
					} else {
						uni.showModal({
							content: '获取配置信息失败，请重新进入页面'
						});
					}
				},
				complete: () => {
					self.$hideLoading();
				}
			});
		},
		/**
		 * 还原银行卡信息
		 */
		resetBankInfo() {
			this;
		},

		resetParam(params) {
			this.bank_card.account_name = params.account_name;
			this.bank_card.account_no = params.account_no;
			this.agent_id = params.agent_id;
			this.bank_card.bank_card_back_pic = params.bank_card_back_pic;
			this.imgList.bankimg = params.bank_card_front_pic;

			this.bank_card.selectCityBank.bank_city_id = params.bank_city_no;

			this.bank_card.selectBank.bank_name = params.bank_name;
			this.bank_card.selectBank.bank_code = params.bank_code;

			this.bank_card.selectProvinceBank.bank_province_id = params.bank_province_no;
			try {
				let list = JSON.parse(bg_pic_url);
				if (list && list.length > 0) {
					this.imgList.dpmt = list[0];
					this.imgList.dpmt = list[0];
				}
			} catch (e) {}

			this.bank_card.selectBranchBank.branch_bank_name = params.branch_bank_name;
			this.bank_card.selectBranchBank.branch_bank_no = params.branch_bank_no;
			this.business_license.business_license_end_time = params.business_license_end_time;
			this.business_license.business_license_name = params.business_license_name;
			this.business_license.business_license_no = params.business_license_no;
			this.imgList.business = params.business_license_pic;
			this.business_license.business_license_start_time = params.business_license_start_time;
			this.imgList.syt = params.cashier_pic;
			this.imgList.identityz.push(params.cert_front_pic);
			this.imgList.identityf.push(params.cert_back_pic);

			if (params.cert_end_time == '2999-12-31') {
				this.cert_card.cert_end_longtime = true;
			}

			this.cert_card.cert_end_time = params.cert_end_time;

			this.cert_card.cert_no = params.cert_no;
			this.cert_card.cert_start_time = params.cert_start_time;
			this.cert_card.cert_type = 1;
			this.area.province_id = params.province_id;
			this.area.city_id = params.city_id;
			this.area.district_id = params.district_id;
			this.form.address = params.address;
			this.id = params.id;
			this.form.intention_discount = params.intention_discount;
			this.form.latitude = params.latitude;
			this.form.latitude = params.longitude;
			this.cert_card.legal_person_name = params.legal_person_name;
			this.imgList.dpmt = params.logo;
			this.mcc.mcc_no = params.mcc_no;
			this.mcc.level3.mcc_no = params.mcc_no;
			this.form.mch_common_cat_id = params.mch_common_cat_id;
			this.haveLicenseNo = params.mer_type;
			this.form.mobile = params.mobile;
			this.form.name = params.name;
			this.bank_card.not_legal_settlement = params.not_legal_settlement ? 1 : 0;
			this.bank_card.not_legal_settlement_pic = params.not_legal_settlement_pic;
			this.imgList.businessqt = params.other_license_pic;
			this.form.password = params.password;
			this.form.realname = params.realname;
			this.form.requirement = params.requirement;
			this.form.service_mobile = params.service_mobile;
			this.bank_card.settlement_cert_back_pic = params.settlement_cert_back_pic;
			if (params.settlement_cert_end_time == '2999-12-31') {
				//长期
				this.bank_card.cert_end_longtime = true;
			}
			this.bank_card.settlement_cert_end_time = params.settlement_cert_end_time;
			this.bank_card.settlement_cert_front_pic = params.settlement_cert_front_pic;
			this.bank_card.settlement_cert_no = params.settlement_cert_no;
			this.bank_card.settlement_cert_start_time = params.settlement_cert_start_time;
			this.bank_card.settlement_type = params.settlement_type;
			this.bank_card.open_account_pic = params.open_account_pic;
			this.imgList.dpnj = params.store_pic;
			this.form.username = params.username;

			this.form.wechat = params.wechat;
			this.mch_id = params.mch_id;
		},
		submitAll() {
			let params = {
				account_name: this.bank_card.account_name,
				account_no: this.bank_card.account_no,
				agent_id: this.agent_id,
				bank_card_back_pic: this.bank_card.bank_card_back_pic,
				bank_card_front_pic: this.imgList.bankimg,
				bank_city_no: this.bank_card.selectCityBank.bank_city_id,
				bank_name: this.bank_card.selectBank.bank_name,
				bank_code: this.bank_card.selectBank.bank_code,
				bank_province_no: this.bank_card.selectProvinceBank.bank_province_id,
				bg_pic_url: [this.imgList.dpmt],
				branch_bank_name: this.bank_card.selectBranchBank.branch_bank_name,
				branch_bank_no: this.bank_card.selectBranchBank.branch_bank_no,
				business_license_end_time: this.business_license.business_license_end_time,
				business_license_name: this.business_license.business_license_name,
				business_license_no: this.business_license.business_license_no,
				business_license_pic: this.imgList.business,
				business_license_start_time: this.business_license.business_license_start_time,
				cashier_pic: this.imgList.syt,
				cert_back_pic: this.imgList.identityf[0],
				cert_end_time: this.cert_card.cert_end_time,
				cert_front_pic: this.imgList.identityz[0],
				cert_no: this.cert_card.cert_no,
				cert_start_time: this.cert_card.cert_start_time,
				cert_type: 1, //固定身份证

				province_id: this.area.province_id,
				city_id: this.area.city_id,
				district_id: this.area.district_id,
				address: this.form.address,

				intention_discount: this.form.intention_discount,
				latitude: '',
				legal_person_name: this.cert_card.legal_person_name,
				logo: this.imgList.dpmt,
				longitude: '',
				mcc_no: this.mcc.level3.mcc_no,
				mch_common_cat_id: this.form.mch_common_cat_id,
				mer_type: this.haveLicenseNo,
				mobile: this.form.mobile,
				name: this.form.name,
				not_legal_settlement: this.bank_card.not_legal_settlement,
				not_legal_settlement_pic: this.bank_card.not_legal_settlement_pic,
				other_license_pic: this.imgList.businessqt,

				realname: this.form.realname,
				requirement: this.form.requirement,
				service_mobile: this.form.service_mobile,
				settlement_cert_back_pic: this.bank_card.settlement_cert_back_pic,

				settlement_cert_end_time: this.bank_card.settlement_cert_end_time,
				settlement_cert_front_pic: this.bank_card.settlement_cert_front_pic,
				settlement_cert_no: this.bank_card.settlement_cert_no,
				settlement_cert_start_time: this.bank_card.settlement_cert_start_time,
				settlement_type: this.bank_card.settlement_type,
				open_account_pic: this.bank_card.open_account_pic,
				store_pic: this.imgList.dpnj,
				username: this.form.username,
				wechat: this.form.wechat
			};
			if (this.edit == 1) {
				params.id = this.mch_id;
			} else {
				params.password = this.form.password;
			}
			// params = {
			// 	account_name: "account_name",
			// 	account_no: "1122334455",

			// 	agent_id: this.agent_id,
			// 	bank_card_back_pic: "bank_card_back_pic",
			// 	bank_card_front_pic: "bank_card_front_pic",
			// 	bank_city_no: "112233",
			// 	bank_name: "bank_name",
			// 	bank_province_no: "112233",
			// 	bg_pic_url: ["bg_pic_url"],
			// 	branch_bank_name: "branch_bank_name",
			// 	branch_bank_no: "112233",
			// 	business_license_end_time: "2030-11-11",
			// 	business_license_name: "business_license_name",
			// 	business_license_no: "11122334455",
			// 	business_license_pic:"business_license_pic",
			// 	business_license_start_time: "2030-11-11",
			// 	cashier_pic: "cashier_pic",
			// 	cert_back_pic:"cert_back_pic",
			// 	cert_end_time:"2030-11-11",
			// 	cert_front_pic: "cert_front_pic",
			// 	cert_no: "123456789123456789",
			// 	cert_start_time: "2030-11-11",
			// 	cert_type: 1,//固定身份证

			// 	province_id: "123456",
			// 	city_id: "123457",
			// 	district_id: "123458",
			// 	address: "address",
			// 	id: 0,
			// 	intention_discount: "89",
			// 	latitude: '',
			// 	legal_person_name: "legal_person_name",
			// 	logo: "logo",
			// 	longitude: '',
			// 	mcc_no: "12345",
			// 	mch_common_cat_id: "111",
			// 	mer_type: 2,
			// 	mobile: "this.form.mobile",
			// 	name: "this.form.name",
			// 	not_legal_settlement: 1,
			// 	not_legal_settlement_pic: "this.bank_card.not_legal_settlement_pic",
			// 	other_license_pic: "this.imgList.businessqt",
			// 	password: "this.form.password",
			// 	realname: "this.form.realname",
			// 	requirement: "this.form.requirement",
			// 	service_mobile: "this.form.service_mobile",
			// 	settlement_cert_back_pic: "this.bank_card.settlement_cert_back_pic",
			// 	settlement_cert_end_time: "2030-11-11",
			// 	settlement_cert_front_pic: "this.bank_card.settlement_cert_front_pic",
			// 	settlement_cert_no: "123456789123456789",
			// 	settlement_cert_start_time: "2030-11-11",
			// 	settlement_type: 1,
			// 	store_pic: "this.imgList.dpnj",
			// 	username: "this.form.username",
			// 	wechat: "this.form.wechat"
			// };

			// params = {
			//     "account_name": "罗桂炎",
			//     "account_no": "62179955100221588702",
			//     "agent_id": "1",
			//     "bank_card_back_pic": "",
			//     "bank_card_front_pic": "https://lff.facess.net/web/uploads/mall1/20201220/83c5fc2098cb92104f0055612e04616b.jpg",
			//     "bank_city_no": "4301",
			//     "bank_name": "中国邮政储蓄银行",
			//     "bank_code": "403",
			//     "bank_province_no": "43",
			//     "bg_pic_url": ["https://lff.facess.net/web/uploads/mall1/20201220/529385b5c462baa04d58d187f237d9b3.jpg"],
			//     "branch_bank_name": "中国邮政储蓄银行湖南省长沙市雨花区红星支行",
			//     "branch_bank_no": "403551002570",
			//     "business_license_end_time": "2999-12-31",
			//     "business_license_name": "长沙市雨花区舞雨食品经营部",
			//     "business_license_no": "924301111MA4PYK9F7U",
			//     "business_license_pic": "https://lff.facess.net/web/uploads/mall1/20201220/793c482a6087caf18fa3291c560cc831.jpg",
			//     "business_license_start_time": "2018-09-25",
			//     "cashier_pic": "https://lff.facess.net/web/uploads/mall1/20201220/65b3f933edee71ab2cf96cf3df5fc413.jpg",
			//     "cert_back_pic": "https://lff.facess.net/web/uploads/mall1/20201220/f0bcfd10501128f0845c85abc0f9173a.jpg",
			//     "cert_end_time": "2027-02-27",
			//     "cert_front_pic": "https://lff.facess.net/web/uploads/mall1/20201220/4007ae41c32f28cba5c200125794d925.jpg",
			//     "cert_no": "430123197110103716",
			//     "cert_start_time": "2007-02-28",
			//     "cert_type": 1,
			//     "province_id": "430000",
			//     "city_id": "430100",
			//     "district_id": "430102",
			//     "address": "万家丽中路",
			//     "id": 0,
			//     "intention_discount": "80",
			//     "latitude": "",
			//     "legal_person_name": "罗桂炎",
			//     "logo": "https://lff.facess.net/web/uploads/mall1/20201220/529385b5c462baa04d58d187f237d9b3.jpg",
			//     "longitude": "",
			//     "mcc_no": "5331",
			//     "mch_common_cat_id": "1",
			//     "mer_type": 2,
			//     "mobile": "18702777822",
			//     "name": "舞雨食品经营部",
			//     "not_legal_settlement": "1",
			//     "not_legal_settlement_pic": "https://lff.facess.net/web/uploads/mall1/20201220/9ba87e2d4d42923ea9fb944cffaf2b88.jpg",
			//     "other_license_pic": null,
			//     "password": "123456",
			//     "realname": "罗海涛",
			//     "requirement": "商户要求",
			//     "service_mobile": "18702777822",
			//     "settlement_cert_back_pic": "https://lff.facess.net/web/uploads/mall1/20201220/f0bcfd10501128f0845c85abc0f9173a.jpg",
			//     "settlement_cert_end_time": "2999-12-31",
			//     "settlement_cert_front_pic": "https://lff.facess.net/web/uploads/mall1/20201220/4007ae41c32f28cba5c200125794d925.jpg",
			//     "settlement_cert_no": "430123196205083725",
			//     "settlement_cert_start_time": "2018-06-18",
			//     "settlement_type": "1",
			//     "open_account_pic": null,
			//     "store_pic": "https://lff.facess.net/web/uploads/mall1/20201220/634080379848f75c902d78cf56f20056.jpg",
			//     "username": "18702777821",
			//     "wechat": "18702777821"
			// }
			const self = this;
			let content = (function() {
				if (!params.realname) {
					return '基本信息-联系人不能为空';
				}

				if (!params.realname) {
					return '基本信息-客服电话不能为空';
				}

				if (!params.mobile) {
					return '基本信息-联系电话不能为空';
				}

				if (self.edit == 0 && !params.password) {
					return '基本信息-密码不能为空';
				}
				if (!params.mch_common_cat_id) {
					return '基本信息-类目不能为空';
				}
				if (!params.name) {
					return '基本信息-店铺名称不能为空';
				}
				if (!params.username) {
					return '基本信息-商户账号不能为空';
				}
				if (!params.intention_discount) {
					return '基本信息-商家意向折扣不能为空';
				}
				/**
				 * province_id: this.area.province_id,
				city_id: this.area.city_id,
				district_id: this.area.district_id,
				address: this.form.address,
				 */

				if (!params.province_id || !params.city_id || !params.district_id) {
					return '基本信息-请选择所在地区';
				}

				if (!params.address) {
					return '基本信息-请填写详细地址！';
				}

				if (!params.logo) {
					return '基本信息-请上传店铺门头照！';
				}
				if (!params.store_pic) {
					return '基本信息-请上传店铺内景！';
				}
				// if (!params.cashier_pic) {
				// 	return '基本信息-请上传收银台照片！';
				// }
				//第一页end

				//第二页
				if (!params.mcc_no) {
					return '资质信息-请选择商户经营类目';
				}
				if (!params.legal_person_name) {
					return '资质信息-法人姓名不能为空';
				}
				if (!params.cert_no) {
					return '资质信息-法人身份证号不能为空';
				}
				if (!params.cert_front_pic) {
					return '资质信息-身份证正面照不能为空';
				}
				if (!params.cert_back_pic) {
					return '资质信息-身份证反面照不能为空';
				}
				if (!params.cert_start_time) {
					return '资质信息-选择身份证开始日期';
				}
				if (!params.cert_end_time) {
					return '资质信息-选择身份证结束日期';
				}

				/**
				 * business_license_end_time: this.business_license.business_license_end_time,
				business_license_name: this.business_license.business_license_name,
				business_license_no: this.business_license.business_license_no,
				business_license_pic: this.imgList.business,
				business_license_start_time: this.business_license.business_license_start_time,
			
				 */
				//营业执照
				if (!params.business_license_pic) {
					return '资质信息-请上传营业执照照片';
				}
				if (!params.business_license_name) {
					return '资质信息-请填写营业执照全称';
				}
				if (!params.business_license_no) {
					return '资质信息-请填写营业执照号';
				}
				if (params.mer_type == 2) {
					//个体户
					if (!params.business_license_start_time) {
						return '资质信息-请选择营业执照注册时间';
					}
				} else {
					if (!params.business_license_start_time) {
						return '资质信息-请选择营业执照开始时间';
					}
					// if (!params.business_license_end_time) {
					// 	return '资质信息-请上传营业执照结束时间';
					// }
				}

				//授权函
				if (params.not_legal_settlement == 1) {
					//非法人结算

					if (!params.not_legal_settlement_pic) {
						return '银行卡信息-上传非法人结算函';
					}
					if (!params.settlement_cert_back_pic) {
						return '银行卡信息-结算人身份证反面图片';
					}
					if (!params.settlement_cert_front_pic) {
						return '银行卡信息-结算人身份证正面图片';
					}
					if (!params.settlement_cert_start_time) {
						return '银行卡信息-结算人身份证开始日期';
					}
					if (!params.settlement_cert_end_time) {
						return '银行卡信息-结算人身份证截止日期';
					}
					if (!params.settlement_cert_no) {
						return '银行卡信息-结算人身份证号';
					}
				}

				//授权函
				if (params.settlement_type == 0) {
					//对公对私 0-对公|1-对私
					if (!params.open_account_pic) {
						return '银行卡信息-上传非法人结算函';
					}
				}

				/**
				 * bank_card_back_pic: "bank_card_back_pic",
				bank_card_front_pic: "bank_card_front_pic",
				bank_city_no: "112233",
				bank_name: "bank_name",
				bank_province_no: "112233",
				branch_bank_name: "branch_bank_name",
				branch_bank_no: "112233",
				 */

				if (!params.bank_card_front_pic) {
					return '银行卡信息-请上传结算银行卡正面照片';
				}
				if (!params.bank_name) {
					return '银行卡信息-请选择开户银行';
				}
				if (!params.bank_province_no) {
					return '银行卡信息-请选择开户银行省份';
				}
				if (!params.branch_bank_no) {
					return '银行卡信息-请选择开户银行支行';
				}
				if (!params.bank_city_no) {
					return '银行卡信息-请选择结算银行卡市区';
				}
				if (!params.account_name) {
					return '银行卡信息-请选输入开户名';
				}
				if (!params.account_no) {
					return '银行卡信息-请输入开户卡号';
				}

				return false;
			})();

			if (content) {
				let contents = content.split('-');
				uni.showModal({
					title: '提示步骤：' + contents[0],
					content: contents[1]
				});
				return;
			}

			self.$showLoading();
			uni.request({
				url: this.applyApiUrl + '/api/mch/apply/submit',
				data: params,
				method: 'POST',
				header: {
					'Content-Type': 'application/json'
				},
				success: res => {
					console.log(res);
					if (res.data.code == 0) {
						uni.showModal({
							title: '提示',
							content: '提交成功！',
							success: function(res) {
								if (res.confirm) {
									uni.navigateBack({
										delta: -1
									});
								}
							}
						});
					} else {
						uni.showModal({
							title: '提示',
							content: res.data.msg,
							success: function(res) {}
						});
					}
				},
				complete: () => {
					self.$hideLoading();
				}
			});
		},
		pick_mcc_level1(e) {
			this.mcc.level1 = this.mcc.allList[e.detail.value];
			console.log(this.mcc.level1);
			this.mcc.level2 = {};
			this.mcc.level3 = {};
		},
		pick_mcc_level2(e) {
			this.mcc.level2 = this.mcc.level1.list[e.detail.value];
			console.log(this.mcc.level2);
			this.mcc.level3 = {};
		},
		pick_mcc_level3(e) {
			this.mcc.level3 = this.mcc.level2.list[e.detail.value];
			console.log(this.mcc.level3);
			this.mcc.mcc_no = this.mcc.level3.mcc_no;
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
	background-color: #fff;
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
		margin-left: 20rpx;
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
		background-image: url('/static/image/agency/apply-ok.png');
		background-size: 100% 100%;
	}

	.icon-false {
		height: #{32rpx};
		width: #{32rpx};
		background-repeat: no-repeat;
		background-image: url('/static/image/agency/apply-er.png');
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
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
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
