//import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import log from "./api/log";
import { signIn } from "./api/users";
import { authUser } from "./api/users/db";


if (signIn) {
	var buttonsMsg = "Log out";
} else {
	var buttonsMsg = "Log in";
}


log("Login page called", "login");

export default function Login({ Component, pageProps }: AppProps) {
	const router = useRouter();
	log("Rendering login page", "login");
	function handleSubmit(e: FormEvent<HTMLFormElement>) {
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
		if (email == "t") {console.log("Test email used!"); router.push('/'); 	return true}
		log("Logging in user " + email, "login/handleSubmit");
		try {
			 authUser(email, password);
			log("Logged in!", "login/handleSubmit");
			var butonsMsg = "Log out";
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	}
	return (
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
					
					<input name="password" type="password" placeholder="Password" />
					<button className="primary" type="submit">
						Log in
					</button>
				</form>
			</div>

			{/* <Component {...pageProps} /> */}
		</span>
	);
}
