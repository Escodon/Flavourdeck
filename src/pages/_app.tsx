import '@/styles/globals.css'
import { User, getAuth, onAuthStateChanged } from "firebase/auth"
import type { AppProps } from 'next/app'
import Image from 'next/image'
import Link from 'next/link'
import { app } from './api/firebase'
import log from './api/log'
const auth = getAuth(app);

let signIn = false;
let currentUser: User | null = null;

onAuthStateChanged(auth, (user) => {
  if (user) {
    log('User signed in', '_app/onAuthStateChanged');
    signIn = true;
    currentUser = user;
  } else {
    log('User signed out', '_app/onAuthStateChanged');
    signIn = false;
    currentUser = null;
  }
});

if (signIn) { var buttonsMsg = 'Log out' } else { var buttonsMsg = 'Log in' }

export { currentUser, signIn }


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
