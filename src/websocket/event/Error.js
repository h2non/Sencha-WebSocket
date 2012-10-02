/**
 * Class implementing an abstraction of EventListener native Object. 
 * 
 * This class is used internally by the library.
 * 
 * The native Object can change depending of the user agent.
 * 
 * Note: event under sofware designing, thinking for a future use
 * 
 * @class Ext.websocket.event.Error
 */
Ext.define('Ext.websocket.event.Error', {
    
    config: {
        
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
     * @param {Object} EventListener Object. Required
     * @param {Object} {@link Ext.websocket.WebSocket}. Required
     */
    constructor: function (ErrorEvent, WebSocket) {
        
        Ext.websocket.event.Error.eventId++;

        this.initConfig({
            WebSocket: WebSocket,
            timestamp: ErrorEvent.timestamp || new Date().getTime(),
            event: ErrorEvent,
            id: Ext.websocket.event.Error.eventId
        });
        
    },
    
    statics: {
        
        /**
         * ErrorEvent identifier
         * @static
         */
        eventId: 0
    }
    
});