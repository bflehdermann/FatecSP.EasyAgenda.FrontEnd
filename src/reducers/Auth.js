const user = JSON.parse(localStorage.getItem('usuario'))
const acesso = localStorage.getItem('acesso')

const defaultUserInfo = () =>{
  if(acesso === 'paciente'){
    return {
      nome: !user ? ' Meu Profile' : user.nome,
      email: !user ? ' email@email.com' : user.email,
      cpf: !user ? ' 999.999.999-99' : user.cpf,
      convenio: !user ? true : user.convenio,
      carteirinhaConvenio:!user ? '999999999' : user.carteirinha_convenio,
      validadeConvenio:!user ? '202-12-06' : user.validade_convenio,
      planoConvenio:!user ? 'Meu Plano' : user.plano_convenio,
      image: 'http://demos.creative-tim.com/light-bootstrap-dashboard-pro/assets/img/default-avatar.png',
      type: !acesso ? ' Meu acesso ' : acesso
    }
  }
  if(acesso === 'medico'){
    return {
      nome: user.nome,
      email:user.email,
      crm: user.crm,
      endereco: user.endereco,
      cep: user.cep,
      cidade: user.cidade,
      estado: user.estado,
      especialidades: user.especialidades,
      image: 'http://demos.creative-tim.com/light-bootstrap-dashboard-pro/assets/img/default-avatar.png',
      type:  acesso
    }
  }
  return{
    nome:' Meu Profile',
    email:'email@email.com',
    cpf:' 999.999.999-99',
    convenio: true,
    carteirinhaConvenio:'999999999',
    validadeConvenio:'202-12-06',
    planoConvenio:'Meu Plano',
    image: 'http://demos.creative-tim.com/light-bootstrap-dashboard-pro/assets/img/default-avatar.png',
    type:' Meu acesso',
    crm: '77777777777',
    endereco: 'Rua tal 435',
    cep: '000000000',
    cidade: 'São Paulo',
    estado: 'SP',
    especialidades: ['1']
  }
}





export default function reducer(state = {
  user: defaultUserInfo()
}, action) {
  return state;
}