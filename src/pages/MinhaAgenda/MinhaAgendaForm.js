import React, { useEffect, useState } from "react"
import { Field, reduxForm } from "redux-form"
import renderField from 'components/FormInputs/renderField'
import API from 'components/API'
import moment from 'moment'
import horariosConsulta from "../AgendarConsulta/horariosConsulta"
import Alert from 'sweetalert-react';

import DatePicker, {
  formatDates,
  normalizeDates,
} from '../../components/DatePicker'


let MinhaAgendaForm = ({
  submitting,
  handleSubmit,
  submitForm,
  error
}) => {
  const [horariosPaciente, setHorarios] = useState([])
  const [boolMostraHora, setBoolMostraHora] = useState(false)
  const [mostraModal, setModal] = useState(false)
  const [dataConsulta, setData] = useState()
  const [horariosConsultaDisponiveis, setHorariosDisponiveis] = useState(horariosConsulta)
  const [modalRelatorio, setModalRelatorio] = useState(false)
  const [relatorioMedico, setRelatorio] = useState('')
  const [horarioAindisponibilizar,setHorarioAIndisponibilizar] = useState()
  const [modalIndispHora, setModalIndispHora] = useState(false)

  const [horarioAdisp, setHoraADisp] = useState()
  const [idHoraADisponibilizar, setIdHoraADisponibilizar] = useState()
  const [modalDispHora, setModalDispHora] = useState(false)

  const getHorarioPaciente = (date) => {
    setData(date)
    let dia = moment(date).format('YYYY-MM-DD')
    const { id: idMedico } = JSON.parse(localStorage.getItem('usuario'))
    API.post(`horarios/disponiveis`, {
      idMedico,
      dia
    }).then(res => {
      setHorarios(res.data)
      setBoolMostraHora(true)
    }).catch(e => {
      console.log(e.response.data.errors[0].title + " " + e.response.data.errors[0].message)
    })
  }

 const chamaFuncIndispConsulta = () =>{
  const { id: id_medico } = JSON.parse(localStorage.getItem('usuario'))
  const hora_inicio = horarioAindisponibilizar
  const data = moment(dataConsulta).format()

  let hora_fim

    horariosConsulta.map((horario,index)=>{
        if(horario===hora_inicio){
            hora_fim = horariosConsulta[index+1]
        }
    })

    if(!hora_fim) hora_fim="17:00:00"

    API.post('horario/indisponivel',{
      id_medico,
      data,
      hora_inicio,
      hora_fim
    }).then(res =>{
      setModalIndispHora(false)
      getHorarioPaciente(dataConsulta)
      
    }).catch(e => {
      console.log(e.response.data.errors[0].title + " " + e.response.data.errors[0].message)
    })

 }
 const chamaFuncDispConsulta = () =>{
    API.delete(`horarios/${idHoraADisponibilizar}`).then(res =>{
      setModalDispHora(false)
      getHorarioPaciente(dataConsulta)
    }).catch(e => {
      console.log(e.response.data.errors[0].title + " " + e.response.data.errors[0].message)
    })

 }


  const abreModalRelatorio = (value) => {
    setRelatorio(value)
    setModalRelatorio(true)
  }

  const abreModalIndisponilizarHorario = (value)=>{
    setHorarioAIndisponibilizar(value)
    setModalIndispHora(true)
  }

  const abreModalDisponilizarHorario = (id, hora)=>{
    setIdHoraADisponibilizar(id)
    setHoraADisp(hora)
    setModalDispHora(true)
  }

  const MostraHorario = (value, index) => {
    let response
    horariosPaciente.map((indisp, index) => {
      if (value === indisp.hora_inicio) {
        response =
          <tr className="info">
            <th className="row" key={index}>{moment(indisp.data).format('DD/MM/YYYY')}</th>
            <td>{value}</td>
            <td>{indisp.nome_paciente}</td>
            <td>
              {indisp.nome_paciente && <div className="btn btn-fill btn-success" onClick={() => abreModalRelatorio(indisp.relatorio_medico)} >Relatório</div>}
              <Alert
                title="Relatório Médico!"
                show={modalRelatorio}
                type="input"
                inputPlaceholder={relatorioMedico}
                onConfirm={() => setModalRelatorio(false)} />
            </td >
            <td>
              {!indisp.nome_paciente && <div className="btn btn-wd btn-success" onClick={() => abreModalDisponilizarHorario(indisp.id,value)} >Disponibilizar</div>}
              <Alert
              title="Você está disponibilizando a data:"
              show={modalDispHora}
              text={`Dia ${moment(dataConsulta).format('DD/MM/YYYY')}, às ${horarioAdisp} horas`}
              showCancelButton
              onConfirm={() => chamaFuncDispConsulta()}
              onCancel={() => setModalDispHora(false)} />
            </td>
          </tr >
      }
    })
    if (!response) {
      response =
        <tr>
          <th className="row" key={index}>{moment(dataConsulta).format('DD/MM/YYYY')}</th>
          <td>{value}</td>
          <td className="text-success">Disponivel</td>
          <td></td>
          <td>
            <div className="btn btn-wd btn-danger" onClick={() => abreModalIndisponilizarHorario(value)}>Indisponibilizar</div>
            <Alert
              title="Você está indisponibilizando a data:"
              show={modalIndispHora}
              text={`Dia ${moment(dataConsulta).format('DD/MM/YYYY')}, às ${horarioAindisponibilizar} horas`}
              showCancelButton
              onConfirm={() => chamaFuncIndispConsulta()}
              onCancel={() => setModalIndispHora(false)} />
        </td>
        </tr >
    }
return response
  }

return (
  <div className="card">
    <div className="header">
      <h4>Minha Agenda</h4>
    </div>
    <div className="content">
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="control-label col-md-3">Selecione a data</label>
          <div className="col-md-9">
            <Field
              name={'dataDaConsulta'}
              component={DatePicker}
              placeholder="Data"
              parse={normalizeDates}
              format={formatDates}
              onChange={getHorarioPaciente}
            />
          </div>
        </div>

        {boolMostraHora &&
          <fieldset>
            <legend>Horários</legend>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th className="col">Data</th>
                  <th className="col">Horario</th>
                  <th className="col">Nome do Paciente</th>
                  <th className="col">Relatório</th>
                  <th className="col">Cancelar Horário</th>
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

MinhaAgendaForm = reduxForm({
  form: 'minhaAgendaForm'
})(MinhaAgendaForm)

export default MinhaAgendaForm