import express from 'express';
import SlackController from './controllers/slackController';

const routes = express.Router()

routes.get('/', (request, response) => response.json({ status: "Server running on port 3333" }))
routes.get('/messages', SlackController.findConversation)

export default routes;
