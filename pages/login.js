import Head from 'next/head'
import React, {useState} from "react";
import firebase from '../firebase/clientApp'
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {useRouter} from "next/router";
import {useFormik} from "formik";
import {route} from "next/dist/server/router";

const auth = firebase.auth()

const uiConfig = {
    signInSuccessUrl: "/",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
}

export default function Login() {

    const user = auth.currentUser;
    const router = useRouter();
    const [errors, setErrors] = useState({
        emailErr: '',
        passErr: ''
    });
    const formik = useFormik({
        initialValues:{
            email: '',
            password: ''
        },

        onSubmit: values => {
            auth.signInWithEmailAndPassword(values.email,values.password)
                .then(() => router.push({pathname: '/'}))
                .catch(err => {
                    if(err.code === "auth/wrong-password"){
                        setErrors({
                            ...errors,
                            passErr: err.message
                        })
                    }else{
                        setErrors({
                            ...errors,
                            emailErr: err.message
                        })
                    }
                })
        }
    })

    return (
        <div>
                    <Head>
                        <title>Login</title>
                        <link rel="icon" href="/favicon.ico"/>
                    </Head>
                    <div className="flex justify-center mt-10">
                        <div className="p-10 md:p-20 rounded-2xl bg-blue-100">
                            <div>
                                <h1 className="text-4xl text-gray-800 ">Login</h1>
                            </div>
                            <div className="pt-10">
                                <form className="flex flex-col text-lg" onSubmit={formik.handleSubmit}>
                                    <input placeholder="Email" value={formik.values.email} onChange={formik.handleChange} name="email" type="email" className="border-b-2 border-blue-300 outline-none bg-transparent"/>
                                    {typeof errors.emailErr != "undefined" ? <div className="form-error">{errors.emailErr}</div> : null}
                                    <input placeholder="Password"type="password" value={formik.values.password} onChange={formik.handleChange} name="password" className="border-b-2 border-blue-300 bg-transparent outline-none mt-5"/>
                                    {typeof errors.passErr != "undefined" ? <div className="form-error">{errors.passErr}</div> : null}
                                    <button className="bg-blue-400 mt-10 rounded-full text-white hover:shadow-lg hover:scale-105 transition duration-200" type="submit" >Log in</button>
                                    <div className="">
                                        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                                    </div>
                                </form>
                                <div className="pt-2 flex justify-center">
                                    <p className="text-gray-700 cursor-pointer hover:text-blue-400 active:scale-105 transition duration-150" onClick={() => router.push({pathname:'/register'})}>Or Register</p>
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
    )
}
