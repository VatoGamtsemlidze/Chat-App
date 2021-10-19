import Head from "next/head";
import React, {useState} from "react";
import {router} from "next/client";
import firebase from "firebase";
import 'firebase/auth'

const auth = firebase.auth()

function Register(){

    const [userData, setUserData] = useState({
        email: '',
        password: '',
    })

    const registerUser = (e) => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(userData.email,userData.password) //error here for tomorrow 
    }


    return(
        <div>
            <Head>
                <title>Register</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex justify-center mt-10">
                <div className="p-10 md:p-20 rounded-2xl bg-blue-100">
                    <div>
                        <h1 className="text-4xl text-gray-800">Register &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
                    </div>
                        <div className="pt-10">
                            <form className="flex flex-col text-lg" onSubmit={registerUser}>
                                <input type="email" value={userData.email} onChange={(e) => setUserData({email:e.target.value})} placeholder="Email" className="form-input"/>
                                <input placeholder="Password" value={userData.password} onChange={(e)=>setUserData({password:e.target.value})} type="password" className="form-input"/>
                                <button className="bg-blue-400 mt-10 rounded-full py-2 text-white hover:shadow-lg hover:scale-105 transition duration-200" type="submit" >Sign Up</button>
                                <div className="">
                                </div>
                            </form>
                            <div className="pt-4 flex justify-center">
                                <p className="text-gray-700">Already a member?<span className="cursor-pointer hover:text-blue-400 active:scale-105 transition duration-150" onClick={() => router.push({pathname:'/login'})}> Sign in</span> </p>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}
export default Register;