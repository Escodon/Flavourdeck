import { SpeedInsights } from "@vercel/speed-insights/next";
import { updateEmail, updateProfile } from "firebase/auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth } from "../api/firebase";
import log from "../api/log";
import { listenForUser, loginIfUserNull } from "../api/users/functions";

export default function UserSettings() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	type User = {
		displayName: string | null;
		email: string | null;
		uid: string | null;
	};
	const [localUser, setLocalUser] = useState<User | null>(null);


	useEffect(() => {
		listenForUser((user) => {
			if (!user || user == null) {
				log(
					"User is null! Redirecting to login page",
					"settings/listenForUser"
				);
				router.push("/login?redirect=settings");
			} else {
				setLocalUser(user);
				log(`User signed in as ${JSON.stringify(user.displayName)}. Continuing...`, `settings/listenForUser`);
			}
		});
	}, []);

	/**
	 * Updates the user settings
	 * @returns {void}
	 */
	function updateSettings() {
		log("Updating user settings", "settings/updateSettings");
		if (localUser == null) {
			console.error("User is null! Cannot update settings!");
			return;
		}
		log("Updating user settings (cache)", "settings/updateSettings");
		let newName = name;
		let newEmail = email;
		log(
			"Complete! Updating user settings (database)",
			"settings/updateSettings"
		);
		if (auth.currentUser) {
			updateProfile(auth.currentUser, {
				displayName: newName,
				photoURL: "",
			})
				.then(() => {
					log(
						"User display name updated successfully",
						"settings/updateSettings"
					);
				})
				.catch((error) => {
					console.error("Error updating user display name", error);
				});
		}
		return;
	}

	log("Rendering settings page for user " + localUser, "settings");
	return (
		<>
			<Head>
				<title>Flavourdeck</title>
				<meta name="description" content="The login page for flavourdeck!" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<h1>Settings</h1>
				<p>UID: {JSON.stringify(localUser?.uid)}</p>
				<h2>User profile:</h2>
				<p>Name: {localUser ? localUser.displayName : "Unknown"}</p>
				<input
					type="text"
					placeholder="Change your name"
					onChange={(e) => setName(e.target.value)}
				/>
				<br />
				<p>Email: {localUser ? localUser.email : "unknown@a.domain"}</p>
				<input
					type="text"
					placeholder="Change your email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<br />
				<p>Profile picture:</p>
				<input type="file" />
				<br />
				<button className="primary" onClick={updateSettings}>
					Save
				</button>
				<SpeedInsights />
			</main>
		</>
	);
}
