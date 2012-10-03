/** 
 * @class Ext.ux.websocket.WebSocket
 * @mixin Ext.mixin.Observable
 * @author Tomas Aparicio <tomas@rijndael-project.com>
 * 
 * # Sencha WebSocket 
 *  
 * Sencha WebSocket is a WebSocket library for Sencha JavaScript frameworks.
 * 
 * It provides a lot of functionalities, extensible event-handling, full integration with Sencha core framework, abstraction from JavaScript native API and more...
 * 
 * ## What is WebSocket?
 * 
 * WebSocket is a web technology providing for bi-directional, full-duplex communications channels over a single TCP connection. 
 * WebSocket is designed to be implemented in web browsers and web servers, but it can be used by any client or server application. 
 * The WebSocket protocol is an independent TCP-based protocol. Its only relationship to HTTP is that its handshake is interpreted by HTTP servers as an Upgrade request.
 * The WebSocket protocol makes possible more interaction between a browser and a web site, facilitating live content and the creation of real-time applications.
 * 
 * More information: <http://en.wikipedia.org/wiki/WebSocket>
 * 
 * ## Features
 * 
 * - Full integration with the Sencha core framwork (see frameworks supported)
 * - Complete and extensible event-handling support
 * - General improves for better WebSocket API management
 * - Support for custom JSON-based packets
 * - Improved error handling
 * - Standard error messages
 * - Debugging
 * - Easy-to-use
 * - Well documented
 * 
 * ### TODO
 * 
 * - Limits/Performance
 * - Socket.io server-based support
 * - Strong exception error handling
 * - Support third-party application-level WebSocket protocols (such as WebSocket Application Messaging Protocol)
 * - Real apps examples
 *  
 * ### WebSocket JavaScript API specification 
 *    
 * The current implementation is based on the W3C JavaScript API specification dated 09.20.2012.
 * Note WebSocket protocol is under continuous development and improvement, so this means is still experimental.
 * 
 * See <http://www.w3.org/TR/2012/CR-websockets-20120920/> 
 * 
 * See <https://developer.mozilla.org/en-US/docs/WebSockets/WebSockets_reference/WebSocket>
 * 
 * The WebSocket procotol is standarized the IETF. See <http://tools.ietf.org/html/rfc6455>
 * 
 * ### Sencha frameworks support
 * 
 * - ExtJS 4.0.x
 * - ExtJS 4.1.x
 * - Sencha Touch 2.0.x
 * - Sencha Touch 2.1.x
 * 
 * In other words, is supported all Ext Core 4.x based-frameworks
 * 
 * ## Version
 * 
 * - Current release: 0.1.1 Beta (under development!)
 * 
 * `Take a look at the [CHANGELOG][http://localhost/#CHANGELOG.md] file for more information about versioning`
 * 
 * ## Browser support (RFC 6455 specification)
 * 
 * - Mozilla Firefox >= 11 | >= 6
 * - Google Chrome >= 16
 * - Opera >= 12.50
 * - Safari >= 6
 * - Internet Explorer >= 10
 * 
 * For more info about browsers support see <http://en.wikipedia.org/wiki/WebSocket#Browser_support>
 *  
 * # Usage
 * 
 * ## Installation
 * 
 * TODO
 * 
 * ## How to use
 * 
 * TODO
 * 
 * ## Server API
 * 
 * TODO
 * 
 * ## Library packet
 * 
 * TODO
 * 
 * ## Examples
 * 
 * TODO
 * 
 * # Documentation
 * 
 * TODO
 * 
 * # Author
 * 
 * - Tomas Aparicio <tomas@rijndael-project.com>
 * 
 * # Issues 
 * 
 * Feel free to report any issue you experiment via Github <https://github.com/h2non/Sencha-WebSocket>
 * Any [feedback](mailto:tomas@rijndael-project.com) is also welcome :)
 * 
 * # License
 * 
 * (C) 2012 Tomas Aparicio
 *  
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 */

