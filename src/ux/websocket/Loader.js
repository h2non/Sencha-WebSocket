/**
 * Library load throught Ext.Loader.
 * 
 * Note you must customize the library path.
 * 
 * Documentation: TODO
 * 
 * @class Ext.ux.websocket.Loader
 */

Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.ux.websocket': '../src/ux/websocket'
    }
});

Ext.require([
    'Ext.ux.websocket.Version',
    'Ext.ux.websocket.event.Message',
    'Ext.ux.websocket.event.Close',
    'Ext.ux.websocket.event.Error',
    'Ext.ux.websocket.event.Open',
    'Ext.ux.websocket.Packet',
    'Ext.ux.websocket.Manager',
    'Ext.ux.websocket.WebSocket'
]);
