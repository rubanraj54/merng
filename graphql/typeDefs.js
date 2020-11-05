const { gql } = require("apollo-server");

module.exports = gql`
    type Post {
        id: ID!
        body: String!
        username: String!
        createdAt: String!   
    }
    type User {
        id: ID!
        username: String!
        token: String!
        email: String!
        createdAt: String!
    }
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Query {
        getPosts: [Post]
    }
    type Mutation {
        registerUser(registerInput: RegisterInput): User!
    }
`;