import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import log from "../log";

export type Recipe = {
    ID: string
    name: string
    ingredients: string[]
    instructions: string[]
    tags: string[]
}


export async function newRecipe(recipe: Recipe) {
    log(`Adding recipe with ID ${recipe.ID}`, 'newRecipe')
    let docRef = collection(db, 'recipes');
    let res = await addDoc(docRef, recipe);
    if (res == null) throw new Error('Failed to add recipe')
    log(`Added recipe with ID ${recipe.ID}`, 'newRecipe')
    return res;
}

export async function getRecipe(ID: string) {
    log(`Getting recipe with ID ${ID}`, 'getRecipe')
    const querySnapshot = await getDocs(collection(db, 'recipes'));
    const recipes = querySnapshot.docs.map(doc => doc.data() as Recipe);
    const recipe = recipes.find(recipe => recipe.ID === ID);
    log(`Got recipe with ID ${ID}`, 'getRecipe')
    return recipe; 
};
