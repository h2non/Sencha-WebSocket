/** 
 * TODO
 *
 * @class Ext.websocket.packet.Event
 */
Ext.define('Ext.websocket.packet.Event', {
    
    require: [
        'Ext.websocket.Version'
    ],
    
    config: {
        
        id: 0,
        
        timestamp: null,
        
        clientVersion: 'Sencha WebSocket ' + Ext.websocket.Version.library,
        
        name: 'open'
        
    },
    
    // todo
    constructor: function (config) {
        
        this.initConfig(config);
        
    }

});