import Head from 'next/head'
import React from "react";
import firebase from '../firebase/clientApp'
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const uiConfig = {
    signInSuccessUrl: "/",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
}

export default function Login() {
    return (
        <div>
            <Head>
                <title>Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex justify-center mt-10">
                <div className="p-10 md:p-20 rounded-2xl bg-blue-100">
                    <div>
                        <h1 className="text-4xl text-gray-800 ">Login</h1>
                    </div>
                    <div className="pt-10">
                        <form className="flex flex-col text-lg">
                            <input placeholder="Email" className="border-b-2 border-blue-300 outline-none bg-transparent"/>
                            <input placeholder="Password" className="border-b-2 border-blue-300 bg-transparent outline-none mt-5"/>
                            <button className="bg-blue-400 mt-10 rounded-full text-white hover:shadow-lg hover:scale-105 transition duration-200" type="submit" >Log in</button>
                            <div className="">
                                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                            </div>
                        </form>
                        <div className="pt-2 flex justify-center">
                            <p className="text-gray-700">Or Register</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
