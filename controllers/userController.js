const User = require('../models/userModel');

const addMovieToMyList = async (req, res) => {
  try {
    const { email, data } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const { myList } = user;

      const movie = myList.find(({ id }) => id === data.id);

      if (!movie) {
        await User.findByIdAndUpdate(
          user._id,
          {
            myList: [...myList, data],
          },
          {
            new: true,
          }
        );
      } else {
        return res
          .status(400)
          .json({ message: 'Movie is already in your list' });
      }
    } else {
      await User.create({ email, myList: [data] });
    }

    return res.json({ message: 'Movie added to your list' });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getMyListMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (user) res.json({ message: 'Success', movies: user.myList });
    else res.json({ message: 'User with this email does not exist' });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

const deleteMovieFromMyList = async (req, res) => {
  try {
    const { email, movieId } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const { myList } = user;
      const index = myList.findIndex(({ id }) => +id === +movieId);

      if (index !== -1) {
        const myNewList = [
          ...myList.slice(0, index),
          ...myList.slice(index + 1),
        ];
        await User.findByIdAndUpdate(user._id, {
          myList: myNewList,
        });

        return res.json({
          message: 'Movie removed from your list',
          movies: myNewList,
        });
      } else {
        return res.json({
          message: 'Movie is not in your list',
          movies: myList,
        });
      }
    } else {
      return res.json({ message: 'User with this email does not exist' });
    }
  } catch (error) {
    return res.json({ message: error.message });
  }
};

module.exports = { addMovieToMyList, getMyListMovies, deleteMovieFromMyList };
