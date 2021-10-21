import {useState} from "react";
import firebase from "firebase";
import {useCollection, useCollectionData} from "react-firebase-hooks/firestore";
import ChatMessage from "./ChatMessage";
import "firebase/firestore";
import Image from "next/image";
import {DotsVerticalIcon, UserCircleIcon} from "@heroicons/react/solid";
import {PaperClipIcon, ArrowSmUpIcon} from "@heroicons/react/outline";
import {useRouter} from "next/router";
import {setIn} from "formik";
import {Message} from "postcss";

const auth = firebase.auth();

const firestore = firebase.firestore();

function ChatRoom({chat, messages}){

    const user = auth.currentUser;

    const router = useRouter()
    const [input, setInput] = useState('');
    const [messagesSnapshot] = useCollection(firebase.firestore().collection('chats').doc(router.query.id).collection('messages').orderBy('timestamp','asc'))

    const showMessages = () => {
        if(messagesSnapshot){
            return messagesSnapshot.docs.map(message => (
                <ChatMessage
                    key={message.id}
                    user={message.data().user}
                    photoURL={message.data().photoURL}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime()
                    }}
                />
            ))
        }
    }

    const sendMessage = (e) => {
        e.preventDefault();
        firebase.firestore().collection('chats').doc(router.query.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL
        });
        setInput('')
    }

    return(
        <div className="py-5 px-2 md:px-10 bg-gray-50 rounded-3xl">
            <p className="bg-yellow-500 p-3">Name</p>
            <style jsx>{`
                .messages{
                    min-height: 90vh
                }
                @media screen and (max-width: 768px){
                    .messages{
                        min-height: 70vh
                    }
                }
          `}</style>
            <div className="messages">
                {showMessages()}
            </div>
            <form onSubmit={sendMessage}>
                <div className="flex justify-between">
                    <div className="inline-flex flex py-2">
                        <PaperClipIcon className="chat-icon"/>
                        <DotsVerticalIcon className="chat-icon" />
                    </div>
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter message" className="outline-none flex-grow bg-blue-400 rounded-full px-3 py-2 placeholder-white text-white"/>
                    <button><ArrowSmUpIcon className="h-9 bg-blue-600 text-white rounded-full text-xs hover:text-blue-600 hover:bg-transparent transition duration-200 active:scale-150"/></button>
                </div>
            </form>
        </div>
    )
}
export default ChatRoom;