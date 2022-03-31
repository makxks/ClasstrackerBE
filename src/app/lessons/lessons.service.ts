
import { throwError, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs';

import { Lesson } from './lessons.model';
import { ErrorService } from '../errors/error.service';
import { AuthService } from '@auth0/auth0-angular';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class LessonService {
  //currentAddress: string = "https://class-tracker.herokuapp.com";
  //currentAddress: string = "https://class-tracker-staging.herokuapp.com";
  currentAddress: string = environment.apiUrl;
  changed: boolean = false;
  loadedLessons: boolean = false;
  lessons: Lesson[] = [];
  lessonDetails!: Lesson;
  deleteOccurred = new Subject<Lesson>();
  username: string = "";

  constructor(
    private errorService: ErrorService,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router) {
      this.authService.user$.subscribe((response) => {
        this.username = response?.name!;
      })
    }

  addLesson(lesson: Lesson){
    this.changed = true;
    this.lessons.push(lesson);
    const body = JSON.stringify(lesson);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.currentAddress + '/lessons', body, {headers: headers})
      .pipe(
        map((response: any) => {
          const responseObject = response.body.obj;
          const newLesson = new Lesson(
            responseObject.curriculum,
            responseObject.stage,
            responseObject.level,
            responseObject.subject,
            responseObject.lessonNo,
            responseObject.lessonTitle,
            responseObject.keyWords,
            responseObject.keySentences,
            responseObject.objectives,
            responseObject.supplies,
            responseObject.activities,
            responseObject._id
          )
          this.router.navigate(['/lessons']);
          return newLesson;
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

  getLesson(curriculum: string, stage: number, level: string, subject: string, lessonNo: number){
    let params = '';
    //need to pass the user as a param to find the user in the db
    let options = new HttpParams;
    options.append("email", this.username);
    var routeString = "";
    if(stage){
      routeString = "standardised/" + stage
    }
    else if(level){
      routeString = level;
    }
    return this.http.get(this.currentAddress + '/lessons/'
    + curriculum + "/" + routeString + "/" + subject + "/" + lessonNo, { params: options })
      .pipe(
        map((response: any) => {
          if(response.body.obj != null){
            const responseObject = response.body.obj;
            var lessonDetails = new Lesson(
              responseObject.curriculum,
              responseObject.stage,
              responseObject.level,
              responseObject.subject,
              responseObject.lessonNo,
              responseObject.lessonTitle,
              responseObject.keyWords,
              responseObject.keySentences,
              responseObject.objectives,
              responseObject.supplies,
              responseObject.activities,
              responseObject._id
            )
            this.lessonDetails = lessonDetails;
            return lessonDetails;
          }
          else {
            return null;
          }
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

  getLessonById(id: Lesson){
    let params = '';
    //need to pass the user as a param to find the user in the db
    let options = new HttpParams;
    options.append("email", this.username);
    return this.http.get(this.currentAddress + '/lessons/'
    + id, { params: options })
      .pipe(
        map((response: any) => {
          const responseObject = response.body.obj;
          var lessonDetails = new Lesson(
            responseObject.curriculum,
            responseObject.stage,
            responseObject.level,
            responseObject.subject,
            responseObject.lessonNo,
            responseObject.lessonTitle,
            responseObject.keyWords,
            responseObject.keySentences,
            responseObject.objectives,
            responseObject.supplies,
            responseObject.activities,
            responseObject._id
          )
          this.lessonDetails = lessonDetails;
          return lessonDetails;
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

  getOralTest(){
    let params = '';
    //need to pass the user as a param to find the user in the db
    let options = new HttpParams;
    options.append("email", this.username);
    return this.http.get(this.currentAddress + '/lessons/128/standardised/0/OralTest/1', { params: options })
      .pipe(
        map((response: any) => {
          const responseObject = response.body.obj;
          var lessonDetails = new Lesson(
            responseObject.curriculum,
            responseObject.stage,
            responseObject.level,
            responseObject.subject,
            responseObject.lessonNo,
            responseObject.lessonTitle,
            responseObject.keyWords,
            responseObject.keySentences,
            responseObject.objectives,
            responseObject.supplies,
            responseObject.activities,
            responseObject._id
          )
          this.lessonDetails = lessonDetails;
          return lessonDetails;
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

  getLessons(){
    let params = '';
    //need to pass the user as a param to find the user in the db
    let options = new HttpParams;
    options.append("email", this.username);
    return this.http.get(this.currentAddress + '/lessons',
    { params: options })
    .pipe(
      map((response: any) => {
        const lessons = response.body.obj;
        let transformedLessons: Lesson[] = [];
        for (let lesson of lessons) {
          transformedLessons.push(new Lesson(
            lesson.curriculum,
            lesson.stage,
            lesson.level,
            lesson.subject,
            lesson.lessonNo,
            lesson.lessonTitle,
            lesson.keyWords,
            lesson.keySentences,
            lesson.objectives,
            lesson.supplies,
            lesson.activities,
            lesson._id)
          );
        }
        this.lessons = transformedLessons;
        this.changed = false;
        this.loadedLessons = true;
        return transformedLessons;
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

  editLesson(curriculum: string, stage: number, level: string, subject: string, lessonNo: number, lesson: Lesson) {
    this.changed = true;
    let params = '';
    const body = JSON.stringify(lesson);
    //need to pass the user as a param to find the user in the db
    let options = new HttpParams;
    options.append("email", this.username);
    let headers = new HttpHeaders;
    headers.set('Content-Type', 'application/json');
    var routeString = "";
    if(stage || subject == "OralTest"){
      routeString = "standardised/" + stage
    }
    else if(level){
      routeString = level;
    }
    return this.http.patch(this.currentAddress + '/lessons/' + curriculum + "/" + routeString + "/" + subject + "/" + lessonNo, body,
    { headers: headers, params: options })
      .pipe(
        map((response: any) => {
          const responseObject = response.body.obj;
          var lesson = new Lesson(
            responseObject.curriculum,
            responseObject.stage,
            responseObject.level,
            responseObject.subject,
            responseObject.lessonNo,
            responseObject.lessonTitle,
            responseObject.keyWords,
            responseObject.keySentences,
            responseObject.objectives,
            responseObject.supplies,
            responseObject.activities,
            responseObject._id
          )
          this.lessonDetails = lesson;
          return lesson;
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

  handleDelete(lesson: any){
    this.changed = true;
		this.deleteOccurred.next(lesson);
	}

  deleteLesson(lesson: Lesson){
    this.changed = true;
    this.lessons.splice(this.lessons.indexOf(lesson), 1);
    let params = '';
    //need to pass the user as a param to find the user in the db
    let options = new HttpParams;
    options.append("email", this.username);
    var routeString = "";
    if(lesson.stage || lesson.subject == "OralTest" || lesson.curriculum == "G" || lesson.curriculum == "K"){
      routeString =  "standardised/" + lesson.stage
    }
    else if(lesson.level){
      routeString = lesson.level;
    }
    else if(lesson.curriculum == "Demo" || lesson.curriculum == "G0"){
      routeString = "standardised/0"
    }
    return this.http.delete(this.currentAddress + '/lessons/' + lesson.curriculum + "/" + routeString + "/" + lesson.subject + "/" + lesson.lessonNo, { params: options })
      .pipe(
        map(() => {
          this.router.navigate(['/lessons']);
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
