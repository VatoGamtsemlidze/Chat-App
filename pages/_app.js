import 'tailwindcss/tailwind.css'
import '../styles/global.css'
import {useAuthState} from "react-firebase-hooks/auth";
import firebase from '../firebase/clientApp'
import Login from "./login";
import {useRouter} from "next/router";

function MyApp({ Component, pageProps }) {

  const {asPath} = useRouter();

  const [user] = useAuthState(firebase.auth())


  if(!user && asPath === '/' || asPath === '/login') return <Login/>  //to redirect to Register

  return <Component {...pageProps} />
}

export default MyApp
