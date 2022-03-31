import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { Class } from '../classes.model';
import { ClassesService } from '../classes.service';
import { AuthService } from '@auth0/auth0-angular';
import { KidService } from '../kid/kid.service';
import { WeeklyLessonsService } from './weekly-lesson.service';

import { Kid } from '../kid/kid.model';
import { WeeklyLesson } from './weekly-lesson.model';

@Component ({
	selector: 'classes-show',
	templateUrl: './show-class.component.html',
	styleUrls: ['./show-class.component.css']
})

export class ShowClassComponent implements OnInit {
  classCode: string = "";
	classDetails!: Class;
	kids: Kid[] = [];
	weeklyLessons: WeeklyLesson[] = [];
	loadedDetails: boolean = false;
	loadedKids: boolean = false;
	loadedLessons: boolean = false;

	classStartTimeHour1: string = "";
	classStartTimeMinute1: string = "";
	classStartTimeHour2: string = "";
	classStartTimeMinute2: string = "";
	classEndTimeHour1: string = "";
	classEndTimeMinute1: string = "";
	classEndTimeHour2: string = "";
	classEndTimeMinute2: string = "";
	comments: string = "";
	ct: string = "";
	day1: string = "";
	day2: string = "";

  constructor(private route: ActivatedRoute, public classesService: ClassesService, public kidService: KidService, public weeklyLessonsService: WeeklyLessonsService, public authService: AuthService, private router: Router) {
    this.classCode = route.snapshot.params['id'];
  }


	ngOnInit(){
		this.authService.isAuthenticated$.subscribe((response) => {
			if(!response){
				this.router.navigate(['/home']);
			}
		})

		var timeNow = Date.now();
		var lastWeekStart: any = this.getWeekStartDate(timeNow, -1);
		this.classesService.getClass(this.classCode)
			.subscribe(
				(classDetails: Class) => {
					this.classDetails = classDetails;
					this.getClassEndTime();
					this.getClassStartTime();
					this.getDay1(this.classDetails.session1Day);
					this.getDay2(this.classDetails.session2Day);
					this.getCt();
					this.loadedDetails = true;
					this.getClassComments();
				}
			);
		this.kidService.getKids(this.classCode)
			.subscribe(
				(kids: Kid[]) => {
					var sortedKids = kids.sort(function(a,b) {return (a.kidsName > b.kidsName) ? 1 : ((b.kidsName > a.kidsName) ? -1 : 0);} );
					this.kids = sortedKids;
					this.loadedKids = true;
				}
			);
		this.classesService.addCommentsComplete
			.subscribe(
				(classCode: string) => {
					if(classCode == this.classCode){
						this.getClassComments();
					}
				}
			);
		this.classesService.completeDeleteComments
			.subscribe(
				(classCode: string) => {
					if(classCode == this.classCode){
						this.comments = "";
					}
				}
			);
		this.weeklyLessonsService.getWeeklyLessons(this.classCode)
			.subscribe(
				(weeklyLessons: WeeklyLesson[]) => {
					this.weeklyLessons = this.orderByLessonTime(weeklyLessons);
					for(var i=0; i<this.weeklyLessons.length; i++){
						var tempDate: Date = new Date(this.weeklyLessons[i].timeValue + "");
						if(tempDate.getTime() < lastWeekStart.getTime()){
							this.weeklyLessonsService.deleteWeeklyLesson(this.weeklyLessons[i])
							.subscribe(
								(result: any) => {
									console.log(result);
								});
						}
					}
					this.loadedLessons = true;
				}
			);

	}

	getClassComments(){
		this.classesService.getComments(this.classCode)
			.subscribe(
				(comments: string) => {
					this.comments = comments;
				}
			)
	}

	getWeekStartDate(timeNow: any, week: Number){
		var weekStart: Date;
		var hourAdjust: any;
		var minAdjust: any;
		var tempTime: Date = new Date(timeNow+"");

		//minus this from current time to adjust time of week start to 9AM - needs to be minute adjusted

		//only need one equation for hour adjust as times before 9am will be negative, so when subtracted will add to the current hour -> 9am
		hourAdjust = (Number(tempTime.getHours()) - 9)*60*60*1000;
		minAdjust = Number(tempTime.getMinutes())*60*1000; //minus this from hour adjusted time to get time at 9:00

		if (tempTime.getDay() == 0){
			weekStart = new Date(Number(tempTime) - (6*24*60*60*1000) + (Number(week)*7*24*60*60*1000) - hourAdjust - minAdjust); //6 here as sunday in getDay() == 0, need to turn into previous monday so minus 6 days
		}
		else {
			weekStart = new Date(Number(tempTime) - ((Number(tempTime.getDay())-1)*24*60*60*1000) + (Number(week)*7*24*60*60*1000) - hourAdjust - minAdjust);
		}
		return weekStart;
	}

	getClassStartTime(){
		this.classStartTimeHour1 = this.pad(this.classDetails.session1Time1Hour,2);

		this.classStartTimeMinute1 = this.pad(this.classDetails.session1Time1Minute,2);

		this.classStartTimeHour2 = this.pad(this.classDetails.session2Time1Hour,2);

		this.classStartTimeMinute2 = this.pad(this.classDetails.session2Time1Minute,2);
	}

