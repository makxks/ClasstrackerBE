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
    const body = JSON.stringify({"email": email});
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.currentAddress + '/user', body, { headers: headers })
    .pipe(
      map((response: any) => {
        const responseObject = response.obj;
        console.log(responseObject);
        return responseObject;
      })
      , catchError((err: any) => {
        var errorMessage;
        var errorCode;
        errorMessage = err.message;
        errorCode = err.status;
        console.log(err);
        this.errorService.handleError(errorCode, errorMessage);
        return throwError(() => new Error(err));
      })
    );
  }
}
