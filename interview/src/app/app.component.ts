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

  public users: User[] = [];

  public constructor(jsonPlaceHolderService: JsonPlaceHolderService) {
    this.service = jsonPlaceHolderService;
  };

  async ngOnInit() {
    await this.init();
  }
  
  private async init(): Promise<void> {
    this.users = await this.service.getUserList();
  }

}
