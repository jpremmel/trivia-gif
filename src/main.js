import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { getTrivia, getGif, generateOptions } from "./scripts.js";

$(document).ready(function(){
  $("#trivia").submit(function(event){
    event.preventDefault();
    $(".answer-output").hide();
    $(".gif-output").hide();
    $("#show-options").hide();
    $(".answer-options").hide();
    let category = $("#categories").val();
    let difficulty = $("#difficulty").val();

    getTrivia(category, difficulty)
      .then(function(response) {
        const question = JSON.parse(response);
        if (question.results[0].type === "boolean") {
          $("#trivia-question").html(`<p>True or False: ${question.results[0].question}</p>`);
        } else {
          $("#trivia-question").html(`<p>${question.results[0].question}</p>`);
        }
        $(".trivia-output").show();
        if (question.results[0].type === "multiple") {
          let answerOptions = generateOptions(question.results[0].incorrect_answers, question.results[0].correct_answer);
          let answerList = answerOptions.join(" <br>");
          $(".answer-options").html(`${answerList}`);
          $("#show-options").show();
        }
        let answer = question.results[0].correct_answer;
        $(".answer-output").html(`<p><strong>Correct Answer: ${answer}</strong></p>`);
        let answerArray = answer.split(" ");
        return getGif(answerArray[0]);
      })
      .then(function(response) {
        let gifResponse = JSON.parse(response);
        let gif = gifResponse.data.images.downsized_medium.url;
        $(".gif-output").html(`<img src="${gif}">`);
        $("#show-options").click(function() {
          $(".answer-options").show();
        });
        $("#show-answer").click(function(){
        $(".answer-output").show();
        $(".gif-output").show();
        });
      });
  });
});
