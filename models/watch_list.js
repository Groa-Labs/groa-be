const db = require("../database/dbConfig.js");

module.exports = {
  addToWatchList,
  getWatchlist,
  getListItemById,
  removeMovieFromWatchList,
  getMovieByName,
  addUploadToWatchList,
};

async function addToWatchList(movie) {
  await db("user_watchlist")
    .select("*")
    .where("movie_id", movie.movie_id)
    .andWhere("user_id", movie.user_id)
    .then((watchlist) => {
      if (watchlist.length === 0) {
        return db("user_watchlist").insert(movie, "id");
      }
    });
}

/**
 * Returns an array of movie to watch by user_id with their posters
 * @param {number} user_id - user_groa_watchlist user_id
 * @returns [{movie},{movie},...]
 */
function getWatchlist(user_id) {
  return db("user_watchlist as wl")
    .innerJoin("movies as m", "wl.movie_id", "=", "m.movie_id")
    .select(
      "wl.id",
      "wl.date",
      "m.primary_title",
      "m.start_year",
      "m.description",
      "wl.user_id",
      "m.poster_url",
      "m.trailer_url",
      "m.genres",
      "m.movie_id"
    )
    .where("wl.user_id", user_id);
}

function getListItemById(id) {
  return db("user_watchlist").where("id", id).first();
}

function removeMovieFromWatchList(id) {
  return getListItemById(id).then(() => {
    return db("user_watchlist")
      .where({ id })
      .del()
      .then(() => "Success")
      .catch((err) => err);
  });
}

function getMovieByName(upload) {
  return db("movies as m")
    .select("movie_id")
    .where("primary_title", upload.primary_title)
    .andWhere("start_year", upload.start_year);
}

async function addUploadToWatchList(upload) {
  let movie_id = await getMovieByName(upload);
  await db("user_watchlist")
    .select("*")
    .where("movie_id", movie_id)
    .andWhere("user_id", upload.user_id)
    .then((watchlist) => {
      if (watchlist.length === 0) {
        return db("user_watchlist").insert(upload, "id");
      }
    });
}
