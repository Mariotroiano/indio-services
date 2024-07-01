import ModelBuilder, { setModel } from 'utils/ModelBuilder';
import { PhotoPayload } from 'services/payloads/PhotoPayload';
import dayjs from 'dayjs';

export class Photo {
  id: string;
  parkId: string;
  url: string;
  dataUri?: string;
  fileName: string;
  fileDate: string;
  dimensions: string;
  title: string;
  description: string;
  tags: string[];

  static Model = setModel(this, () => Model);
}

const fields = ModelBuilder.Field.fieldsForModel(Photo).build()

const mapModel = (result: PhotoPayload[]): Photo[] => {
  const list = result.map<Photo>(payload => ({
    id: payload.id,
    parkId: payload.parkId,
    url: payload.fileUrl,
    fileName: payload.fileMetadata.filename ?? 'file.png',
    fileDate: dayjs(payload.createdAt).format('DD/MM/YYYY'),
    dimensions: `${payload.fileMetadata.width} x ${payload.fileMetadata.height} pixels`,
    title: payload.name,
    description: payload.description,
    tags: payload.tagList,
  }));

  return list;
}

const buildPayload = (item: Photo): PhotoPayload => {
  const payload: Partial<PhotoPayload> = {
    id: item.id,
    parkId: item.parkId,
    name: item.title,
    description: item.description,
    tagList: item.tags,
    originalFilename: item.fileName,
    fileDataUri: item.dataUri,
  }
  return payload as PhotoPayload;
};

const hasPhoto = (photoUri: string): boolean => {
  return /^data:image/g.test(photoUri);
}

class Model {
  static fields = fields;
  static mapModel = mapModel;
  static buildPayload = buildPayload;
  static hasPhoto = hasPhoto;
}
