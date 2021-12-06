import React, { useEffect, useState } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import renderField from '../../../components/FormInputs/renderField';
import validate from '../validateEditForm'
import { connect } from 'react-redux';
import Alert from 'sweetalert-react';
import DeleteMedico from './DeleteMedico';
import API from '../../../components/API'


let EditMedicoForm = ({
    submitting,
    handleSubmit,
    submitForm,
    error
}) => {

    const [especialidades, setEspecialidades] = useState([])
    const [showEspecialidade, setEs] = useState(false)
    const [showModal, setModal] = useState(false)

    const mostraEsp = () => {
        setEs({ showEspecialidade: true })
    }

    
    const MostrarModalDelete=(value)=>{
         setModal(value)
     }

    useEffect(() => {
        API.get('especialidade').then(res => {
            Object.keys(res.data).forEach(key => especialidades.push(res.data[key]))
            mostraEsp()
        }).catch(err => {
            console.log("erro" + err)
        })
    }, [])

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
                                <br/>
                                <Field
                                    name="especialidades"
                                    type="text"
                                    placeholder="Enredeco Residencial"
                                    component="select">
                                    <option value={undefined}></option>
                                    {showEspecialidade && especialidades.map(especialidade =>
                                        <option value={especialidade.id} key={especialidade.id}>
                                            {especialidade.nome}
                                        </option>
                                    )
                                    }
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

                    <div className="row">
                        {error && <strong className="text-danger">{error}</strong>}
                        <br />
                        <button type="submit" className="btn btn-fill btn-info col-md-3" disabled={submitting}>Atualizar Cadastro</button>

                        <div className="btn btn-danger btn-fill btn-wd col-md-3 col-md-offset-6" onClick={() => MostrarModalDelete(true)}>Excluir Conta</div>
                    </div>

                    <Alert
                        title="Excluir Conta"
                        show={showModal}
                        text="Tem certeza que deseja excluir a conta?"
                        showCancelButton
                        onConfirm={() => DeleteMedico()}
                        onCancel={() => MostrarModalDelete(false)} />


                </form>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.Auth.user,
    initialValues: state.Auth.user
});

EditMedicoForm = reduxForm({
    form: 'editMedicoForm',
    validate
})(EditMedicoForm)

const selector = formValueSelector('editMedicoForm')

export default connect(mapStateToProps)(EditMedicoForm)