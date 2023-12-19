  import '@/styles/globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { AppProps } from 'next/app'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import log from './api/log'
import { listenForUser } from './api/users/functions'


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
  listenForUser((userr) => {
    log("User logged in!", "_app/listenForUser")
    setButtonText('Log out');
  });


  return <span>
    <SpeedInsights/>
    
    <div id='topBar' className={topBarClass}>
      <Image alt='Escodon logo' onClick={pushToIndex} style={{ marginTop: '6px', marginBottom: '2px', float: 'left', cursor: 'pointer' }} width='22' height='22' src={'/assets/logo_simple.svg'} />
      <Link href="/users/login">
        <button className='primary' style={{ float: 'right', marginRight: '0' }} >{buttonText}</button>
      </Link>
      {/* <button className='primary' style={{ float: 'right' }}>Sign up</button> */} {/* We dont need two buttons*/}
    </div>

    <Component {...pageProps} />
  </span>
}
