import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WeeklyLessonsService } from '../classes/show-class/weekly-lesson.service';
import { WeeklyLesson } from '../classes/show-class/weekly-lesson.model';
import { ClassesService } from '../classes/classes.service';
import { Class } from '../classes/classes.model';

@Component ({
	selector: 'app-calendar-entry',
	templateUrl: './calendar-entry.component.html',
	styleUrls: ['./calendar-entry.component.css']
})

export class CalendarEntryComponent implements OnInit {
  @Input() weeklyLesson!: WeeklyLesson;
	@Input() inputClasses!: Class[];
	startTime: string = "";
	endTime: string = "";
	regularClass: boolean = false;
	hasLink: boolean = false;
	irregularLessonLink: string = "";
	regularLessonLink: string = "";
	loaded: boolean = false;
	classCode: string = "";
	classes: Class[] = [];
	prepped: boolean = false;
	newCurriculumStageString: string = "";
	newCurriculum: string = "";
	isNewCurriculum: boolean = false;
	isG0OpenClass: boolean = false;
	isG0: boolean = false;
	newCurriculumSubject: string = '';
	past: boolean = false;
	is35: boolean = false;
	gork35string: string = "";

	constructor(private weeklyLessonsService: WeeklyLessonsService, private classesService: ClassesService, private router: Router){}

	ngOnInit(){
		//when not loaded show loading symbol for this calendar entry
		this.loaded = false;
		//getTime default ( param = (0) ) is start time of class, and param value will be time added to the start of the class
		this.startTime = this.getTime(0) + "";
		this.endTime = this.getTime(this.weeklyLesson.classLength);

		this.classes = this.inputClasses;
		this.prepped = this.weeklyLesson.prepped!;
		this.checkCurriculum(this.weeklyLesson.classCode);
		if(this.weeklyLesson.stage){
			this.makeStageString(this.weeklyLesson.stage);
		}
		this.makeNewCurriculumString(this.weeklyLesson.classCode);
		this.makeNewCurriculumSubjectString(this.weeklyLesson.subject);
		this.weeklyLessonsService.completeLoadScheduleLesson();
		this.isG0OpenClass = this.checkG0Open();
		if((this.weeklyLesson.classCode.charAt(0) == 'K' && this.weeklyLesson.classCode.charAt(1) == '-') ||
			(this.weeklyLesson.classCode.charAt(0) == 'G' && this.weeklyLesson.classCode.charAt(1) == 'K' && this.weeklyLesson.classCode.charAt(2) == '-') ||
			(this.weeklyLesson.classCode.charAt(0) == 'G' && this.weeklyLesson.classCode.charAt(1) == '0' && this.weeklyLesson.classCode.charAt(2) == '-'))
		{
			this.is35 = true;
			this.make35String();
		}

		for(var i=0; i<this.classes.length; i++){
			if(this.weeklyLesson.classCode == this.classes[i].classCode){
				this.regularClass = true;
				if(this.regularClass){
					this.makeStageString(parseInt(this.classes[i].stage));
				}
				this.classCode = this.weeklyLesson.classCode;
				break;
			}
		}
		this.loaded = true;
	}

	goToRegularClass(){
		this.router.navigate(["/classes/show-class/" + this.classCode]);
	}

	goToIrregularClass(){
		this.buildLink(this.weeklyLesson);
		this.router.navigate([this.irregularLessonLink]);
	}

	buildLink(weeklyLesson: WeeklyLesson){
		//build links to all different kinds of lessons
		//irregular lessons link to lesson pages, users regular lessons link to the class pages
		if(weeklyLesson.subject == "Demo"){
			this.irregularLessonLink = "/lessons/show-lesson/Demo/standardised/0/" + weeklyLesson.subject + "/" + weeklyLesson.lessonNo;
		}
		else if(weeklyLesson.subject == "OralTest"){
			this.irregularLessonLink = "/lessons/show-lesson/128/standardised/0/" + weeklyLesson.subject + "/1";
		}
		else if(weeklyLesson.curriculum && weeklyLesson.curriculum == "128") {
			this.irregularLessonLink = "/lessons/show-lesson/128/standardised/" + weeklyLesson.stage + "/" + weeklyLesson.subject + "/" + weeklyLesson.lessonNo;
		}
		else if(weeklyLesson.curriculum && weeklyLesson.curriculum == "SS") {
			this.irregularLessonLink = "/lessons/show-lesson/SS/" + weeklyLesson.level + "/" + weeklyLesson.subject + "/" + weeklyLesson.lessonNo;
		}
		else if(weeklyLesson.curriculum && (weeklyLesson.curriculum == "G0" || weeklyLesson.curriculum == "G" || weeklyLesson.curriculum == "K" || weeklyLesson.curriculum == "K35" || weeklyLesson.curriculum == "GK35")){
			this.irregularLessonLink = "/lessons/show-lesson/" + weeklyLesson.curriculum + "/standardised/" + weeklyLesson.stage + "/" + weeklyLesson.subject + "/" + weeklyLesson.lessonNo;
		}
	}

