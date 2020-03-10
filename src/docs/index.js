import swagger from './swagger.json';
import signup from './auth/signup.json';
import signin from './auth/signin.json';

import uploadFiles from './files/uploadFiles.json';

swagger.paths['/auth/signup'] = signup;
swagger.paths['/auth/signin'] = signin;
swagger.paths['/files/uploads'] = uploadFiles;

export default swagger;
