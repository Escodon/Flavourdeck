import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Recipe, { instruction, newRecipe } from '../api/food/functions';
import log from '../api/log';
import { listenForUser } from '../api/users/functions';

export default function NewFood() {
  const [instructionBox, setTextBoxes] = useState([{ id: 0, value: '' }]);
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
			log("User is null! Redirecting to login page", "food/new/listenForUser");
			router.push({
				pathname: "/login",
				query: {
					then: "/food/new",
					thenDisplayName: "Settings",
				},
			});
		} else {
			setLocalUser(user);
			log("User signed in. Continuing...", "food/new/listenForUser");
		}
	});

  const addTextBox = () => {
    setTextBoxes([...instructionBox, { id: instructionBox.length, value: '' }]);
  };

  const updateTextBox = (id:any, newValue:any) => {
    setTextBoxes(instructionBox.map(box => box.id === id ? { id, value: newValue } : box));
  };

  const getValues = async () => {
    const values = instructionBox.map(box => box.value); 
    let instructionsFormatted: instruction[] = [];
    var i;
    for (i in values) {
      instructionsFormatted.push({
        step: parseInt(i),
        instruction: values[i],
        time: 0
      })
    }
    let toDB: Recipe = {
      name: "test",
      description: "",
      ingredients: [],
      instructions: instructionsFormatted,
      tags: [],
    }
    await newRecipe(toDB, localUser?.uid, false);
  };

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
        <input type="text" placeholder="Recipe description" />
        <br />
        {instructionBox.map((box, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Instruction No.${index + 1}`}
            value={box.value}
            onChange={(e) => updateTextBox(box.id, e.target.value)}
            style={{ display: 'block', margin: '9px 0', width: '100%', height: '300px' }}
          />
        ))}
        <button onClick={addTextBox}>New Instruction Box</button>
        <button onClick={getValues}>Submit</button>
      </main>
    </>
  )
}