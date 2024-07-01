export interface EmailAttachment {
  emailMessageId: string;
  uploadedFileData: UploadedFile;
  uploadedFileUrl: string;
}

export interface UploadedFile{
  id: string;
  storage: string;
  metadata: Metadata;
}

export interface Metadata {
  filename: string;
  size: number;
  mimeType: string;
  width: number;
  height: number;
}
