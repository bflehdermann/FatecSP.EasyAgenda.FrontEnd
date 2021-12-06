import React from "react"
import AgendarConsultaForm from './AgendarConsultaForm'
import PostAgendarConsulta from './PostAgendarConsulta'

const AgendarConsulta = () =>{
    return(
        <div className="col-md-12">
            <AgendarConsultaForm onSubmit={PostAgendarConsulta} />
        </div>
    )
}
export default AgendarConsulta