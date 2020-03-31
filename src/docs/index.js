import swagger from './swagger.json';
import signup from './auth/signup.json';
import signin from './auth/signin.json';

import uploadFiles from './files/uploadFiles.json';
import getFiles from './files/getFiles.json';
import getFilesByTag from './files/getFilesByTagId.json';
import getFilesBySector from './files/getFilesBySectorId.json';
import getFilesBySlug from './files/getFIlesBySlug.json';

import downloadFiles from './files/downloadFiles.json';

import updateFileBySlug from './files/updateFiles.json';

import deleteFileBySlug from './files/deleteFIles.json';

swagger.paths['/auth/signup'] = signup;
swagger.paths['/auth/signin'] = signin;

swagger.paths['/files/uploads'] = uploadFiles;

swagger.paths['/files'] = getFiles;
swagger.paths['/files/tags/{id}'] = getFilesByTag;
swagger.paths['/files/{slug}'] = getFilesBySlug;
swagger.paths['/files/sectors/{sectorId}'] = getFilesBySector;

swagger.paths['/files/downloads'] = downloadFiles;

swagger.paths['/files/{slug}'] = updateFileBySlug;

swagger.paths['/files/{slug}'] = deleteFileBySlug;

export default swagger;
