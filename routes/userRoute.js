const {
  addMovieToMyList,
  getMyListMovies,
} = require('../controllers/userController');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

router.post('/add', addMovieToMyList);
router.get('/mylist/:email', getMyListMovies);

module.exports = router;
