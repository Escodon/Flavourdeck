  import '@/styles/globals.css'
import { getFirestore } from 'firebase/firestore'
import type { AppProps } from 'next/app'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { app } from './api/firebase'
import log from './api/log'
import { listenForUser } from './api/users/functions'


const db = getFirestore(app)
var loggedIn = false;
export function toggleLoggedIn() {
  loggedIn = !loggedIn;
  return loggedIn;
}

export default function App({ Component, pageProps }: AppProps) {
  const [topBarClass, setTopBarClass] = useState('topBar')
  const [buttonText, setButtonText] = useState('Log in')
  const router = useRouter()
  function pushToIndex() { router.push('/')}

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
  let loggedIn:boolean = false;
  listenForUser((userr) => {
    log("User logged in!", "_app/listenForUser")
    user = userr;
    loggedIn = true;
    //console.log(loggedIn)
    //log("DEBUG: User is " + JSON.stringify(user), "_app/listenForUser")
  });
  /**
   * Text for the login button
   * @param text Weather or not to return text
   * @param link Weather or not to return a link
   * @returns Either the text or the link
   */
  function loginButtonText(text:boolean=false, link:boolean=false) {
    if (loggedIn) {
      log("User logged in!", "_app/loginButtonText")
      return "Log out"
    } else {
      log("User not logged in!", "_app/loginButtonText")
      return "Log in"
    }
  }
  return <span>
    <div id='topBar' className={topBarClass}>
      <Image alt='Escodon logo' onClick={pushToIndex} style={{ marginTop: '6px', marginBottom: '2px', float: 'left', cursor: 'pointer' }} width='22' height='22' src={'/assets/logo_simple.svg'} />
      <Link href="/login">
        <button className='primary' style={{ float: 'right', marginRight: '0' }} >{buttonText}</button>
      </Link>
      {/* <button className='primary' style={{ float: 'right' }}>Sign up</button> */} {/* We dont need two buttons*/}
    </div>

    <Component {...pageProps} />
  </span>
}
