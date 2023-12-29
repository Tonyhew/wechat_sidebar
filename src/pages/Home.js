/**
 * @description 主页
 * @author Tonyhew
 */


import React from 'react';
import { Outlet } from 'react-router-dom';
import UserInfo from '../components/UserInfo';
import Menu from '../components/Menu';


const Home = (props) => {

  return (
    <div>
      <UserInfo qwUserList={props.qwUserList} qwUserId={props.qwUserId} />
      <Menu />
      <Outlet />
    </div>
  )
}

export default Home;
