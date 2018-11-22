import React, { Component } from 'react';
import { createMuiTheme } from '@material-ui/core';
import { Layout, Steps, Button, message } from 'antd';
import { Form, Input, Select, AutoComplete, DatePicker } from 'antd';

import './UsuarioForm.css';

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


class Step2 extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    nome: 'Mariana',
    sobrenome: 'Gobatti',
    telefone: '36566984',
    endereco: 'Rua Antonio Paschoalino, 38',
    cidade: 'Mococa',
    cep: '13732-528'
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
              <Input defaultValue={this.state.nome} type="text" />
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="Sobrenome"
          >
              <Input type="text" defaultValue={this.state.sobrenome}/>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Telefone"
        >
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} defaultValue={this.state.telefone}/>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Endereço"
        >
            <Input type="text" defaultValue={this.state.endereco}/>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Cidade"
        >
            <Input type="text" defaultValue={this.state.cidade}/>
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="CEP"
          >
              <Input type="text" defaultValue={this.state.cep}/>
        </FormItem>
      </Form>
    );
  }
}

const Step2p = Form.create()(Step2);

const Step = Steps.Step;

const steps = [{
  title: 'Dados Pessoais',
  content: <Step2p/>,
}];

class UsuarioForm extends Component {

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
            && <Button type="primary" onClick={() => this.next()}>Próximo</Button>
          }
          {
            current === steps.length - 1
            && <Button type="primary" onClick={() => message.success('Dados salvos!')}>Salvar</Button>
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

export default UsuarioForm;