import React from "react"
import CadastroMedico from "./CadastroMedico"
import PostCadastroMedico from "./PostCadastroMecido"

const CadastroMedicoForm = () => {

    return (
        <div className="row">
            <div className="col-md-12">
                <CadastroMedico onSubmit={PostCadastroMedico} />
            </div>
        </div>

    )
}

export default CadastroMedicoForm