	getClassEndTime(){
		// not sure about k, how many classes a week, just add to the correct one later
		if(this.classDetails.curriculum == "G0" || this.classDetails.curriculum == "K" || (this.classDetails.curriculum == "G" && this.classDetails.session2Time1Hour == 0)){
			if((this.classDetails.session1Time2Minute + this.classDetails.session1Length) >= 60){
				this.classEndTimeHour1 = this.pad((this.classDetails.session1Time2Hour + 1),2);
				this.classEndTimeMinute1 = this.pad((this.classDetails.session1Time2Minute + this.classDetails.session1Length - 60), 2);
			}
			else {
				this.classEndTimeHour1 = this.pad(this.classDetails.session1Time2Hour, 2);
				this.classEndTimeMinute1 = this.pad(this.classDetails.session1Time2Minute + this.classDetails.session1Length, 2);
			}
		}
		else if(this.classDetails.curriculum == "G"){
			if((this.classDetails.session2Time1Minute + (this.classDetails.session1Length)) >= 60){
				this.classEndTimeHour1 = this.pad((this.classDetails.session2Time1Hour + 1),2);
				this.classEndTimeMinute1 = this.pad((this.classDetails.session2Time1Minute + this.classDetails.session1Length - 60), 2);
			}
			else {
				this.classEndTimeHour1 = this.pad(this.classDetails.session2Time1Hour, 2);
				this.classEndTimeMinute1 = this.pad(this.classDetails.session2Time1Minute + this.classDetails.session1Length, 2);
			}
		}
		else if(this.classDetails){
			if((this.classDetails.session1Time2Minute + this.classDetails.session1Length) >= 60){
				this.classEndTimeHour1 = this.pad((this.classDetails.session1Time2Hour + 1),2);
				this.classEndTimeMinute1 = this.pad((this.classDetails.session1Time2Minute + this.classDetails.session1Length - 60), 2);
			}
			else {
				this.classEndTimeHour1 = this.pad(this.classDetails.session1Time2Hour, 2);
				this.classEndTimeMinute1 = this.pad(this.classDetails.session1Time2Minute + this.classDetails.session1Length, 2);
			}

			if((this.classDetails.session2Time2Minute + this.classDetails.session2Length) >= 60){
				this.classEndTimeHour2 = this.pad((this.classDetails.session2Time2Hour + 1), 2);
				this.classEndTimeMinute2 = this.pad((this.classDetails.session2Time2Minute + this.classDetails.session2Length - 60), 2);
			}
			else {
				this.classEndTimeHour2 = this.pad(this.classDetails.session2Time2Hour, 2);
				this.classEndTimeMinute2 = this.pad(this.classDetails.session2Time2Minute + this.classDetails.session2Length, 2);
			}
		}
	}

	getCt() {
		if(this.classDetails){
			this.ct = this.classDetails.ct;
		}
	}

	pad(num: number, size: number) {
		var s: string = num+"";
		while(s.length < size){
			s = "0" + s;
		}
		return s;
	}

	getDay1(day: number){
		switch(day){
			case 1:
				this.day1 = "Mon";
				break;
			case 2:
				this.day1 = "Tue";
				break;
			case 3:
				this.day1 = "Wed";
				break;
			case 4:
				this.day1 = "Thu";
				break;
			case 5:
				this.day1 = "Fri";
				break;
			case 6:
				this.day1 = "Sat";
				break;
			case 0:
				this.day1 = "Sun";
				break;
		}
	}

	getDay2(day: number){
		switch(day){
			case 1:
				this.day2 = "Mon";
				break;
			case 2:
				this.day2 = "Tue";
				break;
			case 3:
				this.day2 = "Wed";
				break;
			case 4:
				this.day2 = "Thu";
				break;
			case 5:
				this.day2 = "Fri";
				break;
			case 6:
				this.day2 = "Sat";
				break;
			case 0:
				this.day2 = "Sun";
				break;
		}
	}

	goToAddLesson() {
		// take many details of class to add lesson page to generate correct form
		if(this.classDetails){
			let navigationExtras: NavigationExtras = {
				queryParams: {
					"curriculum": this.classDetails.curriculum,
					"stage": this.classDetails.stage,
					"level" : this.classDetails.level,
					"day1": this.day1,
					"day2": this.day2,
					"firstSessionStart": this.pad(this.classDetails.session1Time1Hour, 2) + ":" + this.pad(this.classDetails.session1Time1Minute, 2),
					"secondSessionStart": this.pad(this.classDetails.session1Time2Hour, 2) + ":" + this.pad(this.classDetails.session1Time2Minute, 2),
					"thirdSessionStart": this.pad(this.classDetails.session2Time1Hour, 2) + ":" + this.pad(this.classDetails.session2Time1Minute, 2),
					"fourthSessionStart": this.pad(this.classDetails.session2Time2Hour, 2) 	+ ":" + this.pad(this.classDetails.session2Time2Minute, 2),
					"firstSessionLength": this.classDetails.session1Length,
					"secondSessionLength": this.classDetails.session2Length,
					"day1Value": this.classDetails.session1Day,
					"day2Value": this.classDetails.session2Day,
					"session1LengthMS": this.classDetails.session1Length * 60 * 1000,
					"session2LengthMS": this.classDetails.session2Length * 60 * 1000
				}
			};
			this.router.navigate(['/classes/show-class/' + this.classCode + "/addlesson"], navigationExtras);
		};
	}

	orderByLessonTime(weeklyLessons: WeeklyLesson[]){
		return weeklyLessons.sort(function(a,b){
			return Number(new Date(a.timeValue + "")) - Number(new Date(b.timeValue + ""));
		});
	}

	onDelete(classDetails: Class){
		this.classesService.handleDelete(classDetails)
	}

	shareClass(classDetails: Class){
		classDetails.weeklyLessons = this.weeklyLessons;
		this.classesService.startShareClass(classDetails);
	}

	startAddComments(classCode: string){
		this.classesService.startAddCommentCall(classCode);
	}

	startDeleteComments(classCode: string){
		this.classesService.startDeleteCommentCall(classCode);
	}
}
