/** 
 * TODO
 *
 * @class Ext.ux.websocket.packet.Broadcast
 */
Ext.define('Ext.ux.websocket.packet.Broadcast', {
    
    require: [
        'Ext.ux.websocket.Version'
    ],
    
    config: {
        
        id: 0,
        
        timestamp: null,
        
        clientVersion: 'Sencha WebSocket ' + Ext.ux.websocket.Version.library,
        
        type: 'broadcast'
        
    },
    
    // todo
    constructor: function (config) {
        
        this.initConfig(config);
        
    }

});
