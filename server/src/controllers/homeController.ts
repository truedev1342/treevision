import { NextFunction, Request, Response } from 'express';
import Imap from 'imap';
//import { simpleParser } from 'mailparser';

export async function getEmail(req: Request, res: Response, next: NextFunction) {
    try {
        
        const imapConfig = {
            user: 'jindulong@gmail.com',
            password: 'Dulong@1012',
            host: 'imap.gmail.com',
            port: 993,
            tls: true,
        };

        const imap = new Imap(imapConfig);
      
        imap.once('ready', () => {
          imap.openBox('INBOX', false, () => {
            imap.search(['UNSEEN', ['SINCE', new Date()]], (err, results) => {
              if (err) {
                return;
              }
              const f = imap.fetch(results, { bodies: '' });
              res.status(200).send(f);
              
            });
          });
        });
        imap.once('error', (err: any) => {
          console.log(err);
        });
        imap.once('end', () => {
          console.log('Connection ended');
        });
        imap.connect();
    } catch (error) {
        next(error);
    }
}