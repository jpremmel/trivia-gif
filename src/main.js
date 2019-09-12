import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { getTrivia } from "./scripts.js";

$(document).ready(function(){
  $("#trivia").submit(function(event){
    event.preventDefault();
    let category = $("#categories").val();
    let difficulty = $("#difficulty").val();
    let triviaQuestion = getTrivia(category, difficulty); // will return new instance of promise object
    triviaQuestion.then(function(response){
      const question = JSON.parse(response); //main nameless array in Postman
      console.log(question);
      if (question.results[0].type === "boolean") {
        $("#trivia-question").html(`<p>True or False: ${question.results[0].question}</p>`);
      } else {
        $("#trivia-question").html(`<p>${question.results[0].question}</p>`);
      }
      $(".trivia-output").show();
    });
  });
});
