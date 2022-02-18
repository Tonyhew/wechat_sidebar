// 配置公共BaseURL
let url = 'https://backstage.huangzhemin.com/miniapp';

// 接口配置输出总览
let servicePath = {
  // 
  getSignature: `${url}/signature/getSignature?htmlUrl=`,
  // 获取用户信息
  getUserList: `${url}/`
};

export default servicePath;
