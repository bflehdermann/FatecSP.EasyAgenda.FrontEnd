import React, { useEffect, useState } from "react"
import { Field, reduxForm } from "redux-form"
import API from 'components/API'
import moment from 'moment'
import Alert from 'sweetalert-react';

import DatePicker, {
    formatDates,
    normalizeDates,
} from '../../components/DatePicker'
import horariosConsulta from "./horariosConsulta"
import PostAgendarConsulta from "./PostAgendarConsulta"


let AgendarConsultaForm = ({
}) => {

    const [especialidades, setEspecialidades] = useState([])
    const [showMedicosEspecialistas, setShowMedEsp] = useState(false)
    const [medicoEspecialistas, setMedEsp] = useState([])
    const [idMedicoEsp, setIdMedico] = useState(0)
    const [dataDaConsulta,setData] = useState('')
    const [horaDaConsulta,setHoraConsulta] = useState('')

    const [horariosIndisponiveisPorMedico, setHorarios] = useState([])
    const [horariosConsultaDisponiveis, setHorariosDisponiveis] = useState(horariosConsulta)
    const [boolMostraHora, setBoolMostraHora] = useState(false)
    const [mostraModal, setModal] = useState(false)
    const [showSuccessAlert, setModalSuccess] = useState(false)
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

    const abreModalEmantemOHorario=(value)=>{
      setHoraConsulta(value)
      setModal(true)
    }

    const chamaFuncAgendarConsulta=()=>{
      const values = {idMedicoEsp,dataDaConsulta,horaDaConsulta}
      PostAgendarConsulta(values),setModalSuccess(true)
    }

    const getHorarioMedico = (date) => {
        let dia = moment(date).format('YYYY-MM-DD')
        setData(dia)
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

    const fechamodalConfirmacaoErecarrega=()=>{
      setModal(false)
      setModalSuccess(false)
      getHorarioMedico(dataDaConsulta)
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
                        <button className="btn btn-fill btn-default disabled" >Agendar</button>
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
                    <div className="btn btn-fill btn-success" key={index} onClick={()=>abreModalEmantemOHorario(value)}>Agendar</div>
                    <Alert
                          title="Você está agendando para:"
                          show={mostraModal}
                          text= {`Dia ${moment(dataDaConsulta).format('DD/MM/YYYY')}, às ${horaDaConsulta} horas`}
                          showCancelButton
                          onConfirm={() => chamaFuncAgendarConsulta()}
                          onCancel={() => setModal(false)} />
                    <Alert
                          title="Consulta Agendada!"
                          show={showSuccessAlert}
                          text="Compareça no consultório com 15 minutos de antecedência"
                          type="success"
                          onConfirm={() => fechamodalConfirmacaoErecarrega()} />
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
                <form className="form-horizontal">
                    <div className="form-group ">
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
                            
                        </fieldset>}

                </form>
            </div>
        </div>
    )
}

AgendarConsultaForm = reduxForm({
  form: 'agendarConsultaForm'
})(AgendarConsultaForm)

export default AgendarConsultaForm