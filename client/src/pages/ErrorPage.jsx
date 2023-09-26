import { Page } from "@/pages";
import { Box } from "@mui/material";

export function ErrorPage({ error, resetErrorBoundary }) {
    console.error(error);

    return (
        <Page>
            <Box>
                <p>An error occurred:</p>
                <pre>{error.message}</pre>
                <button onClick={() => resetErrorBoundary()}>Try Again?</button>
            </Box>
        </Page>
    );
}