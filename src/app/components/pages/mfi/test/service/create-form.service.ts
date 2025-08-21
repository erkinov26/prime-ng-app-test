import { Injectable } from '@angular/core';
import { delay, Observable, of, switchMap, tap, throwError } from 'rxjs';

export enum EUserData {
  EMAIL = 'email',
  PASSWORD = 'password',
}

export interface User {
  id: number;
  username: string;
  [EUserData.EMAIL]: string;
  [EUserData.PASSWORD]: string;
  age: number;
  phone: string;
  address: string;
  isActive: boolean;
}
export interface UserPayload {
  [EUserData.EMAIL]: string;
  [EUserData.PASSWORD]: string;
}

export interface Payload<T> {
  success?: boolean;
  status: number;
  data: T;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class CreateFormService {
  private users: User[] = [
    {
      id: 1,
      username: 'abbos',
      email: 'abbos@example.com',
      password: '12345',
      age: 25,
      phone: '+998901234567',
      address: 'Tashkent, Uzbekistan',
      isActive: true,
    },
    {
      id: 2,
      username: 'john_doe',
      email: 'john@example.com',
      password: 'qwerty',
      age: 30,
      phone: '+998931112233',
      address: 'Samarkand, Uzbekistan',
      isActive: false,
    },
    {
      id: 3,
      username: 'sara',
      email: 'sara@example.com',
      password: 'pass123',
      age: 22,
      phone: '+998977778899',
      address: 'Bukhara, Uzbekistan',
      isActive: true,
    },
  ];

  constructor() {}

  public getUsers(): Observable<Payload<User[]>> {
    return of({
      success: true,
      status: 200,
      message: 'You have got',
      data: this.users,
    });
  }

  //   public signin(user: UserPayload): Observable<Payload<User>> {
  //     const signingUser = this.users.find(
  //       (u) => u.email === user.email && u.password === user.password
  //     );

  //     if (!signingUser) {
  //       return throwError(() => new Error('Invalid email or password'));
  //     }

  //     return of({
  //       success: true,
  //       message: 'You have successfully signed in',
  //       status: 200,
  //       data: signingUser,
  //     });
  //   }
  public signin(user: UserPayload): Observable<Payload<User>> {
    const signingUser = this.users.find(
      (u) => u.email === user.email && u.password === user.password
    );

    if (!signingUser) {
      return throwError(() => ({
        success: false,
        status: 401,
        message: 'Invalid email or password',
        data: null as any, // yoki undefined
      })).pipe(delay(2000));
    }

    return of({
      success: true,
      message: 'You have successfully signed in',
      status: 200,
      data: signingUser,
    }).pipe(delay(2000));
  }
}
