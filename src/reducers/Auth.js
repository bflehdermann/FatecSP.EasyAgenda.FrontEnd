const user = JSON.parse(localStorage.getItem('usuario'))
const acesso = localStorage.getItem('acesso')

const defaultUserInfo = {
  nome: !user ? ' Meu Profile' : user.nome,
  email: !user ? ' email@email.com' : user.email,
  cpf: !user ? ' 999.999.999-99' : user.cpf,
  convenio: !user ? true : user.convenio,
  carteirinhaConvenio:!user ? '999999999' : user.carteirinha_convenio,
  validadeConvenio:!user ? '202-12-06' : user.validade_convenio,
  planoConvenio:!user ? 'Meu Plano' : user.plano_convenio,
  image: 'http://demos.creative-tim.com/light-bootstrap-dashboard-pro/assets/img/default-avatar.png',
  type: !acesso ? ' Meu acesso ' : acesso
};

export default function reducer(state = {
  user: defaultUserInfo
}, action) {
  return state;
}