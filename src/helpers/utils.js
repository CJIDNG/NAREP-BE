import jwt, { verify } from 'jsonwebtoken';
import { hashSync, compareSync } from 'bcryptjs';
import { config } from 'dotenv';
import slug from 'slug';
import path from 'path';
import model from '../database/models';

const { Tag } = model;

config();

export const createToken = (payload) => jwt.sign(payload, process.env.SECRET, { expiresIn: '24H' });

export const verifyToken = (token) => verify(token, process.env.SECRET);

export const hashPassword = (password) => hashSync(password, 10);

export const comparePassword = (password, hashedPassword) => compareSync(password, hashedPassword);

export const createUniqueSlug = (title) => `${slug(title, { lower: true })}-${Date.now()}`;

export const createFileExtension = (filename) => {
  const extension = path.extname(filename || '').split('.');
  return extension[extension.length - 1];
};

export const findOrCreateTag = async (tag) => {
  const createdTag = await Tag.findOrCreate({
    where: {
      name: tag,
    },
    defaults: {
      name: tag,
    },
  })
    .spread((theTags) => theTags);
  return createdTag;
};


export const generateTag = async (tag, id) => {
  const tags = tag.split(',');
  tags.map(async (Eachtag) => {
    await findOrCreateTag(Eachtag).then((data) => {
      data.addFile(id);
    });
  });
};

export const pagination = (page = 1, pageLimit = 10) => {
  const [filePage, filePageLimit] = [page, pageLimit];
  const offset = (filePage - 1) * filePageLimit;
  const limit = filePageLimit;
  return {
    offset,
    limit,
  };
};
