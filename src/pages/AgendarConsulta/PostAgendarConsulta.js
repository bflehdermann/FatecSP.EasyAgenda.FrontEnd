import API from "../../components/API"
import { SubmissionError } from "redux-form"
import horariosConsulta from "./horariosConsulta"
const PostAgendarConsulta = (values) => {
    console.log(values)
    const user = JSON.parse(localStorage.getItem('usuario'))
    const id_cliente = user.id
    const { medicoEspecialista: id_medico, horario: hora_inicio, dataDaConsulta: data } = values
    let hora_fim

    if (!hora_inicio)
        throw new SubmissionError({
            _error: "Informe o horario"
        })

    horariosConsulta.map((horario,index)=>{
        if(horario===hora_inicio){
            hora_fim = horariosConsulta[index+1]
        }
    })

    API.post(`horarios/agendar`,{
        id_cliente,id_medico,data,hora_fim,hora_inicio
    }).then(res=>{
        alert("Horário agendado com sucesso")
        window.location.reload()
    }).catch(e => {
        if (e.response !== undefined) {
            throw new SubmissionError({
                _error: ' Erro! ' + e.response.data.errors[0].title + " " + e.response.data.errors[0].message
            })
        }
        throw new SubmissionError({
            _error: 'Informações incorretas, favor verificar',

        })
    })
    
}

export default PostAgendarConsulta