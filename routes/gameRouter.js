const express = require('express')
const router = express.Router()
const uuidv4 = require('uuid').v4

let games = [
    {
        id: "adowb1b3bb",
        game: "League of Legends",
        description: "League of Legends is a team-based game with over 140 champions to make epic plays with."
    },
    {
        id: "kd7b9ks2nda",
        game: "PlayerUnknown's Battlegrounds",
        description: "PLAYERUNKNOWN'S BATTLEGROUNDS is a last-man-standing shooter being developed with community feedback."
    }
    ]
//d
router.get('/get-all-games', (req, res)=>{
    res.json({games})
})
//e
router.get('/get-game-by-id/:id', (req, res)=>{
    let response = {message: 'The game with that id does not exist, please check id'}
    games.forEach (item => {
        console.log(item, req.params.id)
        if(item.id === req.params.id){
            response = item
        }
    })
    res.json(response)
})
//extra
router.get('/get-game-by-name/:name', (req, res)=>{
    let response = {message: 'The game with that name does not exist, please check name'}
    games.forEach (item => {
        console.log(item, req.params.game)
        if(item.game === req.params.game){
            response = item
        }
    })
    res.json(response)
})


module.exports = router