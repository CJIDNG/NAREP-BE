import swagger from './swagger.json';
import signup from './auth/signup.json';
import signin from './auth/signin.json';

import uploadFiles from './files/uploadFiles.json';
import getFiles from './files/getFiles.json';
import getFilesByTag from './files/getFilesByTagId.json';
import getFilesBySector from './files/getFilesBySectorId.json';

import downloadFiles from './files/downloadFiles.json';

swagger.paths['/auth/signup'] = signup;
swagger.paths['/auth/signin'] = signin;
swagger.paths['/files/uploads'] = uploadFiles;
swagger.paths['/files'] = getFiles;
swagger.paths['/files/tags/{id}'] = getFilesByTag;
swagger.paths['/files/sectors/{sectorId}'] = getFilesBySector;
swagger.paths['/files/downloads'] = downloadFiles;


export default swagger;
