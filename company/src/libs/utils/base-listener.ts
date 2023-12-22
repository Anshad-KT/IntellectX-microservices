import nats, { Message, Stan, SubscriptionOptions } from "node-nats-streaming";
import { Subject } from "@intellectx/build";
interface Event {
    subject: Subject;
    data: any;
}     
export abstract class Listener<T extends Event> {
    abstract subject: T['subject'];
    abstract queueGroup: string;
    private client: Stan;
    protected ackWait: number = 5 * 1000; // Default ackWait time in milliseconds
  
    abstract onMessage(data: T['data'], msg: Message): void;
   
    constructor(client: Stan) {
      this.client = client;
    }
  
    subscriptionOptions(): SubscriptionOptions {
      return this.client
        .subscriptionOptions()
        .setDeliverAllAvailable()
        .setManualAckMode(true)
        .setAckWait(this.ackWait)
        .setDurableName(this.queueGroup);
    }
  
    listen(): void {
      const subscription = this.client.subscribe(
        this.subject,
        this.queueGroup,
        this.subscriptionOptions()
      );
  
      subscription.on('message', (msg: Message) => {
        const parsedData = this.parseMessage(msg);
        this.onMessage(parsedData, msg);
      });
    }
  
    parseMessage(msg: Message): any {
      const data = msg.getData();
      return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf8'));
    }
  }
