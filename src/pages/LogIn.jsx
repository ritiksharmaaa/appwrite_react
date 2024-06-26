import React from 'react'
import { Login  as loginComponent } from '../components/Login'


function Login() {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const handleOpenLogin = () => {
    setIsLoginVisible(true);
  };

  const handleCloseLogin = () => {
    setIsLoginVisible(false);
  };
  return (
    <div className='py-8'>
            {isLoginVisible && <loginComponent callback={handleCloseLogin} />}

    
    </div>
  )
}

export default Login