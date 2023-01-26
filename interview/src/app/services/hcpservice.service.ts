import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user';
import { UserFormatted } from '../models/userFormatted';

@Injectable({
  providedIn: 'root'
})
export class HCPService {
  constructor(private httpService: HttpClient) {  }

  private subscriptions: Subscription[] = [];

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  public async postUserList(userList: string): Promise<void> {
    
    const packet = `{
    "userid": "mattofthekidd@gmail.com",
    "password": "97cbb7694c5f4ad5bfdc48f9770b6692",
    "outputtype": "Json",
    "users":[` + userList + "]}";

    this.subscriptions.push(
      await this.httpService.post<UserFormatted[]>(`https://dev.app.homecarepulse.com/Primary/?FlowId=7423bd80-cddb-11ea-9160-326dddd3e106&Action=api`, packet)
      .subscribe(() => {})
    );
  }

}
