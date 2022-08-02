import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/style/Menu.scss'

const dataList = [
  {
    id: 1,
    title: '基本信息',
    href: 'client'
  },
  
  // {
  //   id: 2,
  //   title: '客户轨迹',
  //   href: 'clientpath'
  // },
  
  // {
  //   id: 3,
  //   title: '诊疗日记',
  //   href: 'MedicalDairy'
  // },
  // {
  //   id: 4,
  //   title: '交易记录',
  //   href: 'payment'
  // }
]

function Menu() {

  const [menuList, setMenuList] = useState([])

  useEffect(() => {
    setMenuList(dataList)

  }, [])

  return (
    <div className={'menu-list'}>
      {
        menuList.map((navItem, index) => {
          return (
            <NavLink
              className={
                ({ isActive }) => isActive ? 'isActive' : ''
              }
              key={index}
              to={navItem.href}
            >{navItem.title}</NavLink>
          )
        })
      }
    </div>
  )

}

export default Menu;



