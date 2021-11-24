const validateAgenda = values => {
    const errors = {};
    if (!values.horario)
      errors.email = 'Informe o horario';
    return errors;
  };
  export default validateAgenda