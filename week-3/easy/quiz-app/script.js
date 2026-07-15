const quizData = [{
    "question": "Which language runs in a web browser?",
    "a": "Java",
    "b": "C",
    "c": "Python",
    "d": "JavaScript",
    "correct": "d",
},
{
    "question": "What does CSS stand for?",
    "a": "Central Style Sheets",
    "b": "Cascading Style Sheets",
    "c": "Cascading Simple Sheets",
    "d": "Cars SUVs Sailboats",
    "correct": "b",
},
{
    "question": "What does HTML stand for?",
    "a": "Hypertext Markup Language",
    "b": "Hypertext Markdown Language",
    "c": "Hyperloop Machine Language",
    "d": "Helicopters Terminals Motorboats Lamborginis",
    "correct": "a",
},
{
    "question": "What year was JavaScript launched?",
    "a": "1996",
    "b": "1995",
    "c": "1994",
    "d": "none of the above",
    "correct": "b",
},]

const q = document.getElementById("quiz");

loadQuiz();

function loadQuiz() { 
    quizData.forEach( (quiz, index) => {
        const qdiv1 = document.createElement("div");
        qdiv1.classList.add("question-container");

        const qdiv2 = document.createElement("div");

		const qh3 = document.createElement("h3");
        qh3.innerText = quiz["question"];
        qh3.classList.add("question");

		const qarb1 = document.createElement("input");
        qarb1.classList.add("option");
		const qarb2 = document.createElement("input");
        qarb2.classList.add("option");
		const qarb3 = document.createElement("input");
        qarb3.classList.add("option");
        const qarb4 = document.createElement("input");
        qarb4.classList.add("option");

        qarb1.type = "radio";
		qarb2.type = "radio";
		qarb3.type = "radio";
        qarb4.type = "radio";

        qarb1.name = `Q-${index}-options`;
        qarb2.name = `Q-${index}-options`;
        qarb3.name = `Q-${index}-options`;
        qarb4.name = `Q-${index}-options`;

        qarb1.value = "a"
        qarb2.value = "b"
        qarb3.value = "c"
        qarb4.value = "d"

        qarb1.id = `Q-${index}-option-a`;
        qarb2.id = `Q-${index}-option-b`;
        qarb3.id = `Q-${index}-option-c`;
        qarb4.id = `Q-${index}-option-d`;

        const qlabel1 = document.createElement("label");
        qlabel1.classList.add("option-label");
        const qlabel2 = document.createElement("label");
        qlabel2.classList.add("option-label");
        const qlabel3 = document.createElement("label");
        qlabel3.classList.add("option-label");
        const qlabel4 = document.createElement("label");
        qlabel4.classList.add("option-label");

        qlabel1.setAttribute("for", `Q-${index}-option-a`);
        qlabel2.setAttribute("for", `Q-${index}-option-b`);
        qlabel3.setAttribute("for", `Q-${index}-option-c`);
        qlabel4.setAttribute("for", `Q-${index}-option-d`);
        
        qlabel1.innerText = quiz["a"];
        qlabel2.innerText = quiz["b"];
        qlabel3.innerText = quiz["c"];
        qlabel4.innerText = quiz["d"];

        qdiv2.appendChild(qarb1);
        qdiv2.appendChild(qlabel1);
        qdiv2.appendChild(qarb2);
        qdiv2.appendChild(qlabel2);
        qdiv2.appendChild(qarb3);
        qdiv2.appendChild(qlabel3);
        qdiv2.appendChild(qarb4);
        qdiv2.appendChild(qlabel4);

        qdiv1.appendChild(qh3);
        qdiv1.appendChild(qdiv2);
        
        q.appendChild(qdiv1);
    });
}

const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", () => { 
    document.querySelectorAll(".question-container").forEach( (q, index) => {
        const selectedOption = document.querySelector(`input[name="Q-${index}-options"]:checked`);
        if (selectedOption) {
            const answer = selectedOption.value;
            if (answer === quizData[index].correct) {
                q.style.backgroundColor = "lightgreen";
            } else {
                q.style.backgroundColor = "lightcoral";
            }
        } else {
            q.style.backgroundColor = "lightgray"; // No option selected
        }
    });
});