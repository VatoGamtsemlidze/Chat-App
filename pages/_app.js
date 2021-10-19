import 'tailwindcss/tailwind.css'
import '../styles/global.css'
import {useAuthState} from "react-firebase-hooks/auth";
import firebase from '../firebase/clientApp'
import Login from "./login";

function MyApp({ Component, pageProps }) {

  const [user] = useAuthState(firebase.auth())

  if(!user) return <Login/>
  console.log(user)

  return <Component {...pageProps} />
}

export default MyApp
