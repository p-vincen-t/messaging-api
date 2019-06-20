import { Router } from 'express';
import { UserController, ClientController, MessageController, GroupController } from 'app/controllers';
import { findUser, Client } from 'app/middlewares';

const router: any = Router();

// Users
router.group('/users', (router: Router) => {
    router.get('/', UserController.index);
    router.get('/:id', UserController.show);
    router.post('/', Client, UserController.store);
    router.post('/v2', Client, UserController.storeV2);
    router.post('/:type', Client, UserController.storeWithType);
    router.put('/:userId', [findUser], UserController.update);
    router.delete('/:userId', [findUser], UserController.destroy);
});

router.group('/clients', (router: Router) => {
    router.get('/', ClientController.index);
    router.get('/:_id', ClientController.show);
    router.post('/', ClientController.store);
    router.patch('/:_Id', ClientController.update);
    router.delete('/:_id', ClientController.destroy);
});

router.group('/groups', (router: Router) => {
    router.get('/', Client, GroupController.index);
    router.post('/', Client, GroupController.store);
    router.patch('/:_id', GroupController.update);
    router.delete('/:_id', GroupController.destroy);
});

router.group('/messages', (router: Router) => {
    router.post('/', Client, MessageController.store);
    router.post('/:type', Client, MessageController.storeWithType);
    router.post('/:type/:user', Client, MessageController.storeWithTypeForUser);
    router.get('/', MessageController.index);
    router.get('/:id', MessageController.show);
});

// Transaction
export default router;