import { useEffect, useState } from 'react'
import conf from './config/conf'
import { Header } from './components/index'
import { Footer } from './components/index'
import { useRecoilState } from 'recoil';
import { loggedInState, userDataState } from './store/store';
import authService from './appwrite/auth';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);

  const [isloggedIn, setIsLoggedIn] = useRecoilState(loggedInState);
  const [userData, setUserData] = useRecoilState(userDataState);
  
  useEffect(() => {
    authService.getCurrentUser()
    .then(res => {
      if (res) {
        setIsLoggedIn(true);
        setUserData(res);
      } else{
        setIsLoggedIn(false);
      }
    })
    .finally(() => setLoading(false));
  })

  return (
    loading ? null :  
    <div className='bg-gray-400 h-screen flex flex-col flex-wrap items-center'>
      <Header></Header>
      <main>
      {/* TODO: <Outlet></Outlet> */}
      </main>
      <Footer></Footer>
    </div>       
    
  )
}

export default App
