var botId = "st-6ea04684-464f-53bc-8e11-1346695bcefe";
var botName = " BS_AD_MVP_BancaDistancia";
var sdk = require("./lib/sdk");
const logger = require("./loggerconfig").getLogger();


module.exports = {
    botId: botId,
    botName: botName,

    on_user_message: function (requestId, data, callback) {

        var cdata;
        var lang = "";
        var initmsg = "";
        logger.info("customdata : " + JSON.stringify(data.context.session.BotUserSession))
        if (data.context.session.BotUserSession.lastMessage.messagePayload.customData) {
            logger.info("custom data exists: " + JSON.stringify(data.context.session.BotUserSession.lastMessage.messagePayload.customData))
            cdata = data.context.session.BotUserSession.lastMessage.messagePayload.customData;
            lang = cdata.params.idioma
            initmsg = "Welcome"
            data.message = "Welcome"

            data.context.session.BotUserSession.customData = {};

            //data.context.session.UserContext.customData.cmd = data.context.session.BotUserSession.lastMessage.messagePayload.customData.cmd;

            data.context.session.BotUserSession.customData = data.context.session.BotUserSession.lastMessage.messagePayload.customData.params;
        }

        logger.info('user msg is : ' + data.message)

        if (lang != "") {
            if (lang == "ca-es") {
                lang = "ca"
            }
            logger.info("setting to " + lang)
            data.metaInfo = {
                "setBotLanguage": lang
            }
        }
        if (data.message === "Hi") {
            data.message = "Hello";
            //Sends back 'Hello' to user.
            return sdk.sendUserMessage(data, callback);
        } else if (!data.agent_transfer) {
            //Forward the message to bot
            return sdk.sendBotMessage(data, callback);
        } else {
            data.message = "Agent Message";
            return sdk.sendUserMessage(data, callback);
        }
    },
    on_bot_message: function (requestId, data, callback) {
        if (data.message === 'hello') {
            data.message = 'The Bot says hello!';
        }
        //Sends back the message to user
        logger.info("responding to user............." + JSON.stringify(data.context.session.BotUserSession.customData))

        return sdk.sendUserMessage(data, callback);
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


