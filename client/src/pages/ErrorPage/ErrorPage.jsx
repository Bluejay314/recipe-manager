import { Page } from "@/pages";
import "./ErrorPage.css";

export function ErrorPage({ error, resetErrorBoundary }) {
    console.error(error);

    return (
        <Page>
            <div className="errorPage">
                <p>An error occurred:</p>
                <pre>{error.message}</pre>
                <button onClick={() => resetErrorBoundary()}>Try Again?</button>
            </div>
        </Page>
    );
}