// https://github.com/xialeistudio/wechat-jssdk-promise/blob/master/index.js
/**
 * 依赖微信js
 * @link http://mp.weixin.qq.com/wiki/11/74ad127cc054f6b80759c40f77ec03db.html#.E5.88.A4.E6.96.AD.E5.BD.93.E5.89.8D.E5.AE.A2.E6.88.B7.E7.AB.AF.E7.89.88.E6.9C.AC.E6.98.AF.E5.90.A6.E6.94.AF.E6.8C.81.E6.8C.87.E5.AE.9AJS.E6.8E.A5.E5.8F.A3
 */
declare let wx: any;
/**
 * 初始化微信
 * @param params
 */
wx.configAsync = (params: any) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        wx.config(params);
        wx.ready(resolve);
        wx.error((res: any) => {
            reject(new Error(res.errMsg));
        });
    });
};
/**
 * 判断当前客户端版本是否支持指定JS接口
 * @param params
 */
wx.checkJsApiAsync = (params: any) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        params.success = resolve;
        params.fail = (res: any) => {
            reject(new Error(res.errMsg));
        };
        wx.checkJsApi(params);
    });
};
/**
 * 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
 * @param params
 */
wx.onMenuShareTimelineAsync = (params: any) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        params.success = (res: any) => {
            res.result = 'success';
            resolve(res);
        };
        params.cancel = () => {
            resolve({ result: 'cancel' });
        };
        params.fail = (res: any) => {
            reject(new Error(res.errMsg));
        };
        wx.onMenuShareTimeline(params);
    });
};
/**
 * 获取“分享给朋友”按钮点击状态及自定义分享内容接口
 * @param params
 */
wx.onMenuShareAppMessageAsync = (params: any) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        params.success = (res: any) => {
            res.result = 'success';
            resolve(res);
        };
        params.cancel = () => {
            resolve({ result: 'cancel' });
        };
        params.fail = (res: any) => {
            reject(new Error(res.errMsg));
        };
        wx.onMenuShareAppMessage(params);
    });
};
/**
 * 获取“分享到QQ”按钮点击状态及自定义分享内容接口
 * @param params
 */
wx.onMenuShareQQAsync = (params: any) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        params.success = (res: any) => {
            res.result = 'success';
            resolve(res);
        };
        params.cancel = () => {
            resolve({ result: 'cancel' });
        };
        params.fail = (res: any) => {
            reject(new Error(res.errMsg));
        };
        wx.onMenuShareQQ(params);
    });
};
/**
 * 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
 * @param params
 */
wx.onMenuShareWeiboAsync = (params: any) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        params.success = (res: any) => {
            res.result = 'success';
            resolve(res);
        };
        params.cancel = () => {
            resolve({ result: 'cancel' });
        };
        params.fail = (res: any) => {
            reject(new Error(res.errMsg));
        };
        wx.onMenuShareWeibo(params);
    });
};
/**
 * 获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
 * @param params
 */
wx.onMenuShareQZoneAsync = (params: any) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        params.success = (res: any) => {
            res.result = 'success';
            resolve(res);
        };
        params.cancel = () => {
            resolve({ result: 'cancel' });
        };
        params.fail = (res: any) => {
            reject(new Error(res.errMsg));
        };
        wx.onMenuShareQZone(params);
    });
};

/**
 * 拍照或从手机相册中选图接口
 * @param params
 */
wx.chooseImageAsync = (params: any) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        params.success = resolve;
        params.fail = (res: any) => {
            reject(new Error(res.errMsg));
        };
        wx.chooseImage(params);
    });
};

/**
 * 获取本地图片接口（微信新增API）
 * @param params
 */
wx.getLocalImgDataAsync = (params: any) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        params.success = resolve;
        params.fail = (res: any) => {
            reject(new Error(res.errMsg));
        };
        wx.getLocalImgData(params);
    });
};

/**
 * 预览图片接口
 * @param params
 */
wx.previewImageAsync = (params: any) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        params.success = resolve;
        params.fail = (res: any) => {
            reject(new Error(res.errMsg));
        };
        wx.previewImage(params);
    });
};
/**
 * 上传图片接口
 * @param params
 */
wx.uploadImageAsync = (params: any) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        params.success = resolve;
        params.fail = (res: any) => {
            reject(new Error(res.errMsg));
        };
        wx.uploadImage(params);
    });
};
/**
 * 下载图片接口
 * @param params
 */
wx.downloadImageAsync = (params: any) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        params.success = resolve;
        params.fail = (res: any) => {
            reject(new Error(res.errMsg));
        };
        wx.downloadImage(params);
    });
};
/**
 * 开始录音
 * @param params
 */
wx.startRecordAsync = (params: any) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        params.success = resolve;
        params.fail = (res: any) => {
            reject(new Error(res.errMsg));
        };
        wx.startRecord(params);
    });
};
/**
 * 停止录音
 * @param params
 */
