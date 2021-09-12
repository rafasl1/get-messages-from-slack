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
  }

  // async getMessagesFromChannel(request, response) {

  // }
}

export default SlackController;