import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { Factory } from 'utils/Factory';
import { EmailMessagePayload } from 'services/payloads/EmailMessagePayload';
import dayjs from 'dayjs';
import { EmailAttachment } from './EmailAttachment';

export class EmailMessage {
  id: string;
  parkId: string;
  type: string;
  messageId: string;
  date: dayjs.Dayjs;
  from: string;
  to: string[];
  body: string;
  cc: string[];
  bcc: string[];
  inReplyTo: string[];
  references: string[];
  subject: string;
  htmlBody: string;
  textBody: string;
  status: string;
  emailAttachments: EmailAttachment[];
  static Model = setModel(this, () => Model);

}

const fields = ModelBuilder.buildFields(EmailMessage, {
  parkId: null,
  htmlBody: { label: 'Body' },
  body: { label: '' },
  date: { label: 'Date' },
  status: { label: 'Status' },
  from: { label: 'From' },
  to: { label: 'To' },
  type: { label: 'Type' }
})
.setRules({
    body: [{ required: true }],
  })
.build();

const buildPayload = (props: EmailMessage): EmailMessagePayload => {
  const {date, ...rest} = props;
  const payload = EmailMessagePayload.new({ ...rest });
  return payload;
};

const buildForwardedEmail = (originalMessage: EmailMessage, forwardedBy: string, body: string, to: string[]): EmailMessage => {
  const payload = {
    parkId: originalMessage.parkId,
    from: forwardedBy,
    to,
    cc: originalMessage.cc,
    bcc: originalMessage.bcc,
    inReplyTo: [originalMessage.messageId],
    references: [...originalMessage.references, originalMessage.messageId],
    subject: `Fwd: ${originalMessage.subject}`,
    htmlBody: body,
  };

  return payload as EmailMessage
}

const buildReplyEmail = (originalMessage: EmailMessage, repliedBy: string, body: string): EmailMessage => {
  const payload = {
    parkId: originalMessage.parkId,
    from: repliedBy,
    to: [originalMessage.from],
    cc: [],
    bcc: [],
    inReplyTo: [originalMessage.messageId],
    references: [...originalMessage.references, originalMessage.messageId],
    subject: `Re: ${originalMessage.subject}`,
    htmlBody: body,
  };

  return payload as EmailMessage;
}

const mapModel = ModelBuilder.buildMapModel<EmailMessage, EmailMessagePayload>((payload) => {
  return Factory.create(EmailMessage, {
    ...payload,
    to: parseTo(payload.to),
    date: dayjs(payload.date),
  })
});

const parseTo = (to: string[]): string[] => {
  const normalizedEmailsSet: Set<string> = new Set();
  to.forEach((toField) => {
    const emails = toField.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
    if (emails) {
      emails.forEach(email => normalizedEmailsSet.add(email));
    }
  });
  return Array.from(normalizedEmailsSet);
};



export const EMAIL_MOCK_MESSAGES_LIST: EmailMessagePayload[] = [

  {
    id: "f3c51692-fc61-42ad-a261-0dc0f35637b3",
    type: "InboundEmailMessage",
    messageId: "CH3PR16MB60478EB139BC8B628E6C7CCCBB0E2@CH3PR16MB6047.namprd16.prod.outlook.com",
    date: "2024-04-18T21:31:26+00:00",
    from: "Nic Barthelemy <nic@bigrigmedia.net>",
    to: [
      "\"nic444@inbound.indioapp.com\" <nic444@inbound.indioapp.com>"
    ],
    cc: [],
    bcc: [],
    inReplyTo: [],
    references: [],
    subject: "This is an email to the park",
    status: "delivered",
    body: 'Hello there!',
    textBody: 'Hello there!',

  },

  {
    id: "examplef3c51692-fc61-42ad-a261-0dc0f35637b3",
    type: "InboundEmailMessage",
    messageId: "CH3PR16MB60478EB139BC8B628E6C7CCCBB0E2@CH3PR16MB6047.namprd16.prod.outlook.com",
    date: "2023-03-22T21:31:26+00:00",
    from: "Mario Troiano <mariotroiano2@gmail.com>",
    to: [
      "\"nic444@inbound.indioapp.com\" <nic444@inbound.indioapp.com>"
    ],
    cc: [],
    bcc: [],
    inReplyTo: [],
    references: [],
    subject: "This is an other email to the park",
    status: "delivered",
    body: 'Editing emails for better communication.',
    textBody: 'Editing emails for better communication.',
  }

];

