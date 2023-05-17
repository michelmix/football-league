import loginJoi from './joi/login.joi';
import middlewareHandler from './middlewareHandler';

export default middlewareHandler(loginJoi);
