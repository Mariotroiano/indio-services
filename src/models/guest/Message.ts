import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { MessagePayload } from 'services/payloads/MessagePayload';
import { Factory } from 'utils/Factory';
import dayjs from 'dayjs';
import { OptionItem } from 'interfaces/OptionItem';
import { MessageType } from '.';


export class Message  {
  id: string;
  parkId?: string;
  creatorId?: string;
  resourceId: string;
  resourceType: 'Guest' | 'Reservation';
  resourceName: string;
  emails?: string[];
  subject: string;
  body: string;
  date: dayjs.Dayjs;
  status: 'sent' | 'received' | 'viewed' | 'bounced' | 'rejected';
  phones?: string[];
  phone?: string;
  email?: string;
  opens: number;
  clicks: number;
  tags: string[];
  actions: string[];
  contactEmails?: string[];
  messageType: MessageType;
  static Model = setModel(this, () => Model);
};

const contactOps: OptionItem[] = [
  { label: 'Lio Messi', value: 'lio10@gmail.com'},
  { label: 'Cris siu', value: 'siu7@gmail.com'},
  { label: 'Waine Roonnie', value: 'roonie@gmail.com'},
]

const messageTypeOps: OptionItem[] = [
  { label: 'Email Message', value: 'email'},
  { label: 'SMS Message', value: 'sms'},
]

const fields = ModelBuilder.buildFields(Message, {
  creatorId: null,
  parkId: null,
  resourceId: { label: 'Resource Id' },
  resourceType: { label: 'Resource Type' },
  resourceName: { label: 'Resource Name' },
  emails: { label: 'Emails', type: 'multiple' },
  phones: { label: 'Phones', type: 'multiple' },
  email: { label: 'Email', type: 'multiple' },
  phone: { label: 'Phone', type: 'multiple' },
  body: { label: 'Body', type: 'textarea' },
  date: { label: 'Date'},
  status: { label: 'Status'},
  opens: { label: 'Opens'},
  clicks: { label: 'Clicks'},
  tags: { label: 'Tags'},
  actions: {label: 'Actions'},
  messageType: {label: '', type: 'radios', options: messageTypeOps},
  contactEmails: { label: 'Contact Emails ', type: 'multiple', options: contactOps}
})
.setRules({
  body: [{required: true}],
})
.build();

const buildPayload = (props: Message): MessagePayload => {
  const date = props.date.format('MM/DD/YYYY');
  const payload = MessagePayload.new({ ...props, date});
  return payload;
};

const mapModel = ModelBuilder.buildMapModel<Message, MessagePayload>((payload) => {
  return Factory.create(Message, {
    ...payload,
    date: dayjs(payload.date),
  })
});

export const MOCK_MESSAGES: Message[]  = [
  {
    id: '1',
    creatorId: '1',
    parkId: '1',
    resourceId: '123',
    resourceType: 'Guest',
    resourceName: 'John Doe',
    emails: ['john@example.com'],
    subject: 'Hello all, our events this weekend as following',
    body: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe enim fugit, rerum ducimus voluptatem dolores magnam, laborum consequatur, nulla quae nemo veniam? Ipsam qui quae nesciunt itaque, voluptates dolor nihil?...',
    date: dayjs('2023-09-10'),
    status: 'received',
    phones: ['123-456-7890'],
    opens: 2,
    clicks: 1,
    tags: ['inbox'],
    actions: ['resend', 'new'],
    messageType: 'email',
  },
  {
    id: '2',
    creatorId: '2',
    parkId: '2',
    resourceId: '456',
    resourceType: 'Reservation',
    resourceName: 'Reservation #12345',
    emails: ['reservation@example.com'],
    subject: 'Your reservation details',
    body: 'Saepe enim fugit, rerum ducimus voluptatem dolores magnam, laborum consequatur, nulla quae nemo veniam? Ipsam qui quae nesciunt itaque, voluptates dolor nihil?...',
    date: dayjs('2023-09-11'),
    status: 'sent',
    phones: ['987-654-3210'],
    opens: 0,
    clicks: 0,
    tags: ['sent'],
    actions: ['new'],
    messageType: 'email',
  },
  {
    id: '3',
    creatorId: '3',
    parkId: '3',
    resourceId: '789',
    resourceType: 'Guest',
    resourceName: 'Alice Johnson',
    emails: ['alice@example.com'],
    subject: 'Hello all, our events this weekend as following',
    body: 'Ipsam qui quae nesciunt itaque, voluptates dolor nihil?...',
    date: dayjs('2023-09-12'),
    status: 'viewed',
    phones: ['555-555-5555'],
    opens: 5,
    clicks: 3,
    tags: ['inbox', 'important'],
    actions: ['resend'],
    messageType: 'sms',
  },
];

class Model {
  static mapModel = mapModel;
  static buildPayload = buildPayload;
  static fields = fields;
}
