/** 
 * TODO
 *
 * @class Ext.ux.websocket.packet.Event
 */
Ext.define('Ext.ux.websocket.packet.Event', {
    
    require: [
        'Ext.ux.websocket.Version'
    ],
    
    config: {
        
        id: 0,
        
        timestamp: null,
        
        clientVersion: 'Sencha WebSocket ' + Ext.ux.websocket.Version.library,
        
        name: 'event'
        
    },
    
    // todo
    constructor: function (config) {
        
        this.initConfig(config);
        
    }

});