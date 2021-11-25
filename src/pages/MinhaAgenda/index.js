import React from "react"
import MinhaAgendaForm from "./MinhaAgendaForm"

const MinhaAgenda=()=>{
    return(
        <div>
            <MinhaAgendaForm onSubmit={e=>alert(e)}/>
        </div>
    )
}

export default MinhaAgenda