wx.stopRecordAsync = (params: any) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        params.success = resolve;
        params.fail = (res: any) => {
            reject(new Error(res.errMsg));
        };
        wx.stopRecord(params);
    });
};
/**
 * 监听录音自动停止接口
 * @param params
 */
wx.onVoiceRecordEndAsync = (params: any) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        params.complete = resolve;
        params.fail = (res: any) => {
            reject(new Error(res.errMsg));
        };
        wx.onVoiceRecordEnd(params);
    });
};
/**
 * 播放语音接口
 * @param params
 */
wx.playVoiceAsync = (params: any) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        params.success = resolve;
        params.fail = (res: any) => {
            reject(new Error(res.errMsg));
        };
        wx.playVoice(params);
    });
};
/**
 * 暂停播放接口
 * @param params
 */
wx.pauseVoiceAsync = (params: any) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        params.success = resolve;
        params.fail = (res: any) => {
            reject(new Error(res.errMsg));
        };
        wx.pauseVoice(params);
    });
};
/**
 * 停止播放接口
 * @param params
 */
wx.stopVoiceAsync = (params: any) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        params.success = resolve;
        params.fail = (res: any) => {
            reject(new Error(res.errMsg));
        };
        wx.stopVoice(params);
    });
};
/**
 * 监听语音播放完毕接口
 * @param params
 */
wx.onVoicePlayEndAsync = (params: any) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        params.success = resolve;
        params.fail = (res: any) => {
            reject(new Error(res.errMsg));
        };
        wx.onVoicePlayEnd(params);
    });
};
/**
 * 上传语音接口
 * @param params
 */
wx.uploadVoiceAsync = (params: any) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        params.success = resolve;
        params.fail = (res: any) => {
            reject(new Error(res.errMsg));
        };
        wx.uploadVoice(params);
    });
};
/**
 * 下载语音接口
 * @param params
 */
wx.downloadVoiceAsync = (params: any) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        params.success = resolve;
        params.fail = (res: any) => {
            reject(new Error(res.errMsg));
        };
        wx.downloadVoice(params);
    });
};
/**
 * 识别音频并返回识别结果接口
 * @param params
 */
wx.translateVoiceAsync = (params: any) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        params.success = resolve;
        params.fail = (res: any) => {
            reject(new Error(res.errMsg));
        };
        wx.translateVoice(params);
    });
};
/**
 * 获取网络状态接口
 * @param params
 */
wx.getNetworkTypeAsync = (params: any) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        params.success = resolve;
        params.fail = (res: any) => {
            reject(new Error(res.errMsg));
        };
        wx.getNetworkType(params);
    });
};
/**
 * 获取地理位置接口
 * @param params
 */
wx.getLocationAsync = (params: any) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        params.success = resolve;
        params.fail = (res: any) => {
            reject(new Error(res.errMsg));
        };
        wx.getLocation(params);
    });
};
/**
 * 开启查找周边ibeacon设备接口
 * @param params
 */
wx.startSearchBeaconsAsync = (params: any) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        params.complete = resolve;
        params.fail = (res: any) => {
            reject(new Error(res.errMsg));
        };
        wx.startSearchBeacons(params);
    });
};
/**
 * 关闭查找周边ibeacon设备接口
 * @param params
 */
wx.stopSearchBeaconsAsync = (params: any) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        params.complete = resolve;
        params.fail = (res: any) => {
            reject(new Error(res.errMsg));
        };
        wx.stopSearchBeacons(params);
    });
};
/**
 * 监听周边ibeacon设备接口
 * @param params
 */
wx.onSearchBeaconsAsync = (params: any) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        params.complete = resolve;
        params.fail = (res: any) => {
            reject(new Error(res.errMsg));
        };
        wx.onSearchBeacons(params);
    });
};
/**
 * 调起微信扫一扫接口
 * @param params
 */
wx.scanQRCodeAsync = (params: any) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        params.success = resolve;
        params.cancel = () => {
            resolve({ result: 'cancel' });
        };
        params.fail = (res: any) => {
            reject(new Error(res.errMsg));
        };
        wx.scanQRCode(params);
    });
};
/**
 * 拉取适用卡券列表并获取用户选择信息
 * @param params
 */
wx.chooseCardAsync = (params: any) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        params.success = resolve;
        params.fail = (res: any) => {
            reject(new Error(res.errMsg));
        };
        wx.chooseCard(params);
    });
};
/**
 * 批量添加卡券接口
 * @param params
 */
wx.addCardAsync = (params: any) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        params.success = resolve;
        params.fail = (res: any) => {
            reject(new Error(res.errMsg));
        };
        wx.addCard(params);
    });
};
/**
 * 发起一个微信支付请求
 * @param params
 */
wx.chooseWXPayAsync = (params: any) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        params.success = resolve;
        params.fail = (res: any) => {
            reject(new Error(res.errMsg));
        };
        wx.chooseWXPay(params);
    });
};
export { wx };
