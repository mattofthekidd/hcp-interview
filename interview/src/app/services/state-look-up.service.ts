import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateLookUpService {

  constructor(private httpService: HttpClient) { }

  private apiKey: string = "get your own";
  
  // API from here.
  // https://zipcodebase.com/
  public async getStateByZipCode(zipCode: string): Promise<Observable<string>> {
    return await this.httpService.get<string>(`https://app.zipcodebase.com/api/v1/search?apikey=${this.apiKey}&codes=${zipCode}`);
  }
}