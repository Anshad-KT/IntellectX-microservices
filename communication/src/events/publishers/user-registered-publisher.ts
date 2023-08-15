import { Publisher, Subject, UserCreatedEvent } from "@intellectx/build";

export class UserRegisteredPublisher extends Publisher<UserCreatedEvent> {
  subject: Subject.UserCreated = Subject.UserCreated;
}
