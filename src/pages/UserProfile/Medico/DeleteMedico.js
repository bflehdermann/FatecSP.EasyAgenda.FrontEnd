import API from "../../../components/API"
import { SubmissionError } from "redux-form"

function DeleteMedico(){
    API.delete('medico').then(res=>{
        localStorage.clear()
        window.location.reload()
    }).catch(e => {
        if (e.response !== undefined) {
            console.log(e.response)
            throw new SubmissionError({
                _error: ' Erro! ' + e.response.data.errors[0].title + " " + e.response.data.errors[0].message
            })
        }
        throw new SubmissionError({
            _error: 'Erro ao deletar Conta',

        })
    })
}

export default DeleteMedico