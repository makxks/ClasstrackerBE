import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ErrorService } from '../errors/error.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentAddress: string = environment.apiUrl;

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  createUser(email: string){
    let body = JSON.stringify({"email": email});
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log(body);
    return this.http.post(this.currentAddress + '/user', body, { headers })
    .pipe(
      map((response: any) => {
        const responseObject = response.obj;
        console.log(responseObject);
        return responseObject;
      })
      , catchError((err: any) => {
        var errorMessage;
        var errorCode;
        if(err.error){
          errorMessage = err.error;
        }
        else if(err.message && err.message.length > 0){
          errorMessage = err.message;
        }
        else {
          errorMessage = err;
        }

        if(err.title){
          errorCode = err.title;
        }
        else if(err.statusText && err.statusText.length > 0){
          errorCode = err.statusText;
        }
        else if(err.status){
          errorCode = err.status.toString();
        }
        else {
          errorCode = "";
        }
        console.log(err);
        this.errorService.handleError(errorCode, errorMessage);
        return throwError(() => new Error(err));
      })
    );
  }
}
