/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies, getCinema} = require('./api.js');
const $ = require('jquery');


let movieRating;
let editRating;
let movieGenre;
let editGenre;
let removeMovie;

let omdbKey = omdbKey;

let recommendationArr = [];

//populates Movie List
const movies = () =>
  getMovies().then((movies) => {
      $('#movies').html ("");
      let movieList = "";
      movies.forEach(({title, rating, genre, poster, id}) => {
          movieList += `<div class = col-4>`;
            movieList += '<div class = card>';
                movieList += `<div class= card-body>`;
                  movieList += `<p>${title}</p>`;
                  movieList += `<p>${rating}</p>`;
                  movieList += `<p>${genre}</p>`;
                  movieList += `<p><img src="${poster}" alt="movie-poster"></p>`;
                  movieList += `</div>`;
            movieList += '</div>';
          movieList += '</div>';
        console.log(`id#${id} - ${title} - rating: ${rating} -genre ${genre}`);
      });

      $(movieList).appendTo('#movies');
          for (var i = 0; i < movies.length; i++) {
              if(movies[i].rating == "⭐⭐⭐⭐⭐"){
                  recommendationArr.push(movies[i].title);
              }
          }

}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});
movies();



//Movie rating function
$("select#movieRating").change(function(){
  movieRating = $(this).children("option:selected").val();
  // movieRating.then($("#submit").removeAttr("disabled"));
});


//editing star ratings
$("select#editRating").change(function(){
  editRating = $(this).children("option:selected").val();
});

//adding genre

$("select#movieGenre").change(function(){
    movieGenre = $(this).children("option:selected").val();
    movieGenre.then($("#submit").removeAttr("disabled"));
});

//editing genre

$("select#editGenre").change(function(){
    editGenre = $(this).children("option:selected").val();
    editGenre.then($("#editSubmit").removeAttr("disabled"));
});


//updating movie list
$('#submit').click(function(e){
  e.preventDefault();
  const movieTitle = $('#movieName').val();
  let poster;
  return fetch(`http://www.omdbapi.com/?s=${movieTitle}&r=json&apikey=` + `omdbKey`)
    .then(response => response.json())
        .then(data => {
            poster = data.Search[0].Poster;
            let submittedMovies = {
                title: movieTitle,
                rating: movieRating,
                genre: movieGenre,
                poster: poster
            };
            const url = '/api/movies';
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submittedMovies)
            };
            fetch(url, options)
                .then(movies)
                .then(editMovies)
                .then(removeMovies);
            $('#movieName').val('');
            $('#movieRating').val('');
            $('#movieGenre').val('');
        });
});


//edit rating for movies
let editMovie;
const editMovies = () =>
    getMovies().then((movies) => {
      console.log("Can you see the movies?");
      $('#editMovies').html('');
      let movieEdit = "<option>Select a Movie</option>";
      movies.forEach(({title, rating}) => {
        movieEdit += `<option value="${title}">${title}</option>`;
      });
      $(movieEdit).appendTo('#editMovies');
    })
    //for editing movies option
        .then($("select#editMovies").change(function(){
          editMovie = $(this).children('option:selected').val();
          console.log(editMovie)
        }))
        .catch((error) => {
          console.log(error);
        });
editMovies();
// if(editMovie && editGenre && editRating === true){
// .then($("#editSubmit").removeAttr("disabled"));
// };

//update with new rating
$('#editSubmit').click(function (e) {
  e.preventDefault();
  getMovies().then((moviesData) => {
    moviesData.forEach(({title, rating, genre, id}) => {
      if (editMovie ===  title) {
        const submittedMovies = {
          title: editMovie,
          rating: editRating,
            genre: editGenre
        };
        const url = '/api/movies/' + id;
        const options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(submittedMovies)
        };
        fetch(url, options)
            .then(movies)
            .then(editMovies)
            .then(removeMovies);
      }
    });
  });
});

//Movie deletion

const removeMovies = () =>
    getMovies().then((movies) => {
      $('#removeMovies').html('');
      let movieDelete = "<option>Select a Movie</option>";
      movies.forEach(({title, rating, id}) => {
        movieDelete += `<option value="${title}">${title}</option>`;
      });
      $(movieDelete).appendTo('#removeMovies').then(('#removeSubmit'))
    })
        .then($("select#removeMovies").change(function(){
          removeMovie = $(this).children('option:selected').val();
          console.log(removeMovie)
        }))
        .catch((error) => {
          console.log(error);
        });
removeMovies();

//removal on submit
$('#removeSubmit').click(function(e){
  e.preventDefault();
  getMovies().then((moviesData) => {
    moviesData.forEach(({title, rating, genre, id}) => {
      if (removeMovie === title) {
        const submittedMovies = {
          title: title,
          rating: rating,
            genre: genre
        };
        const url = '/api/movies/' + id;
        const options = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(submittedMovies)
        };
        fetch(url, options)
            .then(movies)
            .then(editMovies)
            .then(removeMovies);
      }
    })
  })
});



$("#recommendation").on("click", function(e){
    console.log(e);
    let ourRecommendation = recommendationArr[Math.floor(Math.random() * recommendationArr.length)];
    console.log(ourRecommendation);
    $("#OFPCExclusive").text(ourRecommendation).css("color", "seashell");
});




