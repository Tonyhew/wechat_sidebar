import React from 'react';
import axios from 'axios';
import { Spin, message } from 'antd'

axios.create({
  baseURL: '',
  timeout: 2000
})
