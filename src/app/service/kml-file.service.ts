import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class KmlFileService {

  constructor(private httpClient: HttpClient) {
  }

  getFileContentString(url: string): Observable<string> {
    return this.httpClient.get(url, {responseType: 'text'});
  }

}
