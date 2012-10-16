
# CURRENTLY UNDER DEVELOPMENT (ROADMAP), IT'S NOT COMPLETE YET. A FULL BETA RELEASE IS COMING SOON, KEEP IN TOUCH!

# Sencha WebSocket 
 
Sencha WebSocket is a WebSocket library for Sencha JavaScript frameworks.

It provides a lot of functionalities, extensible event-handling, full integration with Sencha core framework, abstraction from JavaScript native API and more...

## What is WebSocket?

WebSocket is a web technology providing for bi-directional, full-duplex communications channels over a single TCP connection. 
WebSocket is designed to be implemented in web browsers and web servers, but it can be used by any client or server application. 
The WebSocket protocol is an independent TCP-based protocol. Its only relationship to HTTP is that its handshake is interpreted by HTTP servers as an Upgrade request.
The WebSocket protocol makes possible more interaction between a browser and a web site, facilitating live content and the creation of real-time applications.

More information: <http://en.wikipedia.org/wiki/WebSocket>

## Features

- Abstraction from native JavaScript API
- Full integration with the Sencha core framework (see frameworks supported)
- Complete and extensible event-handling support
- General improves for better WebSocket API management
- Support for custom JSON-based packets
- Error handling
- Standard error messages
- Debugging
- Easy-to-use
- Well documented

### TODO

- Buffer and JSON-based packets support
- Limits/performance
- Strong error handling
- Support third-party application-level WebSocket-based protocols (such as WebSocket Application Messaging Protocol)
- Real apps examples
 
### WebSocket JavaScript API specification 
   
The current implementation is based on the W3C JavaScript API specification (dated 09.20.2012).
Note WebSocket protocol is under continuous development and improvement, so that means is still experimental.

See <http://www.w3.org/TR/2012/CR-websockets-20120920/> 

See <https://developer.mozilla.org/en-US/docs/WebSockets/WebSockets_reference/WebSocket>

The WebSocket procotol is standarized the IETF. See <http://tools.ietf.org/html/rfc6455>

### Sencha frameworks support

- ExtJS 4.0.x
- ExtJS 4.1.x
- Sencha Touch 2.0.x
- Sencha Touch 2.1.x

In other words, is supported all Ext Core 4.x based-frameworks

## Browser support (RFC 6455 specification)

- Mozilla Firefox >= 11 | >= 6
- Google Chrome >= 16
- Opera >= 12.50
- Safari >= 6
- Internet Explorer >= 10

For more info about browsers support see <http://en.wikipedia.org/wiki/WebSocket#Browser_support>

## WebSocket servers

A list of some WebSocket servers
    
- Node.js
    - Socket.IO Server <https://github.com/learnboost/socket.io>
    - WebSocket.IO <https://github.com/LearnBoost/websocket.io>
    - ws <https://github.com/einaros/ws>
    - WebSocket-Node <https://github.com/Worlize/WebSocket-Node>
    - SockJS-Node <https://github.com/sockjs/sockjs-node>
- Python
    - Sock-JS Tornado <https://github.com/MrJoes/sockjs-tornado>
    - pywebsocket <http://code.google.com/p/pywebsocket/>
- PHP
    - Ratchet <http://socketo.me/>
    - php-websocket <https://github.com/nicokaiser/php-websocket>
    - PHP WebSocket <http://code.google.com/p/phpwebsocket/>
- Ruby
    - em-websocket <https://github.com/igrigorik/em-websocket>
    - web-socket-ruby <https://github.com/gimite/web-socket-ruby>
    - Cramp <http://cramp.in/>
- Erlang
    - erws <https://github.com/marcelog/erws>
    - sockjs-erlang <https://github.com/sockjs/sockjs-erlang>
- Java
    - jWebSocket <http://jwebsocket.org/>
- C++
    - WebSocket++ <https://github.com/zaphoyd/websocketpp>
- Standalone
    - Netty <https://netty.io/>


## Library packet

A simple way to create a stardard JSON-based packets. 


## Examples

### Basic WebSocket client example

```html

<!DOCTYPE html>
<html>
    <head>
        <title>Sencha WebSocket Examples - Basic</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        
        <!-- Sencha ExtJS 4.1.0 -->
        <script src="http://dev.sencha.com/deploy/ext-4.1.0-gpl/ext-all-debug.js"></script>
       
        <!-- WebSocket library -->
        <script src="/src/ux/websocket/Loader.js"></script>

        <script type="text/javascript">
            
            Ext.onReady(function () {
                
                // local socket example
                var socket = Ext.ux.websocket.WebSocket.create({
                    url: 'ws://localhost:8080/', //'ws://localhost:8080/socket.io/1/websocket/',
                    listeners: {
                        open: function () {
                            console.log('The socket is open!');
                            socket.send({ sample: 'This is a sample data string' });                       
                        },
                        message: function (event) {
                            document.write('Data received -> ' + event.getData() + '<br>');
                        },
                        close: function (event) {
                            console.log('Socket closed: ' + event.getCode() + ' -> ' + event.getReason());
                        }
                    }
                });

            });
        </script>
    </head>
    <body>
        <div>Sencha WebSocket library example</div>
    </body>
</html> 
``` 

### Socket.IO example

```html

<!DOCTYPE html>
<html>
    <head>
        <title>Sencha WebSocket Examples - Socket.IO</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        
        <!-- Sencha ExtJS 4.1.0 -->
        <script src="http://dev.sencha.com/deploy/ext-4.1.0-gpl/ext-all-debug.js"></script>
       
        <!-- WebSocket library -->
        <script src="/src/ux/websocket/Loader.js"></script>

        <!-- Socket.IO client library -->
        <script src="/lib/socket.io.js"></script>
        
        <script type="text/javascript">
            
            Ext.onReady(function () {
                
                // local socket example
                var socket = Ext.ux.websocket.WebSocket.create({
                    server: 'socket.io',
                    url: 'http://localhost:8080/',
                    debug: true,
                    emitters: { 
                        news: function (data) {
                            document.write('News -> ' + data + '<br>');
                        },
                        message: function (data) {
                            document.write('Message -> ' + data + '<br>');
                        }
                    },
                    listeners: {
                        connect: function () {
                            console.log('Socket.IO is connected');
                            
                            setInterval(function (me) {
                                me.send({ sample: 'This is a sample data string' });  
                            }, 3000, this);
                        },
                        message: function (event, message, data) {
                            console.log('Message event: ' + message.getData());
                        },
                        close: function (event) {
                            console.log('Socket closed: ' + event.getCode() + ' -> ' + event.getReason());
                        }
                    }
                });

            });
        </script>
    </head>
    <body>
        <div>Sencha WebSocket library example</div>
    </body>
</html> 
```

## Documentation

Take a look at the latest library API documentation:

<http://h2non.github.com/Sencha-WebSocket/docs/0.1.2b/>

## Changelog

- `0.1.1 beta` First release, not completed yet and under active library designing

## Author

- Tomas Aparicio <tomas@rijndael-project.com>

## Issues 

Feel free to report any issue you experiment via Github <https://github.com/h2non/Sencha-WebSocket>

Any [feedback](mailto:tomas@rijndael-project.com) is also welcome :)

## License

(C) 2012 Tomas Aparicio
 
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
