const { UserList, MovieList } = require("../data")
const _ = require("lodash")

const resolvers = {
  Query: {
    //* User Resolvers
    users() {
      return UserList
    },
    user(parent, args) {
      const id = args.id
      const user = _.find(UserList, {
        id: Number(id),
      })
      return user
    },

    //* Movie Resolvers
    movies() {
      return MovieList
    },
    movie(parent, args) {
      const name = args.name
      const movie = _.find(MovieList, {
        name,
      })
      return movie
    },
  },
  User: {
    favoriteMovies() {
      return _.filter(
        MovieList,
        (movie) => movie.year >= 2000 && movie.year <= 2015
      )
    },
  },
  Mutation: {
    createUser(parent, args) {
      const user = args.input
      const lastId = UserList[UserList.length - 1].id
      user.id = lastId + 1
      UserList.push(user)
      console.log(user)
      return user
    },
    updateUser(parent, args) {
      const { id, name, username, nationality } = args.input
      let updatedUser
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.name = name
          user.username = username
          user.nationality = nationality
          updatedUser = user
        }
      })
      console.log(updatedUser)
      return updatedUser
    },
  },
}

module.exports = { resolvers }
