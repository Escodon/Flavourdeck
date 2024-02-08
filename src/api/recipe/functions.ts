import { collection, doc, getDocs, setDoc, QuerySnapshot } from "firebase/firestore";
import { db } from "../firebase";
import log from "../log";
export const runtime = 'edge';

/* 
* @description The default way of storing ingredents
*/
export interface ingredient {
  unit: string
  quantity: number
  ID: number
  inDir: boolean

}; //for later

/*
* @description The default interface for instructions
*/
export interface instruction {
  step: number
  instruction: String
  time: number //e.g for cooking & ect
};



/**
 * The default recipe object.
 * @example
 * {
 *  ID: "163456789",
 *  name: "Pasta Sauce",
 *  ingredients: ["Tomatoes", "Garlic", "Olive Oil"],
 *  instructions: ["Chop tomatoes", "Cook tomatoes", "Add garlic", "Add olive oil"],
 *  tags: ["Italian", "Pasta"]
 * }
 */
export default interface Recipe {
  /**
   * The ID of the recipe.
   * Uses Date.Now() to generate a unique ID.
   * @example "163456789"
   */
  ID: string; //we can get this from the doc ID
  /**
   * The name of the recipe.
   * @example "Pasta Sauce"
   */
  name: string;
  /**
   * The description of the recipe.
   * @example "A simple pasta sauce recipe"
   */
  description: string;
  /**
   * The ingredients of the recipe.
   * Stored as an array
   * @example ["Tomatoes", "Garlic", "Olive Oil"]
   */
  ingredients: Array<ingredient>;
  /**
   * The instructions of the recipe.
   * Stored as an array
   * @example ["Chop tomatoes", "Cook tomatoes", "Add garlic", "Add olive oil"]
   */
  instructions: Array<instruction>;
  /**
   * The tags of the recipe.
   * Stored as an array
   * @example ["Italian", "Pasta"]
   */
  tags: string[];
};


/**
 * 
 * @param recipe The recipe to add to the database. See {@link Recipe} for more information.
 * @param UserID The ID of the user to add the recipe to. See {@link User.ID}.
 * @param privateRecipe Whether the recipe should be private or not. Currently unused.
 * @returns True if successful, Error if not.
 */
export async function newRecipe(recipe: Recipe, UserID: string | null, privateRecipe: boolean) {
  log(`Adding recipe "${recipe.name}"`, "newRecipe");
  if (UserID == null) { return false; }
  let collectionRef = collection(db, "users", UserID, "recipes");
  let docRef = doc(collectionRef); // generate a new document reference with an auto-generated ID
  await setDoc(docRef, recipe, { merge: true });
  log(`Added recipe "${recipe.name}"`, "newRecipe");
  return true;
};


/**
 * Gets a recipe by ID. Used with {@link searchRecipes}.
 * @param ID The ID of the recipe to get. See {@link Recipe.ID}.
 * @returns The JSON data of the recipe. See {@link Recipe}.
 */
export async function getRecipe(ID: string, UserID: string) {
  log(`Getting recipe with ID ${ID}`, "getRecipe");
  let querySnapshot = await getDocs(collection(db, "users", UserID, "recipes"));
  let recipes = querySnapshot.docs.map((doc:any) => doc.data() as Recipe);
  console.log(JSON.stringify(recipes[0]))
  return recipes[0];
}


/**
 * 
 * @returns An array of all the recipe IDs and names in the database.
 * @example ["163456789: Pasta Sauce", "163456790: Pasta"]
 */
export async function getRecipeIndex() {
  log(`Getting recipe index`, "getRecipeIndex");
  let querySnapshot = await getDocs(collection(db, "recipes"));
  let recipes = querySnapshot.docs.map((doc) => doc.data() as Recipe);
  let recipeIndex: string[] = [];
  recipes.forEach(recipe => {
    recipeIndex.push(recipe.name + ": " + recipe.name);
  });
  return recipeIndex;

}