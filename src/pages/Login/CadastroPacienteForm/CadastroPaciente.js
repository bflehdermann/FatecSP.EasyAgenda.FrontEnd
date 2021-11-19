import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import renderField from 'components/FormInputs/renderField';
import validate from '../validateForm';
import { connect } from 'react-redux';

import DatePicker, {
  formatDates,
  normalizeDates,
} from '../../../components/DatePicker'


let CadastroPaciente = ({
  error,
  submitting,
  handleSubmit,
  submitForm,
  hasConvenioValue
}) => (

  <div className="card">
    <div className="content">
      <form onSubmit={handleSubmit}>

        <div className="row">

          <div className="col-md-4">
            <div className="form-group">
              <label className="control-label">Nome Completo</label>
              <Field
                name="nome"
                type="text"
                placeholder="Mike Baungartner"
                component={renderField} />
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <label className="control-label">CPF</label>
              <Field
                name="cpf"
                type="number"
                placeholder="999.999.999-99"
                component={renderField} />
            </div>
          </div>

          <div className="col-md-4">
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
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="convenio">Possui Convenio ?</label>
              <div>
                <Field
                  name="convenio"
                  id="convenio"
                  type="checkbox"
                  component="input" />
              </div>
            </div>
          </div>
        </div>
        {hasConvenioValue &&
          <div className="row">

            <div className="col-md-4">
              <label className="control-label">Validade</label>
              <div className="form-group">
                <Field
                  name={'validadeConvenio'}
                  component={DatePicker}
                  placeholder="Validade"
                  parse={normalizeDates}
                  format={formatDates}
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label>Carteira do Convênio</label>
                <Field
                  name="carteirinhaConvenio"
                  type="number"
                  placeholder="9999999999"
                  component={renderField}
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label>Plano do Convênio</label>
                <Field
                  name="planoConvenio"
                  type="text"
                  placeholder="Plano do Convênio"
                  component={renderField}
                />
              </div>
            </div>
          </div>
        }

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Senha</label>
              <Field
                name="senha"
                type="password"
                placeholder="*********"
                component={renderField} />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Confirmação de Senha</label>
              <Field
                name="confSenha"
                type="password"
                placeholder="*********"
                component={renderField} />
            </div>
          </div>
        </div>

        {error && <strong className="text-danger">{error}</strong>}
        <br />
        <button type="submit" className="btn btn-fill btn-info" disabled={submitting}>Cadastrar</button>
      </form>
    </div>
  </div>
)



CadastroPaciente = reduxForm({
  form: 'cadastroPacienteForm',
  validate
})(CadastroPaciente)

const selector = formValueSelector('cadastroPacienteForm')

CadastroPaciente = connect(state => {
  const hasConvenioValue = selector(state, 'convenio')

  const date = selector(state, 'validadeConvenio')

  return {
    hasConvenioValue, date
  }
})(CadastroPaciente)

export default CadastroPaciente