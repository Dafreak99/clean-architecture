import { injectable } from 'inversify';
import { IMessageBroker } from '../interfaces/IMessageBroker';

@injectable()
export class MessageBroker implements IMessageBroker {
  async NotifyToPromotionService(product: unknown) {
    // RabbitMQ implementation
    console.log(
      `Notifying promotion service with product ${JSON.stringify(product)}`,
    );
  }
}
