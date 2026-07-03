declare module '@getbrevo/brevo/transactionalEmails' {
  interface SendTransacEmailParams {
    sender: { email: string; name?: string };
    to: { email: string; name?: string }[];
    subject: string;
    htmlContent: string;
  }

  export class TransactionalEmailsClient {
    constructor(config: { apiKey: string });
    sendTransacEmail(params: SendTransacEmailParams): Promise<any>;
  }
}
