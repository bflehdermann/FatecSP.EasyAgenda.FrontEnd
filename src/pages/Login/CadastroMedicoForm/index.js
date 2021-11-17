import React from "react"
import CadastroMedico from "./CadastroMedico"

const CadastroMedicoForm = () => {

    return (
        <div className="row">
            <div className="col-md-12">
                <CadastroMedico onSubmit={values => alert('Enter values: ' + JSON.stringify(values, null, 2))} />
            </div>
        </div>

    )
}

export default CadastroMedicoForm