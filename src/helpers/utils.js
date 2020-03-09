/* eslint-disable import/prefer-default-export */
import slug from 'slug';

export const createUniqueSlug = (title) => `${slug(title, { lower: true })}-${Date.now()}`;
