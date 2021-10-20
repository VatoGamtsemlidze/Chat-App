import Head from "next/head";
import React, {useState} from "react";
import firebase from "firebase";
import 'firebase/auth'
import {useFormik} from "formik";
import {useRouter} from "next/router";

const auth = firebase.auth()

function Register(){

    const router = useRouter();

    const [userData, setUserData] = useState({
        email: '',
        password: '',
    })

    const validate = values => {
        let errors = {};

        if(!values.email){
            errors.email = 'Please enter your email'
        }
        if(!values.password){
            errors.password = 'Enter Password'
        }
        if(values.password.length < 8 && values.password.length != 0){
            errors.password = 'Password must be 8+ characters long'
        }
        return errors;
    }

    const formik = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        validate,
        onSubmit: values => {
            console.log('registered')
            auth.createUserWithEmailAndPassword(values.email, values.password).then(() => router.push({pathname:"/"})).catch(err => alert(err))
        }
    })

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
                            <form className="flex flex-col text-lg" onSubmit={formik.handleSubmit}>
                                <input type="email" value={formik.values.email}
                                       name="email"
                                       onChange={formik.handleChange} placeholder="Email" className="form-input"/>
                                {formik.errors.email && <div className="form-error" >{formik.errors.email}</div>}
                                <input placeholder="Password" value={formik.values.password}
                                       name="password"
                                       onChange={formik.handleChange} type="password" className="form-input"/>
                                {formik.errors.password && <div className="form-error">{formik.errors.password}</div>}
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