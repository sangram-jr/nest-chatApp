import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

/*
@WebSocketGateway(4000)
export class ChatGateway {

  @SubscribeMessage('events') //Listen for an event called "events"
  handleEvent(@MessageBody() data:string,@ConnectedSocket() client: Socket){//@MessageBody() → gets data , data=msg sent from client ,@ConnectedSocket() → gets client, client=specific user's socket
    console.log(data);
    client.emit('events','this is a reply');//emit means send msg,   Sends response back to the same client
  }
}*/



//msg broadcast to everyone including me those connected to same event -> ex. events
/*
@WebSocketGateway(4000)
export class ChatGateway {

  @WebSocketServer() server:Server //msg broadcast to everyone
  @SubscribeMessage('events') //Listen for an event called "events"
  handleEvent(@MessageBody() data:string,@ConnectedSocket() client: Socket){//@MessageBody() → gets data , data=msg sent from client ,@ConnectedSocket() → gets client, client=specific user's socket
    
    this.server.emit('events',data);//send the same data to all those are connected to particular event-> in this case my event name is "events"
  }
}*/


//msg broadcast to everyone excluding me those connected to same event -> ex. events
@WebSocketGateway(4000)
export class ChatGateway implements OnGatewayConnection,OnGatewayDisconnect {

  //when connection established, then this method execute
  //this method comes from OnGatewayConnection
  handleConnection(client: Socket) {
    console.log(`A new User joined with id ${client.id}`);
  }
  ////this method comes from OnGatewayDisconnect
  //when connection broke, then this method execute
  handleDisconnect(client: Socket) {
    console.log(`User left with id ${client.id}`);
  }

  @SubscribeMessage('events') //Listen for an event called "events"
  handleEvent(@MessageBody() data:string,@ConnectedSocket() client: Socket){//@MessageBody() → gets data , data=msg sent from client ,@ConnectedSocket() → gets client, client=specific user's socket
    client.broadcast.emit("events",data); //emit means send msg,   Sends response back to the same client those are connected to same event-> in our case event is "events"
  }
}