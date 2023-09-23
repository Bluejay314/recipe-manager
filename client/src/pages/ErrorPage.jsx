import Page from "./Page";
import "@/styleSheets/ErrorPage.css";

function ErrorPage({ error, resetErrorBoundary }) {
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

export default ErrorPage;
