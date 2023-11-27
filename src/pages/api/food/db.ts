import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import log from "../log";

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
export type Recipe = {
  /**
   * The ID of the recipe.
   * Uses Date.Now() to generate a unique ID.
   * @example "163456789"
   */
  ID: string;
  /**
   * The name of the recipe.
   * @example "Pasta Sauce"
   */
  name: string;
  /**
   * The ingredients of the recipe.
   * Stored as an array
   * @example ["Tomatoes", "Garlic", "Olive Oil"]
   */
  ingredients: string[];
  /**
   * The instructions of the recipe.
   * Stored as an array
   * @example ["Chop tomatoes", "Cook tomatoes", "Add garlic", "Add olive oil"]
   */
  instructions: string[];
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
 * @returns True if successful, Error if not.
 */
export async function newRecipe(recipe: Recipe) {
  log(`Adding recipe with ID ${recipe.ID}`, "newRecipe");
  let docRef = collection(db, "recipes");
  let res = await addDoc(docRef, recipe);
  if (res == null) {
    throw new Error("Failed to add recipe"); 
    //return false
  }
  log(`Added recipe with ID ${recipe.ID}`, "newRecipe");
  return true;
}

/**
 * 
 * @param ID The ID of the recipe to get. See {@link Recipe.ID}.
 * @returns The JSON data of the recipe. See {@link Recipe}.
 */
export async function getRecipe(ID: string) {
  log(`Getting recipe with ID ${ID}`, "getRecipe");
  const querySnapshot = await getDocs(collection(db, "recipes"));
  const recipes = querySnapshot.docs.map((doc) => doc.data() as Recipe);
  const recipe = recipes.find((recipe) => recipe.ID === ID);
  log(`Got recipe with ID ${ID}`, "getRecipe");
  return recipe;
}
