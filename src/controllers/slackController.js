import axios from 'axios';


const SlackController = {
  async findConversation(request, response) {
    try {
      const slackResponse = await axios.get(
        'https://slack.com/api/conversations.list', {
        headers: {
          authorization: 'Bearer xoxb-token-here'
        }
      });

      const slackChannels = slackResponse.data.channels;
      let searchedChannel = {};

      for (const channel of slackChannels) {
        if (channel.name === "me-stalkeia-pf") {
          let conversationId = channel.id;
          searchedChannel = channel;

          console.log("Found conversation ID: " + conversationId);
          break;
        }
      }

      return response.json(searchedChannel);
    }
    catch (error) {
      console.error(error);
    }
  },

  async getMessagesFromChannel(request, response) {
    try {
      const slackResponse = await axios.get(
        'https://slack.com/api/conversations.history',
        {
          params: {
            channel: "conversation id here"
          },
          headers: {
            authorization: 'Bearer xoxb-token-here',
          },
        });

      const slackMessages = slackResponse.data.messages;
      return response.json(slackMessages);
    } catch (error) {
      console.log(error);
    }
  },

  async getIndividualMessageFromChannel(request, response) {
    try {
      const tsValue = request.params.ts;

      const slackResponse = await axios.get(
        'https://slack.com/api/conversations.history',
        {
          params: {
            channel: "conversation id here",
            latest: tsValue,
            limit: 1,
            inclusive: true
          },
          headers: {
            authorization: 'Bearer xoxb-token-here',
          },
        });

      const slackMessage = slackResponse.data.messages[0];
      return response.json(slackMessage);
    } catch (error) {
      console.log(error);
    }
  }
}

export default SlackController;