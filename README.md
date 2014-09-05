A simple Chrome extension demonstrating the use of sockets library

--contents--

* dummy.rb implements a simple tcp listener that could be used for testing
* inject.js implements the actual client logic

--how to use--

* fire up dummy.rb in a terminal
* fire up chrome, settings > extensions > enable developer mode; load unpacked extension (and point to this plugin directory); launch the extension -- since the plugin is implemented as an app (sockets only work with extensions marked as apps); inspect the background window console log for messages received from the server

--licence--

"free to to what you want with it" licence. 
