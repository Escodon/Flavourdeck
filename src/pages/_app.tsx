import '@/styles/globals.css'
import { getFirestore } from 'firebase/firestore'
import type { AppProps } from 'next/app'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { app } from './api/firebase'
import log from './api/log'
import { listenForUser } from './api/users/functions'


const db = getFirestore(app)



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
  let user:any = null;
  listenForUser((userr) => {
    log("User logged in!", "_app/listenForUser")
    user = userr;
    //log("DEBUG: User is " + JSON.stringify(user), "_app/listenForUser")
  });
  function loginButtonText() {
    if (user) {
      log("User not logged in!", "_app/listenForUser")
      return "Log out"
    } else {
      log("User logged in!", "_app/listenForUser")
      return "Log in"
    }
  }
  return <span>
    <div id='topBar' className={topBarClass}>
      <Image alt='Escodon logo' onClick={() => {('/')}} style={{ marginTop: '6px', marginBottom: '2px', float: 'left', cursor: 'pointer' }} width='22' height='22' src={'/assets/logo_simple.svg'} />
      <Link href="/login">
        <button className='primary' style={{ float: 'right', marginRight: '0' }} >{loginButtonText()}</button>
      </Link>
      {/* <button className='primary' style={{ float: 'right' }}>Sign up</button> */} {/* We dont need two buttons*/}
    </div>

    <Component {...pageProps} />
  </span>
}
