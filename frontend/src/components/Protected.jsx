import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import Header from './Header'

function Protected({children}) {
  const navigate = useNavigate()

  useEffect(() => {
    axios.post(`${import.meta.env.VITE_SERVICE_PATH}auth/get-me`, {}, {
      withCredentials: true
    }).then((res) => {
      if (!res.data) {
        navigate('/');
        localStorage.removeItem('login')
      }
    }).catch((err) => {
      navigate('/')
      localStorage.removeItem('login')
    })
  }, [])


  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default Protected
