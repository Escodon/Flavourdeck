import '@/styles/globals.css'
import Image from 'next/image'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <span>
    <div className='topBar'>
      <Image alt='yo' style={{marginTop: '4px', marginBottom: '0px', border: '1px solid white', float: 'left'}} width='150' height='20' src={'/assets/logo.svg'}/>
      <span style={{float: 'right'}}>Get Cooking</span>
    </div>

    <Component {...pageProps} />
  </span>
}
