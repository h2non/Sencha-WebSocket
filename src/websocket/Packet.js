/**
 * Utility class to build a Sencha WebSocket JSON-based packets
 * @class Ext.websocket.Packet
 * TODO
 */
Ext.define('Ext.websocket.Packet', {
    
    require: [
        'Ext.websocket.packet.Data',
        'Ext.websocket.packet.Error',
        'Ext.websocket.packet.Event'
    ],
    
    // todo
    
    constructor: function () {
        
    },
    
    statics: {
        packetId: 0
    }
    
});