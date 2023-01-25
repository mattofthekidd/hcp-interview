import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class HcpserviceService {
  constructor(private httpService: HttpClient) {  }

public postUserList(userList: User[]): boolean {
  var x = this.httpService.post(`https://dev.app.homecarepulse.com/Primary/?FlowId=7423bd80-cddb-11ea-9160-326dddd3e106&Action=api`, userList);
  console.log(x);
  return true;
}

}
