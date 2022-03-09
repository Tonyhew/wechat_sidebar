// 配置公共BaseURL
let url = 'https://backstage.huangzhemin.com/miniapp';

// 接口配置输出总览
let servicePath = {
  // 获取 agentConfig 配置信息（timestamp, nonceStr, signature）
  getSignature: `${url}/signature/getSignature?htmlUrl=`,
  // 获取用户信息
  getUserInfo: `${url}/customerInformation/getCustomerDetails?userId=`,

};

export default servicePath;
