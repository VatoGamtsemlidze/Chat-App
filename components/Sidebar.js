import {UserCircleIcon, ChatAltIcon} from "@heroicons/react/solid";
import {LogoutIcon, SearchIcon} from "@heroicons/react/outline";
import firebase from "firebase";
import 'firebase/auth'
import * as EmailValidator from 'email-validator'
import {useCollection} from "react-firebase-hooks/firestore";
import Chat from "./Chat";
import {useRouter} from "next/router";
const auth = firebase.auth();

function Sidebar(){

    const router = useRouter()
    const user = auth.currentUser
    const userChatRef = user && firebase.firestore().collection('chats').where('users', 'array-contains', user.email) ;
    const [chatsSnapshot] = useCollection(userChatRef)

    const createChat = () => {
        const input = prompt('Please enter an email address of the user you want to chat with')

        if(!input) return null;

        if(EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email){
            console.log('passed')
            firebase.firestore().collection('chats').add({
                users: [user.email, input]

            })
        }

    }

    const chatAlreadyExists = (existedEmail) =>
        !!chatsSnapshot?.docs.find(
            chat => chat.data().users.find(user => user === existedEmail)?.length > 0
        )


    return(
        <div className="px-2 py-5 ">
            <div className="flex justify-between pb-5 border-b-2">
                <div className="flex">
                    <img className="h-10 rounded-full" src={user ? user.photoURL : null} alt=""/>
                    <p className="cursor-pointer font-semibold pt-1 hover:scale-105 hover:text-blue-300 transition duration-200 px-2">{user?.displayName}</p>
                </div>
                    <div className="flex ">
                        <ChatAltIcon  className="icon"/>
                        <LogoutIcon onClick={() => {
                            router.push({pathname:'/login'})
                            auth.signOut()
                        }} className="icon"/>
                     </div>
            </div>
            <div className="flex pt-5">
                <SearchIcon className="h-7 hover:scale-110 text-gray-500 cursor-pointer transition duration-200 ease-in-out "/>
                <input placeholder="Search in chats" className="pl-2 outline-none flex-grow"/>
            </div>
            <div className="flex pt-3">
                <button onClick={createChat} className="bg-blue-400 flex-grow text-white rounded-full py-3 active:scale-95 transition duration-200 hover:shadow-lg" >Start a new chat</button>
            </div>
        {/*List of chats*/}
            {chatsSnapshot?.docs.map(chat => (
                <Chat key={chat.id} id={chat.id} users={chat.data().users}/>
            ))}
        </div>
    )
}
export default Sidebar