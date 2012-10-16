/**
 * @class Ext.ux.websocket.Packet
 * 
 * Utility class to build a Sencha WebSocket JSON-based packets
 * 
 * TODO
 */
Ext.define('Ext.ux.websocket.Packet', {
    
    /**
     * @property {Array} require
     * @private
     */
    require: [
        'Ext.ux.websocket.packet.Data',
        'Ext.ux.websocket.packet.Error',
        'Ext.ux.websocket.packet.Event'
    ],
    
    /**
     * Packet types
     * @property {Array} types
     * @private
     */    
    types: [
        'data',
        'event',
        'error',
        'status'
    ], 
    
    /**
     * Class config default Object
     * @property {Object} config
     * @private
     */
    config: {
        
        id: 0,
        
        timestamp: null,
        
        clientVersion: 'Sencha WebSocket ' + Ext.ux.websocket.Version.library,
        
        type: 'data'
        
    },
    
    /**
     * Class constructor 
     * @param {String} type Packet type. Possible values: 'data', 'event', 'error', 'status'
     * @param {Mixed} data Packet data 
     */
    constructor: function (type, data) {
        
    },
    
    statics: {
        
        packetId: 0
    
    }
    
});