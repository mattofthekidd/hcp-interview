import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from './models/user';
import { HCPService } from './services/hcpservice.service';
import { JsonPlaceHolderService } from './services/jsonplaceholder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private jsonPlaceHolderService: JsonPlaceHolderService;
  private hcpService: HCPService;
  private subscriptions: Subscription[] = [];

  public users: User[] = [];

  public constructor(
      jsonPlaceHolderService: JsonPlaceHolderService,
      hcpService: HCPService
    ) {
    this.jsonPlaceHolderService = jsonPlaceHolderService;
    this.hcpService = hcpService;
  };


  async ngOnInit(): Promise<void> {
    await this.init();
    this.transformData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
  
  private async init(): Promise<void> {
    this.subscriptions.push(
      await (
        await this.jsonPlaceHolderService.getUserList()
      ).subscribe(x => this.users = x)
    );
  }

  private transformData(): void {
    
  }

  private sendData(): void {
    console.log(this.users)
    this.hcpService.postUserList(this.users);
  }

}
