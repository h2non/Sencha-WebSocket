/** 
 * TODO
 *
 * @class Ext.ux.websocket.packet.Data
 */
Ext.define('Ext.ux.websocket.packet.Data', {
    
    require: [
        'Ext.ux.websocket.Version'
    ],
    
    config: {
        
        id: 0,
        
        timestamp: null,
        
        clientVersion: 'Sencha WebSocket ' + Ext.ux.websocket.Version.library,
        
        type: 'data'
        
    },
    
    // todo
    constructor: function (config) {
        
        this.initConfig(config);
        
    }

});
