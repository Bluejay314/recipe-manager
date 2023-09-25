import "./HomePage.css";
import { Page } from "@/pages";
import { BackgroundImage } from "@/components";
import background from "@/assets/tiled_512.jpg";

export function HomePage() {
    return (
        <Page>
            <BackgroundImage image={background} />
            <div className="homePage">
                <h1>Home Page</h1>
            </div>
        </Page>
    );
}
