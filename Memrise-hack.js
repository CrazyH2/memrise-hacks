 // © Copyright 2022 CrazyH
 // This file was originally made by CrazyH
 // Do not rebrand if you are distributing it
 // © Copyright 2022 CrazyH

new (class {
    constructor() {
        if(location.host == "community-courses.memrise.com" && location.pathname == "/aprender/learn") {
            alert("Hacks enabled successfully!\n\n(c) 2024 CrazyH - Memrise Hacks");
            this.setup();
        } else if(location.host == "community-courses.memrise.com" && location.pathname.startsWith("/community/course/")) {
            var jsonData = {
                questions: {},
                answers: {}
            };
            var domElements = document.querySelectorAll(".row .things > .thing");

            for (const element of domElements) {
                var col_a = element.querySelector(".col_a > div").innerText;//.slice(0, -1);
                var col_b = element.querySelector(".col_b > div").innerText;//.slice(0, -1);
                jsonData.questions[col_a] = col_b;
                jsonData.answers[col_b] = col_a;
            };

            prompt("The json data is below. (Copy it)", JSON.stringify(jsonData));
        } else {
            alert("You need to be learning for the hacks!\n\n(c) 2024 CrazyH - Memrise Hacks");
        }
    };

    setup() {
        this.json = JSON.parse(prompt("Enter the json you copyied below!"));
        this.questions = this.json.questions;
        this.answers = this.json.answers;

        this.loop();
    };

    loop() {
        setInterval(() => {this.check(this);}, 20);
    };

    check(that) {
        if(!document.querySelector('h2[data-testid="learn-prompt-text"]')) return;

        var question = document.querySelector('h2[data-testid="learn-prompt-text"]').innerText;
        var answer = that.questions[question] ? that.questions[question] : that.answers[question];

        if (document.querySelector('h2[data-testid="learn-prompt-text"]').parentElement.parentElement.childNodes[1].querySelector('button[type="button"]')) that.multiChoiceAnswer(that, answer); // Multi-Choice Questions
        if (document.querySelector('input[data-testid="typing-response-input"]')) that.writingAnswer(that, answer); // Writing Questions
    };

    multiChoiceAnswer(that, answer) {
        var choices = document.querySelector('h2[data-testid="learn-prompt-text"]').parentElement.parentElement.childNodes[1].childNodes;
        for (const element of choices) {
            var txt = element.childNodes[0].childNodes[1].childNodes[0].innerText;
            if(txt == answer) console.log(txt);
            if(txt == answer) element.childNodes[0].style.background = "rgb(250, 183, 0)";
            if(txt == answer) element.childNodes[0].style.borderColor = "rgb(208, 152, 0)";
            if(txt == answer) element.childNodes[0].style.boxShadow = "0 4px 0 rgb(208, 152, 0)";
            //if(txt == answer) element.childNodes[0].click();
        };
    };

    writingAnswer(that, answer) {
        //document.querySelector('input[data-testid="typing-response-input"]').value = answer;
        document.querySelector('input[data-testid="typing-response-input"]').parentElement.parentElement.parentElement.childNodes[2].childNodes[1].childNodes[0].childNodes[0].childNodes[0].click();
        document.querySelector('input[data-testid="typing-response-input"]').setAttribute("placeholder", answer)
    };
})();
