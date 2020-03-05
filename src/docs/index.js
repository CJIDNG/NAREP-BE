import swagger from './swagger.json';
import signup from './auth/signup.json';
import signin from './auth/signin.json';


swagger.paths['/auth/signup'] = signup;
swagger.paths['/auth/signin'] = signin;

export default swagger;
