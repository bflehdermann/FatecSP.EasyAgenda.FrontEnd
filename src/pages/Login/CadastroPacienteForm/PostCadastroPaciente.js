import axios from "axios";
import { SubmissionError } from "redux-form";

function PostCadastroPaciente(values) {

    let { email, senha, nome, cpf, convenio, carteirinhaConvenio, validadeConvenio, planoConvenio } = values

    if (!convenio)
        convenio = false

    return axios.post(`http://localhost:3500/api/paciente`, {
        email, senha, nome, cpf, convenio, carteirinhaConvenio, validadeConvenio, planoConvenio
    }).then(res => {
        console.log("enviado")
        alert("Sucesso")
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