import { PayloadBase } from "./PayloadBase";

export class FilePayload extends PayloadBase{
  id: string;
  storage: string;
  metadata: Metadata;
}

export class Metadata {
  filename: string;
  size: number;
  mime_type: string;
  width: number;
  height: number;
}
