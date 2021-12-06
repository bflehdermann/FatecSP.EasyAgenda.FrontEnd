const user = JSON.parse(localStorage.getItem('usuario'))
const acesso = localStorage.getItem('acesso')

const defaultUserInfo = () =>{
  if(acesso === 'paciente'){
    return {
      nome: user.nome,
      email:  user.email,
      cpf: user.cpf,
      convenio: user.convenio,
      carteirinhaConvenio: user.carteirinha_convenio,
      validadeConvenio: user.validade_convenio,
      planoConvenio: user.plano_convenio,
      image: 'https://img1.gratispng.com/20180715/czj/kisspng-avatar-computer-icons-blog-management-sina-weibo-avatar-woman-5b4b6c23becb42.2363834815316695397815.jpg',
      type: acesso
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
      image: 'https://img1.gratispng.com/20180719/zgr/kisspng-king-street-dental-centre-medicine-physician-compu-sunraise-5b50e4051a0109.8091125315320279091065.jpg',
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
    image: 'https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png',
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