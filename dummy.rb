require 'socket'

s = TCPServer.new("127.0.0.1", 3000)

l = [] #clients

Thread.start{
	loop{		
		l.map{|c|
			c.puts Time.now.to_s
			sleep 10	  			    
		}
	}
}

loop{	
  	Thread.start(s.accept){|c|
  		puts "new client received..."
  		l << c  	
  	}  	
}
