import { Component, OnInit, Input } from '@angular/core';

import { LessonService } from '../../lessons/lessons.service'
import { WeeklyLessonsService } from './weekly-lesson.service';
import { ErrorService } from '../../errors/error.service';
import { WeeklyLesson } from './weekly-lesson.model';
import { Lesson } from '../../lessons/lessons.model';

@Component ({
	selector: 'weekly-lesson',
	templateUrl: './weekly-lesson.component.html',
	styleUrls: ['./weekly-lesson.component.css']
})

export class WeeklyLessonComponent implements OnInit {
	@Input() weeklyLesson!: WeeklyLesson;
	completed: boolean = false;
	lesson!: Lesson;
	day: string = "";
	date: string = "";
	hour: string = "";
	minute: string = "";
	month: string = "";
	finishHour: string = "";
	finishMinute: string = "";

  constructor(private weeklyLessonsService: WeeklyLessonsService, private lessonService: LessonService, private errorService: ErrorService) {}

	ngOnInit() {
		if(this.weeklyLesson && this.weeklyLesson.lesson == null && this.weeklyLesson.timeValue != null){
			if(this.weeklyLesson.subject == "OralTest"){
				this.lessonService.getOralTest()
					.subscribe(
						(lesson: Lesson) => {
							this.lesson = lesson;
						}
					)
			}
			else {
				this.errorService.handleError('Lesson not found', 'Lesson could not be found, please retry. If this error persists, please delete the lesson and readd it');
			}
		}
		else {
			this.lessonService.getLessonById(this.weeklyLesson.lesson!)
				.subscribe(
					(lesson: Lesson) => {
						this.lesson = lesson;
					}
				)
		}

		var timeNow = Date.now();

		var parsed: Date = new Date(this.weeklyLesson.timeValue + "");

		var parsedFinish = new Date(parsed.getTime() + (this.weeklyLesson.classLength * 60 * 1000));

		if(parsedFinish.getTime() < timeNow){
			this.completed = true;
		}
		else {
			this.completed = false;
		}

		this.date = parsed.getDate() + "";
		this.hour = this.pad(parsed.getHours(),2);
		this.minute = this.pad(parsed.getMinutes(),2);

		this.finishHour = this.pad(parsedFinish.getHours(),2);
		this.finishMinute = this.pad(parsedFinish.getMinutes(),2);

		var tempDay = parsed.getDay();
		var tempMonth = parsed.getMonth();

		this.getDay(tempDay);
		this.getMonth(tempMonth);
	}

	onDelete(weeklyLesson: WeeklyLesson){
		this.weeklyLessonsService.handleDelete(weeklyLesson)
	}

	pad(num: number, size: number) {
		var s: string = num+"";
		while(s.length < size){
			s = "0" + s;
		}
		return s;
	}

	getDay(day: number){
		switch(day){
			case 1:
				this.day = "Mon";
				break;
			case 2:
				this.day = "Tue";
				break;
			case 3:
				this.day = "Wed";
				break;
			case 4:
				this.day = "Thu";
				break;
			case 5:
				this.day = "Fri";
				break;
			case 6:
				this.day = "Sat";
				break;
			case 0:
				this.day = "Sun";
				break;
		}
	}

	getMonth(month: number){
		switch(month){
			case 0:
				this.month = "Jan";
				break;
			case 1:
				this.month = "Feb";
				break;
			case 2:
				this.month = "Mar";
				break;
			case 3:
				this.month = "Apr";
				break;
			case 4:
				this.month = "May";
				break;
			case 5:
				this.month = "Jun";
				break;
			case 6:
				this.month = "Jul";
				break;
			case 7:
				this.month = "Aug";
				break;
			case 8:
				this.month = "Sep";
				break;
			case 9:
				this.month = "Oct";
				break;
			case 10:
				this.month = "Nov";
				break;
			case 11:
				this.month = "Dec";
				break;
		}
	}
}
