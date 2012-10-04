Ext.data.JsonP.Ext_ux_websocket_Manager({"tagname":"class","name":"Ext.ux.websocket.Manager","extends":"Ext.Base","mixins":[],"alternateClassNames":[],"aliases":{},"singleton":true,"requires":[],"uses":[],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{"author":["Vincenzo Ferrari <wilk3ert@gmail.com>"]},"private":null,"id":"class-Ext.ux.websocket.Manager","code_type":"ext_define","members":{"cfg":[],"property":[{"name":"Define","tagname":"property","owner":"Ext.ux.websocket.Manager","meta":{"private":true},"id":"property-Define"},{"name":"WebSockets","tagname":"property","owner":"Ext.ux.websocket.Manager","meta":{"readonly":true},"id":"property-WebSockets"},{"name":"hashMap","tagname":"property","owner":"Ext.ux.websocket.Manager","meta":{"private":true},"id":"property-hashMap"}],"method":[{"name":"broadcast","tagname":"method","owner":"Ext.ux.websocket.Manager","meta":{},"id":"method-broadcast"},{"name":"close","tagname":"method","owner":"Ext.ux.websocket.Manager","meta":{},"id":"method-close"},{"name":"closeAll","tagname":"method","owner":"Ext.ux.websocket.Manager","meta":{},"id":"method-closeAll"},{"name":"contains","tagname":"method","owner":"Ext.ux.websocket.Manager","meta":{},"id":"method-contains"},{"name":"each","tagname":"method","owner":"Ext.ux.websocket.Manager","meta":{},"id":"method-each"},{"name":"get","tagname":"method","owner":"Ext.ux.websocket.Manager","meta":{},"id":"method-get"},{"name":"getExcept","tagname":"method","owner":"Ext.ux.websocket.Manager","meta":{"private":true},"id":"method-getExcept"},{"name":"listen","tagname":"method","owner":"Ext.ux.websocket.Manager","meta":{},"id":"method-listen"},{"name":"listenExcept","tagname":"method","owner":"Ext.ux.websocket.Manager","meta":{},"id":"method-listenExcept"},{"name":"multicast","tagname":"method","owner":"Ext.ux.websocket.Manager","meta":{},"id":"method-multicast"},{"name":"register","tagname":"method","owner":"Ext.ux.websocket.Manager","meta":{},"id":"method-register"},{"name":"unregister","tagname":"method","owner":"Ext.ux.websocket.Manager","meta":{},"id":"method-unregister"}],"event":[],"css_var":[],"css_mixin":[]},"linenr":1,"files":[{"filename":"Manager.js","href":"Manager.html#Ext-ux-websocket-Manager"}],"html_meta":{"author":null},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"component":false,"superclasses":["Ext.Base"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.Base<div class='subclass '><strong>Ext.ux.websocket.Manager</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/Manager.html#Ext-ux-websocket-Manager' target='_blank'>Manager.js</a></div></pre><div class='doc-contents'><p>An easy-to-use <a href=\"#!/api/Ext.ux.websocket.WebSocket\" rel=\"Ext.ux.websocket.WebSocket\" class=\"docClass\">Ext.ux.websocket.WebSocket</a> instances manager.</p>\n\n<p>It simplyfies a multiple socket management.</p>\n\n<p>This class is based on the Vincenzo Ferrari implementation: <a href=\"https://github.com/wilk/ExtJS-WebSocket/blob/master/ux/WebSocketManager.js\">https://github.com/wilk/ExtJS-WebSocket/blob/master/ux/WebSocketManager.js</a></p>\n\n<p>Each <a href=\"#!/api/Ext.ux.websocket.WebSocket\" rel=\"Ext.ux.websocket.WebSocket\" class=\"docClass\">Ext.ux.websocket.WebSocket</a> instance you create will be registered throught this manager.</p>\n\n<pre><code><a href=\"#!/api/Ext.ux.websocket.Manager-method-listen\" rel=\"Ext.ux.websocket.Manager-method-listen\" class=\"docClass\">Ext.ux.websocket.Manager.listen</a> ('system shutdown', function (ws, data) {\n  Ext.Msg.show ({\n    title: 'System Shutdown' ,\n    msg: data ,\n    icon: Ext.Msg.WARNING ,\n    buttons: Ext.Msg.OK\n  });\n});\n\n<a href=\"#!/api/Ext.ux.websocket.Manager-method-broadcast\" rel=\"Ext.ux.websocket.Manager-method-broadcast\" class=\"docClass\">Ext.ux.websocket.Manager.broadcast</a> ('system shutdown', 'BROADCAST: the system will shutdown in few minutes.');\n\n<a href=\"#!/api/Ext.ux.websocket.Manager-method-closeAll\" rel=\"Ext.ux.websocket.Manager-method-closeAll\" class=\"docClass\">Ext.ux.websocket.Manager.closeAll</a> ();\n\n<a href=\"#!/api/Ext.ux.websocket.Manager-method-unregister\" rel=\"Ext.ux.websocket.Manager-method-unregister\" class=\"docClass\">Ext.ux.websocket.Manager.unregister</a> (ws1);\n<a href=\"#!/api/Ext.ux.websocket.Manager-method-unregister\" rel=\"Ext.ux.websocket.Manager-method-unregister\" class=\"docClass\">Ext.ux.websocket.Manager.unregister</a> (ws2);\n<a href=\"#!/api/Ext.ux.websocket.Manager-method-unregister\" rel=\"Ext.ux.websocket.Manager-method-unregister\" class=\"docClass\">Ext.ux.websocket.Manager.unregister</a> (ws3);\n</code></pre>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-Define' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ux.websocket.Manager'>Ext.ux.websocket.Manager</span><br/><a href='source/Manager.html#Ext-ux-websocket-Manager-property-Define' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ux.websocket.Manager-property-Define' class='name not-expandable'>Define</a><span> : Boolean</span><strong class='private signature' >private</strong></div><div class='description'><div class='short'><p>a singleton class</p>\n</div><div class='long'><p>a singleton class</p>\n</div></div></div><div id='property-WebSockets' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ux.websocket.Manager'>Ext.ux.websocket.Manager</span><br/><a href='source/Manager.html#Ext-ux-websocket-Manager-property-WebSockets' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ux.websocket.Manager-property-WebSockets' class='name not-expandable'>WebSockets</a><span> : Number</span><strong class='readonly signature' >readonly</strong></div><div class='description'><div class='short'><p>counter Counter of registered WebSockets</p>\n</div><div class='long'><p>counter Counter of registered WebSockets</p>\n</div></div></div><div id='property-hashMap' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ux.websocket.Manager'>Ext.ux.websocket.Manager</span><br/><a href='source/Manager.html#Ext-ux-websocket-Manager-property-hashMap' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ux.websocket.Manager-property-hashMap' class='name not-expandable'>hashMap</a><span> : Ext.util.HashMap</span><strong class='private signature' >private</strong></div><div class='description'><div class='short'><p>HashMap instace to register the Ext.us.websocket.WebSocket instances</p>\n</div><div class='long'><p>HashMap instace to register the Ext.us.websocket.WebSocket instances</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-broadcast' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ux.websocket.Manager'>Ext.ux.websocket.Manager</span><br/><a href='source/Manager.html#Ext-ux-websocket-Manager-method-broadcast' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ux.websocket.Manager-method-broadcast' class='name expandable'>broadcast</a>( <span class='pre'>event, message</span> )</div><div class='description'><div class='short'>Sends a message to each websocket ...</div><div class='long'><p>Sends a message to each websocket</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>event</span> : String<div class='sub-desc'><p>The event to raise</p>\n</div></li><li><span class='pre'>message</span> : String/Object<div class='sub-desc'><p>The data to send</p>\n</div></li></ul></div></div></div><div id='method-close' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ux.websocket.Manager'>Ext.ux.websocket.Manager</span><br/><a href='source/Manager.html#Ext-ux-websocket-Manager-method-close' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ux.websocket.Manager-method-close' class='name expandable'>close</a>( <span class='pre'>websocket</span> )</div><div class='description'><div class='short'>Closes a websocket ...</div><div class='long'><p>Closes a websocket</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>websocket</span> : Ext.ux.websocket.Wrapper<div class='sub-desc'><p>The websocket to close</p>\n</div></li></ul></div></div></div><div id='method-closeAll' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ux.websocket.Manager'>Ext.ux.websocket.Manager</span><br/><a href='source/Manager.html#Ext-ux-websocket-Manager-method-closeAll' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ux.websocket.Manager-method-closeAll' class='name expandable'>closeAll</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Closes any registered websocket ...</div><div class='long'><p>Closes any registered websocket</p>\n</div></div></div><div id='method-contains' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ux.websocket.Manager'>Ext.ux.websocket.Manager</span><br/><a href='source/Manager.html#Ext-ux-websocket-Manager-method-contains' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ux.websocket.Manager-method-contains' class='name expandable'>contains</a>( <span class='pre'>websocket</span> ) : Boolean</div><div class='description'><div class='short'>Checks if a websocket is already registered or not ...</div><div class='long'><p>Checks if a websocket is already registered or not</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>websocket</span> : <a href=\"#!/api/Ext.ux.websocket.WebSocket\" rel=\"Ext.ux.websocket.WebSocket\" class=\"docClass\">Ext.ux.websocket.WebSocket</a><div class='sub-desc'><p>The WebSocket to find</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'><p>True if the websocket is already registered, False otherwise</p>\n</div></li></ul></div></div></div><div id='method-each' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ux.websocket.Manager'>Ext.ux.websocket.Manager</span><br/><a href='source/Manager.html#Ext-ux-websocket-Manager-method-each' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ux.websocket.Manager-method-each' class='name expandable'>each</a>( <span class='pre'>fn</span> )</div><div class='description'><div class='short'>Executes a function for each registered websocket ...</div><div class='long'><p>Executes a function for each registered websocket</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>fn</span> : Function<div class='sub-desc'><p>The function to execute</p>\n</div></li></ul></div></div></div><div id='method-get' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ux.websocket.Manager'>Ext.ux.websocket.Manager</span><br/><a href='source/Manager.html#Ext-ux-websocket-Manager-method-get' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ux.websocket.Manager-method-get' class='name expandable'>get</a>( <span class='pre'>url</span> ) : <a href=\"#!/api/Ext.ux.websocket.WebSocket\" rel=\"Ext.ux.websocket.WebSocket\" class=\"docClass\">Ext.ux.websocket.WebSocket</a></div><div class='description'><div class='short'>Retrieves a registered websocket by its url ...</div><div class='long'><p>Retrieves a registered websocket by its url</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>url</span> : String<div class='sub-desc'><p>The url of the websocket to search</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Ext.ux.websocket.WebSocket\" rel=\"Ext.ux.websocket.WebSocket\" class=\"docClass\">Ext.ux.websocket.WebSocket</a></span><div class='sub-desc'><p>The websocket or undefined</p>\n</div></li></ul></div></div></div><div id='method-getExcept' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ux.websocket.Manager'>Ext.ux.websocket.Manager</span><br/><a href='source/Manager.html#Ext-ux-websocket-Manager-method-getExcept' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ux.websocket.Manager-method-getExcept' class='name expandable'>getExcept</a>( <span class='pre'>websockets</span> ) : Ext.util.HashMap<strong class='private signature' >private</strong></div><div class='description'><div class='short'>Retrieves registered websockets except the input ...</div><div class='long'><p>Retrieves registered websockets except the input</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>websockets</span> : <a href=\"#!/api/Ext.ux.websocket.WebSocket\" rel=\"Ext.ux.websocket.WebSocket\" class=\"docClass\">Ext.ux.websocket.WebSocket</a>/<a href=\"#!/api/Ext.ux.websocket.WebSocket\" rel=\"Ext.ux.websocket.WebSocket\" class=\"docClass\">Ext.ux.websocket.WebSocket</a>[]<div class='sub-desc'><p>WebSockets to exclude</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Ext.util.HashMap</span><div class='sub-desc'><p>Registered websockets except the input</p>\n</div></li></ul></div></div></div><div id='method-listen' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ux.websocket.Manager'>Ext.ux.websocket.Manager</span><br/><a href='source/Manager.html#Ext-ux-websocket-Manager-method-listen' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ux.websocket.Manager-method-listen' class='name expandable'>listen</a>( <span class='pre'>events, handler</span> )</div><div class='description'><div class='short'>Adds an handler for events given to each registered websocket ...</div><div class='long'><p>Adds an handler for events given to each registered websocket</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>events</span> : String/String[]<div class='sub-desc'><p>Events to listen</p>\n</div></li><li><span class='pre'>handler</span> : Function<div class='sub-desc'><p>The events' handler</p>\n</div></li></ul></div></div></div><div id='method-listenExcept' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ux.websocket.Manager'>Ext.ux.websocket.Manager</span><br/><a href='source/Manager.html#Ext-ux-websocket-Manager-method-listenExcept' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ux.websocket.Manager-method-listenExcept' class='name expandable'>listenExcept</a>( <span class='pre'>events, websockets, handler</span> )</div><div class='description'><div class='short'>Adds an handler for events given to each registered websocket, except websockets given ...</div><div class='long'><p>Adds an handler for events given to each registered websocket, except websockets given</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>events</span> : String/String[]<div class='sub-desc'><p>Events to listen</p>\n</div></li><li><span class='pre'>websockets</span> : <a href=\"#!/api/Ext.ux.websocket.WebSocket\" rel=\"Ext.ux.websocket.WebSocket\" class=\"docClass\">Ext.ux.websocket.WebSocket</a>/<a href=\"#!/api/Ext.ux.websocket.WebSocket\" rel=\"Ext.ux.websocket.WebSocket\" class=\"docClass\">Ext.ux.websocket.WebSocket</a>[]<div class='sub-desc'><p>WebSockets to exclude</p>\n</div></li><li><span class='pre'>handler</span> : Function<div class='sub-desc'><p>The events' handler</p>\n</div></li></ul></div></div></div><div id='method-multicast' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ux.websocket.Manager'>Ext.ux.websocket.Manager</span><br/><a href='source/Manager.html#Ext-ux-websocket-Manager-method-multicast' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ux.websocket.Manager-method-multicast' class='name expandable'>multicast</a>( <span class='pre'>websockets, event, message</span> )</div><div class='description'><div class='short'>Sends a message to each websocket, except those specified ...</div><div class='long'><p>Sends a message to each websocket, except those specified</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>websockets</span> : <a href=\"#!/api/Ext.ux.websocket.WebSocket\" rel=\"Ext.ux.websocket.WebSocket\" class=\"docClass\">Ext.ux.websocket.WebSocket</a>/<a href=\"#!/api/Ext.ux.websocket.WebSocket\" rel=\"Ext.ux.websocket.WebSocket\" class=\"docClass\">Ext.ux.websocket.WebSocket</a>[]<div class='sub-desc'><p>An array of websockets to take off the communication</p>\n</div></li><li><span class='pre'>event</span> : String<div class='sub-desc'><p>The event to raise</p>\n</div></li><li><span class='pre'>message</span> : String/Object<div class='sub-desc'><p>The data to send</p>\n</div></li></ul></div></div></div><div id='method-register' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ux.websocket.Manager'>Ext.ux.websocket.Manager</span><br/><a href='source/Manager.html#Ext-ux-websocket-Manager-method-register' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ux.websocket.Manager-method-register' class='name expandable'>register</a>( <span class='pre'>WebSockets</span> )</div><div class='description'><div class='short'>Registers one or more Ext.ux.websocket.WebSocket ...</div><div class='long'><p>Registers one or more <a href=\"#!/api/Ext.ux.websocket.WebSocket\" rel=\"Ext.ux.websocket.WebSocket\" class=\"docClass\">Ext.ux.websocket.WebSocket</a></p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>WebSockets</span> : <a href=\"#!/api/Ext.ux.websocket.WebSocket\" rel=\"Ext.ux.websocket.WebSocket\" class=\"docClass\">Ext.ux.websocket.WebSocket</a>/<a href=\"#!/api/Ext.ux.websocket.WebSocket\" rel=\"Ext.ux.websocket.WebSocket\" class=\"docClass\">Ext.ux.websocket.WebSocket</a>[]<div class='sub-desc'><p>WebSockets to register. Could be only one.</p>\n</div></li></ul></div></div></div><div id='method-unregister' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ux.websocket.Manager'>Ext.ux.websocket.Manager</span><br/><a href='source/Manager.html#Ext-ux-websocket-Manager-method-unregister' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ux.websocket.Manager-method-unregister' class='name expandable'>unregister</a>( <span class='pre'>websockets</span> )</div><div class='description'><div class='short'>Unregisters one or more Ext.ux.websocket.WebSocket ...</div><div class='long'><p>Unregisters one or more <a href=\"#!/api/Ext.ux.websocket.WebSocket\" rel=\"Ext.ux.websocket.WebSocket\" class=\"docClass\">Ext.ux.websocket.WebSocket</a></p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>websockets</span> : <a href=\"#!/api/Ext.ux.websocket.WebSocket\" rel=\"Ext.ux.websocket.WebSocket\" class=\"docClass\">Ext.ux.websocket.WebSocket</a>/<a href=\"#!/api/Ext.ux.websocket.WebSocket\" rel=\"Ext.ux.websocket.WebSocket\" class=\"docClass\">Ext.ux.websocket.WebSocket</a>[]<div class='sub-desc'><p>WebSockets to unregister</p>\n</div></li></ul></div></div></div></div></div></div></div>"});