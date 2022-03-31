import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WeeklyLessonsService } from '../classes/show-class/weekly-lesson.service';
import { WeeklyLesson } from '../classes/show-class/weekly-lesson.model';
import { LessonService } from '../lessons/lessons.service';
import { Lesson } from '../lessons/lessons.model';
import { Class } from '../classes/classes.model';
import { ClassesService } from '../classes/classes.service';
import { AuthService } from '@auth0/auth0-angular';

import * as XLSX from 'xlsx';

@Component ({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {
	wb: XLSX.WorkBook = XLSX.utils.book_new();
	creatingSchedule: boolean = false;
	classes: Class[] = [];
	loadedClasses: boolean = true;

	scheduleReady: boolean = false;

	weeklyLessons: WeeklyLesson[]  = [];
	weekLastStartDate: string = "";
	weekThisStartDate: string = "";
	weekNextStartDate: string = "";

  lastWeekMLessons: WeeklyLesson[] = [];
  lastWeekTLessons: WeeklyLesson[]  = [];
  lastWeekWLessons: WeeklyLesson[] = [];
  lastWeekThLessons: WeeklyLesson[] = [];
  lastWeekFLessons: WeeklyLesson[] = [];
  lastWeekSAMLessons: WeeklyLesson[] = [];
	lastWeekSPMLessons: WeeklyLesson[] = [];
  lastWeekSuAMLessons: WeeklyLesson[] = [];
	lastWeekSuPMLessons: WeeklyLesson[] = [];

  thisWeekMLessons: WeeklyLesson[] = [];
  thisWeekTLessons: WeeklyLesson[] = [];
  thisWeekWLessons: WeeklyLesson[] = [];
  thisWeekThLessons: WeeklyLesson[] = [];
  thisWeekFLessons: WeeklyLesson[] = [];
  thisWeekSAMLessons: WeeklyLesson[] = [];
	thisWeekSPMLessons: WeeklyLesson[] = [];
  thisWeekSuAMLessons: WeeklyLesson[] = [];
	thisWeekSuPMLessons: WeeklyLesson[] = [];

  nextWeekMLessons: WeeklyLesson[] = [];
  nextWeekTLessons: WeeklyLesson[] = [];
  nextWeekWLessons: WeeklyLesson[] = [];
  nextWeekThLessons: WeeklyLesson[] = [];
  nextWeekFLessons: WeeklyLesson[] = [];
  nextWeekSAMLessons: WeeklyLesson[] = [];
	nextWeekSPMLessons: WeeklyLesson[] = [];
  nextWeekSuAMLessons: WeeklyLesson[] = [];
	nextWeekSuPMLessons: WeeklyLesson[] = [];

	lessons: Lesson[] = [];

  selectedWeek: string = "this";
	day: number = 0;

	dateTMonday: string = "";
	dateTTuesday: string = "";
	dateTWednesday: string = "";
	dateTThursday: string = "";
	dateTFriday: string = "";
	dateTSaturday: string = "";
	dateTSunday: string = "";

	dateNMonday: string = "";
	dateNTuesday: string = "";
	dateNWednesday: string = "";
	dateNThursday: string = "";
	dateNFriday: string = "";
	dateNSaturday: string = "";
	dateNSunday: string = "";

	dateLMonday: string = "";
	dateLTuesday: string = "";
	dateLWednesday: string = "";
	dateLThursday: string = "";
	dateLFriday: string = "";
	dateLSaturday: string = "";
	dateLSunday: string = "";

	mondayData: any[] = [];
	tuesdayData: any[] = [];
	wednesdayData: any[] = [];
	thursdayData: any[] = [];
	fridayData: any[] = [];
	saturdayAMData: any[] = [];
	saturdayPMData: any[] = [];
	sundayAMData: any[] = [];
	sundayPMData: any[] = [];

	scheduleNumber: number = 0;

	loaded: boolean = false;

	constructor(public authService: AuthService, public weeklyLessonService: WeeklyLessonsService, private lessonService: LessonService, private router: Router, private classesService: ClassesService){}

	ngOnInit() {
		this.authService.isAuthenticated$.subscribe((response) => {
			if(!response){
				this.router.navigate(['/home']);
			}
		})

		this.weeklyLessonService.deleteComplete
      	.subscribe(
				(weeklyLesson: WeeklyLesson) => {
					this.weeklyLessons.splice(this.weeklyLessons.indexOf(weeklyLesson), 1);
					this.setLocalSchedule();
					this.loaded = true;
				}
			)

		var timeNow: Date = new Date();
		var thisWeekStart: any = this.getWeekStartDate(timeNow, 0);
		var lastWeekStart: any = this.getWeekStartDate(timeNow, -1);
		var nextWeekStart: any = this.getWeekStartDate(timeNow, 1);

		if(!this.classesService.loadedClasses || this.classesService.changed){
			this.loadedClasses = false;
			this.classesService.getClasses()
				.subscribe(
					(classes: Class[]) => {
						this.classes = classes;
						this.loadedClasses = true;
					}
				)
		}
		else{
			this.classes = this.classesService.classes;
			this.loadedClasses = true;
		}

		if(!this.weeklyLessonService.loadedWeeklyLessons || this.weeklyLessonService.changed){
			this.loaded = false;
			this.weeklyLessonService.startLoadNewSchedule();
			//getUsersWeeklyLessons() divides classes into the relevant days of the week within the service
			this.weeklyLessonService.getUsersWeeklyLessons()
				.subscribe(
					(weeklyLessons: WeeklyLesson[]) => {
						var timeNow: Date = new Date();
						/*

						//currently unneccesary

						var tempWeeklyLessons: WeeklyLesson[] = weeklyLessons;
						var lessonsToShow: WeeklyLesson[] = [];
						for(var i = 0; i<tempWeeklyLessons.length; i++){
							var tempDate: Date = new Date(tempWeeklyLessons[i]. + "");
							if(tempDate.getTime() > lastWeekStart.getTime()){
								lessonsToShow.push(tempWeeklyLessons[i]);
							}
						}*/
						this.weeklyLessonService.numberOfLessons = this.weeklyLessonService.thisWeekMLessons.length
																										 + this.weeklyLessonService.thisWeekTLessons.length
																										 + this.weeklyLessonService.thisWeekWLessons.length
																										 + this.weeklyLessonService.thisWeekThLessons.length
																										 + this.weeklyLessonService.thisWeekFLessons.length
																										 + this.weeklyLessonService.thisWeekSAMLessons.length
																										 + this.weeklyLessonService.thisWeekSPMLessons.length
																										 + this.weeklyLessonService.thisWeekSuAMLessons.length
																										 + this.weeklyLessonService.thisWeekSuPMLessons.length;
						this.setLocalSchedule();

						this.setDates(this.getWeekStartDate(timeNow, 0), this.getWeekStartDate(timeNow, 1), this.getWeekStartDate(timeNow, -1));
						this.getLessonData();
						this.loaded = true;
					}
				);
		}
		else{
			this.setLocalSchedule();
			this.weeklyLessonService.startLoadNewSchedule();

			this.setDates(this.getWeekStartDate(timeNow, 0), this.getWeekStartDate(timeNow, 1), this.getWeekStartDate(timeNow, -1));
			this.getLessonData();
			this.loaded = true;
		}

		this.day = timeNow.getDay();

		this.weekLastStartDate = "Week beginning: " + lastWeekStart.getDate() + " " + this.getMonth(lastWeekStart.getMonth());

		this.weekThisStartDate = "Week beginning: " + thisWeekStart.getDate() + " " + this.getMonth(thisWeekStart.getMonth());

		this.weekNextStartDate = "Week beginning: " + nextWeekStart.getDate() + " " + this.getMonth(nextWeekStart.getMonth());

		this.weeklyLessonService.loadedAllScheduleLessons
		.subscribe(
			() => {
				this.scheduleReady = true;
			}
		)
	}

	setDates(thisWeek: Date, nextWeek: Date, lastWeek:Date){
		this.dateTMonday = this.getDate(thisWeek, 0);
		this.dateTTuesday = this.getDate(thisWeek, 1);
		this.dateTWednesday = this.getDate(thisWeek, 2);
		this.dateTThursday = this.getDate(thisWeek, 3);
		this.dateTFriday = this.getDate(thisWeek, 4);
		this.dateTSaturday = this.getDate(thisWeek, 5);
		this.dateTSunday = this.getDate(thisWeek, 6);
		this.dateNMonday = this.getDate(nextWeek, 0);
		this.dateNTuesday = this.getDate(nextWeek, 1);
		this.dateNWednesday = this.getDate(nextWeek, 2);
		this.dateNThursday = this.getDate(nextWeek, 3);
		this.dateNFriday = this.getDate(nextWeek, 4);
		this.dateNSaturday = this.getDate(nextWeek, 5);
		this.dateNSunday = this.getDate(nextWeek, 6);
		this.dateLMonday = this.getDate(lastWeek, 0);
		this.dateLTuesday = this.getDate(lastWeek, 1);
		this.dateLWednesday = this.getDate(lastWeek, 2);
		this.dateLThursday = this.getDate(lastWeek, 3);
		this.dateLFriday = this.getDate(lastWeek, 4);
		this.dateLSaturday = this.getDate(lastWeek, 5);
		this.dateLSunday = this.getDate(lastWeek, 6);
	}

	getDate(weekStart: any, dayOfWeek: Number){
		var tempDate: any = new Date(Number(weekStart.getTime()) + (Number(dayOfWeek)*24*60*60*1000));
		return "" + tempDate.getDate() + " " + this.getMonth(tempDate.getMonth());
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

	pad(num: number, size: number) {
		var s: string = num+"";
		while(s.length < size){
			s = "0" + s;
		}
		return s;
	}

	getMonth(month: number){
		switch(month){
			case 0:
				return "January";
			case 1:
				return "February";
			case 2:
				return "March";
			case 3:
				return "April";
			case 4:
				return "May";
			case 5:
				return "June";
			case 6:
				return "July";
			case 7:
				return "August";
			case 8:
				return "September";
			case 9:
				return "October";
			case 10:
				return "November";
			case 11:
				return "December";
		}
		return;
	}

	setLocalSchedule(){
		this.lastWeekMLessons = this.weeklyLessonService.lastWeekMLessons;
		this.lastWeekTLessons = this.weeklyLessonService.lastWeekTLessons;
		this.lastWeekWLessons = this.weeklyLessonService.lastWeekWLessons;
		this.lastWeekThLessons = this.weeklyLessonService.lastWeekThLessons;
		this.lastWeekFLessons = this.weeklyLessonService.lastWeekFLessons;
		this.lastWeekSAMLessons = this.weeklyLessonService.lastWeekSAMLessons;
		this.lastWeekSPMLessons = this.weeklyLessonService.lastWeekSPMLessons;
		this.lastWeekSuAMLessons = this.weeklyLessonService.lastWeekSuAMLessons;
		this.lastWeekSuPMLessons = this.weeklyLessonService.lastWeekSuPMLessons;

		this.thisWeekMLessons = this.weeklyLessonService.thisWeekMLessons;
		this.mondayData = new Array(this.thisWeekMLessons.length);
		this.thisWeekTLessons = this.weeklyLessonService.thisWeekTLessons;
		this.tuesdayData = new Array(this.thisWeekTLessons.length);
		this.thisWeekWLessons = this.weeklyLessonService.thisWeekWLessons;
		this.wednesdayData = new Array(this.thisWeekWLessons.length);
		this.thisWeekThLessons = this.weeklyLessonService.thisWeekThLessons;
		this.thursdayData = new Array(this.thisWeekThLessons.length);
		this.thisWeekFLessons = this.weeklyLessonService.thisWeekFLessons;
		this.fridayData = new Array(this.thisWeekFLessons.length);
		this.thisWeekSAMLessons = this.weeklyLessonService.thisWeekSAMLessons;
		this.saturdayAMData = new Array(this.thisWeekSAMLessons.length);
		this.thisWeekSPMLessons = this.weeklyLessonService.thisWeekSPMLessons;
		this.saturdayPMData = new Array(this.thisWeekSPMLessons.length);
		this.thisWeekSuAMLessons = this.weeklyLessonService.thisWeekSuAMLessons;
		this.sundayAMData = new Array(this.thisWeekSuAMLessons.length);
		this.thisWeekSuPMLessons = this.weeklyLessonService.thisWeekSuPMLessons;
		this.sundayPMData = new Array(this.thisWeekSuPMLessons.length);

		this.nextWeekMLessons = this.weeklyLessonService.nextWeekMLessons;
		this.nextWeekTLessons = this.weeklyLessonService.nextWeekTLessons;
		this.nextWeekWLessons = this.weeklyLessonService.nextWeekWLessons;
		this.nextWeekThLessons = this.weeklyLessonService.nextWeekThLessons;
		this.nextWeekFLessons = this.weeklyLessonService.nextWeekFLessons;
		this.nextWeekSAMLessons = this.weeklyLessonService.nextWeekSAMLessons;
		this.nextWeekSPMLessons = this.weeklyLessonService.nextWeekSPMLessons;
		this.nextWeekSuAMLessons = this.weeklyLessonService.nextWeekSuAMLessons;
		this.nextWeekSuPMLessons = this.weeklyLessonService.nextWeekSuPMLessons;
	}

	getLessonData(){
		for(var i=0; i<this.thisWeekMLessons.length; i++){
			this.getLessonFromWeekly(this.thisWeekMLessons[i], 'monday', i);
		}

		for(var i=0; i<this.thisWeekTLessons.length; i++){
			this.getLessonFromWeekly(this.thisWeekTLessons[i], 'tuesday', i);
		}

		for(var i=0; i<this.thisWeekWLessons.length; i++){
			this.getLessonFromWeekly(this.thisWeekWLessons[i], 'wednesday', i);
		}

		for(var i=0; i<this.thisWeekThLessons.length; i++){
			this.getLessonFromWeekly(this.thisWeekThLessons[i], 'thursday', i);
		}

		for(var i=0; i<this.thisWeekFLessons.length; i++){
			this.getLessonFromWeekly(this.thisWeekFLessons[i], 'friday', i);
		}

		for(var i=0; i<this.thisWeekSAMLessons.length; i++){
			this.getLessonFromWeekly(this.thisWeekSAMLessons[i], 'saturdayAM', i);
		}

		for(var i=0; i<this.thisWeekSPMLessons.length; i++){
			this.getLessonFromWeekly(this.thisWeekSPMLessons[i], 'saturdayPM', i);
		}

		for(var i=0; i<this.thisWeekSuAMLessons.length; i++){
			this.getLessonFromWeekly(this.thisWeekSuAMLessons[i], 'sundayAM', i);
		}

		for(var i=0; i<this.thisWeekSuPMLessons.length; i++){
			this.getLessonFromWeekly(this.thisWeekSuPMLessons[i], 'sundayPM', i);
		}
	}

	createExcelSchedule(){
		this.creatingSchedule = true;
		const ws_name: string = "schedule" + this.scheduleNumber;
		this.scheduleNumber++;

		var ws_data = [];
		var wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };

		var weekStart = this.getWeekStartDate(new Date(), 0);
		var month = weekStart.getMonth() + 1;
		var titleString: string = weekStart.getDate() + "/" + month + "/" + weekStart.getFullYear();
		var filename: string = titleString + ".xlsx";

		ws_data.push([titleString])
		ws_data.push(['Time', 'Class Code', 'Lesson', 'Key Words & Sentences', 'Supplies', 'Activities']);
		ws_data.push(['Monday']);

		// get lesson details on open page, add here
		for(var i=0; i<this.mondayData.length; i++){
			ws_data.push(this.mondayData[i]);
		}

		ws_data.push(['Tuesday']);

		for(var i=0; i<this.tuesdayData.length; i++){
			ws_data.push(this.tuesdayData[i]);
		}

		ws_data.push(['Wednesday']);

		for(var i=0; i<this.wednesdayData.length; i++){
			ws_data.push(this.wednesdayData[i]);
		}

		ws_data.push(['Thursday']);

		for(var i=0; i<this.thursdayData.length; i++){
			ws_data.push(this.thursdayData[i]);
		}

		ws_data.push(['Friday']);

		for(var i=0; i<this.fridayData.length; i++){
			ws_data.push(this.fridayData[i]);
		}

		ws_data.push(['Saturday']);

		for(var i=0; i<this.saturdayAMData.length; i++){
			ws_data.push(this.saturdayAMData[i]);
		}

		for(var i=0; i<this.saturdayPMData.length; i++){
			ws_data.push(this.saturdayPMData[i]);
		}

		ws_data.push(['Sunday']);

		for(var i=0; i<this.sundayAMData.length; i++){
			ws_data.push(this.sundayAMData[i]);
		}

		for(var i=0; i<this.sundayPMData.length; i++){
			ws_data.push(this.sundayPMData[i]);
		}

		var worksheet = XLSX.utils.aoa_to_sheet(ws_data);

		XLSX.utils.book_append_sheet(this.wb, worksheet, ws_name);

		XLSX.writeFile(this.wb, filename);
		this.creatingSchedule = false;
	}

	getLessonFromWeekly(weekly: WeeklyLesson, day: any, lessonOfDay: number){
		this.lessonService.getLessonById(weekly.lesson!)
		.subscribe((lesson: Lesson) => {
			return this.getLessonDetailsForExcel(lesson, weekly, day, lessonOfDay);
		})
	}

	getLessonDetailsForExcel(lesson: Lesson, weeklyLesson: WeeklyLesson, day: any, lessonOfDay: number){
	  // add lesson details to excel sheet
	  var timeString = "" + this.getTime(0, weeklyLesson) + "-" + this.getTime(weeklyLesson.classLength, weeklyLesson);
	  var lessonString = "" + lesson.subject + " " + lesson.lessonNo + " " + lesson.lessonTitle;
	  var keyString = "Key words: " + lesson.keyWords + ". \nKey sentences: " + lesson.keySentences;

		var values;
		if(lesson.curriculum == "Demo"){
			values = [
				timeString,
				weeklyLesson.classCode,
				lessonString
			]
		}
		else{
		  values = [
		    timeString,
		    weeklyLesson.classCode,
		    lessonString,
		    keyString,
		    lesson.supplies,
				lesson.activities
		  ];
		}

		switch(day){
			case 'monday':
				this.mondayData[lessonOfDay] = values;
				break;
			case 'tuesday':
				this.tuesdayData[lessonOfDay] = values;
				break;
			case 'wednesday':
				this.wednesdayData[lessonOfDay] = values;
				break;
			case 'thursday':
				this.thursdayData[lessonOfDay] = values;
				break;
			case 'friday':
				this.fridayData[lessonOfDay] = values;
				break;
			case 'saturdayAM':
				this.saturdayAMData[lessonOfDay] = values;
				break;
			case 'saturdayPM':
				this.saturdayPMData[lessonOfDay] = values;
				break;
			case 'sundayAM':
				this.sundayAMData[lessonOfDay] = values;
				break;
			case 'sundayPM':
				this.sundayPMData[lessonOfDay] = values;
				break;
		}
	};

	getTime(addedMinutes: number, weeklyLesson: WeeklyLesson){
		//create the hour and minute string for the class start time (param = (0)) and end time (param = (classLength))
		var parsedTime: any = new Date(weeklyLesson.timeValue + "");
		var classTime: any = (parsedTime.getTime());
		var time: any = new Date(classTime + addedMinutes*60*1000);
		var hour: any = time.getHours();
		var minute: any = time.getMinutes();
		var hourString: any = this.pad(hour,2);
		var minuteString: any = this.pad(minute,2);

		var timeNow: Date = new Date();

		return hourString + ":" + minuteString;

	}


}
