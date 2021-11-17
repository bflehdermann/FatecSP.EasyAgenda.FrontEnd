import React from "react"
import CadastroPaciente from "./CadastroPaciente"


const CadastroPacienteForm = () =>{

    return(

                <div className="row">
                    <div className="col-md-12">
                        <CadastroPaciente onSubmit={values => alert('Enter values: ' + JSON.stringify(values, null, 2))}/>
                    </div>
                </div>

    )
}

export default CadastroPacienteForm