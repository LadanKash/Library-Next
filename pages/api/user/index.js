import bcrypt from 'bcryptjs';
import db from '../../../utils/db';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ message: 'Missing fields' });
  }

  await db.connect();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    await db.disconnect();
    return res.status(422).json({ message: 'User already exists' });
  }

  const hashedPassword = bcrypt.hashSync(password);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  const user = await newUser.save();
  await db.disconnect();

  res.status(201).json({
    message: 'User created',
    _id: user._id,
    name: user.name,
    email: user.email,
  });
}
