import firebase from "firebase";

const auth = firebase.auth()

function ChatMessage({user,message}){


    return(
        <div>
            <p>{message.message}</p>
        </div>
    )
}
export default  ChatMessage