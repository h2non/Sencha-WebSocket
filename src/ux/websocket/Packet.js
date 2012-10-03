/**
 * Utility class to build a Sencha WebSocket JSON-based packets
 * @class Ext.ux.websocket.Packet
 * TODO
 */
Ext.define('Ext.ux.websocket.Packet', {
    
    require: [
        'Ext.ux.websocket.packet.Data',
        'Ext.ux.websocket.packet.Error',
        'Ext.ux.websocket.packet.Event'
    ],
    
    // todo
    
    constructor: function () {
        
    },
    
    statics: {
        packetId: 0
    }
    
});