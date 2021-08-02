var botId = "st-27c32688-cf92-5100-ab20-33fb86f9a0cc";
var botName = " BS_AD_MVP_Universal";
var InitialTask = "Welcome";
var EventTask = "Event";
var sdk = require("./lib/sdk");
const logger = require("./loggerconfig").getLogger();


module.exports = {
    botId: botId,
    botName: botName,

    on_user_message: function (requestId, data, callback) {
        logger.info("data message on user message is : " + JSON.stringify(data.message))
        var cdata;
        var lang = "";
        logger.info("customdata : " + JSON.stringify(data.context.session.BotUserSession))
        if (data.context.session.BotUserSession.lastMessage.messagePayload.customData) {
            logger.info("custom data exists: " + JSON.stringify(data.context.session.BotUserSession.lastMessage.messagePayload.customData))
            cdata = data.context.session.BotUserSession.lastMessage.messagePayload.customData;
            
            if (cdata.params.idioma)
            {
                lang = cdata.params.idioma
                if (lang == "ca-es") {
                    lang = "ca"
                }
                logger.info("setting to " + lang)
                data.metaInfo = {
                    "setBotLanguage": lang
                }
            }

            if (cdata.command)
            {
                switch (cdata.command)
                {
                    case "cmdInitChat" :
                        data.message = InitialTask
                        break;
                    case "cmdEventNotification" :
                        data.message = EventTask
                        break;
                }
            }

            data.context.session.BotUserSession.customData = {};
            data.context.session.BotUserSession.customData = data.context.session.BotUserSession.lastMessage.messagePayload.customData.params;
        }

        logger.info('user msg is : ' + data.message)
        sdk.sendBotMessage(data, callback)

        try {
            //Sends back the message to user
            logger.info("sending to the bot............." + JSON.stringify(data))
            logger.info("data message is : " + JSON.stringify(data.message))
            return sdk.sendBotMessage(data, callback);
        } catch (error) {
            logger.error("error while sending back bot message", error)
        }

        return ;
    },
    on_bot_message: function (requestId, data, callback) {
        try {
            //Sends back the message to user
            logger.info("responding to user............." + JSON.stringify(data.context.session.BotUserSession.customData))
            logger.info("data message is : " + JSON.stringify(data.message))
            return sdk.sendUserMessage(data, callback);
        } catch (error) {
            logger.error("error while sending back bot message", error)
        }
    },
    on_agent_transfer: function (requestId, data, callback) {
        return callback(null, data);
    },
    on_event: function (requestId, data, callback) {
        logger.info("on_event -->  Event : ", data.event);
        return callback(null, data);
    },
    on_alert: function (requestId, data, callback) {
        logger.info("on_alert -->  : ", data, data.message);
        return sdk.sendAlertMessage(data, callback);
    }

};


