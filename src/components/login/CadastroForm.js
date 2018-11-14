import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../store/reducers/loginReducer';
import { TextField, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { Row, Col, Layout, Steps, Button, message } from 'antd';
import './CadastroForm.css';

const theme = createMuiTheme({
  palette: {
    primary: {main: '#000'},
    secondary: {main: '#000'}
  }
});

const { Content } = Layout;

class Step1 extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <MuiThemeProvider theme={theme}>
          <div>
            <TextField
            id="user"
            label="Email"
            InputLabelProps={{ shrink: true }}
            margin="normal"/>
          </div>
          <div>
            <TextField
            id="password"
            type="password"
            label="Senha"
            InputLabelProps={{ shrink: true }}
            margin="normal"/>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

const Step = Steps.Step; 
   
const steps = [{
  title: 'Primeiro',
  content: <Step1/>,
}, {
  title: 'Second',
  content: 'Second-content',
}, {
  title: 'Last',
  content: 'Last-content',
}];

class CadastroForm extends Component {

  constructor(props) {
    super(props);
    this.state = {current: 0};
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    let { current } = this.state;

    return (
    
    <Layout style={{background: 'none'}}>
      <div>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {
            current < steps.length - 1
            && <Button type="primary" onClick={() => this.next()}>Next</Button>
          }
          {
            current === steps.length - 1
            && <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
          }
          {
            current > 0
            && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
            )
          }
        </div>
      </div>
    </Layout>
    )
  }
}

export default CadastroForm;