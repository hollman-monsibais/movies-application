module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json());
  }
};
// const submittedMovies = {
//   title: editMovie,
//   rating: editRating,
//   genre: editGenre
// };
// const url = '/api/movies';
// const options = {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(submittedMovies)
// };
// fetch(url, options)
//     .then(movies)
//     .then(editMovies)
//     .then(removeMovies);
//
// const url = '/api/movies/' + id;
// const options = {
//   method: 'PATCH',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(submittedMovies)
// };
// fetch(url, options)
//     .then(movies)
//     .then(editMovies)
//     .then(removeMovies);
//
// const url = '/api/movies/' + id;
// const options = {
//   method: 'DELETE',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(submittedMovies)
// };
// fetch(url, options)
//     .then(movies)
//     .then(editMovies)
//     .then(removeMovies);