const time = function () {
    return parseInt(Math.round(new Date() / 1000));
};

/***
 * 时间戳转换时间字符串
 * @param format eg: Y-m-d h:i:s
 * @param timestamp
 * @returns {*}
 */
const datetime = function (format, timestamp) {
    if (typeof format === 'undefined' || format === null) {
        format = 'Y-m-d h:i:s';
    }
    if (typeof timestamp === 'undefined' || timestamp === null) {
        timestamp = this.time();
    }
    const d = new Date();
    d.setTime(timestamp * 1000);
    // from https://www.cnblogs.com/yjf512/p/3796229.html
    const date = {
        "Y": d.getFullYear(),
        "m+": (d.getMonth() + 1) < 10 ? `0${d.getMonth() + 1}` : (d.getMonth() + 1),
        "d+": d.getDate() < 10 ? `0${d.getDate()}` : d.getDate(),
        "h+": d.getHours() < 10 ? `0${d.getHours()}` : d.getHours(),
        "i+": d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes(),
        "s+": d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds(),
        "q+": Math.floor((d.getMonth() + 3) / 3),
        "S+": d.getMilliseconds(),
    };
    for (let k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ?
                date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
};

const strtotime = function (str) {
};

const objectToUrlParams = function (obj, urlencode) {
    let str = "";
    for (let key in obj) {
        str += "&" + key + "=" + (urlencode ? encodeURIComponent(obj[key]) : obj[key]);
    }
    return str.substr(1);
};

const timeDifference = function (start_at, end_at) {
    let times = parseInt((end_at - start_at) / 1000);
    let day = 0,
        hour = 0,
        minute = 0,
        second = 0;

    if (times > 0) {
        day = Math.floor(times / (60 * 60 * 24));
        hour = Math.floor(times / (60 * 60)) - (day * 24);
        minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
        second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
    } else {
        return null;
    }

    return {
        d: day,
        h: hour < 10 ? ('0' + hour) : hour,
        m: minute < 10 ? ('0' + minute) : minute,
        s: second < 10 ? ('0' + second) : second,
    };
};

/**
 * 使用经纬度计算地球表面距离
 */
const earthDistance = function (location1, location2) {
    const lat1 = parseFloat(location1.lat);
    const lng1 = parseFloat(location1.lng);
    const lat2 = parseFloat(location2.lat);
    const lng2 = parseFloat(location2.lng);

    const EARTH_RADIUS = 6378137.0; //单位M
    const PI = Math.PI;

    function getRad(d) {
        return d * PI / 180.0;
    }

    let f = getRad((lat1 + lat2) / 2);
    let g = getRad((lat1 - lat2) / 2);
    let l = getRad((lng1 - lng2) / 2);

    let sg = Math.sin(g);
    let sl = Math.sin(l);
    let sf = Math.sin(f);

    let s, c, w, r, d, h1, h2;
    let a = EARTH_RADIUS;
    let fl = 1 / 298.257;

    sg = sg * sg;
    sl = sl * sl;
    sf = sf * sf;

    s = sg * (1 - sl) + (1 - sf) * sl;
    c = (1 - sg) * (1 - sl) + sf * sl;

    w = Math.atan(Math.sqrt(s / c));
    r = Math.sqrt(s * c) / w;
    d = 2 * w * a;
    h1 = (3 * r - 1) / 2 / c;
    h2 = (3 * r + 1) / 2 / s;

    return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
};

const objectValues = function (obj) {
    let arr = [];
    for (let i in obj) {
        arr.push(obj[i]);
    }
    return arr;
};

const randomString = function (length) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
};

const urlParamsToObject = function (str) {
    let groups = str.split('&');
    let obj = {};
    for (let i in groups) {
        if (typeof groups[i] !== 'string') continue;
        if (!groups[i].length) continue;
        let kvs = groups[i].split('=');
        if (kvs.length !== 2) continue;
        obj[kvs[0]] = kvs[1];
    }
    return obj;
};

const showLoading = function () {
    uni.showLoading({
        title: '加载中',
        // #ifdef MP-WEIXIN || MP-BAIDU
        mask: true,
        // #endif
    })
};
const hideLoading = function () {
    uni.hideLoading();
};

//保存
let batchStatus = false;

/**
 *
 * @param url
 * @param desc ['image', 'video']
 * @returns {Promise<unknown>}
 */
