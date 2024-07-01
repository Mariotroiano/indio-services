// import { MediaPayload } from './payloads/MediaPayload';
import { PhotoPayload } from './payloads/PhotoPayload';
import { ServiceBase } from './client/ServiceBase';
import { AxiosInstance } from 'axios';
import { FilePayload } from './payloads/FilePayload';

export default class FileService {
  private ax: AxiosInstance;
  constructor(ax: AxiosInstance) {
    // super(PhotoPayload, ax, 'media');
    this.ax = ax;
  }

  async bucketUpload(file: File) {
    const params = new URLSearchParams({ filename: file.name, type: file.type });
    const presing = await this.ax.get(`/files/presign?${params}`);

    if (presing.data) {
      let url = presing.data.url;
      let headers = presing.data.fields;
      let formData = new FormData();
      formData.append("file", file);
      const result = await this.ax.post(url, formData, headers);
      return result;
    }
  }

  async directUpload(file: File) {
    const params = new URLSearchParams({ filename: file.name, type: file.type });
    const url = `/files/upload?${params}`;
    try {
      // let formData = new FormData();
      // formData.append("file", file);
      const buffer = await file.arrayBuffer();
      const binaryString = await readAsBinaryString(file);
      const result = await this.ax.post(url, buffer, {
        headers: { 'Content-Type': file.type },
        maxBodyLength: file.size,
        // maxContentLength: Infinity,
        responseType: 'json'
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async uploadFile( file: File): Promise<FilePayload> {
    // const params = new URLSearchParams({ filename: file.name, type: file.type });
    const url = `/files/upload`;
  
    let formData = new FormData();
    formData.append("file", file);
    const headers = { 'Content-Type': file.type };
    const result = await this.ax.post(url, formData, {headers});
    return result?.data;
  }
}

async function readAsBinaryString(file: File) {
  return new Promise<ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      resolve(event.target.result as ArrayBuffer);
    }
    reader.onerror = (error) => reject(error);
    reader.readAsBinaryString(file);
  });
}



