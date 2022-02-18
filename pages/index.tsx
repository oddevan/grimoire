import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import User from "../components/User";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Grimoire</title>
        <meta name="description" content="A TCG management app by oddEvan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Grimoire</h1>
      <p>A TCG management app by <Link href={'https://www.oddevan.com/'}>oddEvan</Link>.</p>
      <User/>
    </div>
  )
}

export default Home
