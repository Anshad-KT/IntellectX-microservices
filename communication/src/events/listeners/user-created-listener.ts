import { Subject,UserCreatedEvent } from "@intellectx/build";
import { Listener } from "../../libs/utils/base-listener";
import { Message } from "node-nats-streaming";
import dependencies from "../../config/depentencies";
import {  signUp_UseCase } from "../../useCases";


export class UserCreatedListener extends Listener<UserCreatedEvent>{
  
    async onMessage(data: UserCreatedEvent["data"], msg: Message) {
        const {  id,  email,username } = data; 
        console.log(data);
        
        try {
          const hello = await signUp_UseCase(dependencies).execute({
            email,id,username
          })
        
          
          msg.ack();
          console.log("acked ");
        } catch (error) {
          console.log(error);
        }
      }
      subject:any= "user:created"
      // subject: Subject.UserCreated = Sy;
      queueGroup: string='communication-user-service'; 
}
 