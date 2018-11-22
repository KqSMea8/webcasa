import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import ptBR from 'antd/lib/locale-provider/pt_BR';
import { LocaleProvider } from 'antd';

ReactDOM.render(<LocaleProvider locale={ptBR}><App /></LocaleProvider>, document.getElementById('root'));
registerServiceWorker();
