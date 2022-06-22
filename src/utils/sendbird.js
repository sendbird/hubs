
import SendbirdChat from '@sendbird/chat';
import {
    OpenChannelModule,
    OpenChannelHandler,
    OpenChannelCreateParams,
    OpenChannelUpdateParams
} from '@sendbird/chat/openChannel';

import {
    GroupChannelModule,
} from '@sendbird/chat/groupChannel';

const sendbird = {
    sdk:null,
    createUser: () => {
        // call senbird hubs /user endpoint with name and session id

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
        return sendbirdChat;
    }
}

export default sendbird;