const $ = require('jquery');

/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

//populates Movie List
getMovies().then((movies) => {
  // console.log('Here are all the movies:');
  $('#movies').html ("");
  let movieList = "";
  movies.forEach(({title, rating, id}) => {
    movieList += '<table>';
      movieList += '<tr>';
      movieList += '<th>Movies</th>';
      movieList += '<th>Rating</th>';
      movieList += '</tr>';
      movieList += '<tr>';
      movieList += `<td>${title}</td>`;
      movieList += `<td>${rating}</td>`;
      movieList += '</tr>';
      movieList += '</table>';
    // console.log(`id#${id} - ${title} - rating: ${rating}`);
  });
  $(movieList).appendTo('#movies')
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});

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