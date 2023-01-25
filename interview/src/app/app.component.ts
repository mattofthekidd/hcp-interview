import { Component } from '@angular/core';
import { User } from './models/user';
import { JsonPlaceHolderService } from './services/jsonplaceholder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private service: JsonPlaceHolderService;

  title = 'interview';
  users: User[] = [];

  public constructor(jsonPlaceHolderService: JsonPlaceHolderService) {
    this.service = jsonPlaceHolderService;
  };

  ngOnInit() {
    this.init();
  }
  
  private async init(): Promise<void> {
    this.users = await this.service.getUserList();
    console.log(this.users);
  }

}
