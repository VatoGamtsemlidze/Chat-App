import Head from 'next/head'
import Sidebar from "../components/Sidebar";
import ChatRoom from "../components/ChatRoom";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
      </Head>
        <section className="grid grid-cols-1 md:grid-cols-2 ">
            <Sidebar/>
        </section>
    </div>
  )
}
