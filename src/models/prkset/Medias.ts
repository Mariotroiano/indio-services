type MediaItem = {
  socialName: string;
  name: string;
  fileName: string;
};

export const socialMedias: MediaItem[] = [
  { socialName: 'Facebook', name: 'facebook', fileName: 'facebook' },
  { socialName: 'Instagram', name: 'instagram', fileName: 'instagram' },
  { socialName: 'Twitter', name: 'twitter', fileName: 'twitter' },
  { socialName: 'Pinterest', name: 'pinterest', fileName: 'pinterest' },
  { socialName: 'Good Sam', name: 'goodSam', fileName: 'good-sam' },
  { socialName: 'Trip Advisor', name: 'tripAdvisor', fileName: 'trip-advisor' },
  { socialName: 'RV Park Reviews', name: 'rvParkReviews', fileName: 'rvpark-reviews' },
  { socialName: 'Yelp', name: 'yelp', fileName: 'yelp' },
  { socialName: 'Google My Business', name: 'googleBusiness', fileName: 'google-business' },
  { socialName: 'Apple Maps', name: 'appleMaps', fileName: 'apple-maps' },
  { socialName: 'Bing Places', name: 'bingPlaces', fileName: 'bing-places' },
];

export const socialMediaAttributes = socialMedias.map(x => x.name);
