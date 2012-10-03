/** 
 * TODO
 *
 * @class Ext.ux.websocket.packet.Error
 */
Ext.define('Ext.ux.websocket.packet.Error', {
    
    require: [
        'Ext.ux.websocket.Version'
    ],
    
    config: {
        
        id: 0,
        
        timestamp: null,
        
        clientVersion: 'Sencha WebSocket ' + Ext.ux.websocket.Version.library,
        
        type: 'error'
        
    },
    
    // todo
    constructor: function (config) {
        
        this.initConfig(config);
        
    }

});
