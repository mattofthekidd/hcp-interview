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
  // private stateLookUpService: StateLookUpService;
  private subscriptions: Subscription[] = [];

  public users: User[] = [];
  public formattedUsers: UserFormatted[] = [];
  public formattedUsersString: string = "";

  public constructor(
      jsonPlaceHolderService: JsonPlaceHolderService,
      hcpService: HCPService,
      // stateLookUpService: StateLookUpService,
    ) {
    this.jsonPlaceHolderService = jsonPlaceHolderService;
    this.hcpService = hcpService;
    // this.stateLookUpService = stateLookUpService;
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
  /* For reference
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

      let phone = user.phone.split("x")[0].toString(); //This removes an extension
      let updatedPhone = phone.replace(/([-.() ])/g, "");
      if(updatedPhone.length > 10 && updatedPhone[0] == "1") {
        updatedPhone = updatedPhone.substring(1,11);
      }

      // let state = this.stateLookUpService.getStateByZipCode(address.zipcode.split("-",1).toString());

      let stringUserList: string = `
      "first_name": "${name[0]}",
      "last_name": "${name[1]}",
      "company_name": "${user.company.name}",
      "company_full_address": "${address.street}, ${address.city}, STATE, ${address.zipcode}",
      "website": "${user.website}",
      "phone": "${updatedPhone}",
      `;

      this.formattedUsersString += `{${stringUserList}},`;
    });
  }

  private sendData(): void {
    this.hcpService.postUserList(this.formattedUsersString);
  }

}
