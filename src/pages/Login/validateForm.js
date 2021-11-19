const validateForm = values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Informe o email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Email inválido'
    }
    if (!values.senha) {
      errors.senha = 'Informe a senha';
    } else if (values.senha.length < 6) {
      errors.senha = 'A senha precisa ter 6 caracteres ou mais';
    }
    if(!values.confSenha){
        errors.confSenha = 'Confirme a senha'
    }else if(values.confSenha !== values.senha){
        errors.confSenha = 'Senhas não conferem'
    }
    if(!values.nome){
      errors.nome = 'Informe o nome';
    }
    if(!values.crm){
        errors.crm = 'Informe o CRM';
    }else if(values.crm.length !== 9){
        errors.crm='O CRM precisa ter 9 digitos'
    }
    if(!values.endereco){
        errors.endereco = 'Informe o endereço'
    }
    if(!values.cidade){
        errors.cidade = 'Informe a cidade'
    }
    if(!values.estado){
        errors.estado = 'Informe o estado'
    }
    if(!values.cep){
        errors.cep = 'Informe o CEP'
    }else if(values.cep.length !== 8){
        errors.cep = 'O CEP precisa ter 8 digitos'
    }
    if (!values.cpf){
      errors.cpf = 'Informe o CPF'
    }else if (values.cpf.length !== 11){
      errors.cpf = 'O CPF precisa ter 11 digitos'
    }
    if(values.convenio && !values.carteirinhaConvenio)
      errors.carteirinhaConvenio= 'Informe o número da carteira do convenio'
    if(values.convenio && !values.planoConvenio)
      errors.planoConvenio = 'Informe o nome do Convenio'
    return errors;
  };

  export default validateForm