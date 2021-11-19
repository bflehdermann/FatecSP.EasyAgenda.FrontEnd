import React from "react"
import CadastroPaciente from "./CadastroPaciente"
import PostCadastroPaciente from "./PostCadastroPaciente"


const CadastroPacienteForm = () =>{

    return(

                <div className="row">
                    <div className="col-md-12">
                        <CadastroPaciente onSubmit={PostCadastroPaciente}/>
                    </div>
                </div>

    )
}

export default CadastroPacienteForm