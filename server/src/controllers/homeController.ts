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
            tls: false,
        };

        const imap = new Imap(imapConfig);
      
        imap.once('ready', () => {
          imap.openBox('INBOX', false, () => {
            imap.search(['UNSEEN', ['SINCE', new Date()]], (err, results) => {
              if (err) {
                return;
              }
              const f = imap.fetch(results, { bodies: '' });
              const messages: any[] = [];
              f.on('message', (msg) => {
                // Collect messages
                msg.on('body', (stream, info) => {
                    let buffer = '';
                    stream.on('data', (chunk) => buffer += chunk.toString('utf8'));
                    stream.once('end', () => {
                        messages.push(buffer);
                    });
                });
                });
                f.once('end', () => {
                    // Send collected messages
                    res.status(200).send(messages);
                    imap.end(); // Close the connection
                });
            });
          });
        });
        imap.once('error', (err: any) => {
          console.log(err);
          res.status(400).send();
        });
        imap.once('end', () => {
          console.log('Connection ended');
        });
        imap.connect();
    } catch (error) {
        next(error);
    }
}