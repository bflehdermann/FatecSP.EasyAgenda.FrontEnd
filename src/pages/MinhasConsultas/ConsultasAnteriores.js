import React, { useEffect, useState } from "react"
import API from 'components/API'
import moment from 'moment'


const ConsultasAnteriores = () => {

  const [horariosPaciente, setHorarios] = useState([])

  const getHorarioPaciente = () => {
    const { id: idPaciente } = JSON.parse(localStorage.getItem('usuario'))
    API.post(`horarios/paciente`, {
      idPaciente
    }).then(res => {
      setHorarios(res.data.resposta)
    }).catch(e => {
      console.log(e.response.data.errors[0].title + " " + e.response.data.errors[0].message)
    })
  }

  useEffect(() => {
    getHorarioPaciente()
  }, [])


  const mostraConsultas = (horario, index) => {
    let response
    let verHorario = moment(horario.data).format()
    let today = moment(Date()).format()
    if (verHorario <= today) {
      response = <tr key={index}>
        <th className="row">{moment(horario.data).format('DD/MM/YYYY')}</th>
        <td>{horario.hora_inicio}</td>
        <td>{horario.endereco + "    CEP:" + horario.cep + " " + horario.cidade + " - " + horario.estado}</td>
        <td>{"Dr(a) " + horario.nome_medico}</td>
      </tr>
    }
    return response
  }

  return (
    <div className="card">
      <div className="header">
        <h4>Consultas Anteriores</h4>
      </div>
      <div className="content">
        <fieldset>
          <legend>Horários</legend>
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="col">Data</th>
                <th className="col">Horario</th>
                <th className="col">Endereço</th>
                <th className="col">Médico</th>
              </tr>
            </thead>
            <tbody>
              {
                horariosPaciente.map((horario, index) => (
                  mostraConsultas(horario, index)
                )).reverse()
              }
            </tbody>

          </table>
        </fieldset>
      </div>
      
    </div>
  )
}

export default ConsultasAnteriores