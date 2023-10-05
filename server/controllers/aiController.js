"use strict";

const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
});

const model = "gpt-3.5-turbo";
const temperature = 0.1;

const ingredientsResponse = async (req, res) => {
    try {
        const ingredients = req.body.content;
        const userRequest = req.body.userRequest;
        console.dir(req.body)

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
            to do this?`
        }

        const response = await openai.chat.completions.create({
            model: model,
            messages: [userMessage],
            max_tokens: 200,
            temperature: temperature,
        });

        res.send({ result: 200, data: response.choices[0].message });
    } catch (err) {
        res.send({ result: 500, error: err.message });
    }
};

const methodResponse = async (req, res) => {
    try {
        const content = req.body.content;
        const userRequest = req.body.userRequest;
        console.dir(req.body)

        if(!content) {
            res.send({result: 400, data: "method is empty"});
            return;
        }

        if(!userRequest) {
            res.send({result: 400, data: "No user request"});
            return;
        }

        const userMessage = {
            role: "user",
            content: `I have the following method for a recipe:
            ${content}
            
            I want to ${userRequest}. can you modify my list of steps
            to do this?`
        }

        const response = await openai.chat.completions.create({
            model: model,
            messages: [userMessage],
            max_tokens: 200,
            temperature: temperature,
        });
        
        res.send({ result: 200, data: response.choices[0].message });
    } catch (err) {
        res.send({ result: 500, error: err.message });
    }
};

const descriptionResponse = async (req, res) => {
    try {
        const content = req.body.content;
        const userRequest = req.body.userRequest;
        console.dir(req.body)

        if(!content) {
            res.send({result: 400, data: "description is empty"});
            return;
        }

        if(!userRequest) {
            res.send({result: 400, data: "No user request"});
            return;
        }

        const userMessage = {
            role: "user",
            content: `I have the following description for a recipe:
            "${content}"
            
            I want to ${userRequest}. can you modify the description
            to do this?`
        }

        const response = await openai.chat.completions.create({
            model: model,
            messages: [userMessage],
            max_tokens: 200,
            temperature: temperature,
        });
        
        res.send({ result: 200, data: response.choices[0].message });
    } catch (err) {
        res.send({ result: 500, error: err.message });
    }
};

module.exports = {
    ingredientsResponse,
    methodResponse,
    descriptionResponse
};