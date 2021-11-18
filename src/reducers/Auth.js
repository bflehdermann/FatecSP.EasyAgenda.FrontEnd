const user = JSON.parse(localStorage.getItem('usuario'))
const acesso = localStorage.getItem('acesso')

const defaultUserInfo = {
  name: !user ? ' ' : user.nome,
  image: 'http://demos.creative-tim.com/light-bootstrap-dashboard-pro/assets/img/default-avatar.png',
  type: !acesso ? ' ' : acesso
};

export default function reducer(state = {
  user: defaultUserInfo
}, action) {
  return state;
}