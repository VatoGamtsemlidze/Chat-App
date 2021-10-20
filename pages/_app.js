import 'tailwindcss/tailwind.css'
import '../styles/global.css'
import {useAuthState} from "react-firebase-hooks/auth";
import firebase from '../firebase/clientApp'
import Login from "./login";
import {useRouter} from "next/router";
import {useEffect} from "react";

function MyApp({ Component, pageProps }) {

  const {asPath} = useRouter();

  const [user] = useAuthState(firebase.auth())

  useEffect(() => {
    if(user){
      firebase.firestore().collection('users').doc(user.uid).set({
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL
      }, {merge: true})
    }
    }, [user]);


  if(!user && asPath === '/' || asPath === '/login') return <Login/>  //to redirect to Register

  return <Component {...pageProps} />
}

export default MyApp
