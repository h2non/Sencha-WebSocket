/**
 * Class implementing an abstraction of MessageEvent native Object. 
 * 
 * This class is used internally by the library.
 * 
 * Note the native Object can change depending of the user agent.
 * 
 * See <http://www.w3.org/TR/2012/CR-websockets-20120920/#closeevent>
 * 
 * @class Ext.websocket.event.Message
 */
Ext.define('Ext.websocket.event.Message', {
    
    config: {
        /**
         * @cfg {Number} data
         * It represents the WebSocket data emitted by the server
         */
        data: null,
        
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
         * Native MessageEvent user-agent Object
         */
        event: {}
    },
    
    /**
     * Class constructor
     * @param {Object} MessageEvent Object. Required
     * @param {Object} {@link Ext.websocket.WebSocket}. Required
     */
    constructor: function (MessageEvent, WebSocket) {
        
        Ext.websocket.event.Message.eventId++;

        this.initConfig({
            data: MessageEvent.data,
            WebSocket: WebSocket,
            timestamp: MessageEvent.timestamp || new Date().getTime(),
            event: MessageEvent,
            id: Ext.websocket.event.Message.eventId
        });
        
    },
    
    statics: {
        
        /**
         * CloseEvent message
         * @static
         */
        eventId: 0
    }
    
});