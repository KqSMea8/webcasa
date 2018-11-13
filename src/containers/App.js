import React, { Component } from 'react';
import './App.css';

import { Provider } from 'react-redux';

import { Route, BrowserRouter, Link } from 'react-router-dom';
import { Layout } from 'antd';

import Prateleira from '../components/prateleira/Prateleira';
import FloatCarrinho from './../components/floatCarrinho/FloatCarrinho';
import FloatLogin from './../components/login/FloatLogin';
import BarraMenu from './../components/menu/Menu';
import store from '../store';

const { Header, Content } = Layout;

class App extends Component {

  render() {
    return (
      <div className="App">
        <Provider store={store}>
        <BrowserRouter>
            <Layout>
              <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%', background: '#1b1a20' }}>
                <Link to="/"><div className="logo"/></Link>
                <BarraMenu/>
              </Header>
              <Content style={{ background: '#fff' }}>
                <main style={{ position: 'relative', top: '80px'}}>
                    <div>
                        <Route exact path="/" component={Prateleira}/>
                    </div>
                </main>
              </Content>
              <FloatCarrinho/>
              <FloatLogin/>
            </Layout>
          </BrowserRouter>
        </Provider>
      </div>
    )
  }
}

export default App;