/* eslint-disable import/prefer-default-export */
import fs from 'fs';
import model from '../database/models';
import { errorResponse, successResponse } from '../helpers/serverResponse';
import { createUniqueSlug } from '../helpers/utils';

global.appRoot = __dirname;
const {
  File, Sector,
} = model;

export const uploadFile = async (req, res, next) => {
  try {
    const {
      title, description, fileType, sector,
    } = req.body;
    const { id } = req.user;
    const findSector = await Sector.findOne({ where: { name: sector } });
    const { id: sectorId } = findSector;
    const file = `./${global.appRoot}/uploads/${req.file.filename}`;
    fs.rename(req.file.path, file, () => {
      File.create({
        title,
        description,
        fileType,
        sectorId,
        userId: id,
        slug: title,

      })
        .then((r) => {
          console.log(r);
          res.send(r.get({ plain: true }));
        });
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
