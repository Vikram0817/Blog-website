import React from 'react';
import authService from '../../appwrite/auth';
import { loggedInState } from '../../store/store';
import { useRecoilState } from 'recoil';

function LogoutButton(props) {
    const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);
    function logout(){
        authService.logout()
        .then((res) => {
            if(res){
                setLoggedIn(false);
            }else{
                alert("Unable to logout")
            }
        })
        .catch(err => alert(err))
    }
    return (
        <button
        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={logoutHandler}
        >Logout</button>
    );
}

export default LogoutButton;