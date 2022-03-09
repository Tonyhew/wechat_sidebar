/**
 * @description 路由及企业微信api配置等相关
 * @author Tonyhew
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Result } from 'antd';
import axios from 'axios';
import * as ww from '@wecom/jssdk';
import api from '../config/api.config';
import Home from '../pages/Home';
import Client from './Client';
import Clientpath from './Clientpath';
import MedicalDairy from './MedicalDairy';
import Payment from './Payment';
import '../assets/style/Common.scss';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

// import CP from './Clientprocess';
// import Healthfile from './Healthfile';

/**
 * 声明企业微信api的 corpId 和 agentId
 */
const corpId = 'wwc3f51e8c5ad724b9',
  agentId = '1000013'

const Main = () => {

  const url = window.location.href

  // 判断是否为企业微信
  const [isQWXEnv, setIsQWEnv] = useState(false)

  const [qwTS, setQWTS] = useState(''); // timestamp
  const [qwNonceStr, setQWNonceStr] = useState(''); // nonceStr
  const [qwSignature, setQWSignature] = useState(''); // siganture

  const [agentConfigMsg, setAgentConfigMsg] = useState('')
  const [qwUserId, setQWUserId] = useState('');

  const [qwUserList, setQWUserList] = useState([])

  const UA = navigator.userAgent.toLowerCase();

  useEffect(() => {

    // 是否为移动端
    const isWX = /micromessenger/i.test(UA);
    const isQYWX = /wxwork/i.test(UA);

    /**
     * 判断是否为微信环境
     */
    if (isWX) {
      // 判断是否为企业微信
      if (isQYWX) {
        setIsQWEnv(true)
        // 如果 Signature 为空，向后端请求获取Config参数
        if (qwSignature === '') {
          getSOptions()
        } else {
          // 初始化 agentConfig
          init_agentConfig()

          // agentConfig ok 后，获取 UserId 进行后续操作
          if (agentConfigMsg === 'agentConfig:ok') {
            getQWUser()
            getQWUserInfo()
          } else {
            console.log('agentConfig 未配置成功, 请重试!!!')
          }
        }
      } else {
        setIsQWEnv(false)
      }
    } else {
      // 非微信环境
      setIsQWEnv(false)
    }



  }, [qwSignature, agentConfigMsg, qwUserId,])

  /**
   * 
   * 获取 Config 参数
   * @returns signature, nonceStr, timestamp
   * 
   */
  const getSOptions = () => {
    axios({
      method: 'GET',
      url: `${api.getSignature}${url}`,
      withCredentials: true,
      header: {
        'Acess-Control-Allow-Origin': '*',
      }
    }).then(
      res => {

        const result = res.data.data;
        const timestamp = result.timestamp;
        const noncestr = result.noncestr;
        const signature = result.signature;

        setQWTS(timestamp)
        setQWNonceStr(noncestr)
        setQWSignature(signature)

      }
    )
  }


  /**
   * 
   * 进行 agentConfig 配置企业微信SDK
   * 
   */
  const init_agentConfig = () => {

    ww.register({
      corpId,
      agentId,
      jsApiList: [
        'getCurExternalContact'
      ],

      // agentConfig 返回：生成签名的时间戳、生成签名的随机串、签名
      getAgentConfigSignature() {
        if (qwSignature !== '') {
          return {
            timestamp: qwTS,
            nonceStr: qwNonceStr,
            signature: qwSignature
          }
        }

      },

      onAgentConfigSuccess(res) {
        setAgentConfigMsg(res.errMsg)
      }

    });
  }

  /**
   * 
   * agentConfig 配置ok后，进行获取当前聊天窗口的外部联系人的 userId
   * 
   */
  const getQWUser = () => {

    ww.invoke('getCurExternalContact', {}, function (res) {
      if (res.errMsg === "getCurExternalContact:ok") {
        setQWUserId(res.userId)
      } else {
        //错误处理
        console.log('error')
      }
    });

  }

  /**
   * 根据获取到的用户 Id ，来获取到他的信息
   */
  const getQWUserInfo = () => {
    axios({
      method: 'GET',
      url: `${api.getUserInfo}${qwUserId}`,
      withCredentials: true,
      header: {
        'Acess-Control-Allow-Origin': '*',
      }
    }).then(
      res => {
        console.log(res)
        if (res.data.errMsg === '成功') {
          setQWUserList(res.data.data)
        } else {
          console.log('客户数据未获取成功, 请稍后再试!!!')
        }
      }
    )
  }

  return (
    isQWXEnv ? <Router>
      <Routes>
        <Route path="/" element={<Home qwUserList={qwUserList} />}>
          <Route path='/client' element={<Client qwUserList={qwUserList} />}></Route>
          {/* <Route path='/clientprocess' element={<CP />}></Route> */}
          {/* <Route path='/Healthfile' element={<Healthfile />}></Route> */}
          <Route path='/Clientpath' element={<Clientpath />}></Route>
          <Route path='/MedicalDairy' element={<MedicalDairy />}></Route>
          <Route path='/Payment' element={<Payment />}></Route>
        </Route>
      </Routes>
    </Router> : <Result
      title={'请在企业微信客户端中打开'}
    />
  )
}

export default Main
