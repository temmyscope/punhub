const requests = [
  {
    id: 1,
    bloodType: "B+",
    name: "Ronald Dixon",
    age: 24,
    gender: "Male",
    distance: 28,
    time: 12,
    priority: "high",
  },
  {
    id: 2,
    bloodType: "O-",
    name: "Kathy Bates",
    age: 19,
    gender: "Female",
    distance: 10,
    time: 22,
    priority: "low",
  },
  {
    id: 3,
    bloodType: "A+",
    name: "Edward Sanders",
    age: 6,
    gender: "Male",
    distance: 15.3,
    time: 24,
    priority: "high",
  },

];
const user = {
  avatar: require('./assets/avatar.png')
};

export { requests, user }