import Image from "next/image";
import firebase from "firebase";
import 'firebase/auth'
import getRecipientEmail from "../utils/getRecipientEmail";
import {UserCircleIcon} from "@heroicons/react/solid";
import {useCollection} from "react-firebase-hooks/firestore";
import {useRouter} from "next/router";
const auth = firebase.auth()

function Chat({id, users}){

    const router = useRouter()
    const user = auth.currentUser;
    const [recipientSnapshot] = useCollection(firebase.firestore().collection('users').where('email','==', getRecipientEmail(users,user)))
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(users,user)

    return(
        <div onClick={() => router.push({pathname:`/chat/${id}`})} className="py-3 cursor-pointer hover:bg-gray-200 my-2 rounded-2xl transition duration-200 active:scale-95">
            <div className="px-2 flex align-center">
                {recipient ? (
                    <img className="h-10 rounded-full" src={recipient?.photoURL} alt=""/>
                ) : null}
                {/*<UserCircleIcon className="h-10 text-gray-400" />*/}
                <p className="pt-1 px-2">{recipient?.name}</p>
            </div>
        </div>
    )
}
export default Chat