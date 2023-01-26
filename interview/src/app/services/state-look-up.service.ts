import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateLookUpService {

  constructor(private httpService: HttpClient) { }
  private apiKey: string = "get your own";
  //https://www.usps.com/business/web-tools-apis/address-information-api.htm#_Toc110511824
  public async getStateByZipCode(zipCode: string): Promise<void> {

    var xml = `<CityStateLookupRequest USERID="636NA0004353"><ZipCode ID='0'><Zip5>${zipCode}</Zip5></ZipCode></CityStateLookupRequest>`;
    let t = "";
    // await this.httpService.get<string>(`https://secure.shippingapis.com/ShippingAPI.dll?/API=CityStateLookup&XML=(` + xml + ')').subscribe(x => t = x)
    await this.httpService.get<string>(`https://app.zipcodebase.com/api/v1/search?apikey=${this.apiKey}&codes=84321`).subscribe(x => t = x)
    console.log(t)
  }
}


// Your Username is 636NA0004353
// Your Password is 434NL56VJ000