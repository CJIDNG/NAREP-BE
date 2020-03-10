import jwt, { verify } from 'jsonwebtoken';
import { hashSync, compareSync } from 'bcryptjs';
import { config } from 'dotenv';
import slug from 'slug';

config();

export const createToken = (payload) => jwt.sign(payload, process.env.SECRET, { expiresIn: '24H' });

export const verifyToken = (token) => verify(token, process.env.SECRET);

export const hashPassword = (password) => hashSync(password, 10);

export const comparePassword = (password, hashedPassword) => compareSync(password, hashedPassword);

export const decodeToken = (req) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = verifyToken(token);
  req.user = decoded;
  const { role } = req.user;
  return role;
};

export const createUniqueSlug = (title) => `${slug(title, { lower: true })}-${Date.now()}`;

export const createFileExtension = (mimeType) => {
  const extension = mimeType.split('/')[1];
  return extension;
};
