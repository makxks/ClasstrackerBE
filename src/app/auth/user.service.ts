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
    return this.http.post(this.currentAddress + '/user', body, { headers })
    .pipe(
      map((response: any) => {
        const responseObject = response.body;
        return responseObject;
      })
      , catchError((err: any) => {
        var errorMessage;
        var errorCode;
        if(err.body.error){
          errorMessage = err.body.error;
        }
        else if(err.body.message && err.body.message.length > 0){
          errorMessage = err.body.message;
        }
        else {
          errorMessage = err;
        }

        if(err.body.title){
          errorCode = err.body.title;
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
