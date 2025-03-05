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
      const users = resData.results;
      return users;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  /**
   * Crea un nuevo usuario
   *
   * @param user Objeto parcial del usuario dado que la asignación del ID es posterior
   * 
   * @returns El usuario nuevo con ID o un error
   */

  async createUser(user:Partial<IUser>):Promise<IUser | ApiError> {
    try {
       const resp = await axios.post<IUser | ApiError>(`${this._apiurl}/api/users`, user) 
       console.log(resp.data);
       return resp.data;
    } catch (error) {
        console.log(error);
        return { error: error as string };
    }
  }

  /**
   * Actualiza la data del usuario
   *
   * @param user Objeto parcial del usuario con las propiedades a actualizar
   * 
   * @returns El usuario actualizado o un error
   */

  async updateUser(_id:string, user:Partial<IUser>):Promise<IUser | ApiError> {
    try {
       const resp = await axios.put<IUser | ApiError>(`${this._apiurl}/api/users/${_id}`, user) 
       return resp.data;
    } catch (error) {
        console.log(error);
        return { error: error as string };
    }
  }

  /**
   * Hace un fecth al endpoint de usuario por id
   *
   * @param id Id del usuario a consultar. Se require en string porque se recupera de la ruta
   * @returns Usuario encontrado o error si no existe
   */

  async getUserById(id: string): Promise<IUser | ApiError> { 
    try {
      const resp = await axios.get<IUser | ApiError>(`${this._apiurl}/api/users/${id}`);
      return resp.data;
    } catch (error) {
      console.log(error);
      return {error: error as string };
    }
  }

  /**
   * Recibe un id del usuario y lo borra con el método DELETE
   *
   * @param id Id del usuario a borrar
   * @returns Usuario borrado o error si no se ha podido procesar
   */

  async deleteUserById(id: string): Promise<IUser | ApiError> { 
    try {
      const resp = await axios.delete<IUser | ApiError>(`${this._apiurl}/api/users/${id}`);
      return resp.data;
    } catch (error) {
      console.log(error);
      return {error: error as string };
    }
  }


}
