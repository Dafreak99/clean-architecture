import { injectable } from 'inversify';
import { IMailer } from '../interfaces/IMailer';

@injectable()
export class Mailer implements IMailer {
  async SendEmail(to: string, data: any): Promise<void> {
    // Send Grid implementation
    console.log(`Sending email to ${to} with data ${data}`);
  }
}
