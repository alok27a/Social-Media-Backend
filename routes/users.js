const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

const router = express()

// Update a user
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt)
                const user = await User.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                })
                res.status(500).json({ message: "Account has been updated" })
            } catch (error) {
                res.status(500).json({ message: error.message })
            }
        } else {
            res.status(500).json({ message: "You can only update your own account" })
        }
    }

})

// Delete a user
router.delete('/delete/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            await User.findByIdAndRemove(req.params.id)
            res.status(200).json({ message: "Account has been deleted" })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    } else {
        res.status(500).json({ message: "You can only delete your own account" })
    }
})

// Get a user
router.get('/get/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: "Cannnot fetch user details" })
    }
})


// Follow a user 
router.put('/:id/follow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } })
                await currentUser.updateOne({ $push: { following : req.params.id } })
                res.status(200).json( "User has been followed")
            } else {
                res.status(403).json("You already follow the user")
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    } else {
        res.status(500).json({ message: "Cannnot follow yourself" })
    }
})



// Unfollow a user
router.put('/:id/unfollow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } })
                await currentUser.updateOne({ $pull: { following : req.params.id } })
                res.status(200).json( "User has been unfollowed")
            } else {
                res.status(403).json("You already follow the user")
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    } else {
        res.status(500).json({ message: "Cannnot unfollow yourself" })
    }
})


module.exports = router