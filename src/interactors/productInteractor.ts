import { inject, injectable } from 'inversify';
import { IMailer } from '../interfaces/IMailer';
import { IMessageBroker } from '../interfaces/IMessageBroker';
import { IProductInteractor } from '../interfaces/IProductInteractor';
import { IProductRepository } from '../interfaces/IProductRepository';
import { INTERFACE_TYPE } from '../utils';

@injectable()
export class ProductInteractor implements IProductInteractor {
  private repository: IProductRepository;
  private mailer: IMailer;
  private messageBroker: IMessageBroker;

  constructor(
    @inject(INTERFACE_TYPE.ProductRepository) repository: IProductRepository,
    @inject(INTERFACE_TYPE.Mailer) mailer: IMailer,
    @inject(INTERFACE_TYPE.MessageBroker) messageBroker: IMessageBroker,
  ) {
    this.repository = repository;
    this.mailer = mailer;
    this.messageBroker = messageBroker;
  }

  async createProduct(input: any): Promise<any> {
    const data = await this.repository.create(input);
    // do some checks
    await this.mailer.SendEmail('hello@gmail.com', data);

    return data;
  }
  async updateProduct(id: number, stock: number): Promise<any> {
    const data = await this.repository.update(id, stock);

    await this.messageBroker.NotifyToPromotionService(data);

    return data;
  }
  async getProducts(limit: number, offset: number): Promise<any> {
    return this.repository.find(limit, offset);
  }
}
