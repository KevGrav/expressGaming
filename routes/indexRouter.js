const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    res.json({message: "welcome to Games info App"})
})

module.exports = router
