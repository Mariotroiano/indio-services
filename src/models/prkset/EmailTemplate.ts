import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { Factory } from 'utils/Factory';
import { EmailTemplatePayload } from 'services/payloads/EmailTemplatePayload';
import { buildOptionItems } from 'utils/buildOptionItems';

export class EmailTemplate {
  id: string;
  emailType: EmailType;
  from: string;
  cc: string[];
  bcc: string[];
  subject: string;
  template: string;
  tagList: string[];
  important: boolean;
  active: boolean;
  content: string;
  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.buildFields(EmailTemplate, {
  from: { label: 'From', type: 'email' },
  cc: { label: 'Cc', type: 'tags' },
  bcc: { label: 'Bcc', type: 'tags' },
  template: { label: 'Mandrill Template ID' },
  tagList: { label: 'Tags', type: 'tags' },
  important: { label: 'Mark email as important?', type: 'radios', options: buildOptionItems('Yes', 'No') },
  emailType: { label: 'Email Type', options: buildOptionItems(['cancellation', 'confirmation', 'receipt']) },
  subject: { label: 'Subject' },
  content: { label: 'Content', type: 'html' },
  active: { label: 'Active', type: 'switch' }

})
.setRules({
    emailType: [{ required: true }],
    from: [{ required: true }],
    template: [{ required: true }],
})
.build();

const mapModel = ModelBuilder.buildMapModel<EmailTemplate, EmailTemplatePayload>((payload) => {
  const model = Factory.create(EmailTemplate, payload);
  return model;
});

const buildPayload = (entity: EmailTemplate, parkId: string): EmailTemplatePayload => {
  const payload = EmailTemplatePayload.new({
    ...entity,
    parkId
  });
  return payload
};

type EmailType = 'cancellation' | 'confirmation' | 'receipt';

class Model {
  static modelName = 'Email Template';
  static fields = fields;
  static mapModel = mapModel;
  static buildPayload = buildPayload;
}
