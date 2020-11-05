const postResolvers = require('./post.js')
const userResolvers = require('./user.js')

module.exports = {
    Query: {
        ...postResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation
    }
}