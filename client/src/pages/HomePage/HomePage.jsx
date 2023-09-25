import "./HomePage.css";
import { Page } from "@/pages";
import { BackgroundImage } from "@/components";
import background from "@/assets/tiled_512.jpg";
import { Card } from "@/components/index";
import { recipes } from "@/data/allrecipes";

export function HomePage() {

    const toDisplay = recipes.map(recipe => (
        <Card title={recipe.title} image={recipe.image}/>
    ));

    return (
        <Page>
            <div className="homePage">
                <div className="homePage__container">
                    {toDisplay}
                </div>
            </div>
        </Page>
    );
}


