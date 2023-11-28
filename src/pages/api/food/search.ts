import * as JSsearch from "js-search";
import log from "../log";
import { getRecipeIndex } from "./db";


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