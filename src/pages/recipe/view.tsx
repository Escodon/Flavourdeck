import { getRecipe } from "@/api/recipe/functions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Recipe } from "@/api/recipe/functions";


export default function View() {
        const router = useRouter();
        const { id } = router.query;
        if (!id) {
                return <h1>Invalid recipe ID</h1>;
        } else {
            let rid = id.toString().split("-")[0];
            let uid = id.toString().split("-")[1];
        
        const [recipe, setRecipe] = useState<Recipe | null>(null);
        useEffect(() => {
                if (id) {
                        getRecipe(rid.toString(), uid).then((recipe) => {
                                setRecipe(recipe);
                        });
                }
        }, [id]);
    }
    return (
        <div>
            <h1>View</h1>
            <p>Recipe ID: {id}</p>
            <p>Recipe: {Recipe?.name}</p>
            <p>Ingredents:{Recipe?.ingredents}</p>
            <p>Instructions:{Recipe?.instructions[0]}</p>
            
        </div>
    );
}