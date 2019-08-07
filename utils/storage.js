
/**
 * 把 用户信息 存入到缓存中
 * @param {object} userinfo 要存入的 用户信息
 */
export const setStorageUserInfo = (userinfo) => {
    return wx.setStorageSync("userinfo", userinfo);
  }
  
  /**
   * 获取缓存中的userinfo
   */
  export const getStorageUserInfo = () => {
    return wx.getStorageSync("userinfo");
  }