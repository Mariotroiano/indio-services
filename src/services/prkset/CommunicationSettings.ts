
export type CommunicationSettings = {
  id: string;
  parkId: string;
  onlineReCheckIn: string;
  onlineReCheckInEmail: string;
  postDepartureEmailDays: number;
  preArrivalEmailDays: number;
  termsAndConditionsEmailDays: number;
  sendPreArrivalEmail: boolean;
  sendPostDepartureEmail: boolean;
  sendTermsAndConditionsEmail: boolean;
};

// const templates = {
//   cancellation: null,
//   groupReservationConfirmation: null,
//   onlineCheckIn: null,
//   postDeparture: null,
//   preArrival: null,
//   reAcceptTermsAndConditions: null,
//   reservationConfirmation: null,
//   termsAndConditions: null,
// }
// type TemplateKeys = keyof typeof templates;
// export const TemplateNames = Object.keys(templates);
export const TemplateNames = [
  'cancellation',
  'groupReservationConfirmation',
  'onlineCheckIn',
  'postDeparture',
  'preArrival',
  'reAcceptTermsAndConditions',
  'reservationConfirmation',
  'termsAndConditions',
] as const;
type TemplateKeys = typeof TemplateNames[number];

export interface EmailTemplate {
  name: string;
  subject: string;
  body?: string;
}

export type Templates = {
  [K in TemplateKeys]: EmailTemplate
};

export function buildTemplateModel(data: any) {
  const entries = TemplateNames.map((name: string) => {
    const templateSubjectKey = `${name}Subject`;
    const templateBodyKey = `${name}Body`;
    
    const templateItem: EmailTemplate = {
      name: name,
      subject: data[templateSubjectKey],
      body: data[templateBodyKey],
    }
    return [name, templateItem];
  });
  const templateObject = Object.fromEntries(entries) as Templates;
  return templateObject;
}

export function buildTemplatePayload(template: EmailTemplate, id: string) {
  let data: any = {};
  data.id = id;
  data[`${template.name}Subject`] = template.subject;
  data[`${template.name}Body`] = template.body;
  return data;
}

// cancellation: string;
// groupReservationConfirmation: string;
// onlineCheckIn: string;
// postDeparture: string;
// preArrival: string;
// reAcceptTermsAndConditions: string;
// reservationConfirmation: string;
// termsAndConditions: string;
