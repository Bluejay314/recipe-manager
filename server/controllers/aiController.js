"use strict";

const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
});

const getIngredientsChange = async (req, res) => {
    try {
        const ingredients = req.body.ingredients;
        const userRequest = req.body.userRequest;

        if(!ingredients) {
            res.send({result: 400, data: "ingredients is empty"});
            return;
        }

        if(!userRequest) {
            res.send({result: 400, data: "No user request"});
            return;
        }

        const userMessage = {
            role: "user",
            content: `I have the following ingredients:
            ${ingredients}
            
            I want to ${userRequest}. can you modify my ingredients list
            to do this? Only respond with a list of ingredients. give no explanation.`
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [userMessage],
            max_tokens: 200,
            temperature: 0,
        });

        return res.status(200).json({
            message: "success",
            data: response.choices[0].message
        });
        
        res.send({ result: 200, data: recipe });
    } catch (err) {
        res.send({ result: 500, error: err.message });
    }
};

module.exports = {
    getIngredientsChange
};
