import type { AppProps } from "next/app";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useContext, useState } from "react";
import log from "./api/log";
import { UserContext, authUser } from "./api/users/db";


log("Login page called", "login"); 

export default function Login({ Component, pageProps }: AppProps) {
	const {setUser}  = useContext(UserContext);
	const [buttonsMsg, setButtonsMsg] = useState("Log in"); 
	const [res, setRes] = useState(''); // define res as a state variable
	const router = useRouter();
	log("Rendering login page", "login");
	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		log("Handling login", "login/handleSubmit");
		console.log("Test")
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
			const response = await authUser(email, password, router);
			if (response.user) {
				log("Setting user context to " + JSON.stringify(response.user), "login/handleSubmit")
				setUser(JSON.stringify(response.user));
			}			
				log("Logged in! Redirecting to /settings?uid=" + response.uid, "login/handleSubmit")
				router.push("/settings?uid=" + response.uid);
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
	return (
		<main>
			<span>
				<div className="form1">
					<form className="loginForm" onSubmit={handleSubmit}>
						<h1>Log in</h1>
						<input name="email" type="text" placeholder="Email" />
						<br />

						<input name="password" type="password" placeholder="Password" />
						<br />
						<button className="primary" type="submit">
							Log in
						</button>
						<p>{res}</p>
					</form>
				</div>h

				{/* <Component {...pageProps} /> */}
			</span>
		</main>
	);
}