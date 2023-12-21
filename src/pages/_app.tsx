import "@/styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { AppProps } from "next/app";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import log from "../api/log";
import { listenForUser, logoutUser } from "../api/users/functions";

var loggedIn = false;
export function toggleLoggedIn() {
	loggedIn = !loggedIn;
	return loggedIn;
}

export default function App({ Component, pageProps }: AppProps) {
	const [topBarClass, setTopBarClass] = useState("topBar");
	const [buttons, setButtons] = useState<Array<any>>();
	const router = useRouter();
	function push(to: string) {
		router.push(to);
	}
	function LoginButton() {
		return (
			<button
				className="primary"
				onClick={() => push("/settings")}
				style={{ float: "right", marginRight: "0" }}
			>
				Log in
			</button>
		);
	}

	function LogoutButton() {
		return (
			<button
				onClick={() => {
					logoutUser();
				}}
				className="primary"
				style={{ float: "right", marginRight: "0" }}
			>
				Log out
			</button>
		);
	}

	useEffect(() => {
		listenForUser((user?) => {
			log("User logged in!", "_app/listenForUser");
			// useEffect(() => {
			setButtons([<LogoutButton />]);
			// }, []);
		});
	}, []);

	return (
		<span>
			<div id="topBar" className={topBarClass}>
				<Image
					alt="Escodon logo"
					onClick={() => push("/")}
					style={{
						marginTop: "6px",
						marginBottom: "2px",
						float: "left",
						marginLeft: "10px",
					}}
					width="22"
					height="22"
					src={"/assets/logo_simple.svg"}
				/>
				{buttons}
			</div>

			<Component {...pageProps} />
			<SpeedInsights />
		</span>
	);
}
