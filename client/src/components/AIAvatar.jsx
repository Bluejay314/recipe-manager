import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material"
import avatar from "@/assets/ai_avatar.png";
import "@/speechBubble.css";
import { useState } from "react";
import { useUserContext } from "@/context/UserContext";
import axios from "axios";
import Draggable from 'react-draggable';
import { useRecipeBuildContext } from "@/context/RecipeBuildContext";

/*
  AI element. Display an ai avatar with a speech bubble on the page.
  Positioned absolute and can be dragged around.
*/
export default function AIAvatar() {
    const [question, setQuestion] = useState("");
    const [response, setResponse] = useState("thinking...");
    const [botState, setBotState] = useState("greeting");
    const [loading, setLoading] = useState(false);
    const [drag, setDrag] = useState({ activeDrags: 0 })
    const { currentUser } = useUserContext();
    const { recipe } = useRecipeBuildContext();

    // Greetings used for each category of questioning
    const greeting = `Hi ${currentUser.userName}! What can I help you today? What can I help you with today?`;
    const ingredientsGreeting = `How can I assist with your ingredients?`;
    const methodGreeting = `How can I assist with your method?`; 
    const descriptionGreeting = `How can I help with the description?`;

    /*
      react-draggable function.
    */
    const onStart = () => {
        setDrag({...drag, activeDrags: ++drag.activeDrags});
    };
    
    /*
      react-draggable function.
    */
    const onStop = () => {
        setDrag({...drag, activeDrags: --drag.activeDrags});
    };

    /*
      Gets response from server on clicked ask.
    */
    const handleAsk = async () => {
        setBotState("ask");
        const res = await getResponse();
        setResponse(res.content);
        setQuestion("")
        console.log(res);
    }

    /*
      Function to control display of MUI loading element.
    */
    const handleClickLoading = () => {
        setLoading((prevLoading) => !prevLoading);
    };

    /*
      Core function of the AI Avatar. Fetches a response fro the server.
    */
    const getResponse = async () => {
        const headers = { "x-access-token": currentUser.token };

        if (currentUser.id) {
            handleClickLoading();

            try {
                const res = await axios({
                    method: "post",
                    url: `http://localhost:3010/ai/${botState}`,
                    headers: headers,
                    data: {
                        user: currentUser.id,
                        content: recipe[botState],
                        userRequest: question
                    }
                });
                handleClickLoading();
                return res.data.data;
            }
            catch(err) {
                console.log(err.message);
            }
        } 

        else console.log(`No user: ${currentUser.id}`)
    }

    return (
        <Draggable 
            onStart={onStart}
            onStop={onStop}
            bounds="body" 
            handle=".handle"
            defaultPosition={{x: 0, y: 0}}
            position={null}
            scale={1}
        >
            <Box sx={{
                position: "absolute",
                left: "2em",
                bottom: "2em",
                width: "200px",
                aspectRatio: 1.5,
                zIndex: 2
            }}>
                <img src={avatar} className="handle" />

                
                <Box  speech-bubble="true" pbottom="true" aleft="true" style={{
                    "--bbColor": "white",
                    width: "18em",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    transform:"translate(80%,-80%)"
                    }}>
                
                    {/* Initial greetings page */}
                    {botState === "greeting" && (
                        <>
                            <Typography variant="body1" textAlign="center" pb="1em">{greeting}</Typography>
                            <Box display="flex" flexDirection="column" justifyContent="center" gap="0.5em" px="4em">
                                <Button variant="contained" size="small" onClick={() => setBotState("ingredients")}> Ingredients </Button>
                                <Button variant="contained" size="small" onClick={() => setBotState("method")}> Method </Button>
                                <Button variant="contained" size="small" onClick={() => setBotState("description")}> Description </Button>
                            </Box>
                        </>
                    )}

                    {/* Ingredients prompt page */}
                    {botState === "ingredients" && (
                        <Box display="flex" flexDirection="column" justifyContent="center">
                            <Typography variant="body1" textAlign="center" pb="1em">{ingredientsGreeting}</Typography>
                            <TextField multiline value={question} onChange={(e) => setQuestion(e.target.value)}/>

                            <Box display="flex" justifyContent="center" gap="0.5em" mt="1em">
                                <Button variant="outlined" size="small" onClick={() => setBotState("greeting")}> Back </Button>
                                <Button variant="contained" onClick={() => handleAsk()}> ask </Button>
                            </Box>
                        </Box>
                    )}

                    {/* Method prompt page */}
                    {botState === "steps" && (
                        <Box display="flex" flexDirection="column" justifyContent="center">
                            <Typography variant="body1" textAlign="center" pb="1em">{methodGreeting}</Typography>
                            <TextField multiline value={question} onChange={(e) => setQuestion(e.target.value)}/>

                            <Box display="flex" justifyContent="center" gap="0.5em" mt="1em">
                                <Button variant="outlined" size="small" onClick={() => setBotState("greeting")}> Back </Button>
                                <Button variant="contained" onClick={() => handleAsk()}> ask </Button>
                            </Box>
                        </Box>
                    )}

                    {/* Description prompt page */}
                    {botState === "description" && (
                        <Box display="flex" flexDirection="column" justifyContent="center">
                            <Typography variant="body1" textAlign="center" pb="1em">{descriptionGreeting}</Typography>
                            <TextField multiline value={question} onChange={(e) => setQuestion(e.target.value)}/>

                            <Box display="flex" justifyContent="center" gap="0.5em" mt="1em">
                                <Button variant="outlined" size="small" onClick={() => setBotState("greeting")}> Back </Button>
                                <Button variant="contained" onClick={() => handleAsk()}> ask </Button>
                            </Box>
                        </Box>
                    )}

                    {botState === "ask" && (
                        <Box display="flex" flexDirection="column" justifyContent="center">
                            {loading? (
                                <Box sx={{ display: 'flex', justifyContent: "center", alignItems:"center", gap: '0.5em', pb: "1em" }}>
                                    <CircularProgress /> Thinking ...
                                </Box>
                            ) : (<Typography variant="body1" fontStyle="italic" pb="1em">{response}</Typography>)

                            }
                            <Button variant="outlined" onClick={() => setBotState("greeting")}>Ask again </Button>
                        </Box>
                    )}
                    
                </Box>
            </Box>
        </Draggable>
    )
}