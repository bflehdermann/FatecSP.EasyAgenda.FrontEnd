import API from "../../components/API"
import horariosConsulta from "./horariosConsulta"
const PostAgendarConsulta = (values) => {
    
    const user = JSON.parse(localStorage.getItem('usuario'))

    const id_cliente = user.id
    const { idMedicoEsp: id_medico, horaDaConsulta: hora_inicio, dataDaConsulta: data } = values
    let hora_fim

    horariosConsulta.map((horario,index)=>{
        if(horario===hora_inicio){
            hora_fim = horariosConsulta[index+1]
        }
    })

    API.post(`horarios/agendar`,{
        id_cliente,id_medico,data,hora_fim,hora_inicio
    }).catch(e => {
      console.log(e)
      console.log(e.response.data.errors[0].title + " " + e.response.data.errors[0].message)

    })
    
}

export default PostAgendarConsulta