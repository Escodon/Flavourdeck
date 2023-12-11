import Head from 'next/head';
import { useState } from 'react';

export default function newFood() {
  const [textBoxes, setTextBoxes] = useState([0]);

  const addTextBox = () => {
    setTextBoxes([...textBoxes, textBoxes.length]);
  };

  return (
    <>
      <Head>
        <title>Flavourdeck</title>
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
        {textBoxes.map((_, index) => (
          <input key={index} type="text" placeholder={`Instruction No.${index + 1}`} />
        ))}
        <button onClick={addTextBox}>New Instruction Box</button>
      </main>
    </>
  )
}