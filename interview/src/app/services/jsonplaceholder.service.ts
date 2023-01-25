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
    this.subscription = await this.httpService.get<RequestBody>('https://jsonplaceholder.typicode.com/users')
      .subscribe(res => { 
          res.users.forEach(x => { 
            result.push(x) 
          });
      });
    return result;
  }
  
}

// We will only ever use this interface in this file.
// As such I won't move it to a model file.
interface RequestBody {
  userId: string;
  password: string;
  outputType: string;
  users: User[];
}
