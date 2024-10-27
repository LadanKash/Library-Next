
import bcrypt from 'bcryptjs';

const users = [
  {
    name: "admin",
    email: "admin@email.com",
    password: bcrypt.hashSync('12345', 10), // 10 salt rounds
    isAdmin: true,
  },
  {
    name: "User 1",
    email: "user1@email.com",
    password: bcrypt.hashSync('12345', 10), // 10 salt rounds
    isAdmin: false,
  },
  {
    name: "User 2",
    email: "user2@email.com",
    password: bcrypt.hashSync('12345', 10), 
    isAdmin: false,
  },
];

export default users;
