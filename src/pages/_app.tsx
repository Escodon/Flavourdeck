import '@/styles/globals.css'
import { getFirestore } from 'firebase/firestore'
import type { AppProps } from 'next/app'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { app } from './api/firebase'


const db = getFirestore(app)

//listenForUser((user) => {
  //alert('hi!' + user?.uid)
//})

export default function App({ Component, pageProps }: AppProps) {
  const [topBarClass, setTopBarClass] = useState('topBar')

  // setTimeout(() => {
  //   window.addEventListener('scroll', (ev) => {
  //     if (window.scrollY > 0) {
  //       setTopBarClass('topBar topBarScrolled')
  //     } else {
  //       setTopBarClass('topBar')
  //     }
  //   })
  // }, 1)

  return <span>
    <div id='topBar' className={topBarClass}>
      <Image alt='Escodon logo' onClick={() => {('/')}} style={{ marginTop: '6px', marginBottom: '2px', float: 'left', cursor: 'pointer' }} width='22' height='22' src={'/assets/logo_simple.svg'} />
      <Link href="/login">
        <button className='primary' style={{ float: 'right', marginRight: '0' }} >Log in</button>
      </Link>
      <button className='primary' style={{ float: 'right' }}>Sign up</button>
    </div>

    <Component {...pageProps} />
  </span>
}
