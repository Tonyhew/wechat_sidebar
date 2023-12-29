/**
 * @description 路由及企业微信api配置等相关
 * @author Tonyhew
 */

import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { message, Result } from 'antd';
import axios from 'axios';
import * as ww from '@wecom/jssdk';
import api from '../config/api.config';
import Home from '../pages/Home';
import Client from './Client';
// import Clientpath from './Clientpath'
// import MedicalDairy from './MedicalDairy'
import Payment from './Payment';
import '../assets/style/Common.scss';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Deduction from './Deduction';
import HistoryDeduction from './HistoryDeduction';
import ReturnVisit from './ReturnVisit';

// import CP from './Clientprocess';
// import Healthfile from './Healthfile';

/**
 * 声明企业微信api的 corpId 和 agentId
 */
const corpId = 'wwc3f51e8c5ad724b9',
  agentId = '1000013';

message.config({
  duration: 2,
  maxCount: 2,
  top: 1
});

const Main = () => {
  const url = window.location.href;

  // 判断是否为企业微信
  const [isQWXEnv, setIsQWEnv] = useState(true);

  const [qwTS, setQWTS] = useState(''); // timestamp
  const [qwNonceStr, setQWNonceStr] = useState(''); // nonceStr
  const [qwSignature, setQWSignature] = useState(''); // siganture

  const [userCrmId, setUserCrmId] = useState('');

  const [agentConfigMsg, setAgentConfigMsg] = useState('');
  const [qwUserId, setQWUserId] = useState('');

  const [qwUserList, setQWUserList] = useState([]);

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
        setIsQWEnv(true);
        // 如果 Signature 为空，向后端请求获取Config参数
        if (qwSignature === '') {
          getSOptions();
        } else {
          // 初始化 agentConfig
          init_agentConfig();
          // agentConfig ok 后，获取 UserId 进行后续操作
          if (agentConfigMsg === 'agentConfig:ok') {
            getQWUser();
            getQWUserInfo();
          } else {
            console.log('agentConfig 未配置成功, 请重试!!!');
          }
        }
      } else {
        setIsQWEnv(false);
      }
    } else {
      // 非微信环境
      setIsQWEnv(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qwSignature, agentConfigMsg, qwUserId]);

  /**
   *
   * 获取 Config 参数
   * @returns signature, nonceStr, timestamp
   *
   */
  const getSOptions = useCallback(() => {
    axios({
      method: 'GET',
      url: `${api.getSignature}${url}`,
      withCredentials: true,
      header: {
        'Acess-Control-Allow-Origin': '*'
      }
    }).then((res) => {
      const result = res.data.data;
      const timestamp = result.timestamp;
      const noncestr = result.noncestr;
      const signature = result.signature;

      setQWTS(timestamp);
      setQWNonceStr(noncestr);
      setQWSignature(signature);
    });
  }, [url]);

  /**
   *
   * 进行 agentConfig 配置企业微信SDK
   *
   */
  const init_agentConfig = useCallback(() => {
    ww.register({
      corpId,
      agentId,
      jsApiList: ['getCurExternalContact'],

      // agentConfig 返回：生成签名的时间戳、生成签名的随机串、签名
      getAgentConfigSignature() {
        if (qwSignature !== '') {
          return {
            timestamp: qwTS,
            nonceStr: qwNonceStr,
            signature: qwSignature
          };
        }
      },

      onAgentConfigSuccess(res) {
        setAgentConfigMsg(res.errMsg);
      },

      onAgentConfigFail(err) {
        console.log(err);
      }
    });
  }, [qwNonceStr, qwSignature, qwTS]);

  /**
   *
   * agentConfig 配置ok后，进行获取当前聊天窗口的外部联系人的 userId
   *
   */
  const getQWUser = () => {
    ww.invoke('getCurExternalContact', {}, function (res) {
      if (res.errMsg === 'getCurExternalContact:ok') {
        setQWUserId(res.userId);
      } else {
        //错误处理
        console.log('error');
      }
    });
  };

  /**
   * 根据获取到的用户 Id ，来获取到他的信息
   */
  const getQWUserInfo = useCallback(async () => {
    await axios({
      method: 'GET',
      url: `${api.getUserInfo}${qwUserId}`,
      withCredentials: true,
      header: {
        'Acess-Control-Allow-Origin': '*'
      }
    }).then((res) => {
      console.log(res);
      if (res.data.errMsg === '成功') {
        const data = res.data;
        setQWUserList(data.data);
        setUserCrmId(data.data.crmId);
      } else {
        // message.error('请确认你的电话号码是否正确填写!!!');
      }
    });
  }, [qwUserId]);

  useEffect(() => {
    if (qwUserList.length <= 0 && qwUserList) {
      message.error('请确认你的电话号码是否正确填写!!!');
    }
  }, [qwUserList, qwUserList.length]);

  return isQWXEnv ? (
    <Router>
      <Routes>
        <Route
          caseSensitive
          path="/"
          element={<Home qwUserList={qwUserList} qwUserId={qwUserId} />}
        >
          <Route
            caseSensitive
            path="/client"
            element={<Client qwUserList={qwUserList} />}
          ></Route>
          <Route
            caseSensitive
            path="/payment"
            element={<Payment crmId={userCrmId} />}
          ></Route>
          <Route
            caseSensitive
            path="/deduction"
            element={<Deduction crmId={userCrmId} />}
          />
          <Route
            caseSensitive
            path="/historyDeduction"
            element={<HistoryDeduction crmId={userCrmId} />}
          />
          <Route
            caseSensitive
            path="/returnVisit"
            element={<ReturnVisit crmId={userCrmId} />}
          />
          {/* <Route path='/clientprocess' element={<CP />}></Route> */}
          {/* <Route path='/Healthfile' element={<Healthfile />}></Route> */}
          {/* <Route caseSensitive path='/Clientpath' element={<Clientpath />}></Route> */}
          {/* <Route caseSensitive path='/MedicalDairy' element={<MedicalDairy />}></Route> */}
        </Route>
      </Routes>
    </Router>
  ) : (
    <Result title={'请在企业微信客户端中打开'} />
  );
};

export default Main;
