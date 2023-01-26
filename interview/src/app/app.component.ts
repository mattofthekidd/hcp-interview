import { CommaExpr } from '@angular/compiler';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from './models/user';
import { UserFormatted } from './models/userFormatted';
import { HCPService } from './services/hcpservice.service';
import { JsonPlaceHolderService } from './services/jsonplaceholder.service';
import { StateLookUpService } from './services/state-look-up.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private jsonPlaceHolderService: JsonPlaceHolderService;
  private hcpService: HCPService;
  private stateLookUpService: StateLookUpService;
  private subscriptions: Subscription[] = [];

  public users: User[] = [];
  public formattedUsers: UserFormatted[] = [];
  public formattedUsersString: string = "";

  public constructor(
      jsonPlaceHolderService: JsonPlaceHolderService,
      hcpService: HCPService,
      stateLookUpService: StateLookUpService,
    ) {
    this.jsonPlaceHolderService = jsonPlaceHolderService;
    this.hcpService = hcpService;
    this.stateLookUpService = stateLookUpService;
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
        this.sendData();
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
    this.users.forEach(user => {
      const name = user.name.split(" ");
      const address = user.address;
      let phone = user.phone.split("x");
      let splitPhone = phone[0];
      let completePhone = splitPhone.replace(/([-.() ])/g, "");
      // let state = this.stateLookUpService.getStateByZipCode(address.zipcode.split("-",1).toString());

      let stringUserList: string = `
      "first_name": ${name[0]},
      "last_name": ${name[1]},
      "company_name": ${user.company.name},
      "company_full_address": ${address.street}, ${address.city}, STATE, ${address.zipcode},
      "website": ${user.website},
      "phone": ${parseInt(completePhone)},
      `;
      this.formattedUsersString += `{${stringUserList}},`;
      // let transformedUser: UserFormatted = {
      //   first_name: name[0],
      //   last_name: name[1],
      //   company_name: user.company.name,
      //   company_full_address: `${address.street}, ${address.city}, STATE, ${address.zipcode}`,
      //   website: user.website,
      //   phone: parseInt(completePhone),
      // };
      // this.formattedUsers.push(transformedUser);
    })

    //Assuming that we were going to use this data on the site I would leave this object and create a new one for sending to the API.

  }

  private sendData(): void {
    // console.log(this.formattedUsers)

    this.hcpService.postUserList(this.formattedUsersString);
  }

}
