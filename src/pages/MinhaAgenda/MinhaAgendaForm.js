import React, { useEffect, useState } from "react"
import { Field, reduxForm } from "redux-form"
import renderField from 'components/FormInputs/renderField'
import API from 'components/API'
import moment from 'moment'
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

  const getHorarioPaciente = (date) => {
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
                  </tr>
                </thead>
                <tbody>
                  {
                    horariosPaciente.map((horario, index) => (
                      <tr key={index}>
                        <th className="row">{moment(horario.data).format('DD/MM/YYYY')}</th>
                        <td>{horario.hora_inicio}</td>
                        <td>{horario.nome_paciente}</td>
                      </tr>
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