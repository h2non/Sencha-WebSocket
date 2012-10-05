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
 * @mixin Ext.mixin.Observable
 * @author Tomas Aparicio <tomas@rijndael-project.com>
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
     * Store the SocketEventNames. (for future use)
     * @property {Array} socketEventNames
     * @private
     */
    socketEventNames: [],
    
    /**
    * @event message
    * Fires each time a message data is received.
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
    * @event connect_failed
    * Fires after the socket connection was failed.
    * @param {Ext.ux.websocket.SocketIO} 
    */
   
   /**
    * @event reconnect_failed
    * Fires after the socket reconnection was failed.
    * @param {Ext.ux.websocket.SocketIO} 
    */
      
    /**
     * Default config
     * @private
     */
    config: {
        
        /**
         * Listeners Object config
         * @cfg {Object} listeners 
         */
        listeners: {},
        
        /**
         * Socket.IO emit events listeners
         * @cfg {Object} emitters 
         */
        emitters: {},
        
        /**
         * Socket.IO Object options. See <https://github.com/LearnBoost/socket.io/wiki/_pages>
         * @cfg {Object} options
         */
        options: {}
    },
    
    /**
     * Class contructor
     * @param {Object} config Class config Object. Required
     * @param {Ext.ux.websocket.WebSocket} WebSocket WebSocket instance. Required
     */
    constructor: function(config, WebSocket) {

        try {
            
            if (this.statics.has === false)
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
                    "reconnect": true,
                    "connect_failed": true,
                    "reconnecting": true,
                    "reconnect_failed": true
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
            this.socketIO = io.connect( WebSocket.getUrl(), WebSocket.getOptions() );
            
            // events
            var self = this;
            this.socketIO.on('connect', function(){
                self.onConnect();
            });
            this.socketIO.on('message', function(message) {
                self.onMessage(message);
            });
            this.socketIO.on('reconnecting', function () {
                self.onReconnecting();
            });
            this.socketIO.on('reconnect_failed', function () {
                self.onReconnectFailed();
            });
            this.socketIO.on('connect_failed', function (error) {
                self.onConnectFailed(error);
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
  
            
            var emitters = this.getEmitters();
            if (Ext.isObject(emitters)) {
                for (var event in emitters) {
                    this.socketIO.on(event, self.emitters[event]);
                    /*
                        self.onSocketEventEmit(event, arguments);
                        self.emitters[event].apply(self, arguments);
                    });*/
                }
            }
                        
        } catch (e) {
            throw new Error (e);
        }
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
     * @param {Object/String} data Data to send. Required
     * @param {String} event Server event name. Required
     * @protected
     */
    send: function(data) {
        this.socketIO.send(data);
    },

    /**
     * Emit to the Socket.IO server
     * @param {String} event Event name. Required
     * @param {Object/String} data Data to send. Required
     * @protected
     */
    emit: function(event, data) {
        this.socketIO.emit(event, data);
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
    onReconnecting: function () {
        if (this.hasListener('reconnecting'))
            this.fireEvent('reconnecting', this);
    },
    
    /**
     * @private
     */
    onReconnectFailed: function () {
        if (this.hasListener('reconnect_failed'))
            this.fireEvent('reconnect_failed', this);
    },

    /**
     * @private
     */
    onConnectFailed: function () {
        if (this.hasListener('connect_failed'))
            this.fireEvent('connect_failed', this);
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
    
    /*
    onSocketEventEmit: function (event, arguments) {
        console.log('Called event emit -> ' + event);
        if (this.hasListener('emit'))
            this.fireEvent('emit', this, event, arguments);
    },
    */
   
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