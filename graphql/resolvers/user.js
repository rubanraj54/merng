const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const {UserInputError} = require('apollo-server');

module.exports = {
    Mutation: {
        registerUser: async (_, payload) => {
            try {
                const {
                    username,
                    password,
                    confirmPassword,
                    email,
                } = payload.registerInput;
                
                const user = await User.findOne({email});
                if(user) {
                    throw new UserInputError('Username is taken', {
                        errors: {
                            email: 'email already exists'
                        }
                    })
                }
                const hashedPassword = await bcrypt.hash(password, 12);

                const newUser = new User({
                    email,
                    username,
                    password: hashedPassword,
                    createdAt: new Date().toISOString()
                })

                const res = await newUser.save();
                
                const token = jwt.sign({
                    id: res._id,
                    email: res.email,
                    username: res.username,
                }, 'fuck you', {expiresIn: '1h'});
                
                return {
                    ...res._doc,
                    id: res._id,
                    token,
                };

            } catch (error) {
                throw error;
            }
        }
    }
}