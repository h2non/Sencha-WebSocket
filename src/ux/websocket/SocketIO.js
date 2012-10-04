/**
 * A wrapper class for Socket.IO client library. Used internally.
 * 
 * You must add the Socket.IO library at the HTML document, like this:
 * 
 * <script type="text/javascript" src="lib/socket.io.js"></script>
 * 
 * For more information about Socket.IO, see <http://socket.io/#how-to-use>
 * 
 * TODO
 * 
 * @class Ext.ux.websocket.SocketIO
 */
Ext.define('Ext.ux.websocket.SocketIO' , {
    
    /**
     * Support for events handling
     * @mixin Ext.mixin.Observable
     * @private
     */
    mixins: {
        observable: (Ext.ux.websocket.Version.isExt4) ? 'Ext.util.Observable' : 'Ext.mixin.Observable'
    },
    
    /**
     * Store the last close event Object. See {@link Ext.ux.websocket.event.Close}
     * See <http://www.w3.org/TR/2012/CR-websockets-20120920/#event-definitions>
     * @property {Object} closeEvent
     * @private
     */
    closeEvent: null,
    
    /**
     * Store the last message event Object. See {@link Ext.ux.websocket.event.Message}
     * See <http://www.w3.org/TR/2012/CR-websockets-20120920/#event-definitions>
     * @property {Object} messageEvent
     * @private
     */
    messageEvent: null,
    
    /**
     * @property {Number} socketId
     * The current socket counter ID
     * @readonly
     */
    socketId: 0,
    
    /**
     * Counter ID for the sended packets 
     * @property {Number} sendPacketId
     * @readonly
     */
    sendPacketId: 0,
    
    /**
     * {@link Ext.us.websocket.WebSocket} instance
     * @property {Ext.us.websocket.WebSocket} WebSocket
     * @private
     */ 
    WebSocket: null,
    
    /**
     * Socket.IO client library instance
     * @property {Object} SocketIO
     * @private
     */
    socketIO: null,
    
    /**
    * @event message
    * Fires each time a message is received.
    * @param {Ext.ux.websocket.SocketIO} 
    * @param {Ext.ux.websocket.event.Message}
    */
  
   /**
    * @event close
    * Fires after the socket was closed succesfully.
    * @param {Ext.ux.websocket.SocketIO} 
    */
  
   /**
    * @event connect
    * Fires after the socket connection was created succesfully.
    * @param {Ext.ux.websocket.SocketIO} 
    */
   
   /**
    * @event error
    * Fires after a socket error success.
    * @param {Ext.ux.websocket.SocketIO} 
    * @param {Ext.ux.websocket.event.Error} 
    */
    
   /**
    * @event disconnect
    * Fires after the socket was disconnected succesfully from the server.
    * @param {Ext.ux.websocket.SocketIO} 
    */
    
   /**
    * @event reconnect
    * Fires after the socket was succesfully reconnected to the server.
    * @param {Ext.ux.websocket.SocketIO} 
    */
    
    /**
     * Default config
     * @private
     */
    config: {
        
        /**
         * Object listeners config
         * @cfg {Object} listeners 
         */
        listeners: {},
        
        /**
         * Socket.IO Object options. See <https://github.com/LearnBoost/socket.io/wiki/_pages>
         * @cfg {Object} options
         */
        options: {}
    },
    
    /**
     * Class contructor
     * @param {Object} config Class config Object
     * @param {Ext.ux.websocket.WebSocket} WebSocket instance. Required
     * @param {Object} config. Required
     */
    constructor: function(config, WebSocket) {

        try {
            
            if (!this.statics.has)
                throw new Error ('Socket.IO client library in not loaded. Be sure is correctly called.');
            
            this.initConfig(config);
            
            if (Ext.ux.websocket.Version.isExt4) {

                // explicit events definition for ExtJS 4.0.x
                this.addEvents({
                    "connect" : true,
                    "close" : true,
                    "message" : true,
                    "error" : true,
                    "disconnect": true,
                    "reconnect": true
                });

            }
            
            // call mixin class constructor
            this.mixins.observable.constructor.call(this, this.config);
            
            // register the parent WebSocket instance
            this.WebSocket = WebSocket;
            
            // socket.io instance identifier
            Ext.ux.websocket.SocketIO.counter++;
            this.socketId = Ext.ux.websocket.SocketIO.counter;
            
            // creates the Socket.IO client
            this.socketIO = new io.Socket(WebSocket.getUrl(), WebSocket.getOptions() );

            // events
            var self = this;
            this.socketIO.on('connect', function(){
                self.onConnect();
            });
            this.socketIO.on('message', function(message) {
                self.onMessage(message);
            });
            this.socketIO.on('error', function(error){
                self.onError(error);
            });
            this.socketIO.on('close', function(close){
                self.onClose(close);
            });
            this.socketIO.on('disconnect', function(){
                self.onDisconnect();
            });
            this.socketIO.on('reconnect', function () {
                self.onReconnect();
            });
            
            this.connect();
            
        } catch (e) {
            throw new Error (e);
        }
    },

    /**
     * Connect the Socket.io client
     * @protected
     */
    connect: function() {
        this.socketIO.connect();
    },

    /**
     * Disconnect the Socket.io client
     * @protected
     */
    disconnect: function() {
        this.socketIO.disconnect();
    },

    /**
     * Send data to the Socket.IO server
     * @protected
     */
    send: function(message) {
        this.socketIO.send(message);
    },

    /**
     * @private
     */
    onConnect: function() {
        if (this.hasListener('connect'))
            this.fireEvent('connect', this);
    },

    /**
     * @private
     */
    onDisconnect: function() {
        if (this.hasListener('disconnect'))
            this.fireEvent('disconnect', this);
    },
    
    /**
     * @private
     */
    onReconnect: function () {
        if (this.hasListener('reconnect'))
            this.fireEvent('reconnect', this);
    },

    /**
     * @private
     */
    onClose: function(close) {
        if (this.hasListener('close'))
            this.fireEvent('close', this);
    },
    
    /**
     * @private
     */
    onError: function (error) {
        this.errorEvent = new Ext.ux.websocket.event.Error(error);
        if (this.hasListener('error'))
            this.fireEvent('error', this, this.errorEvent);
    },

    /**
     * @private
     */
    onMessage: function(message) {
        this.messageEvent = new Ext.ux.websocket.event.Message(message, this); 
        if (this.hasListener('message'))
            this.fireEvent('message', this, this.messageEvent);
    },
    
    /**
     * Returns the Socket.IO instance
     * @return {Object} Socket.IO instance
     */
    getSocketIO: function () {
        return this.socketIO;
    },
    
    statics: {
        
        /**
         * @property {Boolean}
         * @static
         * @readonly
         */
        has: ('io' in window && 'Socket' in window.io),
        
        /**
         * Socket.IO counter
         * @property {Number} socketId
         * @static
         * @readonly
         */
        counter: 0
    
    }
    
});