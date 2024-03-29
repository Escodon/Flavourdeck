import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import log from "../api/log";
import { authUser, newUser } from "../api/users/functions";
import { toggleLoggedIn } from "./_app";


log("Login page called", "login");

export default function Page({ Component, pageProps }: AppProps) {
	const [res, setRes] = useState('');
	const [redirectData, setRedirectData] = useState<{ redirectDisplayText: any, redirectURL: string }>({
		redirectDisplayText: 'Continue to Flavourdeck',
		redirectURL: '/'
	})
	const router = useRouter();
	const {redirect} = router.query;
	const then = router.query.then
	useEffect(() => {
		console.log(then)
		if (router.query.then && router.query.thenDisplayText) {
			log("Redirect data: " + router.query.then + " " + router.query.thenDisplayText, "login")
			setRedirectData({
				redirectDisplayText: <span>To continue to <strong>{router.query.thenDisplayText.toString()}</strong></span>,
				redirectURL: router.query.then.toString()
			})
		} else {
			log("No redirect data detected! Setting to default", "login")
			setRedirectData({
				redirectDisplayText: 'Continue to Flavourdeck',
				redirectURL: '/'
			})
		
		}
	}, [])
	log("Rendering login page", "login");
	async function handleLogin(e: FormEvent<HTMLFormElement>) {
		log("Handling login", "login/handleSubmit");
		console.log(process.env.authDomain)
		e.preventDefault();
		const target = e.target as typeof e.target & {
			email: { value: string };
			password: { value: string };
		};
		console.log(target)
		const email = target.email.value;
		const password = target.password.value;
		if (email == "t") { console.log("Test email used!"); router.push('/settings?uid=test'); return true }
		log("Logging in user " + email, "login/handleSubmit");
		try {
			await authUser(email, password);
			log("Logged in! Redirecting to desired page or index if not specified", "login/handleSubmit")
			toggleLoggedIn()
			if (!redirect) { log("No redirect specified! Redirecting to index", "login/handleSubmit"); router.push('/'); return false }
			else {log("Redirect specified! Redirecting to " + redirect, "login/handleSubmit"); router.push("/"+redirect.toString()); return false}
			router.push(redirectData.redirectURL);

			return false;
		} catch (error) {
			if (error != null) {
				log("Error: " + error, "login/handleSubmit");
			} else {
				log("Ghost error detected! Skipping...", "login/handleSubmit")
			}
			console.error(error);
			//setRes("Uh-Oh! Something went wrong! Please try again"); // update res
			return false;
		}
	}
	async function handleSignup(e: FormEvent<HTMLFormElement>) {
		log("Handling signup", "login/handleSignup");
		e.preventDefault();
		const target = e.target as typeof e.target & {
			email: { value: string };
			password: { value: string };
			displayName: { value: string };
		};
		if (target.email.value == null || target.password.value == null || target.displayName.value == null) {
			log("Error: Null value detected! Aborting...", "login/handleSignup");
			setRes("Please fill in all the boxes!");
			return false;
		}
		await newUser(target.email.value, target.password.value);
		router.push("/settings");

	}

	return (
		<main>
			<span>
				<div className="form1">
					<form className="loginForm" onSubmit={handleLogin}>
						<h1>Log in</h1>
						{redirectData.redirectDisplayText}<br /><br />
						<input name="email" type="text" placeholder="Email" />
						<br />

						<input name="password" type="password" placeholder="Password" />
						<br />
						<button className="primary" type="submit">
							Log in
						</button>
						<p>{res}</p>
					</form>
				</div>
				<div className="form2">
					<form className="loginForm" onSubmit={handleSignup}>
						<h1>Sign Up</h1>
						<input name="email" type="text" placeholder="Email" />
						<br />

						<input name="password" type="password" placeholder="Password" />
						<br />
						<input name="displayName" type="text" placeholder="Name" />
						<br />
						<button className="primary" type="submit">
							Sign Up
						</button>
						<p>{res}</p>
					</form>
				</div>

				{/* <Component {...pageProps} /> */}
			</span>
		</main>
	);
}