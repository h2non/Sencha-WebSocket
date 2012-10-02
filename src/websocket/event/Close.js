/**
 * Class implementing an abstraction of CloseEvent native Object.
 * 
 * This class is used internally by the library.
 * 
 * Note the native Object can change depending of the user agent.
 * 
 * See <http://www.w3.org/TR/2012/CR-websockets-20120920/#closeevent>
 * 
 * @class Ext.websocket.event.Close
 */
Ext.define('Ext.websocket.event.Close', {
    
    config: {
        
        /**
         * @cfg {Number} code
         * It represents the WebSocket connection close code provided by the server
         */
        code: 0,
        
        /**
         * @cfg {String} reason
         * It represents whether the connection closed cleanly or not.
         */        
        reason: "",
        
        /**
         * @cfg {Number} wasClean
         * It represents the WebSocket connection close reason provided by the server.
         */
        wasClean: false,
        
        /**
         * @cfg {Number} timestamp
         * Event creation timestamp
         */
        timestamp: 0,
        
        /**
         * @cfg {Object} WebSocket
         * The {@link Ext.websocket.WebSocket} instance
         */
        WebSocket: {},
        
        /**
         * @cfg {Number} id
         * Event identifier
         */
        id: 0,
        
        /**
         * @cfg {Object} event
         * Native CloseEvent user-agent Object
         */
        event: {}
    },
    
    /**
     * Class constructor
     * @param {Object} CloseEvent Object. Required
     * @param {Object} {@link Ext.websocket.WebSocket}. Required
     */
    constructor: function (CloseEvent, WebSocket) {
        
        Ext.websocket.event.Close.eventId++;

        this.initConfig({
            code: CloseEvent.code,
            reason: CloseEvent.reason,
            wasClean: CloseEvent.wasClean,
            WebSocket: WebSocket,
            timestamp: CloseEvent.timestamp || new Date().getTime(),
            event: CloseEvent,
            id: Ext.websocket.event.Close.eventId
        });
        
    },
    
    /**
     * Returns the code state standard string-mode
     * See {@link Ext.websocket.event.Close#closeCodes}
     * See <https://developer.mozilla.org/en-US/docs/WebSockets/WebSockets_reference/CloseEvent#Status_codes>
     * @return {String}
     */
    getCodeString: function () {
        var state = Ext.websocket.event.Close.closeCodes[this.getCode()];
        if (state === undefined)
            return 'UNKNOWN';
        else
            return state;
    },
    
    /**
     * Returns the text message description about the error
     * See {@link Ext.websocket.event.Close#closeCodes}
     * See <https://developer.mozilla.org/en-US/docs/WebSockets/WebSockets_reference/CloseEvent#Status_codes>
     * TODO: detect state code
     * @return {String}
     */
    getStateMessage: function () {
        var state = Ext.websocket.event.Close.stateMessage[this.getCode()];
        if (state === undefined)
            return 'Unknown state code "'+ this.getCode() +'". Probably the code is a reserved range or private server range';
        else
            return state;
    },
    
    statics: {
        
        /**
         * CloseEvent message
         * @static
         */
        eventId: 0,
        
        /**
         * @property {Object} closeCodes
         * Standard close event state code
         * See <https://developer.mozilla.org/en-US/docs/WebSockets/WebSockets_reference/CloseEvent#Status_codes>
         * @static
         */
        closeCodes: {
            1000: 'CLOSE_NORMAL',
            1001: 'CLOSE_GOING_AWAY',
            1002: 'CLOSE_PROTOCOL_ERROR',
            1003: 'CLOSE_UNSUPPORTED',
            1004: 'CLOSE_TOO_LARGE',
            1005: 'CLOSE_NO_STATUS',
            1006: 'CLOSE_ABNORMAL'
        },
        
        /**
         * @property {Object} stateMessage
         * Description message for the standard codes
         * See <https://developer.mozilla.org/en-US/docs/WebSockets/WebSockets_reference/CloseEvent#Close_codes>
         * @static
         */
        stateMessage: {
            1000: 'Normal closure; the connection successfully completed whatever purpose for which it was created.',
            1001: 'The endpoint is going away, either because of a server failure or because the browser is navigating away from the page that opened the connection.',
            1002: 'The endpoint is terminating the connection due to a protocol error.',
            1003: 'The connection is being terminated because the endpoint received data of a type it cannot accept (for example, a text-only endpoint received binary data).',
            1004: 'The endpoint is terminating the connection because a data frame was received that is too large.',
            1005: 'No status code was provided even though one was expected.',
            1006: 'The connection was closed abnormally (that is, with no close frame being sent) when a status code is expected.'
        }
    }
    
});