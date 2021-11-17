import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import CadastroMedico from './CadastroMedicoForm';
import CadastroPaciente from './CadastroPacienteForm';
import LoginForm from './LoginForm';

const divStyle={
  width: '100%',
  height:'100vh',
  marginTop: '40px',
  overflowX: 'scroll'
}

const LoginGroup = () => (
  <div className="content" style={divStyle}>
    <div className="container-fluid">
    <div className="row">
    <div className="col-md-6 col-md-offset-3">
      <div className="card">
        <div className="header">
          <h4 className="title">Easy Agenda</h4>
        </div>
        <div className="content">
          <Tabs defaultActiveKey={1} id="plan-text-tabs">
            <Tab eventKey={1} title="Login">
                <LoginForm/>
            </Tab>
            <Tab eventKey={2} title="Cadastro Paciente">
                <CadastroPaciente/>
            </Tab>
            <Tab eventKey={3} title="Cadastro Médico">
                <CadastroMedico/>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
    </div>
  </div>
);

export default LoginGroup;