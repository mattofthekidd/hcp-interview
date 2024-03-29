import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonPlaceHolderService {

  constructor(private httpService: HttpClient) { }

  public async getUserList(): Promise<Observable<User[]>> {
    return await this.httpService.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }
  
}
