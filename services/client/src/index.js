// Make sure react-hot-loader is required before react and react-dom
import 'react-hot-loader';

import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';

import App from './App';
import './i18n';
import './index.css';

import 'react-virtualized/styles.css';

ReactDOM.render(<RecoilRoot><App /></RecoilRoot>, document.getElementById('root'));
