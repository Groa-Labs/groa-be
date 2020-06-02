const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post('/watchlist/:id/remove/:movie_id', (req, res) => {
    const { id, movie_id } = req.params;
    axios
        .post(`https://ds.groa.us/watchlist/${id}/remove/${movie_id}`)
        .then((response) => {
            if (response.status === 200) {
                res.status(200).json(response.data.data)
            }
        }
        )
        .catch((error) => {
            res.status(500).json({
                errorMessage: 'could not delete from watchlist.'
            })
        })
})

module.exports = router;
