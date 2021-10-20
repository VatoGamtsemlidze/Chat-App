import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import ChatRoom from "../../components/ChatRoom";
import firebase from "firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";

const auth = firebase.auth()

function Chat({chat, messages}){

    const user = auth.currentUser;

    return(
        <div>
            <Head>
                <title>Chat with {getRecipientEmail(chat.users, user)}</title>
            </Head>
            <div className="grid grid-cols-1 md:grid-cols-2 overflow-scroll">
                <Sidebar/>
                <ChatRoom chat={chat} messages={messages} />
            </div>
        </div>
    )
}
export default Chat;

export async function getServerSideProps(context){

    const ref = firebase.firestore().collection ('chats').doc(context.query.id);

    const messageRes = await ref.collection('messages').orderBy('timestamp','asc').get();

    const messages = messageRes.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })).map(messages => ({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime()
    }))

    const chatRes = await ref.get()

    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    }
    return{
        props:{
            messages: JSON.stringify(messages),
            chat: chat
        }
    }
}