export const EMAIL_MOCK_MESSAGES: EmailMessagePayload[] = [

  {
    id: "f3c51692-fc61-42ad-a261-0dc0f35637b3",
    type: "InboundEmailMessage",
    messageId: "CH3PR16MB60478EB139BC8B628E6C7CCCBB0E2@CH3PR16MB6047.namprd16.prod.outlook.com",
    date: "2024-04-18T21:31:26+00:00",
    from: "Nic Barthelemy <nic@bigrigmedia.net>",
    to: [
      "\"nic444@inbound.indioapp.com\" <nic444@inbound.indioapp.com>"
    ],
    cc: [],
    bcc: [],
    inReplyTo: [],
    references: [],
    subject: "This is an email to the park",
    htmlBody: "<html>\n<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=iso-8859-1\">\n<style type=\"text/css\" style=\"display:none;\"> P {margin-top:0;margin-bottom:0;} </style>\n</head>\n<body dir=\"ltr\">\n<div class=\"elementToProof\" style=\"font-family: Aptos, Aptos_EmbeddedFont, Aptos_MSFontService, Calibri, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);\">\nasdasdasd</div>\n<div class=\"elementToProof\" style=\"font-family: Aptos, Aptos_EmbeddedFont, Aptos_MSFontService, Calibri, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);\">\n<br>\n</div>\n<div id=\"Signature\" style=\"color: inherit; background-color: inherit;\">\n<div style=\"text-align: left; background-color: rgb(255, 255, 255); margin: 0in 0in 0.0001pt; font-family: Calibri, sans-serif; font-size: 15px; color: black;\">\n<br>\n<img alt=\"Big-Rig-Logo-SM\" width=\"150\" style=\"width: 150px; margin: 0px;\" src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjAwMDQ0OTA5MDgsImRvbWFpbiI6ImJpZ3JpZ21lZGlhLmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoxMzA3MDQ2fQ.vUiFxpexXqMjNW9YQzcx8aS1fu_ZUfJuAXqyDwRA9Hs\"></div>\n<div style=\"text-align: left; background-color: rgb(255, 255, 255); margin: 0in 0in 0.0001pt; font-family: Calibri, sans-serif; font-size: 19px; color: black;\">\nPhone: 866-524-4744</div>\n<div style=\"text-align: left; background-color: rgb(255, 255, 255); margin: 0in 0in 0.0001pt; font-family: Calibri, sans-serif; font-size: 19px; color: black;\">\nFax: 760-777-9500</div>\n<div style=\"text-align: left; background-color: rgb(255, 255, 255); margin: 0in 0in 0.0001pt; font-family: Calibri, sans-serif; font-size: 19px; color: black;\">\nEmail: nic@bigrigmedia.net</div>\n<div style=\"text-align: left; background-color: rgb(255, 255, 255); margin: 0in 0in 0.0001pt; font-family: Calibri, sans-serif; font-size: 19px;\">\n<span style=\"color: black;\">Website: </span><span style=\"color: purple;\"><a href=\"http://www.bigrigmedia.com/\" target=\"_blank\" rel=\"noreferrer noopener\" style=\"color: purple; margin: 0px;\">http://www.bigrigmedia.com</a></span></div>\n<div style=\"text-align: left; background-color: rgb(255, 255, 255); margin: 0in 0in 0.0001pt; font-family: Calibri, sans-serif; font-size: 19px; color: black;\">\nSkype ID:&nbsp;pnbarthelemy</div>\n<div style=\"text-align: left; background-color: rgb(255, 255, 255); margin: 0in 0in 0.0001pt; font-family: Calibri, sans-serif;\">\n<span style=\"font-size: 19px; color: black;\">Follow Us:</span><span style=\"font-size: 15px; color: black;\"><br>\n</span><span style=\"font-size: 15px; color: rgb(0, 0, 0);\"><a href=\"http://www.facebook.com/pages/Big-Rig-Media-LLC/123195681071171\" target=\"_blank\" rel=\"noreferrer noopener\" style=\"color: rgb(0, 0, 0); margin: 0px;\"><img width=\"22\" style=\"width: 22px; margin: 0px;\" src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjAwMDQ0OTA5MDksImRvbWFpbiI6ImJpZ3JpZ21lZGlhLmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoxMzA3MDQ2fQ.enM2XEyn1GbdZiW-4AsKtJahvOvdd0aQhaEv6EpCwrc\"></a></span><span style=\"font-size: 15px; color: black;\">&nbsp;</span><span style=\"font-size: 15px; color: rgb(0, 0, 0);\"><a href=\"https://twitter.com/bigrigmedia\" target=\"_blank\" rel=\"noreferrer noopener\" style=\"color: rgb(0, 0, 0); margin: 0px;\"><img width=\"22\" style=\"width: 22px; margin: 0px;\" src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjAwMDQ0OTA5MTEsImRvbWFpbiI6ImJpZ3JpZ21lZGlhLmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoxMzA3MDQ2fQ.0UQXYV4bG6whOOA3mMxVeX_sOnl8Tr8UWgCoqafD1Iw\"></a></span><span style=\"font-size: 15px; color: black;\">&nbsp;</span><span style=\"font-size: 15px; color: rgb(0, 0, 0);\"><a href=\"http://www.linkedin.com/company/big-rig-media-llc?trk=tabs_biz_home\" target=\"_blank\" rel=\"noreferrer noopener\" style=\"color: rgb(0, 0, 0); margin: 0px;\"><img width=\"22\" style=\"width: 22px; margin: 0px;\" src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjAwMDQ0OTA5MTAsImRvbWFpbiI6ImJpZ3JpZ21lZGlhLmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoxMzA3MDQ2fQ.RczfzSaMMpD3PBZKFbuOBwAQLconz7DejYu5dXOtojw\"></a></span><span style=\"font-size: 15px; color: black;\">&nbsp;</span></div>\n<div style=\"text-align: left; background-color: rgb(255, 255, 255); margin: 0in 0in 0.0001pt; font-family: Calibri, sans-serif; font-size: 15px;\">\n<span style=\"color: black;\">For technical support please visit us online at:<br>\n</span><span style=\"color: purple;\"><a href=\"http://www.bigrigmedia.com/support/\" target=\"_blank\" rel=\"noreferrer noopener\" style=\"color: purple; margin: 0px;\">http://www.bigrigmedia.com/support/</a></span></div>\n<span style=\"font-family: Calibri, Arial, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);\"><br>\n</span></div>\n</body>\n</html>\n",
    status: "delivered",
    body: 'Hello there!',
    textBody: 'Hello there!',
    emailAttachments: [
      {
        emailMessageId: "f3c51692-fc61-42ad-a261-0dc0f35637b3",
        uploadedFileData: {
          id: "attachmentId",
          storage: "local",
          metadata: {
            filename: "example.pdf",
            size: 1024,
            mimeType: "application/pdf",
            width: 0,
            height: 0
          }
        },
        uploadedFileUrl: "https://example.com/example.pdf"
      },
      {
        emailMessageId: "f3c51692-fc61-42ad-a261-0dc0f35637b3",
        uploadedFileData: {
          id: "attachmentId",
          storage: "local",
          metadata: {
            filename: "example.jpg",
            size: 2048,
            mimeType: "image/jpeg",
            width: 800,
            height: 600
          }
        },
        uploadedFileUrl: "https://example.com/example.jpg"
      },
      {
        emailMessageId: "f3c51692-fc61-42ad-a261-0dc0f35637b3",
        uploadedFileData: {
          id: "attachmentId",
          storage: "local",
          metadata: {
            filename: "example.xlsx",
            size: 3072,
            mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            width: 0,
            height: 0
          }
        },
        uploadedFileUrl: "https://example.com/example.xlsx"
      }
    ]
  },

  {
    id: "examplef3c51692-fc61-42ad-a261-0dc0f35637b3",
    type: "InboundEmailMessage",
    messageId: "CH3PR16MB60478EB139BC8B628E6C7CCCBB0E2@CH3PR16MB6047.namprd16.prod.outlook.com",
    date: "2023-03-22T21:31:26+00:00",
    from: "Mario Troiano <mariotroiano2@gmail.com>",
    to: [
      "\"nic444@inbound.indioapp.com\" <nic444@inbound.indioapp.com>"
    ],
    cc: [],
    bcc: [],
    inReplyTo: [],
    references: [],
    subject: "This is an other email to the park",
    htmlBody: "<html>\n<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=iso-8859-1\">\n<style type=\"text/css\" style=\"display:none;\"> P {margin-top:0;margin-bottom:0;} </style>\n</head>\n<body dir=\"ltr\">\n<div class=\"elementToProof\" style=\"font-family: Aptos, Aptos_EmbeddedFont, Aptos_MSFontService, Calibri, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);\">\ntext example</div>\n<div class=\"elementToProof\" style=\"font-family: Aptos, Aptos_EmbeddedFont, Aptos_MSFontService, Calibri, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);\">\n<br>\n</div>\n<div id=\"Signature\" style=\"color: inherit; background-color: inherit;\">\n<div style=\"text-align: left; background-color: rgb(255, 255, 255); margin: 0in 0in 0.0001pt; font-family: Calibri, sans-serif; font-size: 15px; color: black;\">\n<br>\n<img alt=\"Big-Rig-Logo-SM\" width=\"150\" style=\"width: 150px; margin: 0px;\" src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjAwMDQ0OTA5MDgsImRvbWFpbiI6ImJpZ3JpZ21lZGlhLmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoxMzA3MDQ2fQ.vUiFxpexXqMjNW9YQzcx8aS1fu_ZUfJuAXqyDwRA9Hs\"></div>\n<div style=\"text-align: left; background-color: rgb(255, 255, 255); margin: 0in 0in 0.0001pt; font-family: Calibri, sans-serif; font-size: 19px; color: black;\">\nPhone: 866-524-4744</div>\n<div style=\"text-align: left; background-color: rgb(255, 255, 255); margin: 0in 0in 0.0001pt; font-family: Calibri, sans-serif; font-size: 19px; color: black;\">\nFax: 760-777-9500</div>\n<div style=\"text-align: left; background-color: rgb(255, 255, 255); margin: 0in 0in 0.0001pt; font-family: Calibri, sans-serif; font-size: 19px; color: black;\">\nEmail: nic@bigrigmedia.net</div>\n<div style=\"text-align: left; background-color: rgb(255, 255, 255); margin: 0in 0in 0.0001pt; font-family: Calibri, sans-serif; font-size: 19px;\">\n<span style=\"color: black;\">Website: </span><span style=\"color: purple;\"><a href=\"http://www.bigrigmedia.com/\" target=\"_blank\" rel=\"noreferrer noopener\" style=\"color: purple; margin: 0px;\">http://www.bigrigmedia.com</a></span></div>\n<div style=\"text-align: left; background-color: rgb(255, 255, 255); margin: 0in 0in 0.0001pt; font-family: Calibri, sans-serif; font-size: 19px; color: black;\">\nSkype ID:&nbsp;pnbarthelemy</div>\n<div style=\"text-align: left; background-color: rgb(255, 255, 255); margin: 0in 0in 0.0001pt; font-family: Calibri, sans-serif;\">\n<span style=\"font-size: 19px; color: black;\">Follow Us:</span><span style=\"font-size: 15px; color: black;\"><br>\n</span><span style=\"font-size: 15px; color: rgb(0, 0, 0);\"><a href=\"http://www.facebook.com/pages/Big-Rig-Media-LLC/123195681071171\" target=\"_blank\" rel=\"noreferrer noopener\" style=\"color: rgb(0, 0, 0); margin: 0px;\"><img width=\"22\" style=\"width: 22px; margin: 0px;\" src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjAwMDQ0OTA5MDksImRvbWFpbiI6ImJpZ3JpZ21lZGlhLmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoxMzA3MDQ2fQ.enM2XEyn1GbdZiW-4AsKtJahvOvdd0aQhaEv6EpCwrc\"></a></span><span style=\"font-size: 15px; color: black;\">&nbsp;</span><span style=\"font-size: 15px; color: rgb(0, 0, 0);\"><a href=\"https://twitter.com/bigrigmedia\" target=\"_blank\" rel=\"noreferrer noopener\" style=\"color: rgb(0, 0, 0); margin: 0px;\"><img width=\"22\" style=\"width: 22px; margin: 0px;\" src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjAwMDQ0OTA5MTEsImRvbWFpbiI6ImJpZ3JpZ21lZGlhLmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoxMzA3MDQ2fQ.0UQXYV4bG6whOOA3mMxVeX_sOnl8Tr8UWgCoqafD1Iw\"></a></span><span style=\"font-size: 15px; color: black;\">&nbsp;</span><span style=\"font-size: 15px; color: rgb(0, 0, 0);\"><a href=\"http://www.linkedin.com/company/big-rig-media-llc?trk=tabs_biz_home\" target=\"_blank\" rel=\"noreferrer noopener\" style=\"color: rgb(0, 0, 0); margin: 0px;\"><img width=\"22\" style=\"width: 22px; margin: 0px;\" src=\"https://attachment.freshdesk.com/inline/attachment?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NjAwMDQ0OTA5MTAsImRvbWFpbiI6ImJpZ3JpZ21lZGlhLmZyZXNoZGVzay5jb20iLCJhY2NvdW50X2lkIjoxMzA3MDQ2fQ.RczfzSaMMpD3PBZKFbuOBwAQLconz7DejYu5dXOtojw\"></a></span><span style=\"font-size: 15px; color: black;\">&nbsp;</span></div>\n<div style=\"text-align: left; background-color: rgb(255, 255, 255); margin: 0in 0in 0.0001pt; font-family: Calibri, sans-serif; font-size: 15px;\">\n<span style=\"color: black;\">For technical support please visit us online at:<br>\n</span><span style=\"color: purple;\"><a href=\"http://www.bigrigmedia.com/support/\" target=\"_blank\" rel=\"noreferrer noopener\" style=\"color: purple; margin: 0px;\">http://www.bigrigmedia.com/support/</a></span></div>\n<span style=\"font-family: Calibri, Arial, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);\"><br>\n</span></div>\n</body>\n</html>\n",
    status: "delivered",
    body: 'Editing emails for better communication.',
    textBody: 'Editing emails for better communication.',
    emailAttachments: [
      {
        emailMessageId: "examplef3c51692-fc61-42ad-a261-0dc0f35637b3",
        uploadedFileData: {
          id: "attachmentId",
          storage: "local",
          metadata: {
            filename: "example.pdf",
            size: 1024,
            mimeType: "application/pdf",
            width: 0,
            height: 0
          }
        },
        uploadedFileUrl: "https://example.com/example.pdf"
      }
    ]
  }

];

class Model {
  static mapModel = mapModel;
  static buildPayload = buildPayload;
  static fields = fields;
  static buildForwardedEmail = buildForwardedEmail;
  static buildReplyEmail = buildReplyEmail;
}
