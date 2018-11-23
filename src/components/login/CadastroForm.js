import React, { Component } from 'react';
import { createMuiTheme } from '@material-ui/core';
import { Layout, Steps, Button, message } from 'antd';
import { Form, Input, Select, AutoComplete, DatePicker } from 'antd';


import './CadastroForm.css';

const theme = createMuiTheme({
  palette: {
    primary: {main: '#000'},
    secondary: {main: '#000'}
  }
});

const { Content } = Layout;


const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class Step1 extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compararPrimeiraSenha = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('senha')) {
      callback('As senhas são diferentes!');
    } else {
      callback();
    }
  }

  validarComOutraSenha = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 16 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 8 },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="E-mail"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'Não é um email válido.',
            }, {
              required: true, message: 'Por favor, coloque seu email!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Senha"
        >
          {getFieldDecorator('senha', {
            rules: [{
              required: true, message: 'Por favor coloque sua senha!',
            }, {
              validator: this.validarComOutraSenha,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Confirme a senha"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Por favor confirme sua senha!',
            }, {
              validator: this.compararPrimeiraSenha,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
      </Form>
    );
  }
}

const Step1p = Form.create()(Step1);



class Step2 extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Recebeu valores do formulário: ', values);
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 16 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 8 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 16,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '19',
    })(
      <Select style={{ width: 70 }}>
        <Option value="19">+19</Option>
      </Select>
    );
    const config = {
      rules: [{ type: 'object', required: true, message: 'Por favor selecione a data!' }],
    };
    return (
      <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="Primeiro Nome"
          >
            {getFieldDecorator('nome', {
              rules: [{ required: true, message: 'Por favor, coloque seu nome!' }],
            })(
              <Input type="text"/>
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="Sobrenome"
          >
            {getFieldDecorator('sobrenome', {
              rules: [{ required: true, message: 'Por favor, coloque seu sobrenome!' }],
            })(
              <Input type="text"/>
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Telefone"
        >
          {getFieldDecorator('telefone', {
            rules: [{ required: true, message: 'Por favor, coloque o número de seu telefone!' }],
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Endereço"
        >
          {getFieldDecorator('endereco', {
            rules: [{ required: true, message: 'Por favor, coloque seu endereço!' }],
          })(
            <Input type="text"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Cidade"
        >
          {getFieldDecorator('cidade', {
            rules: [{ required: true, message: 'Por favor, coloque sua cidade!' }],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="CEP"
          >
            {getFieldDecorator('CEP', {
              rules: [{ required: true, message: 'Por favor, coloque seu CEP!' }],
            })(
              <Input type="text" />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Data Nascimento"
        >
          {getFieldDecorator('data-nasc', config)(
            <DatePicker />
          )}
        </FormItem>
      </Form>
    );
  }
}

const Step2p = Form.create()(Step2);

const Step = Steps.Step;

const steps = [{
  title: 'Usuário',
  content: <Step1p/>,
}, {
  title: 'Dados Pessoais',
  content: <Step2p/>,
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

  handleCadastro() {
    message.success('Cadastro completo!');
    setTimeout(function(){ window.location = 'http://localhost:3000/'; }, 1500);
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
            && <Button type="primary" onClick={() => this.next()}>Próximo</Button>
          }
          {
            current === steps.length - 1
            && <Button type="primary" onClick={this.handleCadastro}>Cadastrar</Button>
          }
          {
            current > 0
            && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Anterior
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