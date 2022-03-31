
import { throwError, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs';
import { Router } from '@angular/router';

import { Class } from '../classes.model';
import { Kid } from '../kid/kid.model';
import { WeeklyLesson } from './weekly-lesson.model';

import { ErrorService } from '../../errors/error.service';
import { AuthService } from '@auth0/auth0-angular';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class WeeklyLessonsService {
  //currentAddress: string = "https://class-tracker.herokuapp.com";
  //currentAddress: string = "https://class-tracker-staging.herokuapp.com";
  currentAddress: string = environment.apiUrl;
  changed: boolean = false;
  loadedWeeklyLessons: boolean = false;
  weeklyLessons: WeeklyLesson[] = [];
  weeklyLesson: WeeklyLesson | undefined;
  classDetails: Class | undefined;
  deleteOccurred = new Subject<WeeklyLesson>();
  deleteComplete = new Subject<WeeklyLesson>();
  loadedAllScheduleLessons = new Subject<void>();
  username: string = "";

  //all of last weeks assigned lessons divided by day
  lastWeekMLessons: WeeklyLesson[] = [];
  lastWeekTLessons: WeeklyLesson[]  = [];
  lastWeekWLessons: WeeklyLesson[] = [];
  lastWeekThLessons: WeeklyLesson[] = [];
  lastWeekFLessons: WeeklyLesson[] = [];
  lastWeekSAMLessons: WeeklyLesson[] = [];
	lastWeekSPMLessons: WeeklyLesson[] = [];
  lastWeekSuAMLessons: WeeklyLesson[] = [];
	lastWeekSuPMLessons: WeeklyLesson[] = [];

  //all of this weeks assigned lessons divided by day
  thisWeekMLessons: WeeklyLesson[] = [];
  thisWeekTLessons: WeeklyLesson[] = [];
  thisWeekWLessons: WeeklyLesson[] = [];
  thisWeekThLessons: WeeklyLesson[] = [];
  thisWeekFLessons: WeeklyLesson[] = [];
  thisWeekSAMLessons: WeeklyLesson[] = [];
	thisWeekSPMLessons: WeeklyLesson[] = [];
  thisWeekSuAMLessons: WeeklyLesson[] = [];
	thisWeekSuPMLessons: WeeklyLesson[] = [];

  //all of next weeks assigned lessons divided by day
  nextWeekMLessons: WeeklyLesson[] = [];
  nextWeekTLessons: WeeklyLesson[] = [];
  nextWeekWLessons: WeeklyLesson[] = [];
  nextWeekThLessons: WeeklyLesson[] = [];
  nextWeekFLessons: WeeklyLesson[] = [];
  nextWeekSAMLessons: WeeklyLesson[] = [];
	nextWeekSPMLessons: WeeklyLesson[] = [];
  nextWeekSuAMLessons: WeeklyLesson[] = [];
	nextWeekSuPMLessons: WeeklyLesson[] = [];

  loadedScheduleLessons: number = 0;
  numberOfLessons: number = 0;
  allScheduleLessonsLoaded: boolean = false;

  constructor(
    private errorService: ErrorService,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.loadedWeeklyLessons = false;
    this.authService.user$.subscribe((response) => {
      this.username = response?.name!;
    })
  }

  addWeeklyLesson(weeklyLesson: WeeklyLesson){
    this.changed = true;
    this.weeklyLessons.push(weeklyLesson);
    const body = JSON.stringify(weeklyLesson);
    let options = new HttpParams();
    options = options.append('email', this.username);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.post(this.currentAddress + '/weeklyLessons', body, { headers, params: options })
      .pipe(
        map((response: any) => {
          const responseObject = response;
          if(responseObject.curriculum && responseObject.stage && responseObject.level){
            const weeklyLesson = new WeeklyLesson(
              responseObject.classCode,
              responseObject.timeValue,
              responseObject.length,
              responseObject.subject,
              responseObject.lessonNo,
              responseObject.lesson,
              responseObject.curriculum,
              responseObject.level,
              responseObject.stage,
              responseObject.prepped
            )
          }
          else {
            const weeklyLesson = new WeeklyLesson(
              responseObject.classCode,
              responseObject.timeValue,
              responseObject.length,
              responseObject.subject,
              responseObject.lessonNo,
              responseObject.lesson,
              undefined,
              undefined,
              undefined,
              responseObject.prepped
            )
          }
          this.router.navigate(['/classes/show-class/' + responseObject.classCode]);
          return weeklyLesson;
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

  addIrregularLesson(weeklyLesson: WeeklyLesson, curriculum: string, stage: string, level: string){
    this.changed = true;
    this.weeklyLessons.push(weeklyLesson);
    const body = JSON.stringify(weeklyLesson);
    let options = new HttpParams();
    options = options.append('email', this.username);
    options = options.append('curriculum', curriculum);
    options = options.append('stage', stage);
    options = options.append('level', level);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.post(this.currentAddress + '/weeklyLessons/irregular', body, { headers, params: options })
      .pipe(
        map((response: any) => {
          const responseObject = response;
          if(responseObject.curriculum && responseObject.stage && responseObject.level){
            const weeklyLesson = new WeeklyLesson(
              responseObject.classCode,
              responseObject.timeValue,
              responseObject.length,
              responseObject.subject,
              responseObject.lessonNo,
              responseObject.lesson,
              responseObject.curriculum,
              responseObject.level,
              responseObject.stage,
              responseObject.prepped
            )
          }
          else {
            const weeklyLesson = new WeeklyLesson(
              responseObject.classCode,
              responseObject.timeValue,
              responseObject.length,
              responseObject.subject,
              responseObject.lessonNo,
              responseObject.lesson,
              undefined,
              undefined,
              undefined,
              responseObject.prepped
            )
          }
          this.router.navigate(['/schedule']);
          return weeklyLesson;
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

  getUsersWeeklyLessons(){

    this.lastWeekMLessons = [];
    this.lastWeekTLessons = [];
    this.lastWeekWLessons = [];
    this.lastWeekThLessons = [];
    this.lastWeekFLessons = [];
    this.lastWeekSAMLessons = [];
  	this.lastWeekSPMLessons = [];
    this.lastWeekSuAMLessons = [];
  	this.lastWeekSuPMLessons = [];

    this.thisWeekMLessons = [];
    this.thisWeekTLessons = [];
    this.thisWeekWLessons = [];
    this.thisWeekThLessons = [];
    this.thisWeekFLessons = [];
    this.thisWeekSAMLessons = [];
  	this.thisWeekSPMLessons = [];
    this.thisWeekSuAMLessons = [];
  	this.thisWeekSuPMLessons = [];

    this.nextWeekMLessons = [];
    this.nextWeekTLessons = [];
    this.nextWeekWLessons = [];
    this.nextWeekThLessons = [];
    this.nextWeekFLessons = [];
    this.nextWeekSAMLessons = [];
  	this.nextWeekSPMLessons = [];
    this.nextWeekSuAMLessons = [];
  	this.nextWeekSuPMLessons = [];

    //need to pass the user as a param to find the user in the db
    let options = new HttpParams();
    options = options.append('email', this.username);
    return this.http.get(this.currentAddress + '/weeklyLessons/teacher/allLessons', { params: options })
    .pipe(
      map((response: any) => {
        const weeklyLessons = response;
        let transformedWeeklyLessons: WeeklyLesson[] = [];
        for (let weeklyLesson of weeklyLessons) {
          if(weeklyLesson.curriculum && (weeklyLesson.stage || weeklyLesson.level)){
            transformedWeeklyLessons.push(new WeeklyLesson(
              weeklyLesson.classCode,
              weeklyLesson.timeValue,
              weeklyLesson.length,
              weeklyLesson.subject,
              weeklyLesson.lessonNo,
              weeklyLesson.lesson,
              weeklyLesson.curriculum,
              weeklyLesson.level,
              weeklyLesson.stage,
              weeklyLesson.prepped)
            );
          }
          else {
            transformedWeeklyLessons.push(new WeeklyLesson(
              weeklyLesson.classCode,
              weeklyLesson.timeValue,
              weeklyLesson.length,
              weeklyLesson.subject,
              weeklyLesson.lessonNo,
              weeklyLesson.lesson,
              undefined,
              undefined,
              undefined,
              weeklyLesson.prepped)
            );
          }
        }
        this.changed = false;
        this.loadedWeeklyLessons = true;
        var timeNow: Date = new Date();
        this.sortClassesByDay(transformedWeeklyLessons, timeNow);
        return transformedWeeklyLessons;
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

  getWeeklyLessons(classCode: string){
    let options = new HttpParams();
    options = options.append('email', this.username);
    //need to pass the user as a param to find the user in the db
    return this.http.get(this.currentAddress + '/weeklyLessons/' + classCode, { params: options })
    .pipe(
      map((response: any) => {
        const weeklyLessons: any = response;
        let transformedWeeklyLessons: WeeklyLesson[] = [];
        for (let weeklyLesson of weeklyLessons) {
          if(weeklyLesson.curriculum && weeklyLesson.stage && weeklyLesson.level){
            transformedWeeklyLessons.push(new WeeklyLesson(
              weeklyLesson.classCode,
              weeklyLesson.timeValue,
              weeklyLesson.length,
              weeklyLesson.subject,
              weeklyLesson.lessonNo,
              weeklyLesson.lesson,
              weeklyLesson.curriculum,
              weeklyLesson.level,
              weeklyLesson.stage,
              weeklyLesson.prepped)
            );
          }
          else {
            transformedWeeklyLessons.push(new WeeklyLesson(
              weeklyLesson.classCode,
              weeklyLesson.timeValue,
              weeklyLesson.length,
              weeklyLesson.subject,
              weeklyLesson.lessonNo,
              weeklyLesson.lesson,
              undefined,
              undefined,
              undefined,
              weeklyLesson.prepped)
            );
          }
        }
        this.weeklyLessons = transformedWeeklyLessons;
        return transformedWeeklyLessons;
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

  handleDelete(weeklyLesson: WeeklyLesson){
    this.changed = true;
    this.deleteOccurred.next(weeklyLesson);
  }

  handleDeleteComplete(weeklyLesson: WeeklyLesson){
    if(this.lastWeekMLessons.includes(weeklyLesson)){
      this.lastWeekMLessons.splice(this.lastWeekMLessons.indexOf(weeklyLesson),1);
    };
    if(this.lastWeekTLessons.includes(weeklyLesson)){
      this.lastWeekTLessons.splice(this.lastWeekTLessons.indexOf(weeklyLesson),1);
    };
    if(this.lastWeekWLessons.includes(weeklyLesson)){
      this.lastWeekWLessons.splice(this.lastWeekWLessons.indexOf(weeklyLesson),1);
    };
    if(this.lastWeekThLessons.includes(weeklyLesson)){
      this.lastWeekThLessons.splice(this.lastWeekThLessons.indexOf(weeklyLesson),1);
    };
    if(this.lastWeekFLessons.includes(weeklyLesson)){
      this.lastWeekFLessons.splice(this.lastWeekFLessons.indexOf(weeklyLesson),1);
    };
    if(this.lastWeekSAMLessons.includes(weeklyLesson)){
      this.lastWeekSAMLessons.splice(this.lastWeekSAMLessons.indexOf(weeklyLesson),1);
    };
    if(this.lastWeekSPMLessons.includes(weeklyLesson)){
      this.lastWeekSPMLessons.splice(this.lastWeekSPMLessons.indexOf(weeklyLesson),1);
    };
    if(this.lastWeekSuAMLessons.includes(weeklyLesson)){
      this.lastWeekSuAMLessons.splice(this.lastWeekSuAMLessons.indexOf(weeklyLesson),1);
    };
    if(this.lastWeekSuPMLessons.includes(weeklyLesson)){
      this.lastWeekSuPMLessons.splice(this.lastWeekSuPMLessons.indexOf(weeklyLesson),1);
    };

    if(this.thisWeekMLessons.includes(weeklyLesson)){
      this.thisWeekMLessons.splice(this.thisWeekMLessons.indexOf(weeklyLesson),1);
    };
    if(this.thisWeekTLessons.includes(weeklyLesson)){
      this.thisWeekTLessons.splice(this.thisWeekTLessons.indexOf(weeklyLesson),1);
    };
    if(this.thisWeekWLessons.includes(weeklyLesson)){
      this.thisWeekWLessons.splice(this.thisWeekWLessons.indexOf(weeklyLesson),1);
    };
    if(this.thisWeekThLessons.includes(weeklyLesson)){
      this.thisWeekThLessons.splice(this.thisWeekThLessons.indexOf(weeklyLesson),1);
    };
    if(this.thisWeekFLessons.includes(weeklyLesson)){
      this.thisWeekFLessons.splice(this.thisWeekFLessons.indexOf(weeklyLesson),1);
    };
    if(this.thisWeekSAMLessons.includes(weeklyLesson)){
      this.thisWeekSAMLessons.splice(this.thisWeekSAMLessons.indexOf(weeklyLesson),1);
    };
    if(this.thisWeekSPMLessons.includes(weeklyLesson)){
      this.thisWeekSPMLessons.splice(this.thisWeekSPMLessons.indexOf(weeklyLesson),1);
    };
    if(this.thisWeekSuAMLessons.includes(weeklyLesson)){
      this.thisWeekSuAMLessons.splice(this.thisWeekSuAMLessons.indexOf(weeklyLesson),1);
    };
    if(this.thisWeekSuPMLessons.includes(weeklyLesson)){
      this.thisWeekSuPMLessons.splice(this.thisWeekSuPMLessons.indexOf(weeklyLesson),1);
    };

    if(this.nextWeekMLessons.includes(weeklyLesson)){
      this.nextWeekMLessons.splice(this.nextWeekMLessons.indexOf(weeklyLesson),1);
    };
    if(this.nextWeekTLessons.includes(weeklyLesson)){
      this.nextWeekTLessons.splice(this.nextWeekTLessons.indexOf(weeklyLesson),1);
    };
    if(this.nextWeekWLessons.includes(weeklyLesson)){
      this.nextWeekWLessons.splice(this.nextWeekWLessons.indexOf(weeklyLesson),1);
    };
    if(this.nextWeekThLessons.includes(weeklyLesson)){
      this.nextWeekThLessons.splice(this.nextWeekThLessons.indexOf(weeklyLesson),1);
    };
    if(this.nextWeekFLessons.includes(weeklyLesson)){
      this.nextWeekFLessons.splice(this.nextWeekFLessons.indexOf(weeklyLesson),1);
    };
    if(this.nextWeekSAMLessons.includes(weeklyLesson)){
      this.nextWeekSAMLessons.splice(this.nextWeekSAMLessons.indexOf(weeklyLesson),1);
    };
    if(this.nextWeekSPMLessons.includes(weeklyLesson)){
      this.nextWeekSPMLessons.splice(this.nextWeekSPMLessons.indexOf(weeklyLesson),1);
    };
    if(this.nextWeekSuAMLessons.includes(weeklyLesson)){
      this.nextWeekSuAMLessons.splice(this.nextWeekSuAMLessons.indexOf(weeklyLesson),1);
    };
    if(this.nextWeekSuPMLessons.includes(weeklyLesson)){
      this.nextWeekSuPMLessons.splice(this.nextWeekSuPMLessons.indexOf(weeklyLesson),1);
    };
    this.deleteComplete.next(weeklyLesson);
  }

  deleteWeeklyLesson(weeklyLesson: WeeklyLesson){
    this.changed = true;
    this.weeklyLessons.splice(this.weeklyLessons.indexOf(weeklyLesson), 1);
    var idSearch: string = "" + weeklyLesson.classCode + this.getTimeOfClassStart(weeklyLesson, 0);
    if(document.getElementById(idSearch)){
      document.getElementById(idSearch)!.style.display = 'none';
    }
    //need to pass the user as a param to find the user in the db
    let options = new HttpParams();
    options = options.append('email', this.username);
    return this.http.delete(this.currentAddress + '/weeklyLessons/' + weeklyLesson.classCode + "/" + weeklyLesson.timeValue, { params: options })
      .pipe(
        map((response: any) => {
          const responseObject = response;
          console.log(responseObject);
          this.handleDeleteComplete(weeklyLesson);
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

  handlePrepped(weeklyLesson: WeeklyLesson){
    this.changed = true;
    var body = JSON.stringify({ prepped: true });
    //need to pass the user as a param to find the user in the db
    let options = new HttpParams();
    options = options.append('email', this.username);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.patch(this.currentAddress + '/weeklyLessons/' + weeklyLesson.classCode + "/" + weeklyLesson.timeValue, body, { headers, params: options })
      .pipe(
        map((response: any) => {
          const responseObject = response;
          console.log(responseObject);
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

  handleNotPrepped(weeklyLesson: WeeklyLesson){
    this.changed = true;
    //need to pass the user as a param to find the user in the db
    var body = JSON.stringify({ prepped: false });
    let options = new HttpParams();
    options = options.append('email', this.username);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.patch(this.currentAddress + '/weeklyLessons/' + weeklyLesson.classCode + "/" + weeklyLesson.timeValue, body, { headers, params: options })
      .pipe(
        map((response: any) => {
          const responseObject = response;
          console.log(responseObject);
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

  sortClassesByDay(weeklyLessons: WeeklyLesson[], timeNow: Date){
		//use start of week time
		var thisWeekStart: any = this.getWeekStartDate(timeNow, 0);
		var lastWeekStart: any = this.getWeekStartDate(timeNow, -1);
		var nextWeekStart: any = this.getWeekStartDate(timeNow, 1);

		for(var i=0; i<weeklyLessons.length; i++){
			var tempDate = new Date(weeklyLessons[i].timeValue + "");
			//if class is less than it goes to last week based on day
			if(Number(tempDate) < Number(thisWeekStart) && Number(tempDate) > Number(lastWeekStart)){
				switch(tempDate.getDay()){
					case 1:
						this.lastWeekMLessons.push(weeklyLessons[i]);
						break;
					case 2:
						this.lastWeekTLessons.push(weeklyLessons[i]);
						break;
					case 3:
						this.lastWeekWLessons.push(weeklyLessons[i]);
						break;
					case 4:
						this.lastWeekThLessons.push(weeklyLessons[i]);
						break;
					case 5:
						this.lastWeekFLessons.push(weeklyLessons[i]);
						break;
					case 6:
						if(tempDate.getHours()<12){
							this.lastWeekSAMLessons.push(weeklyLessons[i]);
						}
						else {
							this.lastWeekSPMLessons.push(weeklyLessons[i]);
						}
						break;
					case 0:
						if(tempDate.getHours()<12){
							this.lastWeekSuAMLessons.push(weeklyLessons[i]);
						}
						else {
							this.lastWeekSuPMLessons.push(weeklyLessons[i]);
						}
						break;
				}
			}
			//if class is more than start+7 then it goes to next week
			else if(Number(tempDate) > (Number(thisWeekStart) + 7*24*60*60*1000)){
				switch(tempDate.getDay()){
					case 1:
						this.nextWeekMLessons.push(weeklyLessons[i]);
						break;
					case 2:
						this.nextWeekTLessons.push(weeklyLessons[i]);
						break;
					case 3:
						this.nextWeekWLessons.push(weeklyLessons[i]);
						break;
					case 4:
						this.nextWeekThLessons.push(weeklyLessons[i]);
						break;
					case 5:
						this.nextWeekFLessons.push(weeklyLessons[i]);
						break;
					case 6:
						if(tempDate.getHours()<12){
							this.nextWeekSAMLessons.push(weeklyLessons[i]);
						}
						else {
							this.nextWeekSPMLessons.push(weeklyLessons[i]);
						}
						break;
					case 0:
						if(tempDate.getHours()<12){
							this.nextWeekSuAMLessons.push(weeklyLessons[i]);
						}
						else {
							this.nextWeekSuPMLessons.push(weeklyLessons[i]);
						}
						break;
				}
			}
			//else goes to this week
			else if (Number(tempDate) < (Number(thisWeekStart) + 7*24*60*60*1000) && Number(tempDate) > (Number(thisWeekStart))){
				switch(tempDate.getDay()){
					case 1:
						this.thisWeekMLessons.push(weeklyLessons[i]);
						break;
					case 2:
						this.thisWeekTLessons.push(weeklyLessons[i]);
						break;
					case 3:
						this.thisWeekWLessons.push(weeklyLessons[i]);
						break;
					case 4:
						this.thisWeekThLessons.push(weeklyLessons[i]);
						break;
					case 5:
						this.thisWeekFLessons.push(weeklyLessons[i]);
						break;
					case 6:
						if(tempDate.getHours()<12){
							this.thisWeekSAMLessons.push(weeklyLessons[i]);
						}
						else {
							this.thisWeekSPMLessons.push(weeklyLessons[i]);
						}
						break;
					case 0:
						if(tempDate.getHours()<12){
							this.thisWeekSuAMLessons.push(weeklyLessons[i]);
						}
						else {
							this.thisWeekSuPMLessons.push(weeklyLessons[i]);
						}
						break;

				}
			}
		}

		this.lastWeekMLessons = this.orderByLessonTime(this.lastWeekMLessons);
		this.lastWeekTLessons = this.orderByLessonTime(this.lastWeekTLessons);
		this.lastWeekWLessons = this.orderByLessonTime(this.lastWeekWLessons);
		this.lastWeekThLessons = this.orderByLessonTime(this.lastWeekThLessons);
		this.lastWeekFLessons = this.orderByLessonTime(this.lastWeekFLessons);
		this.lastWeekSAMLessons = this.orderByLessonTime(this.lastWeekSAMLessons);
		this.lastWeekSPMLessons = this.orderByLessonTime(this.lastWeekSPMLessons);
		this.lastWeekSuAMLessons = this.orderByLessonTime(this.lastWeekSuAMLessons);
		this.lastWeekSuPMLessons = this.orderByLessonTime(this.lastWeekSuPMLessons);

		this.thisWeekMLessons = this.orderByLessonTime(this.thisWeekMLessons);
		this.thisWeekTLessons = this.orderByLessonTime(this.thisWeekTLessons);
 		this.thisWeekWLessons = this.orderByLessonTime(this.thisWeekWLessons);
		this.thisWeekThLessons = this.orderByLessonTime(this.thisWeekThLessons);
		this.thisWeekFLessons = this.orderByLessonTime(this.thisWeekFLessons);
 		this.thisWeekSAMLessons = this.orderByLessonTime(this.thisWeekSAMLessons);
		this.thisWeekSPMLessons = this.orderByLessonTime(this.thisWeekSPMLessons);
		this.thisWeekSuAMLessons = this.orderByLessonTime(this.thisWeekSuAMLessons);
		this.thisWeekSuPMLessons = this.orderByLessonTime(this.thisWeekSuPMLessons);

		this.nextWeekMLessons = this.orderByLessonTime(this.nextWeekMLessons);
		this.nextWeekTLessons = this.orderByLessonTime(this.nextWeekTLessons);
		this.nextWeekWLessons = this.orderByLessonTime(this.nextWeekWLessons);
		this.nextWeekThLessons = this.orderByLessonTime(this.nextWeekThLessons);
		this.nextWeekFLessons = this.orderByLessonTime(this.nextWeekFLessons);
		this.nextWeekSAMLessons = this.orderByLessonTime(this.nextWeekSAMLessons);
		this.nextWeekSPMLessons = this.orderByLessonTime(this.nextWeekSPMLessons);
		this.nextWeekSuAMLessons = this.orderByLessonTime(this.nextWeekSuAMLessons);
		this.nextWeekSuPMLessons = this.orderByLessonTime(this.nextWeekSuPMLessons);
	}

	orderByLessonTime(weeklyLessons: WeeklyLesson[]){
		return weeklyLessons.sort(function(a,b){
			return Number(new Date (a.timeValue + "")) - Number(new Date(b.timeValue + ""));
		});
	}

  getWeekStartDate(timeNow: any, week: Number){
		var weekStart: Date;
		var hourAdjust: any;
		var minAdjust: any;

		//minus this from current time to adjust time of week start to 9AM - needs to be minute adjusted

		//only need one equation for hour adjust as times before 9am will be negative, so when subtracted will add to the current hour -> 9am
		hourAdjust = (Number(timeNow.getHours()) - 9)*60*60*1000;
		minAdjust = Number(timeNow.getMinutes())*60*1000; //minus this from hour adjusted time to get time at 9:00

		if (timeNow.getDay() == 0){
			weekStart = new Date(Number(timeNow) - (6*24*60*60*1000) + (Number(week)*7*24*60*60*1000) - hourAdjust - minAdjust); //6 here as sunday in getDay() == 0, need to turn into previous monday so minus 6 days
		}
		else {
			weekStart = new Date(Number(timeNow) - ((Number(timeNow.getDay())-1)*24*60*60*1000) + (Number(week)*7*24*60*60*1000) - hourAdjust - minAdjust);
		}
		return weekStart;
	}

  getTimeOfClassStart(weeklyLesson: WeeklyLesson, addedMinutes: number){
		//create the hour and minute string for the class start time (param = (0)) and end time (param = (classLength))
		var parsedTime: any = new Date(weeklyLesson.timeValue + "");
		var classTime: any = (parsedTime.getTime());
		var time: any = new Date(classTime + addedMinutes*60*1000);
		var hour: any = time.getHours();
		var minute: any = time.getMinutes();
		var hourString: any = this.pad(hour,2);
		var minuteString: any = this.pad(minute,2);
		return hourString + ":" + minuteString;
	}

	pad(num: number, size: number) {
		var s: string = num+"";
		while(s.length < size){
			s = "0" + s;
		}
		return s;
	}

  completeLoadScheduleLesson(){
    this.loadedScheduleLessons++;
    if(this.loadedScheduleLessons >= this.numberOfLessons){
      this.allScheduleLessonsLoaded = true;
      this.loadedAllScheduleLessons.next();
    }
  }

  startLoadNewSchedule(){
    this.loadedScheduleLessons = 0;
    this.allScheduleLessonsLoaded = false;
  }
}
