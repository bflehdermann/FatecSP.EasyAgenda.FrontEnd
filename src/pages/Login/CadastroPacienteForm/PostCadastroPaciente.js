import { SubmissionError } from "redux-form";

import API from "../../../components/API"

function PostCadastroPaciente(values) {

    let { email, senha, nome, cpf, convenio, carteirinhaConvenio, validadeConvenio, planoConvenio } = values

    if (!convenio)
        convenio = false

    return API.post(`paciente`, {
        email, senha, nome, cpf, convenio, carteirinhaConvenio, validadeConvenio, planoConvenio
    }).then(res => {
        console.log("enviado")
        alert("Usuário cadastrado com sucesso")
        window.location.reload()
    }).catch(e => {
        if (e.response !== undefined)
            throw new SubmissionError({
                _error: ' Erro! ' + e.response.data.errors[0].message
            })
        throw new SubmissionError({
            _error: 'Informações incorretas, favor verificar',

        })
    })
}

export default PostCadastroPaciente