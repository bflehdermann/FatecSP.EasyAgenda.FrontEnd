const Auth = () =>{
  const verifyLogin = localStorage.getItem('token')

  return verifyLogin ? true : false
}

export default {Auth}