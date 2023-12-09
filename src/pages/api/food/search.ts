import { doc, updateDoc } from "firebase/firestore";
import * as JSsearch from "js-search";
import { db } from "../firebase";
import log from "../log";
import Recipe, { getRecipeIndex } from "./db";
export const runtime = 'edge';


/**
 * Default search func for recipes.
 * @param search The search query (String)
 * @returns The closest matching recipes.
 * @example var result = searchRecipes("pasta")
 */
export async function searchRecipes(search: string) {
    log("Searching recipe index for '" + search + "'" , "searchRecipes");
    let index = await getRecipeIndex();
    var request = new JSsearch.Search("ID");
    request.addIndex("name");
    request.addIndex("tags");
    request.addIndex("ingredients");

    request.addDocuments(index);
    var results = request.search(search);
    return results;   
}

/**
 * @description Adds a new recipe to the database.
 * @param recipe The recipe to add to the database. See {@link Recipe}.
 * @param privateRecipe Whether or not the recipe is private.
 * @returns Nothing.
 * @example await updateIndex(recipe, privateRecipe);
*/
export async function updateIndex(recipe: Recipe, privateRecipe: boolean) {
    if (privateRecipe) return;
    log(`Indexing recipe with ID ${recipe.ID}`, "index");
    const indexDoc = doc(db, 'recipes', 'index');
    let index = await getRecipeIndex();
    let toPush = recipe.ID + ": " + recipe.name;
    index.push(toPush);
    await updateDoc(indexDoc, {index: index});
    log(`Indexed recipe with ID ${recipe.ID}`, "index");
    return;
};