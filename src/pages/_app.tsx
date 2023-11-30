import '@/styles/globals.css'
import Image from 'next/image'
import type { AppProps } from 'next/app'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const app = initializeApp({
  apiKey: "AIzaSyCULbynJeWjxxxV6LMdviRPACXH-xD3Au0",
  authDomain: "flavourdeck-e5cea.firebaseapp.com",
  projectId: "flavourdeck-e5cea",
  storageBucket: "flavourdeck-e5cea.appspot.com",
  messagingSenderId: "339909208941",
  appId: "1:339909208941:web:3e1f444b08f854baea4864",
  measurementId: "G-8JGP81JVCQ"
})

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
