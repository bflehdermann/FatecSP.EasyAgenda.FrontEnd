import React, { useEffect, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/FormInputs/renderField';
import validate from '../validateForm';
import API from '../../../components/API';


const CadastroMedico = ({
  submitting,
  handleSubmit,
  submitForm,
  error
}) => {

  const [especialidades,setEspecialidades] = useState([])
  const [showEspecialidade,setEs] = useState(false)
  
  const mostraEsp =()=>{
    setEs({showEspecialidade:true})
  }

  useEffect( ()=>{
    API.get('especialidade').then(res=> {
      Object.keys(res.data).forEach(key=>especialidades.push(res.data[key]))
      mostraEsp()
    }).catch(err=>{
      console.log("erro" + err)
    })
  },[])

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
              <div className="form-group form-especialidade">
                <label className="control-label">Especialidade</label>
                <Field
                  name="especialidades"
                  type="text"
                  placeholder="Enredeco Residencial"
                  component="select">
                  <option value={undefined}></option>
                  { showEspecialidade && especialidades.map(especialidade =>
                    <option value={especialidade.id} key={especialidade.id}>
                      {especialidade.nome}
                    </option>
                  )
                  }
                </Field>
              </div>
              <a className="link" HREF="mailto:suporte.easyagenda@gmail.com?Subject=Cadastro%20de%20especialidade&Body=Ol%E1%2C%20desejo%20solicitar%20o%20cadastro%20das%20seguintes%20especialidades%3A%0A%0A">Não achou a sua especialidade? Solicite o cadastro aqui.</a>
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
          {error && <strong className="text-danger">{error}</strong>}
          <br/>
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