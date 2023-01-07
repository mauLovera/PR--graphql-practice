const UserList = [
  {
    id: 1,
    name: "Mark",
    username: `Mark123`,
    age: 18,
    nationality: "US",
    friends: [
      {
        id: 2,
        name: "Joan",
        username: `Joan123`,
        age: 38,
        nationality: "GERMANY",
      },
      {
        id: 3,
        name: "John",
        username: `John123`,
        age: 44,
        nationality: "SPAIN",
      },
    ],
  },
  {
    id: 2,
    name: "Joan",
    username: `Joan123`,
    age: 38,
    nationality: "GERMANY",
  },
  {
    id: 3,
    name: "John",
    username: `John123`,
    age: 44,
    nationality: "SPAIN",
  },
]

const MovieList = [
  {
    id:  1,
    name: 'Interstellar',
    year: '2018',
    inTheaters: false
  },
  {
    id:  2,
    name: 'Avengers',
    year: '2016',
    inTheaters: false
  },
  {
    id:  3,
    name: 'Shrek',
    year: '2007',
    inTheaters: true
  },
]

module.exports = {
  UserList,
  MovieList,
}
