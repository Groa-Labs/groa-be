const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const landingRouter = require("../routers/landingPage-router");
const userRouter = require("../auth/users/users-router.js");
const uploadingRouter = require("../routers/uploading-router.js");
const recommendationsRouter = require("../routers/recommendations-router.js");
const groaUserRatingRouter = require("../routers/groa-user-rating-router.js");
const groaWatchListRouter = require("../routers/groa-watchlist-router.js");
const movieRouter = require("../routers/movies-router.js");
const notwatchlistRouter = require('../routers/notwatchlist-router.js');
const serviceProviders = require('../routers/service-provider-router.js');
const removeWatchlistRouter = require('../routers/remove-watchlist-router.js');
const SearchRouter = require("../routers/search.js");
const authentincationRequired = require('../config/authenticationRequired');
const server = express();

server.use(helmet());
server.use(
  cors({
    origin: "*",
  })
);
server.use(express.json());

server.use("/docs", express.static("./docs"));
server.use(
  "/api/users",
  userRouter,
  notwatchlistRouter,
  removeWatchlistRouter,
  serviceProviders,
  landingRouter,

  // OKTA Route Protection middleware
  authentincationRequired,

  //GROA BE Routes
  uploadingRouter,
  recommendationsRouter,
  groaUserRatingRouter,
  groaWatchListRouter,
  movieRouter,
  SearchRouter,
);

/**
 * @api {get} /
 * @apiName Test if Server is Running
 * @apiGroup Server
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *
 *  "Welcome to the Backend of Groa"
 *
 * @apiErrorExample {string} Error-Response:
 *  HTTP/1.1 500
 *
 *  "Error: Couldn't connect to server"
 *
 */
server.get("/", authentincationRequired, (req, res) => {
  res
    .status(200)
    .json("Welcome to the Backend of Groa, if you see this you are AUTH");
});

module.exports = server;
