import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from './models/user';
import { UserFormatted } from './models/userFormatted';
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
  public formattedUsers: UserFormatted[] = [];

  public constructor(
      jsonPlaceHolderService: JsonPlaceHolderService,
      hcpService: HCPService
    ) {
    this.jsonPlaceHolderService = jsonPlaceHolderService;
    this.hcpService = hcpService;
  };


  async ngOnInit(): Promise<void> {
    await this.init();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
  
  private async init(): Promise<void> {
    this.subscriptions.push((
      await this.jsonPlaceHolderService.getUserList()
      ).subscribe(x => {
        this.users = x;
        this.transformData();
      })
    );
  }
  /*
  "first_name": "StringValue",
  "last_name": "StringValue",
  "company_name": "StringValue",
  "company_full_address": "Street Address, City, State, Zip",
  "website": "StringValue",
  "phone": "2083567880"
  */
  private transformData(): void {
    // console.log(this.users.length)
    this.users.forEach(user => {
      const name = user.name.split(" ");
      const address = user.address;
      let transformedUser: UserFormatted = {
        first_name: name[0],
        last_name: name[1],
        company_name: user.company.name,
        company_full_address: `${address.street}, ${address.city}, STATE, ${address.zipcode}`,
        website: user.website,
        phone: 0,
      };
      this.formattedUsers.push(transformedUser);
    })
    console.log(this.formattedUsers)
  }

  private sendData(): void {
    console.log(this.users)
    this.hcpService.postUserList(this.users);
  }

}
