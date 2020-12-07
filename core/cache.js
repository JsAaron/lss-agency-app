
const clearStorage = function() {
    uni.clearStorage({
        success: function(response) {
            console.log(response);
        },
        fail: function(response) {
            console.log(response);
        },
    })
};

const setStorageSync = function(key, data) {
    try {
        uni.setStorageSync(key, data);
    } catch (response) {
        console.log(response);
    }
};

const getStorageSync = function(key) {
    try {
        return uni.getStorageSync(key);
    } catch(response) {
        console.log(response);
    }
};

const removeStorageSync = function(key) {
    try {
        uni.removeStorageSync(key)
    } catch (response) {
        console.log(response);
    }
};

export { clearStorage, setStorageSync, getStorageSync, removeStorageSync }
