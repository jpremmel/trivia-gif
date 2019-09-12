export function getTrivia(category, difficulty) {
  return new Promise(function(resolve, reject) {
    let url;
    if (category && difficulty) {
      url = `https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}`;
    } else if (!category && difficulty) { //if category is blank string ("any category"), it will eval to falsey. If there is a difficulty level, that evaluates to truthy
      url = `https://opentdb.com/api.php?amount=1&difficulty=${difficulty}`;
    } else if (category && !difficulty) {
      url = `https://opentdb.com/api.php?amount=1&category=${category}`;
    } else {
      url = `https://opentdb.com/api.php?amount=1`;
    }
    let request = new XMLHttpRequest();
    request.onload = function(){
      if(this.status === 200) {
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    }
    request.open("GET", url, true);
    request.send();
  });
}

export function getGif(topic) {
  return new Promise(function(resolve, reject) {
    let url = `http://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&rating=g&tag=${topic}`;
    let request = new XMLHttpRequest();
    request.onload = function(){
      if(this.status === 200) {
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    }
    request.open("GET", url, true);
    request.send();
  });
}

export function generateOptions(answerOptions, correctAnswer) {
  console.log(answerOptions);
  const number = Math.round(Math.random() * (answerOptions.length + 1));
  console.log(number);
  answerOptions.splice(number, 0, correctAnswer);
  console.log(answerOptions);
  return answerOptions;
}
