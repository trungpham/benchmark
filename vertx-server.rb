require 'vertx'

server = Vertx::HttpServer.new


client1 = Vertx::HttpClient.new
client1.port = 3001
client1.host = 'localhost'

client2 = Vertx::HttpClient.new
client2.port = 3002
client2.host = 'localhost'

client3 = Vertx::HttpClient.new
client3.port = 3003
client3.host = 'localhost'


server.request_handler do |request|

  count = 0

  client1.get_now('/') do |resp|

    resp.body_handler do |body|
      count +=1
      if count >= 3
        request.response.end('okay')
      end
    end

    resp.exception_handler do |e|
      puts "error"
      request.response.status_code = 500
      request.response.end('error')
    end

  end

  client1.get_now('/') do |resp|

    resp.body_handler do |body|
      count +=1
      if count >= 3
        request.response.end('okay')
      end
    end

    resp.exception_handler do |e|
      puts "error"
      request.response.status_code = 500
      request.response.end('error')
    end

  end

  client1.get_now('/') do |resp|

    resp.body_handler do |body|
      count +=1
      if count >= 3
        request.response.end('okay')
      end
    end

    resp.exception_handler do |e|
      puts "error"
      request.response.status_code = 500
      request.response.end('error')
    end

  end


end.listen(3000, 'localhost')