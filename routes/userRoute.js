const {
  addMovieToMyList,
  getMyListMovies,
  deleteMovieFromMyList,
} = require('../controllers/userController');

const router = require('express').Router();

router.post('/add', addMovieToMyList);
router.get('/mylist/:email', getMyListMovies);
router.put('/remove', deleteMovieFromMyList);

module.exports = router;
