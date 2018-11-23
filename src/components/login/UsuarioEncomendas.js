import React, { Component } from 'react';
import { createMuiTheme } from '@material-ui/core';
import { Layout, Steps } from 'antd';
import { Form, Input, Select, AutoComplete, Table, Divider, Tag, Popconfirm, message } from 'antd';

import './UsuarioForm.css';

const theme = createMuiTheme({
  palette: {
    primary: {main: '#000'},
    secondary: {main: '#000'}
  }
});

const { Content } = Layout;
const { Column, ColumnGroup } = Table;

const data = [{
  key: '1',
  sku: '1',
  data: '08‎/‎01‎/‎2017‎ ‎01‎:‎02‎:‎44',
  qtdItens: 2,
  total: 'R$135,79',
  status: 'cancelada',
}, {
  key: '2',
  sku: '2',
  data: '02‎/‎02‎/‎2016‎ ‎13‎:‎14‎:‎29',
  qtdItens: 2,
  total: 'R$40,16',
  status: 'retirada',
}];


class Step2 extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Table dataSource={data}>
          <Column
            title="SKU"
            dataIndex="sku"
            key="sku"
          />
          <Column
            title="Data"
            dataIndex="data"
            key="data"
          />
        <Column
          title="Qtd. Itens"
          dataIndex="qtdItens"
          key="qtdItens"
        />
        <Column
          title="Total"
          dataIndex="total"
          key="total"
        />
        <Column
          title="Status"
          dataIndex="status"
          key="status"
        />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <span>
            <Popconfirm title="Tem certeza que deseja fazer isto?" 
                        onConfirm={() => message.success('Ação realizada com sucesso!')} 
                        onCancel={() => message.warning('Ação interrompida')} 
                        okText="Sim" cancelText="Não">
              <a href="javascript:;">{record.status != 'cancelada' ? 'Cancelar' : 'Refazer'}</a>
            </Popconfirm>
            </span>
          )}
        />
      </Table>
    );
  }
}

const Step2p = Form.create()(Step2);

const Step = Steps.Step;

const steps = [{
  title: 'Encomendas',
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
        <div style={{marginTop: '1em'}} className="steps-content">{steps[current].content}</div>
      </div>
    </Layout>
    )
  }
}

export default UsuarioForm;