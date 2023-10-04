import useQuery from "@/hooks/useQuery";
import { Box, CardActionArea, CssBaseline, Divider, Grid, IconButton, TextField, Typography } from "@mui/material";
import { CollapsableMenu, Header } from "@/components";
import { useEffect, useState } from "react";
import RecipeMenu from "@/components/RecipeMenu";
import { useRecipe } from "@/hooks/useRecipe";
import { useRecipeBuildContext } from "@/context/RecipeBuildContext";
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export function RecipePage() {
    const query = useQuery();
    const recipeId = query.get("q");
    const recipeData = useRecipe(recipeId);
    const { recipe, updateRecipe } = useRecipeBuildContext();

    useEffect(() => {
        updateRecipe(recipeData); 

    }, [recipeData]);

    if(recipe.title === "") {
        return (
            <Box>
                <CssBaseline />
                <Header>
                    <Box sx={{display: {xs: "block", md:"none"}}}><RecipeMenu isMobile/></Box>
                </Header>

                <Box display="flex" overflow="scroll" >
                    <RecipeMenu />
                </Box>
            </Box>
        )
    }

    const onDragEnd = (result, section) => {
        if (!result.destination) return;

        const items = Array.from(recipe[section]);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        console.log(items)

        let newData = {};
        newData[section] = items;

        updateRecipe(newData);
    }

    const tagItems = recipe.tags?.map((tag, index) => (
        <Typography key={index} variant="body1" color="white" sx={{
            p: "0.1em 0.5em",
            backgroundColor: "rgba(17, 133, 96, 0.9)",
        }}>
            {tag}
        </Typography>
    ))
   
    const imageStyle = {
        width: "80%",
        aspectRatio: "1",
        border: "0.5em solid white",
        outline: "0.25em solid rgba(0, 0, 0, 0.75)",
    }

    const headerHeight = "10vh";
    return (
        <Box overflow="hidden">
            <CssBaseline />
            <Header height={headerHeight}>
                <Box sx={{display: {xs: "block", md:"none"}}}><RecipeMenu isMobile/></Box>
            </Header>

            <Box display="flex" sx={{height: `calc(100vh - ${headerHeight})`}}>
                <RecipeMenu />

                <Box display="flex" flexDirection="column" flexGrow="1" overflow="scroll" p="2em 4em">
                    <Box display="flex" gap="2em" mb="2em">
                        {/* Image Section */}
                        <Box display="flex" flexGrow="1" justifyContent="flex-start">
                            <img src={`http://localhost:3010${recipeData.image}`} style={imageStyle} />
                        </Box>

                        {/* Header Section */}
                        <Box 
                            display="flex" 
                            flexDirection="column" 
                            justifyContent="flex-start" 
                            flexGrow="2" 
                            textAlign="center"
                            py="1em"
                        >
                            <Box>
                                <Typography variant="h4" pb={4} maxHeight="60%">
                                    {recipe.title}
                                </Typography>

                                <Box display="flex" justifyContent="center" gap="0.5em" >
                                    {tagItems}
                                </Box>
                            </Box>
                            
                            <Typography mt="4em" variant="body1" textAlign="left">
                                {recipe.description}
                            </Typography>
                        </Box>
                    </Box>

                    <Grid container justifyContent="space-between">
                        {/* Ingredients Section */}
                        <Grid item xs={4} pr={4}>
                            <Typography variant="h5" fontWeight="bold" mb={2} p="0.25em 0.5em" borderRadius="0.25em" backgroundColor="rgba(255, 162, 0,0.5)">
                                Ingredients
                            </Typography>
                            <Box display="flex" flexDirection="column" gap={2}>
                                {recipe.ingredients.map((ingredient, index) => (
                                    <>
                                        <FormField key={index} section="ingredients" index={index} variant="body1" canEdit={recipe.canEdit}/>
                                        <Divider display="flex" alignItems="center" width="80%" />
                                    </>
                                ))}
                                {recipe.canEdit && <InsertMore section="ingredients" />}
                            </Box>
                        </Grid>

                        {/* Method Section */}
                        <Grid item xs={8}>
                            <Typography variant="h5" fontWeight="bold" mb={2} p="0.25em 0.5em" borderRadius="0.25em" backgroundColor="rgba(255, 162, 0,0.5)">
                                Method
                            </Typography>
                            {recipe.canEdit? (
                                <>
                                    <DragDropContext  onDragEnd={(res) => onDragEnd(res, "steps")}>
                                        <Droppable droppableId="methodList">
                                            {(provided) => (
                                                <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                                                    {recipe.steps.map((step, index) => (
                                                        <Draggable key={`step ${index}`} draggableId={`step ${index}`} index={index}>
                                                            {provided => (
                                                                <Box pb={2}  {...provided.draggableProps}>
                                                                    <Typography variant="subtitle1" fontWeight={600} ref={provided.innerRef}  {...provided.dragHandleProps}>
                                                                        Step {index + 1}
                                                                    </Typography>
                                                                    <FormField section="steps" index={index} variant="body1" canEdit={recipe.canEdit}/>
                                                                </Box>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </ul>
                                            )}
                                        </Droppable>
                                    </DragDropContext>
                                    <InsertMore section="steps" />
                                </>
                            ) : (
                                <>
                                    {recipe.steps.map((step, index) => (
                                        <Box pb={2}>
                                            <Typography variant="subtitle1" fontWeight={600}>
                                                Step {index + 1}
                                            </Typography>
                                            <FormField section="steps" index={index} variant="body1" canEdit={recipe.canEdit}/>
                                        </Box>
                                    ))}
                                </>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}

const FormField = ({ section, index=-1, variant, canEdit }) => {
    const [editable, setEditable] = useState(false);
    const { recipe, updateRecipe } = useRecipeBuildContext();
    const content = index == -1? recipe[section] : recipe[section][index];
    console.log(`canEdit: ${canEdit}`)

    const handleCanEdit = () => {
        setEditable(!editable);
    }

    const handleChange = (e) => {
        let newData = {};
        let temp;

        if(index === -1) {
            newData[section] = e.target.value;
        }
        else {
            temp = Array.from(recipe[section]);
            temp[index] = e.target.value;
            newData[section] = temp;
        }

        updateRecipe(newData);
    }

    if(!canEdit) {
        return (
            <Typography variant={variant}>
                {content}
            </Typography>
        )
    }

    if(editable) {
        return (
            <ClickAwayListener onClickAway={handleCanEdit}>
            <TextField 
                multiline
                fullWidth
                value={content}
                onChange={handleChange}
                />
            </ClickAwayListener>
        )
    }
    
    return (
        <CardActionArea onClick={handleCanEdit}>
            <Typography variant={variant} >
                {content}
            </Typography>
        </CardActionArea>
    )
}

const InsertMore = ({ section }) => {
    const { recipe, updateRecipe } = useRecipeBuildContext();

    const handleClick = () => {
        if(section === "steps") {
            let temp = Array.from(recipe.steps);
            temp.push(`New step...`);
            console.log("updating steps")
            updateRecipe({steps: temp});
        }
        else if(section === "ingredients") {
            let temp = Array.from(recipe.ingredients);
            temp.push(`New ingredient...`);
            console.log("updating ingredients")
            updateRecipe({ingredients: temp});
        }
        else  console.log("updating nothing")
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center" alignSelf="center">
            <Typography variant="body1" color="rgb(42, 125, 150, 1)"> Insert New </Typography>
            <IconButton onClick={handleClick}>
                <AddCircleOutlineIcon sx={{color:"rgb(42, 125, 150, 1)"}} />
            </IconButton>
        </Box>
    )
}