import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Client from './Client';
import CP from './Clientprocess';
import Healthfile from './Healthfile';
import Clientpath from './Clientpath';
import MedicalDairy from './MedicalDairy';
import Payment from './Payment';
import '../assets/style/Common.scss';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'


function Main() {

  useEffect(() => {
    
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path='/client' element={<Client />}></Route>
          <Route path='/clientprocess' element={<CP />}></Route>
          <Route path='/Healthfile' element={<Healthfile />}></Route>
          <Route path='/Clientpath' element={<Clientpath />}></Route>
          <Route path='/MedicalDairy' element={<MedicalDairy />}></Route>
          <Route path='/Payment' element={<Payment />}></Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default Main
