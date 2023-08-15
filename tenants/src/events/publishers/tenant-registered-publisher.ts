import { Stan } from 'node-nats-streaming';

export interface Event {
  subject: string;
  data: any;
}

export abstract class Publisher<T extends Event> {
  abstract subject: T['subject'];
  client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }

  async publish(data: T['data']): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) {
          return reject(err);
        }
        console.log('Event published to subject:', this.subject);
        resolve();
      });
    });
  }
}

export interface TenantCreatedEvent {
  subject: string;
  data: {
    id: string;
    companyName: string;
    companyEmail:string;
    employee:string
    superUsers:string
    budget:number
  };
}

export class TenantRegisteredPublisher extends Publisher<TenantCreatedEvent> {
  subject: string = 'tenant:created';
}
