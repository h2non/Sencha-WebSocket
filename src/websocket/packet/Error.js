/** 
 * TODO
 *
 * @class Ext.websocket.packet.Error
 */
Ext.define('Ext.websocket.packet.Error', {
    
    require: [
        'Ext.websocket.Version'
    ],
    
    config: {
        
        id: 0,
        
        timestamp: null,
        
        clientVersion: 'Sencha WebSocket ' + Ext.websocket.Version.library
        
    },
    
    // todo
    constructor: function (config) {
        
        this.initConfig(config);
        
    }

});
