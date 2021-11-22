import React, { useState } from 'react';
import EditMedicoForm from './Medico/EditMedicoForm';
import PutMedico from './Medico/PutMedico';
import EditPacienteForm from './Paciente/EditPacienteForm';
import PutPaciente from './Paciente/PutPaciente';

const UserProfile = () => {

  const [acesso, setAcesso] = useState(localStorage.getItem('acesso'))

  return (

    <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            {
              acesso === 'paciente' &&
              <EditPacienteForm onSubmit={PutPaciente} />
            }
            {
              acesso === 'medico' &&
              <EditMedicoForm onSubmit={PutMedico} />
            }

          </div>
        </div>
      </div>
    </div>
  )
};

export default UserProfile;