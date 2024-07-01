import axios from 'axios';
import { baseUrl, CONSTANTS } from 'config';
import { PayloadBase } from './payloads/PayloadBase';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import SessionStorage from 'utils/SessionStorage';

const ax = axios.create({ baseURL: baseUrl });

export default class AuthService {
  static async login(email: string, password: string) {
    if (!CONSTANTS.USE_COGNITO) return this.userLogin(email, password);

    const response = await ax.post<CognitoResponse>('admin/login', { email, password });
    const token = response.data.id_token;
    if (!token) {
      throw Error(response.data.message);
    }
    const decodedToken = jwt_decode<CognitoJwtPayload>(token);
    const auth = AuthPayload.new({ 
      id: decodedToken.sub, 
      email: decodedToken.email,
      token: token,
    });
    return auth;
  }

  static async userLogin(email: string, password: string) {
    const payload = {
      'data': {
        'type': 'credentials',
        'attributes': { email, password },
      }
    }
    const response = await ax.post('user/login', payload);
    const token = response.data.data.attributes.token;
    if (!token) {
      throw Error(response.data.message);
    }
    const decodedToken = jwt_decode<CognitoJwtPayload>(token);
    const auth = AuthPayload.new({ 
      id: decodedToken.sub, 
      email: email,
      token: token,
    });
    return auth;
  }

  static async logout() {
    SessionStorage.clear(['lastParkCode', 'lastPathname']);
    window.location.href = '/';
  }
}

export class AuthPayload extends PayloadBase {
  id: string;
  email: string;
  token: string;
}

class CognitoResponse {
  id_token: string;
  refresh_token: string;
  access_token: string;
  message?: string;
}

interface CognitoJwtPayload extends JwtPayload {
  email: string;
  username: string;
};
