import ModelBuilder, { setModel } from 'utils/ModelBuilder';

export class Lead {
  id: string;
  name: string;
  lastName: string;
  label: string;
  email: string;
  phone: string;
  nextActivity: string;
  leadType: LeadType;
  note: string;
  date: string;
  source: LeadCreationSource;

  static Model = setModel(this, () => Model);
}

export enum LeadCreationSource {
  Manual = 'Manual',
  FormSource = 'Form Source',
}

export enum LeadType {
  LongTermLead = 'Long-Term Lead',
  ContactLead = 'Contact Lead',
  QuoteLead = 'Quote Lead',
  WebsiteLead = 'Website Lead'
}

export enum LeadStatus {
  LeadIn = 'Lead In',
  Chase = 'Chase',
  SetAppointment = 'Set Appointment',
  HaveANeed = 'Have a Need',
  SentProposal = 'Sent Proposal',
}

const fields = ModelBuilder.buildFields(Lead, {
  lastName: { label: 'Last Name' },
  nextActivity: { label: 'Next Activity' },
  leadType: { label: 'Lead Type', type: 'multiple' },
  note: { label: 'Note', type: 'textarea' },
})
.setRules({
  name: [{ required: true }],
  lastName: [{ required: true }],
})
.build();

class Model {
  static fields = fields;
}
