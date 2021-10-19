import {useState} from "react";
import firebase from "firebase";
import {useCollectionData} from "react-firebase-hooks/firestore";
import ChatMessage from "./ChatMessage";
import "firebase/firestore";
import Image from "next/image";
import {DotsVerticalIcon, UserCircleIcon} from "@heroicons/react/solid";
import {PaperClipIcon, ArrowSmUpIcon} from "@heroicons/react/outline";

const auth = firebase.auth();

const firestore = firebase.firestore();

function ChatRoom(){

    const messageRef = firestore.collection('messages');
    const query = messageRef.orderBy('createdAt').limit(25);
    const [formValue, setFormValue] = useState('');

    const [messages] = useCollectionData(query, {idField: 'id'})

    const sendMessage = async(e) => {
        e.preventDefault();
        const {uid, photoURL} = auth.currentUser;
        await messageRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        })
        setFormValue('')
    }


    return(
        <div className="py-5 px-10">
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
                {messages?.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
            </div>
            <form onSubmit={sendMessage}>
                <div className="flex justify-between">
                    <div className="inline-flex flex py-2">
                        <PaperClipIcon className="chat-icon"/>
                        <DotsVerticalIcon className="chat-icon" />
                    </div>
                    <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Enter message" className="outline-none flex-grow bg-blue-400 rounded-full px-3 py-2 placeholder-white text-white"/>
                    <button><ArrowSmUpIcon className="h-9 bg-blue-600 text-white rounded-full text-xs hover:text-blue-600 hover:bg-transparent transition duration-200 active:scale-150"/></button>
                </div>
            </form>
        </div>
    )
}
export default ChatRoom;