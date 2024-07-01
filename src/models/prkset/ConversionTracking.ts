import ModelBuilder from 'utils/ModelBuilder';

class ConversionTrackings {
  id: string;
  facebookPixel: string;
  googleAnalytics: string;
  googleAdWordsTracking: string;
  googleTagManager: string;
  callTracking: string;
  postCardTracking: string;
}

const fields = ModelBuilder.buildFields(ConversionTrackings, {
  facebookPixel: { label: 'Facebook Pixel' },
  googleAnalytics: { label: 'Google Analytics' },
  googleAdWordsTracking: { label: 'Google AdWords Tracking' },
  googleTagManager: { label: 'Google Tag Manager' },
  callTracking: { label: 'Call Tracking' },
  postCardTracking: { label: 'Post Card Tracking' },
})
.build();

const helpTextTemplate = (name: string) => `Copy and paste your "${name} ID"`;

Object.keys(fields).forEach(key => {
  const label = fields[key].label?.replace('- ', '');
  fields[key].info = helpTextTemplate(label);
  fields[key].placeholder = 'xxxx-xxxxx-xxxxx-xxxxx-xxxxx';
})

export const conversionTrackingAttributes = Object.keys(fields);

export class ConversionTrackingsModel {
  static fields = fields;
}
