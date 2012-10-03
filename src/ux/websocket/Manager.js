/**
 * @class Ext.ux.websocket.WebSocket.Manager
 * @author Vincenzo Ferrari <wilk3ert@gmail.com>
 * @singleton
 * 
 * An easy-to-use {@link Ext.ux.websocket.WebSocket} instances manager. 
 * 
 * It simplyfies a multiple socket management. 
 * 
 * This class is based on the Vincenzo Ferrari implementation: <https://github.com/wilk/ExtJS-WebSocket/blob/master/ux/WebSocketManager.js>
 * 
 * Each {@link Ext.ux.websocket.WebSocket} instance you create will be registered throught this manager. 
 *      
 *     Ext.ux.websocket.WebSocket.Manager.listen ('system shutdown', function (ws, data) {
 *       Ext.Msg.show ({
 *         title: 'System Shutdown' ,
 *         msg: data ,
 *         icon: Ext.Msg.WARNING ,
 *         buttons: Ext.Msg.OK
 *       });
 *     });
 *     
 *     Ext.ux.websocket.WebSocket.Manager.broadcast ('system shutdown', 'BROADCAST: the system will shutdown in few minutes.');
 *     
 *     Ext.ux.websocket.WebSocket.Manager.closeAll ();
 *     
 *     Ext.ux.websocket.WebSocket.Manager.unregister (ws1);
 *     Ext.ux.websocket.WebSocket.Manager.unregister (ws2);
 *     Ext.ux.websocket.WebSocket.Manager.unregister (ws3);
 *     
 */
Ext.define ('Ext.ux.websocket.WebSocket.Manager', {
    /**
     * @property {Boolean} Define a singleton class
     * @private
     */
    singleton: true ,

    /**
     * HashMap instace to register the {@link Ext.us.websocket.WebSocket} instances
     * @property {Ext.util.HashMap} hashMap
     * @private
     */
    hashMap: Ext.create('Ext.util.HashMap'),

    /**
     * @property {Number} WebSockets counter Counter of registered WebSockets
     * @readonly
     */
    counter: 0,

    /**
     * Registers one or more Ext.ux.websocket.WebSocket
     * @param {Ext.ux.websocket.WebSocket/Ext.ux.websocket.WebSocket[]} WebSockets WebSockets to register. Could be only one.
     */
    register: function (WebSocket) {
        
        // Changes websockets into an array in every case
        if (Ext.isObject (WebSocket)) WebSocket = [ WebSocket ];

        for (var i in WebSocket) {
            if (!Ext.isEmpty(WebSocket[i].getUrl())) {
                this.hashMap.add (WebSocket[i].getUrl(), WebSocket[i]);
                this.counter++;
            } 
        }
    },

    /**
     * Checks if a websocket is already registered or not
     * @param {Ext.ux.websocket.WebSocket} websocket The WebSocket to find
     * @return {Boolean} True if the websocket is already registered, False otherwise
     */
    contains: function (websocket) {
        return this.hashMap.containsKey (websocket.url);
    },

    /**
     * @method get
     * Retrieves a registered websocket by its url
     * @param {String} url The url of the websocket to search
     * @return {Ext.ux.websocket.WebSocket} The websocket or undefined
     */
    get: function (url) {
        return this.hashMap.get (url);
    },

    /**
     * @method each
     * Executes a function for each registered websocket
     * @param {Function} fn The function to execute
     */
    each: function (fn) {
        this.hashMap.each (function (url, websocket, len) {
            fn (websocket);
        });
    } ,

    /**
     * @method unregister
     * Unregisters one or more Ext.ux.websocket.WebSocket
     * @param {Ext.ux.websocket.WebSocket/Ext.ux.websocket.WebSocket[]} websockets WebSockets to unregister
     */
    unregister: function (websockets) {
        var me = this;

        if (Ext.isObject (websockets)) websockets = [websockets];

        for (var i in websockets) {
            if (me.hashMap.containsKey (websockets[i].url)) {
                    me.hashMap.removeAtKey (websockets[i].url);
                    me.counter--;
            }
        }
    } ,

    /**
     * @method broadcast
     * Sends a message to each websocket
     * @param {String} event The event to raise
     * @param {String/Object} message The data to send
     */
    broadcast: function (event, message) {
        this.multicast ([], event, message);
    } ,

    /**
     * @method multicast
     * Sends a message to each websocket, except those specified
     * @param {Ext.ux.websocket.WebSocket/Ext.ux.websocket.WebSocket[]} websockets An array of websockets to take off the communication
     * @param {String} event The event to raise
     * @param {String/Object} message The data to send
     */
    multicast: function (websockets, event, message) {
        this.getExcept(websockets).each (function (url, websocket, len) {
            if (websocket.isReady ()) {
                if ((message === undefined) || (message === null)) {
                        websocket.send (event);
                }
                else {
                        websocket.send (event, message);
                }
            }
        });
    } ,

    /**
     * @method listen
     * Adds an handler for events given to each registered websocket
     * @param {String/String[]} events Events to listen
     * @param {Function} handler The events' handler
     */
    listen: function (events, handler) {
        if (Ext.isString (events)) events = [events];

        this.hashMap.each (function (url, websocket, len) {
                for (var i in events) {
                        websocket.on (events[i], handler);
                }
        });
    } ,

    /**
     * @method listenExcept
     * Adds an handler for events given to each registered websocket, except websockets given
     * @param {String/String[]} events Events to listen
     * @param {Ext.ux.websocket.WebSocket/Ext.ux.websocket.WebSocket[]} websockets WebSockets to exclude
     * @param {Function} handler The events' handler
     */
    listenExcept: function (events, websockets, handler) {
        if (Ext.isString (events)) events = [events];

        this.getExcept(websockets).each (function (url, websocket, len) {
                for (var i in events) {
                        websocket.on (events[i], handler);
                }
        });
    } ,

    /**
     * @method getExcept
     * Retrieves registered websockets except the input
     * @param {Ext.ux.websocket.WebSocket/Ext.ux.websocket.WebSocket[]} websockets WebSockets to exclude
     * @return {Ext.util.HashMap} Registered websockets except the input
     * @private
     */
    getExcept: function (websockets) {
        if (Ext.isObject (websockets)) websockets = [websockets];

        var list = this.hashMap;

        // Exclude websockets from the communication
        for (var i in websockets) {
                list.removeAtKey (websockets[i]);
        }

        return list;
    } ,

    /**
     * @method close
     * Closes a websocket
     * @param {Ext.ux.websocket.WebSocket.Wrapper} websocket The websocket to close
     */
    close: function (websocket) {
        var me = this;

        if (me.hashMap.containsKey (websocket.url)) {
                me.hashMap.get(websocket.url).close ();
                me.unregister (websocket);
        }
    } ,

    /**
     * @method closeAll
     * Closes any registered websocket
     */
    closeAll: function () {
        var me = this;

        me.hashMap.each (function (url, websocket, len) {
                websocket.close ();
                me.unregister (websocket);
        });
    }
});