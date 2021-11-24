import React, { useEffect, useState } from "react"
import { Field, reduxForm } from "redux-form"
import renderField from 'components/FormInputs/renderField'
import API from 'components/API'
import moment from 'moment'
import validateAgenda from "./validateAgenda"

import DatePicker, {
    formatDates,
    normalizeDates,
} from '../../components/DatePicker'
import horariosConsulta from "./horariosConsulta"


let AgendarConsultaForm = ({
    submitting,
    handleSubmit,
    submitForm,
    error
}) => {

    const [especialidades, setEspecialidades] = useState([])
    const [showMedicosEspecialistas, setShowMedEsp] = useState(false)
    const [medicoEspecialistas, setMedEsp] = useState([])
    const [idMedicoEsp, setIdMedico] = useState(0)
    const [horariosIndisponiveisPorMedico, setHorarios] = useState([])
    const [horariosConsultaDisponiveis, setHorariosDisponiveis] = useState(horariosConsulta)
    const [boolMostraHora, setBoolMostraHora] = useState(false)

    useEffect(() => {
        API.get('especialidade').then(res => {
            setEspecialidades(res.data)
        }).catch(err => {
            console.log("erro" + err)
        })
    }, [])

    const getMedicosEspecialistas = (value) => {
        API.get(`medico/${value}`).then(res => {
            setMedEsp(res.data)
            setShowMedEsp(true)
        })
    }

    const changeIdMedico = (value) => {
        setIdMedico(value)
    }

    const getHorarioMedico = (date) => {
        let dia = moment(date).format('YYYY-MM-DD')
        let idMedico = idMedicoEsp
        API.post('horarios/disponiveis', {
            dia,
            idMedico
        }).then(res => {
            setHorarios(res.data)
            setBoolMostraHora(true)
        }).catch(e => {
            console.log(e.response.data.errors[0].title + " " + e.response.data.errors[0].message)
        })
    }

    const MostraHorario = (value, index) => {
        let response
        horariosIndisponiveisPorMedico.map((indisp, index) => {
            if (value === indisp.hora_inicio) {
                response =
                    <tr className="danger">
                        <th className="row" key={index}>{value}</th>
                        <td className="text-danger">indisponível</td>
                        <td>
                            <div className="radio-group">
                                <Field
                                    name="horario"
                                    type="radio"
                                    value="off"
                                    disabled
                                    component={renderField} />
                            </div>
                        </td>
                    </tr>
            }
        })
        if (!response) {
            response =
                <tr>
                    <th className="row" key={index}>{value}</th>
                    <td className="text-success">Disponivel</td>
                    <td>
                        <div className="radio-group">
                            <Field
                                name="horario"
                                type="radio"
                                value={value}
                                component={renderField} />
                        </div>
                    </td>
                </tr>
        }
        return response
    }

    return (
        <div className="card">
            <div className="header">
                <h4>Agendar Consulta</h4>
            </div>
            <div className="content">
                <form className="form-horizontal" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="control-label col-md-3">Tipo de Consulta</label>
                        <div className="col-md-9">
                            <Field
                                name="especialidades"
                                type="text"
                                component="select"
                                onChange={(e) => getMedicosEspecialistas(e.target.value)}>
                                <option value={undefined}></option>
                                {especialidades.map(especialidade =>
                                    <option value={especialidade.id} key={especialidade.id}>
                                        {especialidade.nome}
                                    </option>
                                )
                                }
                            </Field>
                        </div>
                    </div>
                    {showMedicosEspecialistas &&
                        <div className="form-group">
                            <label className="control-label col-md-3">Medicos especialistas</label>
                            <div className="col-md-9">
                                <Field
                                    name="medicoEspecialista"
                                    type="text"
                                    component="select"
                                    onChange={(e) => changeIdMedico(e.target.value)}
                                >
                                    <option value={undefined}></option>
                                    {medicoEspecialistas.map(medEspecialista =>
                                        <option value={medEspecialista.id} key={medEspecialista.id}>
                                            {medEspecialista.nome}
                                        </option>
                                    )
                                    }
                                </Field>
                            </div>
                        </div>
                    }
                    {showMedicosEspecialistas &&
                        <div className="form-group">
                            <label className="control-label col-md-3">Data da consulta</label>
                            <div className="col-md-9">
                                <Field
                                    name={'dataDaConsulta'}
                                    component={DatePicker}
                                    placeholder="Data"
                                    parse={normalizeDates}
                                    format={formatDates}
                                    onChange={getHorarioMedico}
                                />
                            </div>
                        </div>
                    }
                    {boolMostraHora &&
                        <fieldset>
                            <legend>Horários</legend>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th className="col">Horario</th>
                                        <th className="col">Disponibilidade</th>
                                        <th className="col">Agendar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        horariosConsultaDisponiveis.map((horario, index) => (
                                            MostraHorario(horario, index)
                                        ))
                                    }
                                </tbody>

                            </table>
                            {error && <strong className="text-danger">{error}</strong>}
                            <br />
                            <button type="submit" className="btn btn-fill btn-success" disabled={submitting} >Agendar</button>
                        </fieldset>}

                </form>
            </div>
        </div>
    )
}

AgendarConsultaForm = reduxForm({
    form: 'agendarConsulta',
    validateAgenda
})(AgendarConsultaForm)

export default AgendarConsultaForm