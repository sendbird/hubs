
import SendbirdChat from '@sendbird/chat';

import {
    GroupChannelModule,
} from '@sendbird/chat/groupChannel';


// SendbirdChat.setLogLevel(SendbirdChat.LogLevel.VERBOSE);

const sendbird = {
    sdk:null,
    currentChannel:null,
    currentMessage:"",
    channels:null,
    messages:[],
    getMessages: async (channel) => {
        const messageListParams = {};
        messageListParams.nextResultSize = 20;
        console.log('channel.getMessages', channel);
        const messages = await channel.getMessagesByTimestamp(0, messageListParams);
        console.log(messages);
        sendbird.messages = messages;



        return messages;
    },
    createUser: async (sessionId) => {
        console.log('session id ', sessionId)
      // set local suer info etc
      const response = await fetch("https://codesandbox.io/s/sad-banzai-bq84b4/user", {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({sessionId: sessionId, name: sessionId})
      })

      return response.json();

    },
    getChannels: async () => {
        const groupChannelQuery = sendbird.sdk.groupChannel.createPublicGroupChannelListQuery({ limit: 30, includeEmpty: true });
        const channels = await groupChannelQuery.next();
        sendbird.channels = channels;
        return sendbird.channels;
    },
    getSdk: async () => {
        if(sendbird.sdk){
            return sendbird.sdk;
        }
        const sendbirdChat = await SendbirdChat.init({
            appId: "6C1652F3-FD66-49F8-BA4C-0B7D53E132A0",
            localCacheEnabled: false,
            modules: [new GroupChannelModule()]
        });
        sendbird.sdk = sendbirdChat;
        return sendbirdChat;
    }
}

export default sendbird;