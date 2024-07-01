import { AxiosInstance } from 'axios';
import { JsonApiClient } from './client/JsonApiClient';
import { TableInstance } from 'services/TableInstance';
import { ParkPayload } from './payloads/ParkPayload';
import { BrandingSettingsPayload, ConversionTracking, PolicySettingPayload, SocialMedium } from './payloads/ParkPayload.extra';
import { ParkSettingPayload, ParkSettingPayloadClass } from './payloads';

export default class ParkService {
  private client: JsonApiClient<ParkPayload>;
  private socialMediaClient: JsonApiClient<SocialMedium>;
  private conversionTrackingClient: JsonApiClient<ConversionTracking>;
  private policyClient: JsonApiClient<PolicySettingPayload>;
  private parkSetClient: JsonApiClient<ParkSettingPayloadClass>;
  private brandingClient: JsonApiClient<BrandingSettingsPayload>;

  constructor(ax: AxiosInstance) {
    this.client = new JsonApiClient(ParkPayload, ax, 'parks');
    this.socialMediaClient = new JsonApiClient(SocialMedium, ax, 'social_media_settings');
    this.conversionTrackingClient = new JsonApiClient(ConversionTracking, ax, 'conversion_tracking_settings');
    this.policyClient = new JsonApiClient(PolicySettingPayload, ax, 'policy_settings');
    this.parkSetClient = new JsonApiClient(ParkSettingPayloadClass, ax, 'park_settings');
    this.brandingClient = new JsonApiClient(BrandingSettingsPayload, ax, 'branding_settings');
  }

  getById = async (id: string) => {
    const result = await this.client.getById(id);
    return result;
  }

  createOrUpdate = async (entity: ParkPayload) => {
    const result = await this.client.createOrUpdate(entity);
    return result;
  }

  find = async (clientId: string, table?: TableInstance) => {
    const params = { filter: { clientId }, include: 'branding_setting' };
    const result = await this.client.findForTable(table, params);
    return result;
  }

  getAll =  async (clientId: string) => {
    const params = { 
      filter: { clientId }, 
      include: 'branding_setting', 
      sort: 'name' 
    };
    const result = await this.client.getAll(params);
    return result;
  }

  getSocialMediaSetting = async (parkId: string) => {
    const params = { filter: { parkId } };
    const result = await this.socialMediaClient.findOne(params);
    const entity = result[0];
    return entity;
  }

  updateSocialMediaSetting = async (socialMediaSettingId: string, data: any) => {
    const result = await this.socialMediaClient.createOrUpdate({ ...data, id: socialMediaSettingId})
    return result;
  }

  getConversionTrackingSetting = async (parkId: string) => {
    const params = { filter: { parkId } };
    const result = await this.conversionTrackingClient.findOne(params);
    const entity: ConversionTracking = result[0];
    return entity;
  }

  updateConversionTrackingSetting = async (conversionTrackingSettingId: string, data: ConversionTracking) => {
    const result = await this.conversionTrackingClient.createOrUpdate({ ...data, id: conversionTrackingSettingId })
    return result;
  }
  
  getPolicySettings = async (parkId: string) => {
    const params = { filter: { parkId } };
    const result = await this.policyClient.findOne(params);
    return result;
  }

  updatePolicySettings = async (id: string, data: PolicySettingPayload) => {
    const result = await this.policyClient.createOrUpdate(data);
    return result;
  }

  getParkSettings = async (parkId: string) => {
    const params = { filter: { parkId } };
    const result = await this.parkSetClient.findOne(params) as ParkSettingPayload;
    return result;
  }

  updateParkSettings = async (id: string, data: ParkSettingPayload) => {
    const result = await this.parkSetClient.createOrUpdate(data) as ParkSettingPayload;
    return result;
  }

  getBrandingSettings = async (parkId: string) => {
    const params = { filter: { parkId } };
    const result = await this.brandingClient.find(params);
    return result;
  }

  updateBrandingSettings = async (data: BrandingSettingsPayload) => {
    const result = await this.brandingClient.createOrUpdate(data);
    return result;
  }
  
}
