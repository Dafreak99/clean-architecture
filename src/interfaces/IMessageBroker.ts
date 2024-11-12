export interface IMessageBroker {
  NotifyToPromotionService(product: unknown): Promise<void>;
}