const batchSave = function (url, desc = 'image') {
    return new Promise((resolve_a, reject_a) => {
        if (!(url instanceof Array)) {
            url = [url];
        }
        const title = desc === "image" ? '图片' : '视频';

        new Promise((resolve_b, reject_b) => {
            // #ifdef MP-ALIPAY
            resolve_b('success');
            // #endif

            // #ifndef MP-ALIPAY
            let scope = null;
            // #ifdef MP-WEIXIN || MP-BAIDU
            scope = 'scope.writePhotosAlbum';
            // #endif
            // #ifdef MP-TOUTIAO
            scope = 'scope.album';
            // #endif
            uni.authorize({
                scope: scope,
                success(res) {
                    resolve_b('success');
                },
                fail(e) {
                    uni.showModal({
                        title: '提示',
                        content: '您好,请先授权保存到相册权限',
                        showCancel: false,
                        success(res) {
                            if (res.confirm) {
                                uni.openSetting({
                                    success(settingdata) {
                                        if (settingdata.authSetting[scope]) {
                                            resolve_b('success');
                                        } else {
                                            reject_b('fail');
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            });
            // #endif
        }).then(function (result) {
            if (batchStatus) {
                uni.showLoading({title: title + `保存中`, mask: true});
                return;
            }
            batchStatus = true;
            uni.showLoading({title: title + `保存中`, mask: true});
        }).then(e => {
            Promise.all(url.map(item => {
                return new Promise((resolve_c, reject_c) => {
                    try {
                        // #ifndef MP-ALIPAY
                        let downloadTask = uni.downloadFile({
                            url: item,
                            success: function (e) {
                                if (desc === 'image') {
                                    uni.saveImageToPhotosAlbum({
                                        filePath: e.tempFilePath,
                                        success: function () {
                                            resolve_c('success')
                                        },
                                        fail: function (err) {
                                            console.log(err);
                                            reject_c('fail');
                                        }
                                    });
                                }
                                if (desc === 'video') {
                                    uni.saveVideoToPhotosAlbum({
                                        filePath: e.tempFilePath,
                                        success: function () {
                                            resolve_c('success')
                                        },
                                        fail: function (err) {
                                            console.log(err);
                                            reject_c('fail');
                                        }
                                    });
                                }
                            },
                            fail: function (err) {
                                console.log(err);
                                reject_c('fail');
                            }
                        });
                        // #endif

                        // #ifdef MP-WEIXIN
                        if (desc === 'video') {
                            const ago = new Date().getTime();
                            const limit = 1000 * 60;  //max 1minute
                            downloadTask.onProgressUpdate((res) => {
                                let currency = new Date().getTime();
                                if (currency - ago > limit) {
                                    downloadTask.abort();
                                    reject_c('fail');
                                }
                            });
                        }
                        // #endif

                        // #ifdef MP-ALIPAY
                        my.saveImage({
                            url: item,
                            showActionSheet: true,
                            success: (res) => {
                                resolve_c('success')
                            },
                            fail(info) {
                                console.error(info);
                                reject_c('fail');
                            }
                        })
                        // #endif
                    } catch (e) {
                        console.error(e.message);
                        reject_c('fail');
                    }
                })
            })).then((result) => {
                batchStatus = false;
                uni.hideLoading();
                resolve_a('success');
            }).catch((reason) => {
                batchStatus = false;
                uni.hideLoading();
                /* 提示暂放 */
                uni.showToast({title: '下载失败'});
                reject_a('fail');
            })
        }).catch((reason) => {
            uni.showModal({title: '提示', content: '授权失败，请稍后重新获取', showCancel: false});
            reject_a('fail');
        })
    })
}

/**
 * 删除url中指定参数，并返回删除后的url
 * @param {string} url url或完整带参数的路由
 * @param {string|array} param 需要删除的参数，多个可使用数字如['key1', 'key2']
 * @param {boolean} allParams 是否删除所有参数，默认false
 * @returns {string|*}
 */
const deleteUrlParam = function (url, param, allParams) {
    if (isNaN(url.indexOf('?')) || url.indexOf('?') < 0) {
        return url;
    }
    let query = url.substr(url.indexOf('?') + 1);
    let route = url.substr(0, url.indexOf('?'));
    if (allParams) {
        return route;
    }
    let params = [];
    if (typeof param === 'object') {
        params = param;
    } else {
        params = [param];
    }
    let queryObj = {};
    let queryList = query.split('&');
    for (let i in queryList) {
        queryList[i] = queryList[i].split('=');
        queryObj[queryList[i][0]] = queryList[i][1];
    }
    for (let i in params) {
        delete queryObj[params[i]];
    }
    query = JSON.stringify(queryObj).replace(/[\"\{\}]/g, '').replace(/\:/g, '=').replace(/\,/g, '&');
    if (!query.length) {
        return route;
    }
    return route + '?' + query;
};

export {
    time,
    datetime,
    strtotime,
    objectToUrlParams,
    timeDifference,
    earthDistance,
    objectValues,
    randomString,
    urlParamsToObject,
    showLoading,
    hideLoading,
    batchSave,
    deleteUrlParam,
}
