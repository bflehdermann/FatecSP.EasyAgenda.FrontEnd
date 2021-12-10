import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import CadastroMedico from './CadastroMedicoForm';
import CadastroPaciente from './CadastroPacienteForm';
import LoginForm from './LoginForm';

const logoStyle = {
  fontFamily: ['Rock Salt', 'cursive'],
  fontSize: '35px'
}

const LoginGroup = () => (
  <div className="content bg-login">
    <div className="container-fluid" >
      <div className="row login">
        <div className="col-md-6 col-md-offset-3">
          <div className="card">
            <div className="header">
              <h4 className="title" style={logoStyle}>Easy Agenda</h4>
            </div>
            <div className="content">
              <Tabs defaultActiveKey={1} id="plan-text-tabs">
                <Tab eventKey={1} title="Login">
                  <LoginForm />
                </Tab>
                <Tab eventKey={2} title="Cadastro Paciente">
                  <CadastroPaciente />
                </Tab>
                <Tab eventKey={3} title="Cadastro Médico">
                  <CadastroMedico />
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