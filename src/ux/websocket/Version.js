/**
 * Utility class to store information about versioning
 * @class Ext.ux.websocket.Version
 * @singleton
 */
Ext.define('Ext.ux.websocket.Version', {
    
    /**
     * @property {Boolean} singleton
     * @singleton
     * @private
     */
    singleton: true,

    /**
     * Sencha WebSocket library version
     * See <http://docs.sencha.com/ext-js/4-1/#!/api/Ext.Version>
     * @property {Object} Ext.Version
     */
    library: new Ext.Version('0.1.1beta'),

    /**
     * @property {Boolean} isExt4
     * Store the current Sencha Framework is ExtJS 4.0.x
     */
    isExt4: (Ext.getVersion('extjs') !== undefined && Ext.getVersion('extjs').getMinor() === 0),

    /**
     * @property {Boolean} isExt41
     * Store the current Sencha Framework is ExtJS 4.1.x
     */
    isExt41: (Ext.getVersion('extjs') !== undefined && Ext.getVersion('extjs').getMinor() === 1),

    /**
     * @property {Boolean} isTouch2
     * Store the current Sencha Framework is Touch 2.0.x
     */
    isTouch2: (Ext.getVersion('touch') !== undefined && Ext.getVersion('touch').getMinor() === 0),

    /**
     * @property {Boolean} isTouch21
     * Store the current Sencha Framework is Touch 2.1.x
     */
    isTouch21: (Ext.getVersion('touch') !== undefined && Ext.getVersion('touch').getMinor() === 1),
    
    /**
     * @property {Boolean} isSupported
     * Returns if the current Sencha framework core is supported
     */
    isSupported: (Ext.getVersion('core') !== undefined && Ext.getVersion('extjs').getMajor() >= 4) ? true : false
    
});