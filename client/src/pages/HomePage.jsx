import "@/styleSheets/HomePage.css";
import Page from "./Page";
import BackgroundImage from "@/components/BackgroundImage";
import background from "@/assets/tiled_512.jpg";

export default function HomePage() {
    return (
        <Page>
            <BackgroundImage image={background}/>
            <div className="homePage">
                <h1>Home Page</h1>
            </div>
        </Page>
        
    )
}