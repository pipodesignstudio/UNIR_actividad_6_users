import { Injectable } from '@angular/core';
import axios from 'axios';
import { IAPIUsersResponse, IUser } from '../interfaces';
import { environment } from '../../../environments/environment.development';
import { ApiError } from '../interfaces/api-error.interface';

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  private readonly _apiurl = environment.apiUrl;

  /**
   * Hace un fecth al endpoint de usuarios
   *
   * @returns La lista completa de usuarios o un array vacío en caso de error.
   */

  async getAllUsers(): Promise<IUser[]> {
    try {
      const resp = await axios.get<IAPIUsersResponse>(
        `${this._apiurl}/api/users`
      );
      const resData = resp.data;
      console.log(resData)
      const users = resData.results;
      console.log(users);
      return users;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  /**
   * Hace un fecth al endpoint de usuarios
   *
   * @param user Objeto parcial del usuario dado que la asignación del ID es posterior
   * 
   * @returns El usuario nuevo con ID o un error
   */

  async createUser(user:Partial<IUser>):Promise<IUser | ApiError> {
    try {
       const resp = await axios.post<IUser>(`${this._apiurl}/api/users`, user) 
       return resp.data;
    } catch (error) {
        console.log(error);
        return { error: error as string };
    }

  }


}
