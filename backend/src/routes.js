import { Router } from 'express';

import RegisterController from './app/controllers/RegisterController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import CheckinController from './app/controllers/CheckinController';
import PlansController from './app/controllers/PlansController';
import HelpController from './app/controllers/HelpController';
import UserController from './app/controllers/UserController';

import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateSessionStore from './app/validators/SessionStore';
import validadeHelpStore from './app/validators/HelpStore';
import validateHelpUpdate from './app/validators/HelpUpdate';
import validadePlansStore from './app/validators/PlansStore';
import validatePlansUpdate from './app/validators/PlansUpdate';
import validadeRegisterStore from './app/validators/RegisterStore';
import validadeRegisterUpdate from './app/validators/RegisterUpdate';
import validadeStudentStore from './app/validators/StudentStore';
import validadeStudentUpdate from './app/validators/StudentUpdate';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', validateSessionStore, SessionController.store);

/**
 *
 * ROTAS DOS ALUNOS (ACESSO PÚBLICO VIA MOBILE)
 *
 * */

// Login
routes.get('/students/:student_id/login', StudentController.index);

// Checkin
routes.get('/students/:student_id/checkins', CheckinController.index);
routes.post('/students/:student_id/checkins', CheckinController.store);

// Ajuda
routes.get('/students/:student_id/help-orders', HelpController.index);
routes.post(
  '/students/:student_id/help-orders',
  validadeHelpStore,
  HelpController.store
);

/**
 *
 * ROTAS DOS ADMINISTRADORES (AUTENTICADO NA APLICAÇÃO WEB)
 *
 * */
routes.use(authMiddleware);

// Alunos
routes.get('/students/:id?', StudentController.index);
routes.post('/students', validadeStudentStore, StudentController.store);
routes.put('/students/:id', validadeStudentUpdate, StudentController.update);
routes.delete('/students/:id', StudentController.delete);

// Planos
routes.get('/plans/:id?', PlansController.index);
routes.post('/plans', validadePlansStore, PlansController.store);
routes.put('/plans/:id', validatePlansUpdate, PlansController.update);
routes.delete('/plans/:id', PlansController.delete);

// Inscrições
routes.get('/register/:id?', RegisterController.index);
routes.post('/register', validadeRegisterStore, RegisterController.store);
routes.put('/register/:id', validadeRegisterUpdate, RegisterController.update);
routes.delete('/register/:id', RegisterController.delete);

// Dúvidas dos Alunos
routes.post(
  '/help-orders/:id/answer',
  validateHelpUpdate,
  HelpController.update
);
routes.get('/help-orders/:id?', HelpController.index);

// Administradores da aplicação web
routes.post('/users', validateUserStore, UserController.store);
routes.put('/users', validateUserUpdate, UserController.update);

export default routes;
