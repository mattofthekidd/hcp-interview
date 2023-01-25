import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonPlaceHolderService {

  constructor(private httpService: HttpClient) { }
  private subscription: Subscription = new Subscription();
  ngOnDestroy() {
    if(!!this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  public async getUserList(): Promise<User[]> {
    let result: User[] = [];
    this.subscription = await this.httpService.get<User[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe(res => { 
        result = res;
      });
    return result;
  }
  
}
