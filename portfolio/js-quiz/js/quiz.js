'use strict';
var quizApp = (function() {
    var questions = {
        totalTime: 45,
        default:{},
        questions:[
            {
                id: 1,
                type: "checkbox", // radio, boolean, text, gap
                title: "Title1",
                description: "Description",
                choices: ["First", "Second", "Third", "Fourth"]
            },
            {
                id:2,
                type: "radio",
                title: "Title1",
                description: "Description",
                choices: ["First", "Second", "Third", "Fourth"]
            },
            {
                id:3,
                type: "boolean",
                title: "Title1",
                description: "Description",
                choices: ["First", "Second", "Third", "Fourth"]
            },
            {
                id:4,
                type: "text",
                title: "Title1",
                description: "Description"

            },
            {
                id:5,
                type: "gap",
                title: "Title1",
                description: "Description1 <span class='quiz-app-gap'></span> description2"
            }
        ]
    };
    var answers = {
        questions:[
            {id:1},
            {id:2},
            {id:3}
        ]
    };

    var components = {};
    var state = {};
    var init = function() {
        // initialize screen elements
        components.root = $("#quiz-app-components");
        if(components.root.length === 0){
            console.error("#quiz-app-components not found");
            return;
        }
        components.header = $(".quiz-app-header", components.root);
        components.footer = $(".quiz-app-footer", components.root);
        components.start = $(".quiz-app-start", components.root);
        components.finish = $(".quiz-app-finish", components.root);
        components.question = $(".quiz-app-question", components.root);

        components.app = $("#quiz-app");

        components.app.append(components.header).append(components.start).append(components.footer);

        $(".quiz-app-questions-navbar", components.app).hide();
        $(".quiz-app-start-button", components.app).click(startQuiz);
    };

    var startQuiz = function(){
        initGlobalTimer();
        showQuestion(questions.questions[0]);
    };

    var choicesRenderer = {
        checkbox: function(question){
            var html = "";
            for(var i = 0; i < question.choices.length; i++){
                html += '<li><div class="checkbox"><label><input type="checkbox" value="quiz-app-choice-id-' + i + '">' + question.choices[i] + '</label></div></li>';
            }
            html = "<ol>" + html + "</ol>";
            $(".quiz-app-question-choices", components.app).html(html);
        },
        radio: function(question){
            var html = "";
            for(var i = 0; i < question.choices.length; i++){
                html += '<li><div class="radio"><label><input type="radio" name="quiz-app-choice-radio" value="quiz-app-choice-id-' + i + '">' + question.choices[i] + '</label></div></li>';
            }
            html = "<ol>" + html + "</ol>";
            $(".quiz-app-question-choices", components.app).html(html);
        },
        boolean: function(question){
            var html = "";
            html += '<li><div class="radio"><label><input type="radio" name="quiz-app-choice-radio" value="quiz-app-choice-id-true">' + true + '</label></div></li>';
            html += '<li><div class="radio"><label><input type="radio" name="quiz-app-choice-radio" value="quiz-app-choice-id-false">' + false + '</label></div></li>';
            html = "<ol>" + html + "</ol>";
            $(".quiz-app-question-choices", components.app).html(html);
        },
        text: function(question){
            var html = "";
            html += '<li><input type="text" class="form-control" placeholder="Enter answer"></li>';
            html = "<ol>" + html + "</ol>";
            $(".quiz-app-question-choices", components.app).html(html);
        },
        gap: function(question){
            var html = "";

            var form = $('<form class="form-inline"></form>').append($(".quiz-app-question-description", components.app).html());
            $(".quiz-app-question-description", components.app).html("").append(form);
            html += '';
            html += '<input type="text" class="form-control" placeholder="Enter answer">';
            $(".quiz-app-gap", components.app).html(html);
        }
    }

    var initGlobalTimer = function(){
        var startTime = new Date();
        questions.totalSeconds = questions.totalTime * 60;
        state.globalTimer = setInterval(function(){
            var currentTime = new Date();

            var seconds = Math.round((currentTime.getTime() - startTime.getTime()) / 1000);
            seconds = questions.totalSeconds - seconds;
            if(seconds > 0){
                // format
                var mm = Math.floor(seconds / 60);
                if(mm < 10){
                    mm = "0" + mm;
                }
                var ss = seconds % 60;
                if(ss < 10){
                    ss = "0" + ss;
                }
                $(".quiz-app-globaltimer").html(mm + ":" + ss);
            } else {
                // time ends
                // todo close quiz
            }
        }, 1000);


    };

    var showQuestion = function(quesstion){
        components.app.html("");
        components.app.append(components.header).append(components.question.clone()).append(components.footer);
        $(".quiz-app-question-title", components.app).html(quesstion.title);
        $(".quiz-app-question-description", components.app).html(quesstion.description);
        choicesRenderer[quesstion.type](quesstion);
        var curQuestion = questions.questions.indexOf(quesstion);
        var clickAdapter = function(evt){
            showQuestion(evt.data.question)
        };
        if(curQuestion == 0){
            $(".quiz-app-prev-button", components.app).addClass("disabled");
        }else{
            $(".quiz-app-prev-button", components.app).click({question:questions.questions[curQuestion - 1]}, clickAdapter);
        }
        if(curQuestion == (questions.length - 1)){

        }else{
            $(".quiz-app-next-button", components.app).click({question:questions.questions[curQuestion + 1]}, clickAdapter);
        }

    };

    return {
        init: init
    };

})();

$(document).ready(function(){
    quizApp.init();
})