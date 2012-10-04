/**
 * @class Ext.ux.websocket.Manager
 * @author Vincenzo Ferrari <wilk3ert@gmail.com>
 * @singleton
 * 
 * An easy-to-use {@link Ext.ux.websocket.WebSocket} instances manager. 
 * 
 * It simplyfies a multiple WebSocket management. 
 * 
 * This class is based on the Vincenzo Ferrari implementation: <https://github.com/wilk/ExtJS-WebSocket/blob/master/ux/WebSocketManager.js>
 * 
 * Each {@link Ext.ux.websocket.WebSocket} instance you create will be registered through the Manager. 
 *      
 *     Ext.ux.websocket.Manager.listen ('system shutdown', function (ws, data) {
 *       Ext.Msg.show ({
 *         title: 'System Shutdown' ,
 *         msg: data ,
 *         icon: Ext.Msg.WARNING ,
 *         buttons: Ext.Msg.OK
 *       });
 *     });
 *     
 *     Ext.ux.websocket.Manager.broadcast ('system shutdown', 'BROADCAST: the system will shutdown in few minutes.');
 *     
 *     Ext.ux.websocket.Manager.closeAll ();
 *     
 *     Ext.ux.websocket.Manager.unregister (ws1);
 *     Ext.ux.websocket.Manager.unregister (ws2);
 *     Ext.ux.websocket.Manager.unregister (ws3);
 *     
 */

Ext.define ('Ext.ux.websocket.Manager', {
    
    /**
     * @property {Boolean} Defines a singleton class
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
     * @property {Number} WebSockets counter Counter of registered {@link Ext.us.websocket.WebSocket} instances
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
     * Checks if a WebSocket is already registered or not
     * @param {Ext.ux.websocket.WebSocket} websocket The {@link Ext.us.websocket.WebSocket} to find
     * @return {Boolean} True if the websocket is already registeredse otherwise, False otherwise
     */
    contains: function (WebSocket) {
        return this.hashMap.containsKey (WebSocket.getUrl());
    },

    /**
     * Retrieves a registered websocket by its url
     * @param {String} url The url of the websocket to search
     * @return {Ext.ux.websocket.WebSocket} The websocket or undefined
     */
    get: function (url) {
        return this.hashMap.get (url);
    },

    /**
     * Executes a function for each registered websocket
     * @param {Function} fn The function to execute
     */
    each: function (fn) {
        this.hashMap.each (function (url, websocket, len) {
            fn (websocket);
        });
    } ,

    /**
     * Unregisters one or more Ext.ux.websocket.WebSocket
     * @param {Ext.ux.websocket.WebSocket/Ext.ux.websocket.WebSocket[]} websockets WebSockets to unregister
     */
    unregister: function (WebSocket) {

        if (Ext.isObject (WebSocket)) WebSocket = [ WebSocket ];

        for (var i in WebSocket) {
            if (this.hashMap.containsKey (WebSocket[i].getUrl() )) {
                this.hashMap.removeAtKey (WebSocket[i].getUrl() );
                this.counter--;
            }
        }
    } ,

    /**
     * Sends a message event to websocket
     * @param {String} event The event to raise
     * @param {String/Object} message The data to send
     */
    broadcast: function (event, message) {
        this.multicast ([], event, message);
    } ,

    /**
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
     * Adds an handler for events given to each registered websocket, except websockets given
     * @param {String/String[]} events Events to listen
     * @param {Ext.ux.websocket.WebSocket/Ext.ux.websocket.WebSocket[]} websockets WebSockets to exclude
     * @param {Function} handler The events' handler
     */
    listenExcept: function (events, websockets, handler) {
        if (Ext.isString (events)) events = [ events ];

        this.getExcept(websockets).each (function (url, websocket, len) {
            for (var i in events) {
                    websocket.on (events[i], handler);
            }
        });
    } ,

    /**
     * Retrieves registered websockets except the input
     * @param {Ext.ux.websocket.WebSocket/Ext.ux.websocket.WebSocket[]} websockets WebSockets to exclude
     * @return {Ext.util.HashMap} Registered websockets except the input
     * @private
     */
    getExcept: function (websockets) {
        if (Ext.isObject (websockets)) websockets = [ websockets ];

        var list = this.hashMap;

        // Exclude websockets from the communication
        for (var i in websockets) {
            list.removeAtKey (websockets[i]);
        }

        return list;
    } ,

    /**
     * Closes a WebSocket
     * @param {Ext.ux.websocket.WebSocket} websocket The websocket to close
     */
    close: function (websocket) {
        var me = this;

        if (me.hashMap.containsKey ( websocket.getUrl() )) {
            me.hashMap.get( websocket.getUrl() ).close ();
            me.unregister ( websocket);
        }
    } ,

    /**
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