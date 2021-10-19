import firebase from "firebase";
import Image from "next/image";
const auth = firebase.auth();

function ChatMessage({message}){

    const {text, uid, photoURL} = message;

    const isCurrentUser = uid === auth.currentUser.uid;
    // const isCurrentUser = false

    const messageClass = isCurrentUser ? 'sent' : 'received';
    return(
        <div className={isCurrentUser ? "relative my-2 mx-3 rounded-full bg-blue-300 p-3" : "relative my-2 mx-3 rounded-full bg-gray-300 p-3"}>
            <Image src={photoURL} alt="" className="" layout="fill" className="rounded-fulls" objectPosition={isCurrentUser ? "right" : "left"} objectFit="contain"/>
            <div className={isCurrentUser ? "" : "flex flex-col items-end"}>
                <p>{text}</p>
                <p className={isCurrentUser ? "text-xs text-blue-500" : "text-xs text-gray-500"} >{messageClass}</p>
            </div>
        </div>
    )
}
export default ChatMessage