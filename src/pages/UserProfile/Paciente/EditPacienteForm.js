import React, { useEffect, useState } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import renderField from '../../../components/FormInputs/renderField';
import validate from '../validateEditForm'
import { connect } from 'react-redux';
import Alert from 'sweetalert-react';

import DatePicker, {
  formatDates,
  normalizeDates,
} from '../../../components/DatePicker'
import DeletePaciente from './DeletePaciente';


let EditPacienteForm = ({
  error,
  submitting,
  handleSubmit,
  submitForm,
  hasConvenioValue,
  user
}) => {

  const [showModal, setModal] = useState(false)

 const MostrarModalDelete=(value)=>{
      setModal(value)
  }

  return (
    <div className="card">
      <div className="header">
        <h4 className="title">Editar Perfil</h4>
        <div className="content">
          <form onSubmit={handleSubmit}>

            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label className="control-label">Nome Completo</label>
                  <Field
                    name="nome"
                    type="text"
                    value="Rodrigo"
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
                    <label>Carteira do Conv??nio</label>
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
                    <label>Plano do Conv??nio</label>
                    <Field
                      name="planoConvenio"
                      type="text"
                      placeholder="Plano do Conv??nio"
                      component={renderField}
                    />
                  </div>
                </div>
              </div>
            }

            <div className="row">
              <h4 className="title">Altera????o de Senha</h4>
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
                  <label>Confirma????o de Senha</label>
                  <Field
                    name="confSenha"
                    type="password"
                    placeholder="*********"
                    component={renderField} />
                </div>
              </div>
            </div>

            <div className="row">
              {error && <strong className="text-danger">{error}</strong>}
              <br />
              <button type="submit" className="btn btn-fill btn-info col-md-3" disabled={submitting}>Atualizar Cadastro</button>

              <div className="btn btn-danger btn-fill btn-wd col-md-3 col-md-offset-6" onClick={() => MostrarModalDelete(true)}>Excluir Conta</div>
              {
                showModal && console.log(typeof showModal + showModal)
              }
              <Alert
                title="Excluir Conta"
                show={showModal}
                text="Tem certeza que deseja excluir a conta?"
                showCancelButton
                onConfirm={() => DeletePaciente()}
                onCancel={() => MostrarModalDelete(false)} />

            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.Auth.user,
  initialValues: state.Auth.user
});

EditPacienteForm = reduxForm({
  form: 'editPacienteForm',
  validate
})(EditPacienteForm)

const selector = formValueSelector('editPacienteForm')

EditPacienteForm = connect(state => {
  const hasConvenioValue = selector(state, 'convenio')

  const date = selector(state, 'validadeConvenio')
  return {
    hasConvenioValue, date
  }
})(EditPacienteForm)

export default connect(mapStateToProps)(EditPacienteForm)