import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Recipe, { instruction, newRecipe } from "../../api/recipe/functions";
import log from "../../api/log";
import { listenForUser } from "../../api/users/functions";

export default function Newrecipe() {
	const [instructionBox, setTextBoxes] = useState([{ id: 0, value: "" }]);
	const [localUser, setLocalUser] = useState<User | null>(null);
	const router = useRouter();
	var { uid } = router.query;
	type User = {
		displayName: string | null;
		email: string | null;
		uid: string | null;
	};

	listenForUser((user) => {
		if (!user) {
			log("User is null! Redirecting to login page", "recipe/new/listenForUser");
			router.push({
				pathname: "/login",
				query: {
					then: "/recipe/new",
					thenDisplayName: "Settings",
				},
			});
		} else {
			setLocalUser(user);
			log("User signed in. Continuing...", "recipe/new/listenForUser");
		}
	});

	const addTextBox = () => {
		setTextBoxes([...instructionBox, { id: instructionBox.length, value: "" }]);
	};

	const updateTextBox = (id: any, newValue: any) => {
		setTextBoxes(
			instructionBox.map((box) =>
				box.id === id ? { id, value: newValue } : box
			)
		);
	};

	const getValues = async () => {
		const values = instructionBox.map((box) => box.value);
		let instructionsFormatted: instruction[] = [];
		var i;
		for (i in values) {
			instructionsFormatted.push({
				step: parseInt(i),
				instruction: values[i],
				time: 0,
			});
		}
		let toDB: Recipe = {
			name: "test",
			description: "", // is this a test object? yeah
			ingredients: [],
			instructions: instructionsFormatted,
			tags: [],
		};
    return toDB;

	};
  async function handleSubmit() {
    let value = await getValues();
    log("DEBUG: " + JSON.stringify(value), "recipe/new/getValues");
		await newRecipe(value, localUser?.uid || null, false);
  }

	return (
		<>
			<Head>
				<title>Create Recipe | Flavourdeck</title>
				<meta name="description" content="Create a recipe | Flavourdeck" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<h1>New Recipe</h1>
				<input type="text" placeholder="Recipe name" />
				<br />
				<textarea style={{resize: 'vertical'}} placeholder="Recipe description" />
				<br />
				{instructionBox.map((box, index) => (
					<textarea
						key={index}
						placeholder={`Instruction No.${index + 1}`}
						value={box.value}
						onChange={(e) => updateTextBox(box.id, e.target.value)}
						style={{
							display: "block",
							margin: "9px 0",
							height: "300px",
							resize: 'vertical'
						}}
					/>
				))}
				<button onClick={addTextBox}>New Instruction Box</button>
				<button onClick={handleSubmit}>Submit</button>
			</main>
		</>
	);
}
