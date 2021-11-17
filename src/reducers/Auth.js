const defaultUserInfo = {
  name: 'Rodrigo Santos',
  image: 'http://demos.creative-tim.com/light-bootstrap-dashboard-pro/assets/img/default-avatar.png',
  type: 'Paciente'
};

export default function reducer(state = {
  user: defaultUserInfo
}, action) {
  return state;
}