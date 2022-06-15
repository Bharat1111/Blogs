const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const user = require('../models/user')

const userCtrl = {
    signIn: async (req, res) => {
        const { email, password } = req.body

        try {
            const oldUser = await user.findOne({ email });

            if (!oldUser) return res.status(400).json({ message: "User doesn't exist" });

            const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

            if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

            const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, 'importantSecret', { expiresIn: "1h" });

            res.status(200).json({ result: oldUser, token });

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },

    signUp: async (req, res) => {
        const { firstName, lastName, email, password, confirmPassword } = req.body

        try {
            const oldUser = await user.findOne({email})

            if(oldUser) return res.status(400).json({msg: 'Email already exist'})

            if(password !== confirmPassword) return res.status(400).json({msg: 'Passwords do not match'})

            passwordHash = await bcrypt.hash(password, 12)

            const newUser = await user.create({ email, password: passwordHash, username: `${firstName} ${lastName}`})

            newUser.save()

            const token = jwt.sign({ email: newUser.email, id: newUser._id }, "importantSecret", { expiresIn: '1h' })

            res.json({result: newUser, token})

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
}

module.exports = userCtrl