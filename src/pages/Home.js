import React, { useEffect } from 'react';
// import axios from 'axios';
import { Outlet } from 'react-router-dom';
import * as wx from '@wecom/jssdk'
import UserInfo from '../components/UserInfo';
import Menu from '../components/Menu';

function Home() {
  const corpId = 'wwc3f51e8c5ad724b9'
  const agentId = '1000013'
  // const secret = 'BiwfDC23ZzaoNK1QGe1kO3t6I3jZ 5KTaclSJpl0EUss'

  useEffect(() => {
    const { jWeixin } = window
    if (wx) {

      wx.register({
        corpId,
        agentId,
        getConfigSignature(url) {
          
        }
      })

    } else {
      jWeixin.config({
        appId: corpId, // 必填，企业微信的corpid，必须与当前登录的企业一致
        beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        timestamp: '', // 必填，生成签名的时间戳
        nonceStr: '', // 必填，生成签名的随机串
        signature: '',// 必填，签名，见 附录-JS-SDK使用权限签名算法

      })

    }


  }, [])

  // const getAccessToken = () => {

  // }


  return (
    <div>
      <UserInfo />
      <Menu />
      <Outlet />
    </div>
  )
}

export default Home;
