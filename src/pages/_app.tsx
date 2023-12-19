import "@/styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { AppProps } from "next/app";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import log from "./api/log";
import { listenForUser } from "./api/users/functions";

var loggedIn = false;
export function toggleLoggedIn() {
	loggedIn = !loggedIn;
	return loggedIn;
}

function LoginButton() {
	return (
		<button className="primary" style={{ float: "right", marginRight: "0" }}>
			Log in
		</button>
	);
}

function LogoutButton() {
  return (
		<button onClick={() => {
      
    }} className="primary" style={{ float: "right", marginRight: "0" }}>
			Log out
		</button>
	);
}

export default function App({ Component, pageProps }: AppProps) {
	const [topBarClass, setTopBarClass] = useState("topBar");
	const [buttons, setButtons] = useState([<LoginButton/>]);
	const router = useRouter();
	function pushToIndex() {
		router.push("/");
	}

	listenForUser((user) => {
		log("User logged in!", "_app/listenForUser");
    setButtons([])
	});

	return (
		<span>
			<div id="topBar" className={topBarClass}>
				<Image
					alt="Escodon logo"
					onClick={pushToIndex}
					style={{
						marginTop: "6px",
						marginBottom: "2px",
						float: "left",
						cursor: "pointer",
					}}
					width="22"
					height="22"
					src={"/assets/logo_simple.svg"}
				/>
				{buttons}
				{/* <button className='primary' style={{ float: 'right' }}>Sign up</button> */}{" "}
				{/* We dont need two buttons*/}
			</div>

			<Component {...pageProps} />
			<SpeedInsights />
		</span>
	);
}
