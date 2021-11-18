import axios from "axios";
import { SubmissionError } from "redux-form";


function PostLoginUser(values) {
    const { email, senha,acesso } = values
    if(!acesso){
        throw new SubmissionError({
            _error: 'Informe o tipo de acesso!',

        })
    }
    return axios.post(`http://localhost:3500/api/${values.acesso}/login`, {
        email, senha
    }).then(res => {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('usuario', JSON.stringify(res.data.user))
        localStorage.setItem('acesso',acesso)
        window.location.reload()
    }).catch(e => {
        console.log(e)
        throw new SubmissionError({
            _error: 'Usuário ou senha incorreto!',

        })
    })
}
export default PostLoginUser