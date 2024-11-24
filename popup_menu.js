const GEMINI_API_KEY = "";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

let btnGemini = document.getElementById("btn_gemini");
let inputText = document.getElementById("input_text");
let resultText = document.getElementById("result_text");
let loading = document.getElementById("loading");

btnGemini.addEventListener("click", () => {
    btnGemini.disabled = true;
    loading.style.display = 'block';
    fetch(GEMINI_API_URL, {
        method: "POST",
        body: JSON.stringify({
            contents: [{
                parts:[{
                    text: `
                    You are an intelligent AI assistant names APti AI, designed to help users solve aptitude questions. Follow these steps to provide a comprehensive response:
                    
                       **Question:** ${inputText.value}  
                       your task is to generate answer for the question mentioned above to help student learn well for aptitude exams.        
                        steps to calculate the correct answer.
                        1. find the formula to solve the question.
                        2. substitute all the values in the formula.
                        3. carefully compute the result.
                        4. return the result.

                        repeat the step few times and check the answer for the answer that is generated most of the time and return that answer.
                        if the generated final answer is not within the given option list. iterate few more times and check again. Even then the answer is not in the list is when you can return not in the list of options as a response.
                       while you respond do not include the heading likedentify the type of question etc.
                       add only the necessary side heading like What type of aptitude question. Is it addition, propability, percentage etc. 
                       add Fomula to solve the solve the problem.
                       add hints like hint1, hint2 etc.
                       finally the actual answer.
                       The final answer will always within the given list of options. so make to sure the generated one is within the option list.
                  `
                }]
            }]
        }),
    })
    .then((response) => {
        return response.json();
    })
    .then((result) => {
        btnGemini.disabled = false;
        loading.style.display = 'none';
        resultText.innerText = result["candidates"][0]["content"]["parts"][0]["text"];
    });
});
