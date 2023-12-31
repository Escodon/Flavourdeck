import Head from 'next/head';
import { useRouter } from 'next/router';
import { getPublicUserInfo } from '../api/users/functions';



export default function Profile() {
	const router = useRouter();
    const params = router.query;
    getPublicUserInfo(params.uid as string).then((user) => {
        console.log(user)
    })
  return (
    <>
      <Head>
        <title>Flavourdeck</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1></h1>
      </main>
    </>
  )
}
