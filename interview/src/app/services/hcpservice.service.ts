import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class HCPService {
  constructor(private httpService: HttpClient) {  }

  public async postUserList(userList: User[]): Promise<void> {
    // This call is very wrong at the moment.
    // await this.httpService.post<User[]>(`https://dev.app.homecarepulse.com/Primary/?FlowId=7423bd80-cddb-11ea-9160-326dddd3e106&Action=api`, userList);
  }

}
