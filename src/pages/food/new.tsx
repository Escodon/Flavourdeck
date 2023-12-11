import Head from 'next/head';
import { useState } from 'react';

export default function NewFood() {
  const [instructionBox, setTextBoxes] = useState([{ id: 0, value: '' }]);

  const addTextBox = () => {
    setTextBoxes([...instructionBox, { id: instructionBox.length, value: '' }]);
  };

  const updateTextBox = (id:any, newValue:any) => {
    setTextBoxes(instructionBox.map(box => box.id === id ? { id, value: newValue } : box));
  };

  const getValues = () => {
    const values = instructionBox.map(box => box.value); 
    console.log(values);
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
        {instructionBox.map((box, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Instruction No.${index + 1}`}
            value={box.value}
            onChange={(e) => updateTextBox(box.id, e.target.value)}
          />
        ))}
        <button onClick={addTextBox}>New Instruction Box</button>
        <button onClick={getValues}>Submit</button>
      </main>
    </>
  )
}