import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import log from "./api/log";
import { authUser, newUser } from "./api/users/db";


log("Login page called", "login"); 

export default function Login({ Component, pageProps }: AppProps) {
	const [res, setRes] = useState(''); 
	const router = useRouter();
	log("Rendering login page", "login");
	async function handleLogin(e: FormEvent<HTMLFormElement>) {
		log("Handling login", "login/handleSubmit");
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
				localStorage.setItem("user", JSON.stringify(response.user));
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
		await newUser(target.email.value, target.password.value, router);

	}

	return (
		<main>
			<span>
				<div className="form1">
					<form className="loginForm" onSubmit={handleLogin}>
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