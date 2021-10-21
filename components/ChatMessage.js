import firebase from "firebase";
import getRecipientEmail from "../utils/getRecipientEmail";
import {useCollection} from "react-firebase-hooks/firestore";

const auth = firebase.auth()

function ChatMessage({user,message,photoURL}){

    const isCurrentUsersMessage = auth.currentUser?.email === user;

    return(
        <div className={isCurrentUsersMessage ? "bg-blue-200 my-2 p-3 flex justify-end" : "bg-gray-300 my-2 p-3 "}>
                {isCurrentUsersMessage ?
                    <div className="flex">
                        <p className="px-4 py-2 " >{message.message}</p>
                        <img className="h-10 rounded-full" src={photoURL} alt=""/>
                    </div>
                    :
                    <div className="flex">
                        <img className="h-10 rounded-full" src={photoURL} alt=""/>
                        <p className="px-4 py-2">{message.message}</p>
                    </div>
                }
        </div>
    )
}
export default  ChatMessage