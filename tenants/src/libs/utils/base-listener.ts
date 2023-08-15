import nats, { Message, Stan } from "node-nats-streaming";
import { Subject } from "@intellectx/build";
interface Event {
    subject: Subject;
    data: any;
}
export declare abstract class listener<T extends Event> {
    abstract subject: T['subject'];
    abstract queueGroup: string;
    private client;
    protected ackWait: number;
    abstract onMessage(data: T['data'], msg: Message): void;
    constructor(client: Stan);
    subscriptionOptions(): nats.SubscriptionOptions;
    listen(): void;
    parseMessage(msg: Message): any;
}
export {};