Ext.define('Ext.ux.websocket.WebSocket', {
    
    /**
     * @property {String} alias
     * Class alias
     * @private
     */
    alias: 'websocket',
    
    /**
     * Require aditional classes
     * @property {Array} require
     * @private
     */
    require: [
        'Ext.ux.websocket.Version',
        'Ext.ux.websocket.event.Message',
        'Ext.ux.websocket.event.Close',
        'Ext.ux.websocket.event.Open',
        'Ext.ux.websocket.event.Error',
        'Ext.ux.websocket.Packet'
    ],
    
    /**
     * Support for events handling
     * @mixin Ext.mixin.Observable
     * @private
     */
    mixins: {
        observable: (Ext.ux.websocket.Version.isExt4) ? 'Ext.util.Observable' : 'Ext.mixin.Observable'
    },
        
    /**
     * The native WebSocket instance
     * @property {WebSocket} WebSocket 
     * @private
     */ 
    ws: null,
    
    /**
     * @property {Number} socketId
     * The current socket counter ID
     */
    socketId: 0,
    
    /**
     * Counter ID for the sended packets 
     * @property {Number} sendPacketId
     */
    sendPacketId: 0,
    
    /**
     * Counter ID for the received packets 
     * @property {Number} receivedPacketId
     * @private
     */
    receivedPacketId: 0,
    
    /**
     * WebSocket connection code status
     * @property {Number} status
     * @private
     */
    status: 0,
    
    /**
     * Enable verbose mode, must be disabled on production environment
     * @property {Boolean} debug 
     * @private
     */
    debug: false,
    
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
     * Store the last error event Object. See {@link Ext.ux.websocket.event.Error}
     * See <http://www.w3.org/TR/2012/CR-websockets-20120920/#event-definitions>
     * @property {Object} errorEvent
     * @private
     */
    errorEvent: null,
    
    /**
     * Store the last open event Object. See {@link Ext.ux.websocket.event.Open}
     * See <http://www.w3.org/TR/2012/CR-websockets-20120920/#event-definitions>
     * @property {Object} openEvent
     * @private
     */
    openEvent: null,
    
    // todo
    lastError: null,
    connectionLost: false,
    connectionClosed: false,
    clientConnectionClosed: false,
    
    /**
     * Alias for {@link Ex.ux.websocket.Manager} class
     * @property {Ext.ux.websocket.Manager} manager
     * @readonly
     */
    manager: Ext.ux.websocket.Manager,
    
    /**
     * @property {Object} Default class config
     * @private
     */
    config: {
        
        /**
         * @cfg {Boolean} socketIo
         * Is a socket.io server
         */
        socketIo: false,
        
        /**
         * @cfg {Boolean} secure
         * Secure WebSocket (SSL)
         */
        secure: Ext.isSecure,
        
        /**
         * @cfg {Boolean} debug
         * Enables the console debbuging
         * See {@link Ext.ux.websocket#debug}
         */
        debug: false,
        
        /**
         * @cfg {String} type
         * The type of WebSocket instance. Possible values: 'server' or 'client'.
         */
        type: 'server',
        
        /**
         * @cfg {String} server
         * WebSocket server API type
         */
        server: 'default',

        /**
         * @cfg {Object} params
         * HTTP request params. The Proxy and its Writer have access to and can modify this object.
         */
        params: null,

        /**
         * @cfg {String} url
         * The url to access on this Request.
         */
        url: null,
        
        /**
         * @cfg {String} protocol
         * The WebSocket protocol 
         */
        protocol: (Ext.isSecure) ? 'wss' : 'ws',
        
        /**
         * @cfg {String} host
         * Server hostname (e.g localhost)
         */
        host: null,
        
        /**
         * @cfg {Number} port
         * WebSocket server TCP port
         */
        port: 80,

        /**
         * @cfg {Object} callback
         * Default callback function
         */
        callback: null,

        /**
         * @cfg {Number} timeout
         * Socket maximum timeout in miliseconds
         */
        timeout: 15000,
        
        /**
         * @cfg {Object} listeners
         * Event listeners config Object
         */
        listeners: {}
    },
  
   /**
    * @event message
    * Fires each time a message is received.
    * @param {Ext.ux.websocket.event.Message} 
    */
  
   /**
    * @event close
    * Fires after the socket was closed succesfully.
    * @param {Ext.ux.websocket.event.Close} 
    */
  
   /**
    * @event open
    * Fires after the socket connection was created succesfully.
    * @param {Ext.ux.websocket.event.Open} 
    */
   
   /**
    * @event error
    * Fires after a socket error success.
    * @param {Ext.ux.websocket.event.Error} 
    */
    
    /**
     * Creates the WebSocket object.
     * @param {Object} [config] Config object.
     */
    constructor: function (config) {
        try {
            if (!Ext.ux.websocket.Version.isSupported) {
                //Ext.Logger.error('The current Sencha framework is not supported. Only ExtJS >= 4.x & Sencha Touch >= 2.x');
                throw new Error ('The current Sencha framework is not supported. Only ExtJS >= 4.x & Sencha Touch >= 2.x')
            }

            this.initConfig(config);

            if (Ext.ux.websocket.Version.isExt4) {

                // explicit events definition for ExtJS 4.0.x
                this.addEvents({
                    "open" : true,
                    "close" : true,
                    "message" : true,
                    "error" : true
                });

            }

            // call mixin class constructor
            this.mixins.observable.constructor.call(this, this.config);

            this.debug = this.config.debug;

            if (Ext.ux.websocket.WebSocket.Socket !== false) {

                switch (this.getServer()) {
                    case 'socket.io':
                        this.initSocketIO();
                    break;
                    default:
                        this.initDefault();
                    break;
                }

            } else {
                this.throwError('WebSockets is not supported');
            } 
        } catch (e) {
             this.throwError(e);
        }
    },
        
    /**
     * Creates a new WebSocket instance
     * @private
     */
    initDefault: function () {
       try {
            if (Ext.isEmpty(this.config.url) && (Ext.isEmpty(this.config.host)))
                throw new Error ('You must define the URL param');
                        
            var self = this;
            // new WebSocket instance
            this.ws = new Ext.ux.websocket.WebSocket.Socket(this.config.url);   
            // apply events 
            this.ws = Ext.apply(this.ws, {
                onopen: function () {    
                    self.onSocketOpen.apply(self, arguments );
                },
                onclose: function () {
                    self.onSocketClose.apply(self, arguments );
                },
                onmessage: function () {
                    self.onSocketMessage.apply(self, arguments );
                },
                onerror: function () {
                    self.onSocketError.apply(self, arguments );
                }
            });
            
            Ext.ux.websocket.WebSocket.socketId++;
            this.socketId = Ext.ux.websocket.WebSocket.socketId;
            
            //this.status = this.ws.readyStatus;
            
        } catch (e) {
            this.throwError(e);
        } 
    },
    
    /**
     * Init a Socket.IO server type instance
     * @private
     */
    initSocketIO: function () {
        // TODO
    },
    
    /**
     * Send data to the WebSocket
     * @param {Object} Data
     */
    send: function (data) {
        try {
            if (this.getStatusCode() === 1) {
                this.ws.send(data);
                this.sendPacketId++;
            } else 
                throw new Error('Socket is not open. Current status: ' + this.getStatus());
            
        } catch (e) {
            this.throwError(e);
        }
    },
    
    /**
     * Close the current socket
     * @param {Number} Close state code. Optional
     * @param {String} Close reason message. Optional
     */
    close: function (code, reason) {
        this.ws.close(code, reason);
        this.clientConnectionClosed = true;
        //this.onSocketClose(code, reason); @remove
    },
    
    /**
     * Returns the state code of the connection. (readyState property)
     * It can have the following values:
     * - 0 indicates that the connection has not yet been established.
     * - 1 indicates that the connection is established and communication is possible.
     * - 2 indicates that the connection is going through the closing handshake.
     * - 3 indicates that the connection has been closed or could not be opened.
     * 
     * @return {Number}
     */
    getStatusCode: function () {
        return this.ws.readyState;
    },
    
    /**
     * Returns the state string based on the W3C specification.
     * See {@link Ext.ux.websocket#getStatusCode}
     * See <http://dev.w3.org/html5/websockets/#websocket>
     * 
     * It can return the following values:
     * - CONNECTING The connection has not yet been established.
     * - OPEN The WebSocket connection is established and communication is possible.
     * - CLOSING The connection is going through the closing handshake, or the close() method has been invoked.
     * - CLOSED The connection has been closed or could not be opened.
     * 
     * @return {String} 
     */
    getStatus: function () {
        var state;
        switch (this.getStatusCode()) {
            case 0:
                state = 'CONNECTING';
            break;
            case 1:
                state = 'OPEN';
            break;
            case 2:
                state = 'CLOSING';
            break;
            case 3:
                state = 'CLOSED';
            break;
            // by default to 'CONNECTION' according to <http://www.w3.org/TR/2012/CR-websockets-20120920/#dom-websocket-protocol>
            default:
                state = 'CONNECTING';
            break;
        };
        return state;
    },
        
    /**
     * Sets debug mode
     * @param {Boolean} debug
     */
    setDebug: function (debug) {
        if (Ext.isBoolean(debug))
            this.debug = debug;
    },
    
    /**
     * Returns `true` if the socket state is open, otherwise returns `false`
     * See {@link Ext.ux.websocket#getStatusCode}
     * @return {Boolean}
     */
    isOpen: function () {
        return (this.getStatusCode() === 1) ? true : false;
    },
    
    /**
     * Returns the bufferedAmount property. This represents the number 
     * of bytes of UTF-8 text that have been queued using {@link Ext.ux.websocket.send()} method.
     * @return {Number}
     */
    getBuffer: function () {
        return this.ws.bufferedAmount;
    },
    
    /**
     * Returns the server protocol if defined by the server. Default to empty string
     * See <http://www.w3.org/TR/2012/CR-websockets-20120920/#dom-websocket-protocol>
     * @return {String}
     */
    getProtocol: function () {
        return this.ws.protocol;
    },
    
    /**
     * Returns the extensions selected by the server, if any.
     * See <http://www.w3.org/TR/2012/CR-websockets-20120920/#dom-websocket-extensions>
     * @return {String}
     */
    getExtensions: function () {
        return this.ws.extensions;
    },
    
    /**
     * Return the binaryType attribute
     * See <http://www.w3.org/TR/2012/CR-websockets-20120920/#dom-websocket-binarytype>
     * @return {String}
     */
    getBynaryType: function () {
        return this.ws.binaryType;
    },
    
    /**
     * Handle on socket open event
     * @param {Object} EventListener
     * @private
     */
    onSocketOpen: function (event) {
        this.openEvent = new Ext.ux.websocket.event.Open(event);
        if (this.hasListener('open'))
            this.fireEvent('open', this.openEvent );
    },
    
    /**
     * Handle on socket message event
     * @param {Object} MessageEvent
     * @private
     */
    onSocketMessage: function (event) {
        
        this.messageEvent = new Ext.ux.websocket.event.Message(event, this); 
        if (this.hasListener('message'))
            this.fireEvent('message', this.messageEvent );
    },
    
    /**
     * Handle on socket error event
     * @param {Object} EventListener
     * @private
     */ 
    onSocketError: function (event) {
        console.log(event);
        this.errorEvent = new Ext.ux.websocket.event.Error(event);
        //this.close(1006, 'Error success');
        if (this.hasListener('error'))
            this.fireEvent('error', this.errorEvent);

    },    
    
    /**
     * Handle on socket close event and pass the CloseEvent Object
     * See <https://developer.mozilla.org/en-US/docs/WebSockets/WebSockets_reference/CloseEvent#Status_codes>
     * @param {Object} CloseEvent Object
     * @private
     */
    onSocketClose: function (event) {

        this.closeEvent = new Ext.ux.websocket.event.Close(event, this);       
        console.log(this.closeEvent);
        
        if (this.hasListener('close'))
            this.fireEvent('close', this.closeEvent );
    },
    
    /**
     * Throw an error  
     * @private
     */
    throwError: function (error) {
        if (this.debug) 
            throw new Error (error);
        else
            Ext.Logger.error(error);
    },
    
    /**
     * Returns the WebSocket object instance
     * @return {Object} WebSocket instance
     */
    getWebSocket: function () {        
        return this.ws;
    },
    
    /**
     * Class static methods
     */
    statics: {
        
        /**
         * Sencha WebSocket library version
         * See <http://docs.sencha.com/ext-js/4-1/#!/api/Ext.Version>
         * @property {Ext.Version} libVersion
         * @static
         * @readonly
         */
        libVersion: Ext.ux.websocket.Version.library,
        
        /**
         * @property {Boolean} has
         * Return if the current browser supports WebSocket  
         * @static
         * @readonly
         */
        has: ('WebSocket' in window) ? true : false,
        
        /**
         * @property {WebSocket} WebSocket Object
         * WebSocket native JavaScript Object
         * @static
         * @readonly
         */
        Socket: ('WebSocket' in window) ? WebSocket : (('MozWebSocket' in window) ? MozWebSocket : false),
    
        exceptionErrors: {
            // todo
        },
    
        /**
         * Creates new Ext.ux.websocket instance with the given config
         * @param {Object} Ext.ux.websocket.WebSocket config Object
         * @return {Object} Ext.ux.websocket.WebSocket
         * @static
         */
        create: function (config) {
            return Ext.create('Ext.ux.websocket.WebSocket', config);
        },
        
        /**
         * Request identifier
         * @property {Number} socketId
         * @static
         * @readonly
         */
        socketId: 0,
        
        /**
         * Parse URI and returns a Object
         * @return {Object} 
         * @static
         */
        parseUri: function (string) {
            var m = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/.exec(string || '')
              , parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password',
                    'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor']
              , uri = {}
              , i = 14;

            while (i--) {
                uri[parts[i]] = m[i] || '';
            }
            return uri;
        },
        
        /**
         * Returns a unique URI
         * @return {String} 
         * @static
         */
        uniqueUri: function (uri) {
            var protocol = uri.protocol
              , host = uri.host
              , port = uri.port;

            if ('document' in window) {
                host = host || document.domain;
                port = port || (protocol == 'https'
                  && document.location.protocol !== 'https:' ? 443 : document.location.port);
            } else {
                host = host || 'localhost';
                if (!port && protocol == 'https') {
                    port = 443;
                }
            }
            return (protocol || 'http') + '://' + host + ':' + (port || 80);
        },
        
        /**
         * Check if a given URL has a valid schema
         * @param {String} url
         * @static
         */
        isValidUrl: function (url) {
            return new RegExp("^(http|https|ws|wss):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$").test(url);
        }
    
    }
});