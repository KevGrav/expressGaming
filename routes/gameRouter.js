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
//d get all
router.get('/get-all-games', (req, res)=>{
    res.json({games})
})
//e get by id
router.get('/get-game-by-id/:id', (req, res)=>{
    let response = {message: "The game with that id does not exist, please check id"}
    games.forEach (item => {
        console.log(item, req.params.id)
        if(item.id === req.params.id){
            response = item
        }
    })
    res.json(response)
})
//or
// router.get('/get-game-by-id/:id', (req, res) => {
//     const foundId = games.findIndex(item => item.id === req.params.id);
//     if(foundId > -1){
//         res.json({foundGame: games[foundId]});
//     }else{
//         res.json({message: "The game with that ID does not exists, please check ID"})
//     }
// })


//extra get by name
router.get('/get-game-by-name/:name', (req, res)=>{
    let response = {message: "The game with that name does not exist, please check name"}
    games.forEach (item => {
        console.log(item, req.params.game)
        if(item.game === req.params.game){
            response = item
        }
    })
    res.json(response)
})
//or
// router.get('/get-game-by-name/:name', (req, res) => {
//     const foundName = games.findIndex(item => item.game === req.params.game);
//     if(foundName > -1){
//         res.json({foundName: games[foundName]});
//     }else{
//         res.json({message: "The game with that ID does not exists, please check ID"})
//     }
// })

//f create(post) new game, with all info
router.post('/create-new-game', (req, res) => {
    const newGame = req.body
    if(!newGame.game || !newGame.description){
        res.json({message: "cannot leave text area blank"})
    }else{
        let gameIndex = games.findIndex(item => item.game === newGame.game)
        console.log(gameIndex)
        if(gameIndex === -1){
            newGame.id = uuidv4()
            games.push(newGame)
            res.json(games)
        }else{
            console.log(gameIndex)
            res.json({message: "Game already exists, cannot add game"})
        }
    }
    // let newGame = {
    //     id : uuidv4(),
    //     game : req.body.game,
    //     description : req.body.description
    // }
    // games.push(newGame);
    // res.json({games});
})

//g update(PUT) game by id
router.put('/update-game/:id', (req, res) =>{
    const {game, description} = req.body
    //destructure the body to get necessary keys
    let updated = false //set boolean to false
    games.forEach(item => {
        if(item.id === req.params.id){
            item.game = game ? game : item.game
            item.description = description ? description : item.description
            updated = true //set boolean to true
        }
    })
    if(updated){
        res.json(games)
    }else{
        res.json({message: "Game not found, cannot update"})
    }
})


//h delete game by id
router.delete('/delete-game/:id', (req, res) => {
    const gameId = games.findIndex(item => item.id === req.params.id)
    if(gameId > -1){
        games.splice(gameId, 1)
        return res.json({games})        
    }else{
        res.json({message: "Game not found , cannot delete"})
    }
})

module.exports = router