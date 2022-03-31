
import { throwError, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs';
import { Router } from '@angular/router';

import { Class } from './classes.model';
import { Kid } from './kid/kid.model';
import { WeeklyLesson } from './show-class/weekly-lesson.model';
import { ErrorService } from '../errors/error.service';
import { AuthService } from '@auth0/auth0-angular';
import { KidService } from './kid/kid.service';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class ClassesService {
  //currentAddress: string = "https://class-tracker.herokuapp.com";
  //currentAddress: string = "https://class-tracker-staging.herokuapp.com";
  currentAddress: string = environment.apiUrl;
  //keeps track of whether any data related to classes has been changed
  //if not and they have already been loaded they are reused rather than loaded again
  //save loading time of classes if there is no need
  changed: boolean = false;
  loadedClasses: boolean = false;
  classes: Class[] = [];
  classDetails: Class | undefined;
  deleteOccurred = new Subject<Class>();
  shareStarted = new Subject<Class>();
  hasSharedClass = new Subject<Class[]>();
  shareComplete = new Subject<Class>();
  startAddComments = new Subject<string>();
  startDeleteComments = new Subject<string>();
  addCommentsComplete = new Subject<string>();
  completeDeleteComments = new Subject<string>();
  username: string = "";

  constructor(
    private errorService: ErrorService,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private kidService: KidService
  ) {
    this.loadedClasses = false;
    this.authService.user$.subscribe((response) => {
      this.username = response?.name!;
    })
  }

  addClass(userClass: Class){
    //classes data has changed - classes will be reloaded not reused
    this.changed = true;
    this.classes.push(userClass);
    const body = JSON.stringify(userClass);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.currentAddress + '/classes', body, {headers: headers})
      .pipe(
        map((response: any) => {
          const responseObject = response.obj;
          //kids is always empty for a new class, they are added to the class separately later
          var kids: Kid[] = [];
          const userClass = new Class(
            responseObject.classCode,
            responseObject.curriculum,
            responseObject.stage,
            responseObject.level,
            responseObject.session1Day,
            responseObject.session1Time1Hour,
            responseObject.session1Time1Minute,
            responseObject.session1Time2Hour,
            responseObject.session1Time2Minute,
            responseObject.session1Length,
            responseObject.session2Day,
            responseObject.session2Time1Hour,
            responseObject.session2Time1Minute,
            responseObject.session2Time2Hour,
            responseObject.session2Time2Minute,
            responseObject.session2Length,
            responseObject.ct,
            responseObject.user.email,
            kids
          )
          this.router.navigate(['/classes']);
          return userClass;
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
          this.router.navigate(['/classes']);
          return throwError(() => new Error(err));
        })
      );
  };

  getClasses() {
    //need to pass the user as a param to find the user in the db
    let options: HttpParams = new HttpParams();
    options = options.append("email", this.username);
    return this.http.get(this.currentAddress + '/classes', {params: options})
      .pipe(
        map((response: any) => {
          const classes = response.obj;
          let transformedClasses: Class[] = [];
          for (let userClass of classes) {
            if(userClass.addedByOther){
              transformedClasses.push(new Class(
                userClass.classCode,
                userClass.curriculum,
                userClass.stage,
                userClass.level,
                userClass.session1Day,
                userClass.session1Time1Hour,
                userClass.session1Time1Minute,
                userClass.session1Time2Hour,
                userClass.session1Time2Minute,
                userClass.session1Length,
                userClass.session2Day,
                userClass.session2Time1Hour,
                userClass.session2Time1Minute,
                userClass.session2Time2Hour,
                userClass.session2Time2Minute,
                userClass.session2Length,
                userClass.ct,
                userClass.user.email,
                userClass.kids,
                [],
                userClass.addedByOther,
                userClass.addedBy)
              );
            }
            else{
              transformedClasses.push(new Class(
                userClass.classCode,
                userClass.curriculum,
                userClass.stage,
                userClass.level,
                userClass.session1Day,
                userClass.session1Time1Hour,
                userClass.session1Time1Minute,
                userClass.session1Time2Hour,
                userClass.session1Time2Minute,
                userClass.session1Length,
                userClass.session2Day,
                userClass.session2Time1Hour,
                userClass.session2Time1Minute,
                userClass.session2Time2Hour,
                userClass.session2Time2Minute,
                userClass.session2Length,
                userClass.ct,
                userClass.user.email,
                userClass.kids)
              );
            }
          }
          //order alphabetically
          this.classes = transformedClasses.sort(function(a,b){
            return (a.classCode > b.classCode) ? 1 : ((b.classCode > a.classCode) ? -1 : 0);
          });
          this.changed = false;
          this.loadedClasses = true;
          //check classes for those that have been added by other teachers here using a loop
          return this.classes;
        })
        , catchError((err: any) => {
          console.log(err);
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

  getClass(classCode: string) {
    //need to pass the user as a param to find the user in the db
    let options = new HttpParams();
    options = options.append("email", this.username);
    return this.http.get(this.currentAddress + '/classes/' + classCode, {params: options})
      .pipe(
        map((response: any) => {
          const responseObject = response.obj;
          var classDetails = new Class(
            responseObject.classCode,
            responseObject.curriculum,
            responseObject.stage,
            responseObject.level,
            responseObject.session1Day,
            responseObject.session1Time1Hour,
            responseObject.session1Time1Minute,
            responseObject.session1Time2Hour,
            responseObject.session1Time2Minute,
            responseObject.session1Length,
            responseObject.session2Day,
            responseObject.session2Time1Hour,
            responseObject.session2Time1Minute,
            responseObject.session2Time2Hour,
            responseObject.session2Time2Minute,
            responseObject.session2Length,
            responseObject.ct,
            responseObject.user.email,
            responseObject.kids
          )
          this.classDetails = classDetails;
          return classDetails;
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

  editClass(classCode: string, userClass: Class) {
    this.changed = true;
    const body = JSON.stringify(userClass);
    //need to pass the user as a param to find the user in the db
    let options = new HttpParams;
    options = options.append("email", this.username);
    let headers = new HttpHeaders;
    headers.set('Content-Type', 'application/json');


    return this.http.patch(this.currentAddress + '/classes/' + classCode, body, {headers: headers, params: options})
      .pipe(
        map((response: any) => {
          const responseObject = response.obj;
          var classDetails = new Class(
            responseObject.classCode,
            responseObject.curriculum,
            responseObject.stage,
            responseObject.level,
            responseObject.session1Day,
            responseObject.session1Time1Hour,
            responseObject.session1Time1Minute,
            responseObject.session1Time2Hour,
            responseObject.session1Time2Minute,
            responseObject.session1Length,
            responseObject.session2Day,
            responseObject.session2Time1Hour,
            responseObject.session2Time1Minute,
            responseObject.session2Time2Hour,
            responseObject.session2Time2Minute,
            responseObject.session2Length,
            responseObject.ct,
            responseObject.user.email,
            responseObject.kids,
            responseObject.weeklyLessons
          )
          this.classDetails = classDetails;
          return classDetails;
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

	handleDelete(classDetails: any){
    this.changed = true;
		this.deleteOccurred.next(classDetails);
	}

  deleteClass(classDetails: Class){
    this.changed = true;
    this.classes.splice(this.classes.indexOf(classDetails), 1);
    //need to pass the user as a param to find the user in the db
    let options = new HttpParams();
    options = options.append("email", this.username);
    return this.http.delete(this.currentAddress + '/classes/' + classDetails.classCode, {params: options})
      .pipe(
        map((response: any) => {
          const responseObject = response;
          this.router.navigate(['/classes']);
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

  receivedSharedClass(receivedClasses: Class[]){
    this.hasSharedClass.next(receivedClasses);
  }

  startShareClass(classToShare: Class){
    this.shareStarted.next(classToShare);
  }

  shareClassToAnotherTeacher(classToShareCode: string, otherTeacherEmail: string, classToShare: Class, weeklyLessons: WeeklyLesson[], kids: Kid[]){
    this.shareClassDetails(classToShareCode, otherTeacherEmail, classToShare, kids, weeklyLessons)
      .subscribe({
        next: data => console.log(data),
        error: error => console.log(error)
      });
  }

  shareClassDetails(classToShareCode: string, otherTeacherEmail:string, classToShare:Class, kids: Kid[], weeklyLessons: WeeklyLesson[]){
    const body = JSON.stringify(classToShare);
    let options = new HttpParams;
    options = options.append("email", this.username);
    let headers = new HttpHeaders;
    headers.set('Content-Type', 'application/json');

    return this.http.post(this.currentAddress + '/classes/share/' + otherTeacherEmail + "/" + classToShareCode, body, {headers: headers, params: options})
      .pipe(
        map((response: any) => {
          console.log(response);
          this.shareComplete.next(classToShare);
          this.shareKidDetails(otherTeacherEmail, kids, classToShareCode);
          this.shareWeeklyLessonDetails(otherTeacherEmail, weeklyLessons);
          return;
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
          this.router.navigate(['/classes']);
          return throwError(() => new Error(err));
        })
      );
  }

  shareWeeklyLessonDetails(otherTeacherEmail: string, weeklyLessons: WeeklyLesson[]){
    for(var i=0; i<weeklyLessons.length; i++){
      this.shareSingleLesson(otherTeacherEmail, weeklyLessons[i])
        .subscribe({
          next: data => console.log(data),
          error: error => console.log(error)
        });
    }
  }

  shareSingleLesson(otherTeacherEmail: string, weeklyLesson: WeeklyLesson){
    var body = JSON.stringify(weeklyLesson);
    let options = new HttpParams;
    options = options.append("email", this.username);
    let headers = new HttpHeaders;
    headers.set('Content-Type', 'application/json');

    return this.http.post(this.currentAddress + '/weeklyLessons/share/' + otherTeacherEmail, body, {headers: headers, params: options})
      .pipe(
        map((response: any) => {
          console.log(response);
          return;
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
          this.router.navigate(['/classes']);
          return throwError(() => new Error(err));
        })
      );
  }

  shareKidDetails(otherTeacherEmail: string, kids: Kid[], classCode: string){
    for(var j=0; j<kids.length; j++){
      this.shareSingleKid(otherTeacherEmail, kids[j], classCode)
        .subscribe({
          next: data => console.log(data),
          error: error => console.log(error)
        });
    }
  }

  shareSingleKid(otherTeacherEmail: string, kid:Kid, classCode: string){
    console.log(kid);
    var body = JSON.stringify({id: kid});
    let options = new HttpParams;
    options = options.append("email", this.username);
    let headers = new HttpHeaders;
    headers.set('Content-Type', 'application/json');

    return this.http.post(this.currentAddress + '/kids/share/' + otherTeacherEmail + "/" + classCode, body, {headers: headers, params: options})
      .pipe(
        map((response: any) => {
          console.log(response);
          return;
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
          this.router.navigate(['/classes']);
          return throwError(() => new Error(err));
        })
      );
  }

  getComments(classCode: string){
    //need to pass the user as a param to find the user in the db
    let options = new HttpParams();
    options = options.append("email", this.username);
    return this.http.get(this.currentAddress + '/classes/comments/' + classCode, {params: options})
      .pipe(
        map((response: any) => {
          const responseObject = response.obj;
          var comments = responseObject;
          return comments;
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

  startAddCommentCall(classCode:string){
    this.startAddComments.next(classCode);
  }

  completeAddComments(classCode:string){
    this.addCommentsComplete.next(classCode);
  }

  addComments(classCode: string, comments: string){
    //classes data has changed - classes will be reloaded not reused
    this.changed = true;
    var commentObj = { comments: comments };
    const body = JSON.stringify(commentObj);
    let options = new HttpParams;
    options = options.append("email", this.username);
    let headers = new HttpHeaders;
    headers.set('Content-Type', 'application/json');

    return this.http.patch(this.currentAddress + '/classes/comments/' + classCode, body, {headers: headers, params: options})
      .pipe(
        map((response: any) => {
          const responseObject = response.obj;
          //kids is always empty for a new class, they are added to the class separately later
          var newComments: string = responseObject.comments;
          this.completeAddComments(classCode);
          return newComments;
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
          this.router.navigate(['/classes']);
          return throwError(() => new Error(err));
        })
      );
  }

  startDeleteCommentCall(classCode: string){
    this.startDeleteComments.next(classCode);
  }

  deleteCommentsComplete(classCode: string){
    this.completeDeleteComments.next(classCode);
  }

  deleteComments(classCode: string){
    this.changed = true;
    let options = new HttpParams;
    options = options.append("email", this.username);
    let headers = new HttpHeaders;
    headers.set('Content-Type', 'application/json');

    var commentObj = { comments: "" };
    const body = JSON.stringify(commentObj);
    return this.http.patch(this.currentAddress + '/classes/comments/' + classCode, body, {headers: headers, params: options})
      .pipe(
        map((response: any) => {
          const responseObject = response;
          this.deleteCommentsComplete(classCode);
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
