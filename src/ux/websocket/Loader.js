/**
 * @class Ext.ux.websocket.Loader
 * 
 * Library load through {@link Ext.Loader}.
 * 
 * You probably should customize the library path.
 * 
 * You can call this source file like this in yout HTML:
 * 
 *      <script src="/src/ux/websocket/Loader.js"></script>
 * 
 * Or simply add the following code in your HTML file:
 * 
 *      <script type="text/javascript> 
 * 
 *          Ext.Loader.setConfig({
 *              enabled: true,
 *              paths: {
 *                  'Ext.ux.websocket': '../src/ux/websocket'
 *              }
 *          });
 *
 *          Ext.require([
 *              'Ext.ux.websocket.Version',
 *              'Ext.ux.websocket.event.Message',
 *              'Ext.ux.websocket.event.Close',
 *              'Ext.ux.websocket.event.Error',
 *              'Ext.ux.websocket.event.Open',
 *              'Ext.ux.websocket.Packet',
 *              'Ext.ux.websocket.SocketIO',
 *              'Ext.ux.websocket.Manager',
 *              'Ext.ux.websocket.WebSocket'
 *          ]);
 *          
 *      </script>
 * 
 */

Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.ux.websocket': '../src/ux/websocket'
    }
});

Ext.require([
    'Ext.ux.websocket.Version',
    'Ext.ux.websocket.event.Message',
    'Ext.ux.websocket.event.Close',
    'Ext.ux.websocket.event.Error',
    'Ext.ux.websocket.event.Open',
    'Ext.ux.websocket.Packet',
    'Ext.ux.websocket.SocketIO',
    'Ext.ux.websocket.Manager',
    'Ext.ux.websocket.WebSocket'
]);
