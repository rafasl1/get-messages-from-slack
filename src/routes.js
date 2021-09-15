import express from 'express';
import SlackController from './controllers/slackController';

const routes = express.Router()

routes.get('/', (request, response) => response.json({ status: "Server running on port 3333" }))
routes.get('/channels', SlackController.getChannels)
routes.get('/messages', SlackController.getMessagesFromChannel)
routes.get('/message/:ts', SlackController.getIndividualMessageFromChannel)

export default routes;
