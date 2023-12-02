import '@/styles/globals.css'
import { getFirestore } from 'firebase/firestore'
import type { AppProps } from 'next/app'
import Image from 'next/image'
import { app } from './api/firebase'


const db = getFirestore(app)

export default function App({ Component, pageProps }: AppProps) {
  return <span>
    <div className='topBar'>
      <Image alt='yo' style={{ marginTop: '6px', marginBottom: '2px', float: 'left' }} width='22' height='22' src={'/assets/logo_simple.svg'} />
      <button className='primary' style={{ float: 'right', marginRight: '0' }}>Log in</button>
      <button className='primary' style={{ float: 'right' }}>Sign up</button>
    </div>

    <Component {...pageProps} />
  </span>
}
