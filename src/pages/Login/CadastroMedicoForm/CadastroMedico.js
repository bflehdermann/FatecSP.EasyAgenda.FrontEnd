import React from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/FormInputs/renderField';
import validate from '../validateForm';

const especialidades = [
  {
    "id": 1,
    "nome": "DENTISTA"
  },
  {
    "id": 2,
    "nome": "CARDIOLOGISTA"
  },
  {
    "id": 3,
    "nome": "OFTALMOLOGISTA"
  },
  {
    "id": 6,
    "nome": "PODOLOGO"
  },
  {
    "id": 7,
    "nome": "ORTOPEDISTA"
  }
]

const CadastroMedico = ({
  submitting,
  handleSubmit,
  submitForm
}) => {

  return (
    <div className="card">
      <div className="content">
        <form onSubmit={handleSubmit}>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">Nome Completo</label>
                <Field
                  name="nome"
                  type="text"
                  placeholder="Mike Baungartner"
                  component={renderField} />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">Email</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="email@email.com"
                  component={renderField} />
              </div>
            </div>
          </div>


          <div className="row">

            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">CRM</label>
                <Field
                  name="crm"
                  type="text"
                  placeholder="0000000000"
                  component={renderField} />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">Especialidade</label>
                <Field
                  name="especialidades"
                  type="text"
                  placeholder="Enredeco Residencial"
                  component="select">
                  <option value=" "></option>
                  {especialidades.map(especialidade =>
                    <option value={especialidade.id} key={especialidade.id}>
                      {especialidade.nome}
                    </option>
                  )}
                </Field>
              </div>
            </div>
          </div>


          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label className="control-label">Endereço</label>
                <Field
                  name="endereco"
                  type="text"
                  placeholder="Enredeco Residencial"
                  component={renderField} />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label">Cidade</label>
                <Field
                  name="cidade"
                  type="text"
                  placeholder="Recife"
                  component={renderField} />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label">Estado</label>
                <Field
                  name="estado"
                  type="text"
                  placeholder="Pernanbuco"
                  component={renderField} />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label">CEP</label>
                <Field
                  name="cep"
                  type="number"
                  placeholder="00000-000"
                  component={renderField} />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">Senha</label>
                <Field
                  name="senha"
                  type="password"
                  placeholder="*********"
                  component={renderField} />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">Confirmação de Senha</label>
                <Field
                  name="confSenha"
                  type="password"
                  placeholder="*********"
                  component={renderField} />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-fill btn-info" disabled={submitting} >Cadastrar</button>
        </form>
      </div>
    </div>
  )
}

export default reduxForm({
  form: 'cadastroMedicoForm',
  validate
})(CadastroMedico)