/**
 * Library load throught Ext.Loader.
 * 
 * Note you must customize the library path.
 * 
 * Documentation: TODO
 * 
 * @class Ext.websocket.Loader
 */

Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.websocket': '../src/websocket'
    }
});

Ext.require([
    'Ext.websocket.Version',
    'Ext.websocket.event.Message',
    'Ext.websocket.event.Close',
    'Ext.websocket.event.Error',
    'Ext.websocket.event.Open',
    'Ext.websocket.Packet',
    'Ext.websocket.WebSocket'
]);
