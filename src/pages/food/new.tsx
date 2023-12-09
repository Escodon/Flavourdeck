import Head from 'next/head';
import { useState } from 'react';

export default function newFood() {
  const [selectedOption, setSelectedOption] = useState(null);
  let tmpIngredients = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];
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
        {/* <Select options={tmpIngredients} isMulti={true} placeholder="Select an ingredent" onChange={setSelectedOption}/> */}
        
      </main>
    </>
  )
}
