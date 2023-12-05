//import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import log from "./api/log";
import { authUser } from "./api/users/db";




log("Login page called", "login"); //it works but dosent look pretty

export default function Login({ Component, pageProps }: AppProps) {
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
		if (email == "t") { console.log("Test email used!"); router.push('/'); return true }
		log("Logging in user " + email, "login/handleSubmit");
		try {
			const response = await authUser(email, password); // wait for the Promise to resolve
			log(response, "login/handleSubmit")
			console.log(response)
			setRes(response.error);
			if (!response.error) {
				console.error(response);
				//setRes("Uh-Oh! Something went wrong! Please try again"); // update res
				return false;
			} else if (response.error) {
				log("Logged in!", "login/handleSubmit");
				setButtonsMsg("Logged in!");
				return true;
			} else {
				setRes("Invalid email or password"); // update res
			}
		} catch (error) {
			console.error(error);
			//setRes("Uh-Oh! Something went wrong! Please try again"); // update res
			return false;
		}
	}
	return (
		<main>
			<span>
				<div className="topBar">
					<Image
						alt="yo"
						style={{ marginTop: "6px", marginBottom: "2px", float: "left" }}
						width="22"
						height="22"
						src={"/assets/logo_simple.svg"}
					/>
					<Link href="/login">
						<button
							className="primary"
							style={{ float: "right", marginRight: "0" }}
						>
							{buttonsMsg}
						</button>
					</Link>
					<button className="primary" style={{ float: "right" }}>
						Sign up
					</button>
				</div>
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
				</div>

				{/* <Component {...pageProps} /> */}
			</span>
		</main>
	);
}