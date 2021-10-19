import {UserCircleIcon, ChatAltIcon} from "@heroicons/react/solid";
import {DotsVerticalIcon, LogoutIcon, SearchIcon} from "@heroicons/react/outline";
import * as EmailValidator from 'email-validator'
import firebase from "firebase";
import 'firebase/auth'

const auth = firebase.auth();

function Sidebar(){

    const createChat = () => {
        const input = prompt('Please enter an email address of the user you want to chat with')

        if(!input) return null;

        if(EmailValidator.validate(input)){
            //add chat with email to Database
        }

    }

    return(
        <div className="px-2 py-5 ">
            <div className="flex justify-between pb-5 border-b-2">
                <UserCircleIcon className="icon"/>
                <p>{}</p>
                <div className="flex ">
                    <ChatAltIcon  className="icon"/>
                    <LogoutIcon onClick={() => auth.signOut()} className="icon"/>
                    {/*<DotsVerticalIcon className="icon"/>*/}
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
        </div>
    )
}
export default Sidebar