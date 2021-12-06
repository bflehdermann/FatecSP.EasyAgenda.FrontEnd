import { SubmissionError } from "redux-form";

import API from "../../../components/API"

function PostCadastroMedico(values) {

    let { email, senha, nome,crm, endereco, cep, cidade, estado, especialidades:valueEsp } = values

    if(!valueEsp){
        throw new SubmissionError({
            _error: ' Informe a sua Especialidade!'
        })
    }
    const especialidades =[]
    especialidades.push(valueEsp)

    return API.post(`medico`, {
        email, senha, nome,crm, endereco, cep, cidade, estado, especialidades
    }).then(res => {
        console.log("enviado")
        alert("Medico cadastrado com sucesso")
        window.location.reload()
    }).catch(e => {
        if (e.response !== undefined)
            throw new SubmissionError({
                _error: ' Erro! ' +e.response.data.errors[0].title+ " " + e.response.data.errors[0].message
            })
        throw new SubmissionError({
            _error: 'Informações incorretas, favor verificar',

        })
    })
}

export default PostCadastroMedico