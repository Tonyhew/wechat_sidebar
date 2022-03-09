/**
 * @description 主页
 * @author Tonyhew
 */


import React from 'react';
import { Outlet } from 'react-router-dom';
import UserInfo from '../components/UserInfo';
import Menu from '../components/Menu';


function Home(props) {

  return (
    <div>
      <UserInfo qwUserList={props.qwUserList} />
      <Menu />
      <Outlet />
    </div>
  )
}

export default Home;
