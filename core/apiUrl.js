const apiUrl = {
	index: {
		config: `api/index/config`,
		index: `api/index/index`,
		buy_data: `api/index/purchase`,
	},
	payment: {
		get_payments: `api/payment/get-payments`,
		pay_data: `api/payment/pay-data`,
		pay_buy_balance: `api/payment/pay-buy-balance`,
		pay_buy_huodao: `api/payment/pay-buy-huodao`,
	},
	upload: {
		file: `api/attachment/upload`
	},
	default: {
		district: `api/default/district`,
		goods_list: `api/default/goods-list`,
		search_list: `api/default/search-list`,
		cart_list: `api/default/cats-list&cat_id=`,
		qrcode_parameter: 'api/default/qr-code-parameter',
		cat_list: `api/cat/list`,
		cat_goods: `api/cat/goods`,
	},
	passport: {
		login: `api/passport/login`,
	},
	user: {
		user_info: `api/user/user-info`,
		address: `api/user/address`,
		wechat_district: `api/user/wechat-district`,
		address_save: `api/user/address-save`,
		address_detail: `api/user/address-detail`,
		address_default: `api/user/address-default`,
		address_destroy: `api/user/address-destroy`,
		auto_address_info: `api/default/auto-address-info`,
		my_favorite_goods: `api/user/my-favorite-goods`,
		my_favorite_topic: `api/user/my-favorite-topic`,
		favorite_add: "api/user/favorite-add",
		favorite_remove: "api/user/favorite-remove",
		config: 'api/user/config',
		is_clerk: 'api/user/is-clerk-user',
		ck_log: 'api/ck/ck-log',
		contribution_log: `api/contribution/contribution-log`

	},
	article: {
		list: `api/default/article-list`,
		detail: `api/default/article`,
	},
	coupon: {
		list: `api/coupon/list`,
		detail: `api/coupon/detail`,
		receive: `api/coupon/receive`,
		user_coupon: `api/coupon/user-coupon`,
		user_coupon_detail: `api/coupon/user-coupon-detail`,
		share_coupon: `api/coupon/share-coupon`
	},
	city: {
		cityName: `api/default/district`,
		goodsList: `api/default/goods-list`
	},
	balance: {
		index: `api/balance/index`,
		logs: `api/balance/logs`,
		log_detail: `api/balance/log-detail`
	},
	order: {
		preview: `api/order/preview`,
		submit: `api/order/submit`,
		pay_data: `api/order/pay-data`,
		usable_coupon_list: `api/order/usable-coupon-list`,
		store_list: `api/order/store-list`,
		list: `api/order/list`,
		detail: `api/order/detail`,
		appraise: 'api/order/appraise',
		express_detail: 'api/order/express-detail',
		clerk_affirm_pay: 'api/order/clerk-affirm-pay',
		order_clerk: 'api/order/order-clerk',
		clerk_qr_code: 'api/order/clerk-qr-code',
		apply_refund: 'api/order/apply-refund',
		refund_submit: 'api/order/refund-submit',
		refund_detail: 'api/order/refund-detail',
		refund_send: 'api/order/refund-send',
		confirm: 'api/order/confirm',
		cancel: 'api/order/cancel',
		list_pay_data: 'api/order/list-pay-data',
		pay_result: `api/order/pay-result`,
		customer: 'api/express/get-customer',
		delivery: 'api/express/delivery-config',
		order_express_list: 'api/express/order-express-list',
	},
	video: {
		index: 'api/video/index'
	},
	topic: {
		type: 'api/topic/type',
		list: 'api/topic/list',
		detail: 'api/topic/detail',
		favorite: 'api/topic/favorite',
		qrcode: 'api/qrcode/topic',
	},
	member: {
		index: 'api/mall-member/index',
		all: 'api/mall-member/all-member',
		coupon: 'api/mall-member/member-coupon',
		goods: 'api/mall-member/member-goods',
		cats: 'api/mall-member/goods-cats',
		purchase: 'api/mall-member/purchase-member'
	},
	recharge: {
		index: 'api/recharge/index',
		setting: 'api/recharge/setting',
		balance_recharge: 'api/recharge/balance-recharge',
	},
	store: {
		list: `api/store/list`,
		detail: `api/store/detail`,
	},
	goods: {
		detail: 'api/goods/detail',
		attr: 'api/goods/attr',
		comments_list: 'api/goods/comments-list',
		recommend: 'api/goods/recommend',
		new_recommend: 'api/goods/new-recommend',
		cat_style: 'api/goods/cat-style',
		goods_video_list: '/api/goods/goods-list'
	},
	card: {
		index: 'api/card/user-card',
		detail: 'api/card/user-card-detail',
		qrcode: 'api/card/card-qrcode',
		clerk: 'api/card/card-clerk',
		history: 'api/card/clerk-history'
	},
	share: {
		apply: 'api/share/apply',
		index: 'api/share/index',
		setting: 'api/share/setting',
		customize: 'api/share/customize',
		brokerage: 'api/share/brokerage',
		team: 'api/share/team',
		cash: 'api/share/cash',
		cash_list: 'api/share/cash-list',
		apply_status: 'api/share/apply-status',
		share_order: 'api/share/share-order',
		bind_parent: 'api/share/bind-parent',
		poster: 'api/qrcode/share',
		new_apply_status: 'api/share/new-apply-status',
		level: 'api/share/level',
		level_up: 'api/share/level-up',
	},
	pond: {
		index: 'plugin/pond/api/pond/index',
		lottery: 'plugin/pond/api/pond/lottery',
		prize: 'plugin/pond/api/pond/prize',
		send: 'plugin/pond/api/pond/send',
		setting: 'plugin/pond/api/pond/setting',
		order_preview: 'plugin/pond/api/pond/order-preview',
		order_submit: 'plugin/pond/api/pond/order-submit',
		poster: 'plugin/pond/api/pond/poster',
	},
	scratch: {
		index: 'plugin/scratch/api/scratch/index',
		receive: 'plugin/scratch/api/scratch/receive',
		setting: 'plugin/scratch/api/scratch/setting',
		prize: 'plugin/scratch/api/scratch/prize',
		record: 'plugin/scratch/api/scratch/record',
		order_preview: 'plugin/scratch/api/scratch/order-preview',
		order_submit: 'plugin/scratch/api/scratch/order-submit',
		poster: 'plugin/scratch/api/scratch/poster',
	},
	bonus: {
		order: 'plugin/bonus/api/order/index',
		index: 'plugin/bonus/api/index/index',
		apply: 'plugin/bonus/api/index/apply',
		status: 'plugin/bonus/api/index/apply-status',
		team: 'plugin/bonus/api/order/team-bonus',
		setting: 'plugin/bonus/api/index/setting',
		clear: 'plugin/bonus/api/index/clear-apply',
		cash: 'plugin/bonus/api/index/cash',
		detail: 'plugin/bonus/api/cash/index',
		member: 'plugin/bonus/api/index/all-member',
		data: 'plugin/bonus/api/order/data'
	},
	lottery: {
		index: 'plugin/lottery/api/lottery/index',
		setting: 'plugin/lottery/api/lottery/setting',
		detail: 'plugin/lottery/api/lottery/detail',
		prize: 'plugin/lottery/api/lottery/prize',
		clerk: 'plugin/lottery/api/lottery/clerk',
		code: 'plugin/lottery/api/lottery/code',
		order_preview: 'plugin/lottery/api/lottery/order-preview',
		order_submit: 'plugin/lottery/api/lottery/order-submit',
		goods: 'plugin/lottery/api/lottery/goods',
		poster: 'plugin/lottery/api/lottery/poster',
	},
	check_in: {
		index: 'plugin/check_in/api/index/index',
		user: 'plugin/check_in/api/index/user',
		customize: 'plugin/check_in/api/index/customize',
		sign_in: 'plugin/check_in/api/index/sign-in',
		sign_in_result: 'plugin/check_in/api/index/sign-in-result',
		sign_in_day: 'plugin/check_in/api/index/sign-in-day',
	},
	quick: {
		index: `api/quick/index`,
		goods_list: `api/quick/goods-list`,
		cart: `api/quick/cart`,
	},
	step: {
		index: 'plugin/step/api/step/index',
		setting: 'plugin/step/api/step/setting',
		ranking: 'plugin/step/api/step/ranking',
		goods: 'plugin/step/api/step/goods',
		activity_detail: 'plugin/step/api/step/activity-detail',
		activity: 'plugin/step/api/step/activity',
		activity_log: 'plugin/step/api/step/activity-log',
		activity_join: 'plugin/step/api/step/activity-join',
		activity_submit: 'plugin/step/api/step/activity-submit',
		invite_list: 'plugin/step/api/step/invite-list',
		convert: 'plugin/step/api/step/convert',
		log: 'plugin/step/api/step/log',
		step_convert: 'plugin/step/api/step/step-convert',
		remind: 'plugin/step/api/step/remind',
		order_preview: 'plugin/step/api/step/order-preview',
		order_submit: 'plugin/step/api/step/order-submit',
		goods_detail: 'plugin/step/api/step/goods-detail',
		poster: 'plugin/step/api/step/poster',
		goods_poster: 'plugin/step/api/step/goods-poster',
		receive: 'plugin/step/api/step/receive',
	},
	cart: {
		edit: 'api/cart/edit',
		delete: 'api/cart/delete',
		list: 'api/cart/list',
		add: 'api/cart/add',
	},
	fxhb: {
		index: 'plugin/fxhb/api/index/index',
		join: 'plugin/fxhb/api/index/join',
		join_result: 'plugin/fxhb/api/index/join-result',
		detail: 'plugin/fxhb/api/index/detail',
		recommend: 'plugin/fxhb/api/index/recommend'
	},
	scan_code_pay: {
		index: 'plugin/scan_code_pay/api/index/index',
		preview: 'plugin/scan_code_pay/api/order/preview',
		submit: 'plugin/scan_code_pay/api/order/submit',
		qr_code: 'plugin/scan_code_pay/api/index/qr-code',
		coupons: 'plugin/scan_code_pay/api/order/coupons',
		cancel: 'plugin/scan_code_pay/api/order/cancel',
	},
	phone: {
		binding: 'api/phone/binding',
		code: 'api/user/phone-code',
	},
	book: {
		cats: 'plugin/booking/api/booking/cats',
		clerk_code: 'plugin/booking/api/order-list/clerk-code',
		order_submit: 'plugin/booking/api/order/order-submit',
		order_preview: 'plugin/booking/api/order/order-preview',
		detail: 'plugin/booking/api/goods/detail',
		list: 'plugin/booking/api/goods/list',
		setting: 'plugin/booking/api/booking/setting',
		order_list: 'plugin/booking/api/order-list/index',
		order_detail: 'plugin/booking/api/order-list/detail',
		store_list: 'plugin/booking/api/booking/store-list',
		poster: 'plugin/booking/api/booking/poster',
	},
	poster: {
		share: 'api/qrcode/share',
		goods: 'api/qrcode/goods',
		topic: 'api/qrcode/topic',
		footprint: 'api/qrcode/footprint',
	},
	bargain: {
		banner: 'plugin/bargain/api/index/banner',
		goods_list: 'plugin/bargain/api/goods/list',
		goods_detail: 'plugin/bargain/api/goods/detail',
		list: 'plugin/bargain/api/order/bargain-list',
		bargain_submit: 'plugin/bargain/api/order/bargain-submit',
		bargain_result: 'plugin/bargain/api/order/bargain-result',
		order_preview: 'plugin/bargain/api/order/order-preview',
		order_submit: 'plugin/bargain/api/order/order-submit',
		user_join_bargain: 'plugin/bargain/api/order/user-join-bargain',
		user_join_bargain_result: 'plugin/bargain/api/order/user-join-bargain-result',
		activity: 'plugin/bargain/api/order/activity',
		setting: 'plugin/bargain/api/index/index',
		poster: 'plugin/bargain/api/index/poster',
	},
	integral_mall: {
		index: 'plugin/integral_mall/api/index/index',
		coupon: 'plugin/integral_mall/api/coupon/index',
		cats: 'plugin/integral_mall/api/goods/cats',
		detail: 'plugin/integral_mall/api/coupon/detail',
		goods_detail: 'plugin/integral_mall/api/goods/detail',
		coupon_submit: 'plugin/integral_mall/api/coupon-order/order-submit',
		goods: 'plugin/integral_mall/api/goods/index',
		log: 'api/integral-log/index',
		order: 'plugin/integral_mall/api/order/index',
		coupon_order: 'plugin/integral_mall/api/coupon-order/index',
		order_preview: 'plugin/integral_mall/api/order/order-preview',
		order_submit: 'plugin/integral_mall/api/order/order-submit',
		coupon_pay: 'plugin/integral_mall/api/coupon-order/order-pay-data',
		poster: 'plugin/integral_mall/api/index/poster',
	},
	pt: {
		index: 'plugin/pintuan/api/index/index',
		goods: 'plugin/pintuan/api/goods/index',
		detail: 'plugin/pintuan/api/goods/detail',
		cats: 'plugin/pintuan/api/goods/cats',
		order_preview: 'plugin/pintuan/api/order/order-preview',
		order_submit: 'plugin/pintuan/api/order/submit',
		list: 'plugin/pintuan/api/order/pintuan-list',
		pt_detail: 'plugin/pintuan/api/order/pintuan-detail',
		order: 'plugin/pintuan/api/order/list',
		poster: 'plugin/pintuan/api/index/poster',
		order_poster: 'plugin/pintuan/api/order/poster',
	},
	mch: {
		index: 'plugin/mch/api/mch/index',
		detail: 'plugin/mch/api/mch/detail',
		category: 'plugin/mch/api/mch/category',
		goods: 'plugin/mch/api/goods/index',
		goods_detail: 'plugin/mch/api/goods/detail',
		cat_style: 'plugin/mch/api/goods/cat-style',
		cats_list: 'api/cat/list',
		setting: 'plugin/mch/api/mch/setting',
		visit: 'plugin/mch/api/mch/add-visit',
		order_list: 'plugin/mch/api/order/index',
		order_detail: 'plugin/mch/api/order/detail',
		manage_index: 'plugin/mch/api/mch/manage-index',
		add_qr: 'plugin/mch/api/mch/add-qr',
		qr_code: 'plugin/mch/api/mch/qr-code',
		qr_code_parameter: 'api/default/qr-code-parameter',
		statistic: 'plugin/mch/api/mch/statistic',
		year_list: 'plugin/mch/api/mch/year-list',
		property: 'plugin/mch/api/property/index',
		account_log: 'plugin/mch/api/property/account-log',
		cash_log: 'plugin/mch/api/property/cash-log',
		order_close_log: 'plugin/mch/api/property/order-close-log',
		cash_submit: 'plugin/mch/api/property/cash-submit',
		order_send: 'plugin/mch/api/order/order-send',
		express_list: 'api/order/express-list',
		refund_detail: 'plugin/mch/api/order/refund-detail',
		mch_status: 'plugin/mch/api/mch/mch-status',
		apply: 'plugin/mch/api/mch/apply',
		login: 'plugin/mch/api/mch/login',
		order_print: 'plugin/mch/api/order/print',
		update_total_price: 'plugin/mch/api/order/update-total-price',
		update_price: 'plugin/mch/api/order/update-price',
		refund_handle: 'plugin/mch/api/order/refund-handle',
		update_password: 'plugin/mch/api/mch/update-password',
		switch_status: 'plugin/mch/api/goods/switch-status',
		destroy: 'plugin/mch/api/goods/destroy',
		cancel: 'plugin/mch/api/order/cancel',
		order_preview: 'plugin/mch/api/order/preview',
		order_submit: 'plugin/mch/api/order/submit',
		apply_status: 'plugin/mch/api/goods/apply-status',
		qr_code_login: 'plugin/mch/api/mch/qr-code-login',
		poster: 'plugin/mch/api/mch/poster',
		edit: 'plugin/mch/api/goods/edit',
		cat: 'plugin/mch/api/goods/cats',
		postage: 'plugin/mch/api/goods/rules',
		service: 'plugin/mch/api/goods/services',
		mch_cat: 'plugin/mch/api/goods/mch-cats',
		shop_consume: 'plugin/mch/api/mch/shop-index',
		flow: 'plugin/mch/api/mch/devices-index',
		flow_code: 'plugin/mch/api/mch/code-order',
		settlement: 'plugin/mch/api/mch/settlement',
		aggregate_code: 'plugin/mch/api/mch/aggregate-code',
	},
	app_admin: {
		index: 'api/admin/data-statistics/all_data',
		send: 'api/admin/order/send',
		goods: 'api/admin/goods/index',
		table: 'api/admin/data-statistics/table',
		express: 'api/order/express-list',
		goods_switch: 'api/admin/goods/switch-status',
		goods_destroy: 'api/admin/goods/destroy',
		comments: 'api/admin/order-comments/index',
		comments_top: 'api/admin/order-comments/update-top',
		comments_reply: 'api/admin/order-comments/reply',
		comments_show: 'api/admin/order-comments/show',
		user: 'api/admin/user/index',
		share: 'api/admin/share/index',
		clerk: 'api/admin/user/clerk',
		integral: 'api/admin/user/integral',
		balance: 'api/admin/user/balance',
		setting: 'api/admin/mall/setting',
		review: 'api/admin/review/index',
		tabs: 'api/admin/review/tabs',
		review_detail: 'api/admin/review/detail',
		review_switch: 'api/admin/review/switch-status',
		order: 'api/admin/order/index',
		update_price: 'api/admin/order/update-total-price',
		update_address: 'api/admin/order/update-address',
		address_list: 'api/admin/order/address-list',
		express_detail: 'api/order/express-detail',
		cancel: 'api/admin/order/cancel',
		detail: 'api/admin/order/detail',
		refund: 'api/admin/order/refund',
		refund_handle: 'api/admin/order/refund-handle',
		edit: 'api/admin/goods/edit',
		service: 'api/admin/service/options',
		card: 'api/admin/card/options',
		cat: 'api/admin/cat/options',
		order_num: 'api/admin/order/order-num',
		print: 'api/admin/order/print',
		refund_address: 'api/admin/refund-address/index',
		refund_address_edit: 'api/admin/refund-address/edit',
		clerk_destroy: 'api/admin/user/clerk-destroy',
		address_destroy: 'api/admin/refund-address/destroy',
		clerk_edit: 'api/admin/user/clerk-edit',
		cash: 'api/admin/cash/index',
		verify: 'api/admin/cash/verify',
		user_cash: 'api/admin/cash/cash',
		postage: 'api/admin/postage-rule/all-list',
		shou_huo: 'api/admin/order/shou-huo',
		delivery: 'api/admin/order/delivery',
		remark: 'api/admin/user/update-user-remark',
		remarkName: 'api/admin/user/update-user-remark-name',
		level: 'api/admin/user/update-user-level',
		shou_huo: 'api/admin/order/shou-huo',
		goods_edit: 'api/admin/goods/edit',
		sellerRemark: 'api/admin/order/seller-remark',
		confirm: 'api/admin/order/confirm',
		queue: 'api/admin/review/queue-status',
		device_order: 'api/user/device-order',
		device_detail: 'api/user/device-detail'
	},
	clerk: {
		info: 'plugin/clerk/api/index/clerk-info',
		order: 'plugin/clerk/api/index/order',
		my: 'plugin/clerk/api/index/my-order',
		detail: 'plugin/clerk/api/index/detail',
		card: 'plugin/clerk/api/index/card',
		my_card: 'plugin/clerk/api/index/my-card',
		card_detail: 'api/card/user-card-detail',
		statistics: 'plugin/clerk/api/index/statistics',
		qrcode_parameter: 'api/default/qr-code-parameter',
	},
	miaosha: {
		goods: 'plugin/miaosha/api/goods/index',
		estimate: 'plugin/miaosha/api/goods/estimate',
		goods_detail: 'plugin/miaosha/api/goods/detail',
		cats: 'plugin/miaosha/api/goods/cats',
		goods_info: 'plugin/miaosha/api/goods/miaosha',
		order_preview: 'plugin/miaosha/api/order/order-preview',
		order_submit: 'plugin/miaosha/api/order/submit',
		today_goods: 'plugin/miaosha/api/goods/today-miaosha',
		time_list: 'plugin/miaosha/api/goods/time-list',
		add_cart: 'plugin/miaosha/api/index/add-cart',
		cart_edit: 'plugin/miaosha/api/index/cart-edit',
		poster: 'plugin/miaosha/api/index/poster',
	},
	diy: {
		page_store: 'plugin/diy/api/page/store',
		receive: `plugin/diy/api/ad-award/receive`
	},
	vip_card: {
		index: 'plugin/vip_card/api/index/index',
		card: 'plugin/vip_card/api/index/card',
		order_preview: 'plugin/vip_card/api/order/preview',
		card_detail: 'plugin/vip_card/api/index/card-detail',
		setting: 'plugin/vip_card/api/index/setting',
		right: 'plugin/vip_card/api/index/right',
		order_submit: 'plugin/vip_card/api/order/submit',
		pay_data: 'plugin/vip_card/api/order/pay-data',
	},
	advance: {
		goods: `plugin/advance/api/goods/index`,
		banner: `plugin/advance/api/goods/banner`,
		detail: `plugin/advance/api/goods/detail`,
		poster: `plugin/advance/api/goods/poster`,
		order_submit: `plugin/advance/api/order/advance`,
		order: `plugin/advance/api/order/my-advance`,
		order_preview: `plugin/advance/api/order/order-preview`,
		order_sub: `plugin/advance/api/order/order-submit`,
		order_detail: `plugin/advance/api/order/detail`,
		pay_data: `plugin/advance/api/order/pay-data`,
		get_payments: `plugin/advance/api/payment/get-payments`,
		goods_list: `plugin/advance/api/goods/index`,
	},
	gift: {
		order_submit: `/plugin/gift/api/gift-order/order-submit`,
		order_preview: `/plugin/gift/api/gift-order/order-preview`,
		config: `plugin/gift/api/gift-index/config`,
		pay_data: `plugin/gift/api/gift-order/pay-data`,
		gift: `plugin/gift/api/gift-index/gift`,
		poster: `plugin/gift/api/gift-index/poster`,
		send_list: `plugin/gift/api/order-list/send-list`,
		send_detail: `plugin/gift/api/order-list/send-detail`,
		turn: `plugin/gift/api/gift-order/turn`,
		get_turn: `plugin/gift/api/gift-order/get-turn`,
		my_join: `plugin/gift/api/gift-join/my-join`,
		my_win: `plugin/gift/api/gift-join/my-win`,
		win_detail: `plugin/gift/api/gift-join/win-detail`,
		join: `plugin/gift/api/gift-join/join`,
		join_status: `plugin/gift/api/gift-join/join-status`,
		join_detail: `plugin/gift/api/gift-join/join-detail`,
		preview: `plugin/gift/api/gift-order/gift-convert-preview`,
		convert: `plugin/gift/api/gift-order/gift-convert`,
		list: `plugin/gift/api/goods/goods-list`,
		goods: `plugin/gift/api/goods/detail`,
		cancel: `plugin/gift/api/gift-order/order-cancel`,
	},
	foot: {
		index: 'api/footprint/footprint',
		list: 'api/footprint/index',
		del: 'api/footprint/footprint-del',
	},
	quick_share: {
		poster_list: `plugin/quick_share/api/goods/poster-list`,
		goods: `plugin/quick_share/api/goods/index`,
		poster: `plugin/quick_share/api/goods/poster`,
		setting: `plugin/quick_share/api/setting/index`,
	},
	stock: {
		status: 'plugin/stock/api/index/apply-status',
		index: 'plugin/stock/api/index/index',
		setting: 'plugin/stock/api/index/setting',
		apply: 'plugin/stock/api/index/apply',
		clear: 'plugin/stock/api/index/clear-apply',
		cash: 'plugin/stock/api/index/cash',
		detail: 'plugin/stock/api/cash/index',
		level: 'plugin/stock/api/index/level',
		info: 'plugin/stock/api/index/info',
		up: 'plugin/stock/api/index/level-up',
		bonus: 'plugin/stock/api/cash/bonus-detail',
	},
	template: {
		template: `api/message/template`,
	},
	pick: {
		goods_list: `plugin/pick/api/index/goods-list`,
		goods: `/plugin/pick/api/index/goods-detail`,
		order_preview: `/plugin/pick/api/pick-order/order-preview`,
		order_submit: `/plugin/pick/api/pick-order/order-submit`,
		poster: 'plugin/pick/api/index/poster',
		add: `plugin/pick/api/cart/add`,
		list: 'plugin/pick/api/cart/list',
		edit: `plugin/pick/api/cart/edit`,
		delete: 'plugin/pick/api/cart/delete'
	},
	live: {
		index: 'api/live/index',
		playback: 'api/live/play-back',
	},
	composition: {
		index: `plugin/composition/api/index/index`,
		config: `plugin/composition/api/index/config`,
		detail: `plugin/composition/api/index/detail`,
		composition_detail: `plugin/composition/api/index/composition-detail`,
		order_preview: `plugin/composition/api/index/order-preview`,
		order_submit: `plugin/composition/api/index/order-submit`,
	}
};

export default apiUrl;