	getTime(addedMinutes: number){
		//create the hour and minute string for the class start time (param = (0)) and end time (param = (classLength))
		var parsedTime: any = new Date(this.weeklyLesson.timeValue + "");
		var classTime: any = (parsedTime.getTime());
		var time: any = new Date(classTime + addedMinutes*60*1000);
		var hour: any = time.getHours();
		var minute: any = time.getMinutes();
		var hourString: any = this.pad(hour,2);
		var minuteString: any = this.pad(minute,2);

		var timeNow: Date = new Date();
		if(parsedTime < timeNow.getTime()){
			this.past = true;
		}

		return hourString + ":" + minuteString;

	}

	pad(num: number, size: number) {
		var s: string = num+"";
		while(s.length < size){
			s = "0" + s;
		}
		return s;
	}

	onDelete(weeklyLesson: WeeklyLesson){
		this.weeklyLessonsService.handleDelete(weeklyLesson);
	}

	//handle button presses for "prepping" and "unprepping" classes
	//handled in the background, display is changed immediately within component, backend is changed through service so that it shows correctly when reloaded
	onPrepped(weeklyLesson: WeeklyLesson){
		this.weeklyLesson.prepped = true;
		this.prepped = true;
		this.classesService.changed = true;
		this.weeklyLessonsService.handlePrepped(weeklyLesson).subscribe(
			data => {
				console.log(data);
			})
	}

	onNotPrepped(weeklyLesson: WeeklyLesson){
		this.weeklyLesson.prepped = false;
		this.prepped = false;
		this.classesService.changed = true;
		this.weeklyLessonsService.handleNotPrepped(weeklyLesson).subscribe(
			data => {
				console.log(data);
			})
	}

	makeStageString(stage: Number){
		//create new curriculum stage string for display
		switch (stage){
			case 1:
				this.newCurriculumStageString = "1A";
				break;
			case 2:
				this.newCurriculumStageString = "1B";
				break;
			case 3:
				this.newCurriculumStageString = "2A";
				break;
			case 4:
				this.newCurriculumStageString = "2B";
				break;
			case 5:
				this.newCurriculumStageString = "3A";
				break;
			case 6:
				this.newCurriculumStageString = "3B";
				break;
		}
	}

	makeNewCurriculumString(classCode: string){
		//create new curriculum code string for display
		this.newCurriculum = classCode.charAt(0);
	}

	makeNewCurriculumSubjectString(subject: string){
		if(subject == "Language Focus"){
			this.newCurriculumSubject = "LF";
		}
		else this.newCurriculumSubject = subject;
	}

	checkCurriculum(classCode: string){
		//check curriculum of class so that correct class code can be displayed
		if(this.weeklyLesson.subject!='Demo' && (classCode.includes("G") || (classCode.includes("K") && !classCode.includes("S-K") && !classCode.includes('KS') && !classCode.includes('K-') && !classCode.includes('GK-')))){
			this.isNewCurriculum = true;
			if(classCode.includes("G0")){
				this.isG0 = true;
			}
		}
	}

	checkG0Open(){
		if(this.isG0 && this.weeklyLesson.subject == "OpenClass"){
			return true;
		}
		return false;
	}

	make35String(){
		if(this.weeklyLesson.classCode.charAt(0) == 'K' && this.weeklyLesson.classCode.charAt(1) == '-')
		{
			this.gork35string = "K-" + this.weeklyLesson.classCode.charAt(2) + "-U" + this.weeklyLesson.lessonNo + "-" +this.weeklyLesson.subject;
		}
		else if(this.weeklyLesson.classCode.charAt(0) == 'G' && this.weeklyLesson.classCode.charAt(1) == 'K' && this.weeklyLesson.classCode.charAt(2) == '-'){
			this.gork35string = "GK-" + this.weeklyLesson.classCode.charAt(3) + "-U" + this.weeklyLesson.lessonNo + "-" +this.weeklyLesson.subject;
		}
		else if(this.weeklyLesson.classCode.charAt(0) == 'G' && this.weeklyLesson.classCode.charAt(1) == '0' && this.weeklyLesson.classCode.charAt(2) == '-'){
			this.gork35string = "G0-" + this.weeklyLesson.classCode.charAt(3) + "-U" + this.weeklyLesson.lessonNo + "-" +this.weeklyLesson.subject;
		}
	}

}
