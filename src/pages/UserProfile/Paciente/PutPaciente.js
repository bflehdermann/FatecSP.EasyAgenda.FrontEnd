
import { SubmissionError } from "redux-form";

import API from "../../../components/API"

function PutPaciente(values) {
    console.log(values)
    let { email, senha, nome, cpf, convenio, carteirinhaConvenio, validadeConvenio, planoConvenio } = values
    if (!convenio)
        convenio = false

    return API.put(`paciente`, {
        email, senha, nome, cpf, convenio, carteirinhaConvenio, validadeConvenio, planoConvenio
    }).then(res => {
        alert("Paciente Atualizado com sucesso")
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

export default PutPaciente