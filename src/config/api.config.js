// 配置公共BaseURL
let url = process.env.REACT_APP_ENV === 'development' ? process.env.REACT_APP_BASE_URL : 'https://applets.seouleaguer.com/miniapp';

// 接口配置输出总览
let servicePath = {
  // 获取 agentConfig 配置信息（timestamp, nonceStr, signature）
  getSignature: `${url}/signature/getSignature?htmlUrl=`,
  // 获取用户信息
  getUserInfo: `${url}/customerInformation/getCustomerDetails?userId=`,
  /**
   * 已划扣记录
   */
  selectDeductionRecordList: `${url}/UsageRecord/selectDeductionRecordList`,
  /**
   * 未划扣记录
   */
  selectOrdersNotDeducteds: `${url}/UsageRecord/selectOrdersNotDeducteds`,
  /**
   * 回访记录
   */
  VisitHistoryList: `${url}/VisitHistory/VisitHistoryList`
};

export default servicePath;
