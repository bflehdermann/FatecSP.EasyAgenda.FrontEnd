
import { SubmissionError } from "redux-form";

import API from "../../../components/API"

function PutMedico(values) {

    let { email, senha, nome,crm, endereco, cep, cidade, estado, especialidades:valueEsp } = values

    if(!valueEsp){
        throw new SubmissionError({
            _error: ' Informe a sua Especialidade!'
        })
    }
    const especialidades =[]
    especialidades.push(valueEsp[0])

    return API.put(`medico`, {
        email, senha, nome,crm, endereco, cep, cidade, estado, especialidades
    }).then(res => {
        alert("Medico Atualizado com sucesso")
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('usuario', JSON.stringify(res.data.user))
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

export default PutMedico