import React, { useEffect, useState } from "react"
import API from 'components/API'
import moment from 'moment'
import Alert from 'sweetalert-react';


const ProximasConsultas = () => {

  const [horariosPaciente, setHorarios] = useState([])
  const [mostraModal, setModal] = useState(false)
  const [showDeleteSuccessAlert, setModalDel] = useState(false)
  const [horarioId, setHorarioId] = useState(0)

  const getHorarioPaciente = () => {
    const { id: idPaciente } = JSON.parse(localStorage.getItem('usuario'))
    API.post(`horarios/paciente`, {
      idPaciente
    }).then(res => {
      setHorarios(res.data.resposta)
      console.log("passou")
    }).catch(e => {
      console.log(e)
      console.log(e.response.data.errors[0].title + " " + e.response.data.errors[0].message)
    })
  }

  const deletarConsulta = (id) => {
    API.delete(`horarios/${id}`).then(res => {
      setModalDel(true)
    }).catch(e => {
      console.log(e)
      console.log(e.response.data.errors[0].title + " " + e.response.data.errors[0].message)
    })
  }

  useEffect(() => {
    getHorarioPaciente()
  }, [])

  const abreOmodalDeConfirmacao = (value) => {
    setHorarioId(value)
    setModal(true)
  }

  const fechaOsModaisErecarrega = () => {
    setModalDel(false)
    setModal(false)
    getHorarioPaciente()
  }



  const mostraConsultas = (horario, index) => {
    let response
    let verHorario = moment(horario.data).format()
    let today = moment(Date()).format()
    if (verHorario >= today) {
      response = <tr key={index}>
        <th className="row">{moment(horario.data).add(1, 'day').format('DD/MM/YYYY')}</th>
        <td>{horario.hora_inicio}</td>
        <td>{horario.endereco + "    CEP:" + horario.cep + " " + horario.cidade + " - " + horario.estado}</td>
        <td>{"Dr(a) " + horario.nome_medico}</td>
        <td>
          <div type="button" className="btn btn-wd btn-danger" key={index} onClick={() => abreOmodalDeConfirmacao(horario.id)} >
            Cancelar Consulta
          </div>
          <Alert
            title="Você tem certeza?"
            show={mostraModal}
            text="A consulta será excluída da sua agenda!"
            showCancelButton
            onConfirm={() => deletarConsulta(horarioId)}
            onCancel={() => setModal(false)} />

          <Alert
            title="Deleted"
            show={showDeleteSuccessAlert}
            text="Consulta excluída."
            type="success"
            onConfirm={() => fechaOsModaisErecarrega()} />
        </td>
      </tr>
    }
    return response
  }

  return (
    <div className="card">
      <div className="header">
        <h4>Próximas Consultas</h4>
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
                <th className="col">Observação</th>
              </tr>
            </thead>
            <tbody>
              {
                horariosPaciente.map((horario, index) => (
                  mostraConsultas(horario, index)
                ))
              }
            </tbody>

          </table>
        </fieldset>
      </div>
    </div>
  )
}

export default ProximasConsultas