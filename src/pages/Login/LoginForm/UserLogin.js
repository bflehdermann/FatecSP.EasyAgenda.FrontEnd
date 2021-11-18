import React from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/FormInputs/renderField';
import validate from '../validateForm';


const UserLogin = ({
  error,
  submitting,
  handleSubmit,
  submitForm
}) => (
  <div className="card">
    <div className="header">
      <h4>Login</h4>
    </div>
    <div className="content">
      <form onSubmit={handleSubmit}>

        <div className="row">
          <div className="col-md-2">
            <div className="radio-group">
              <Field
                name="acesso"
                type="radio"
                value="paciente"
                label="Paciente"
                component={renderField} />
            </div>
          </div>
          <div className="col-md-2">
            <div className="radio-group">
              <Field
                name="acesso"
                type="radio"
                value="medico"
                label="Medico"
                component={renderField} />
            </div>
          </div>
        </div>


        <div className="form-group">
          <label className="control-label">Email</label>
          <Field
            name="email"
            type="email"
            component={renderField} />
        </div>

        <div className="form-group">
          <label className="control-label">Senha</label>
          <Field
            name="senha"
            type="password"
            component={renderField} />
        </div>
        {error && <strong className="text-danger">{error}</strong>}
        <br />
        <button type="submit" className="btn btn-fill btn-info" disabled={submitting} >Acessar</button>
      </form>
    </div>
  </div>
);



export default reduxForm({
  form: 'userLogin',
  validate
})(UserLogin)