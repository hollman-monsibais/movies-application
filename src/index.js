/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');
const $ = require('jquery');

let editMovie;
let movieRating;
let editRating;
let removeMovie;

//populates Movie List
getMovies().then((movies) => {
  // console.log('Here are all the movies:');
  $('#movies').html ("");
  let movieList = "";
  movies.forEach(({title, rating, id}) => {
        movieList += '<tr>';
          movieList += `<td>${title}</td>`;
          movieList += `<td>${rating}</td>`;
        movieList += '</tr>';
    console.log(`id#${id} - ${title} - rating: ${rating}`);
  });
  $(movieList).appendTo('#movies')
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});
movies();

//Movie rating function
$("select#movieRating").change(function(){
  movieRating = $(this).children("option:selected").val();
  movieRating.then($("#submit"));
});

//editing star ratings
$("select#editRating").change(function(){
  editRating = $(this).children("option:selected").val();
});

//updating movie list
$('#submit').click(function(e){
  e.preventDefault();
  const movieTitle = $('movieName').val();
  const submittedMovies = {
    movieTitle,
    movieRating
  };
  const url = '/api/movies';
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(submittedMovies)
  };
  fetch(url, options)
      .then(movies)
      .then(editMovies)
      .then(deleteMovies);
  $('#movieName').val('');
  $('#movieRating').val('');
});


//edit rating for movies
const editMovies = () =>
    getMovies().then((movies) => {
      console.log("Can you see the movies?");
      $('#editMovies').html('');
      let movieEdit = "<option>Select a Movie</option>";
      movies.forEach(({title, rating}) => {
        movieEdit += `<option value="${title}">${title}</option>`;
      });
      $(movieEdit).appendTo('#editMovies').then($("#editSubmit"))
    })
    //for movies option
        .then($("select#editMovies").change(function(){
          editMovie = $(this).children('option:selected').val();
          console.log(editMovie)
        }))
        .catch((error) => {
          console.log(error);
        });
editMovies();



// const url = '../db.json';
// const options = {
//   method: 'GET',
//   // movies,
//   body: JSON.stringify(getMovies),
//
// };
// fetch(url, options)
// let html = ''

//
//       movies.forEach(function(movie){
//
//       }))