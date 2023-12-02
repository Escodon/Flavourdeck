import '@/styles/globals.css'
import { getFirestore } from 'firebase/firestore'
import type { AppProps } from 'next/app'
import Image from 'next/image'
import Link from 'next/link'
import { app } from './api/firebase'
import { signIn } from './api/users'

if (signIn) { var buttonsMsg = 'Log out' } else { var buttonsMsg = 'Log in' }

const db = getFirestore(app)

export default function App({ Component, pageProps }: AppProps) {
  return <span>
       <div className='topBar'>
      <Image alt='yo' style={{ marginTop: '6px', marginBottom: '2px', float: 'left' }} width='22' height='22' src={'/assets/logo_simple.svg'} />
      <Link href="/login">
        <button className='primary' style={{ float: 'right', marginRight: '0' }} >{buttonsMsg}</button>
      </Link>
      <button className='primary' style={{ float: 'right' }}>Sign up</button>
    </div>

    <Component {...pageProps} />
  </span>
}
