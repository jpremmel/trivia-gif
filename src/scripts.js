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
