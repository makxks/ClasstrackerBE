import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '@auth0/auth0-angular';
import { WeeklyLessonsService } from '../weekly-lesson.service';
import { WeeklyLesson } from '../weekly-lesson.model';
import { Lesson } from '../../../lessons/lessons.model';
import { LessonService } from '../../../lessons/lessons.service';

@Component ({
	selector: 'add-next-lesson',
	templateUrl: './add-next-lesson.component.html',
	styleUrls: ['./add-next-lesson.component.css']
})

export class AddNextLessonComponent implements OnInit {
  myForm!: FormGroup;
  error = false;
  errorMessage = '';
	lessonDetails!: Lesson;
	classCode: string;
	date!: number;
	day!: number;
	fullYear!: number;
	month!: number;
	monthWord!: string;
	subjectList!: {title: string, value: string}[];
	loaded: boolean = false;
	adding: boolean = false;

	lessons: Lesson[] = [];
	subjectLessons: Lesson[] = [];

	date1!: Date;
	dateString1!: string;
	date2!: Date;
	dateString2!: string;
	date3!: Date;
	dateString3!: string;
	date4!: Date;
	dateString4!: string;

	public curriculum: string = '';
	public stage: number = 0;
	public level: string = '';
	public day1: string = '';
	public day2: string = '';
	public day1Value: number = 0;
	public day2Value: number = 0;
	public firstSessionStart: string = '';
	public secondSessionStart: string = '';
	public thirdSessionStart: string = '';
	public fourthSessionStart: string = '';
	public firstSessionLength: number = 0;
	public secondSessionLength: number = 0;
	public session1LengthMS: number = 0;
	public session2LengthMS: number = 0;

	Demo: {title: string, value: string}[] = [{title: "Demo", value: "Demo"}];
	test: {title: string, value: string}[] = [{title: "test", value: "test"}];
	subjects128S1: {title: string, value: string}[] = [{title: "Art", value: "Art"}, {title: "Global Leadership", value: "GlobalLeadership"}, {title: "Music", value: "Music"}, {title: "Open Class", value: "OpenClass"}];
	subjects128S2: {title: string, value: string}[] = [{title: "Art", value: "Art"}, {title: "Global Leadership", value: "GlobalLeadership"}, {title: "Music", value: "Music"}, {title: "Open Class", value: "OpenClass"}, {title: "Reading", value: "Reading"}];
	subjects128S3: {title: string, value: string}[] = [{title: "Global Leadership", value: "GlobalLeadership"}, {title: "Open Class", value: "OpenClass"}, {title: "Reading", value: "Reading"}, {title: "Science", value: "Science"}, {title: "VPE", value: "VPE"}, {title: "World Culture", value: "WC"}];
	subjectsSE1: {title: string, value: string}[] = [{title: "Global Leadership", value: "GlobalLeadership"}, {title: "Open Class", value: "OpenClass"}, {title: "Reading", value: "Reading"}, {title: "Science", value: "Science"}, {title: "VPE", value: "VPE"}, {title: "World Culture", value: "WC"}];
	subjects128S4: {title: string, value: string}[] = [{title: "Global Leadership", value: "GlobalLeadership"}, {title: "Open Class", value: "OpenClass"}, {title: "Oral Test", value: "OralTest"}, {title: "Reading", value: "Reading"}, {title: "Science", value: "Science"}, {title: "VPE", value: "VPE"}, {title: "World Culture", value: "WC"}];
	subjects128S57: {title: string, value: string}[] = [{title: "Global Leadership", value: "GlobalLeadership"}, {title: "Logical Thinking", value: "LogicalThinking"}, {title: "Open Class", value: "OpenClass"}, {title: "Oral Test", value: "OralTest"}, {title: "Reading", value: "Reading"}, {title: "Science", value: "Science"}, {title: "VPE", value: "VPE"}, {title: "World Culture", value: "WC"}];
	subjects128S8: {title: string, value: string}[] = [{title: "Drama", value: "Drama"}, {title: "Global Leadership", value: "GlobalLeadership"}, {title: "Logical Thinking", value: "LogicalThinking"}, {title: "Open Class", value: "OpenClass"}, {title: "Oral Test", value: "OralTest"}, {title: "Reading", value: "Reading"}, {title: "Science", value: "Science"}, {title: "VPE", value: "VPE"}, {title: "World Culture", value: "WC"}];
	subjectsSS: {title: string, value: string}[] = [{title: "Life Skills", value: "Life Skills"}, {title: "Maths", value: "Maths"}, {title: "Science", value: "Science"}, {title: "Speaking Test", value: "Speaking Test"}];
	subjectsK: {title: string, value: string}[] = [{title: "I Can Explore", value: "I Can Explore"}, {title: "Showtime", value: "Showtime"}];
	subjectsG1: {title: string, value: string}[] = [{title: "CLIL", value: "CLIL"}, {title: "Language Focus", value: "Language Focus"}, {title: "Midterm", value: "Midterm"}, {title: "Phonics", value: "Phonics"}, {title: "Speaking Test", value: "Speaking Test"}, {title: "Vocab", value: "Vocab"}];
	subjectsG2: {title: string, value: string}[] = [{title: "CLIL", value: "CLIL"}, {title: "Language Focus", value: "Language Focus"}, {title: "Midterm", value: "Midterm"}, {title: "Phonics", value: "Phonics"}, {title: "Project", value: "Project"}, {title: "Speaking Test", value: "Speaking Test"}];
	subjectsG0: {title: string, value: string}[] = [{title: "CLIL", value: "CLIL"}, {title: "Open Class", value: "OpenClass"}];
	subjectsK35: {title: string, value: string}[] = [{title: "I Can Explore", value: "I Can Explore"}, {title: "I Can Read", value: "I Can Read"}, {title: "I Can Say", value: "I Can Say"}, {title: "I Can Talk", value: "I Can Talk"}, {title: "Showtime", value: "Showtime"}, {title: "Storytime", value: "Storytime"}];
	subjectsGK35: {title: string, value: string}[] = [{title: "I Can Explore", value: "I Can Explore"}, {title: "I Can Read", value: "I Can Read"}, {title: "I Can Say", value: "I Can Say"}, {title: "I Can Talk", value: "I Can Talk"}, {title: "Showtime", value: "Showtime"}, {title: "Storytime", value: "Storytime"}];
	subjectsG035: {title: string, value: string}[] = [{title: "CLIL", value: "CLIL"}, {title: "Letters & Sounds", value: "Letters & Sounds"}, {title: "Letters & Sounds Review", value: "Letters & Sounds Review"}, {title: "Reading & LF", value: "Reading & LF"}, {title: "Review", value: "Review"}, {title: "Vocab & LF Review & Test", value: "Vocab & LF Review & Test"}];

	constructor(private fb: FormBuilder, private route: ActivatedRoute, public authService: AuthService, public weeklyLessonsService: WeeklyLessonsService, public lessonService: LessonService, private router: Router) {
		this.classCode = route.snapshot.params['id'];
		// generate values for use in form from params based on the class the user has come from
		this.route.queryParams.subscribe(params => {
			this.curriculum = params["curriculum"];
			this.stage = params["stage"];
			this.level = params["level"];
			this.day1 = params["day1"];
			this.day2 = params["day2"];
			this.day1Value = params["day1Value"];
			this.day2Value = params["day2Value"];
			this.firstSessionStart = params["firstSessionStart"];
			this.secondSessionStart = params["secondSessionStart"];
			this.thirdSessionStart = params["thirdSessionStart"];
			this.fourthSessionStart = params["fourthSessionStart"];
			this.firstSessionLength = params["firstSessionLength"];
			this.secondSessionLength = params["secondSessionLength"];
			this.session1LengthMS = params["session1LengthMS"];
			this.session2LengthMS = params["session2LengthMS"];
		})
	}

	ngOnInit(): any {
		this.authService.isAuthenticated$.subscribe((response) => {
			if(!response){
				this.router.navigate(['/home']);
			}
		})

			this.adding = false;
			this.myForm = this.fb.group({
					subject: ['', Validators.required],
					lesson: ['', Validators.required],
					time: ['', Validators.required]
			});
			var date: Date = new Date();
			this.fullYear = date.getFullYear();
			this.month = date.getMonth();
			this.day = date.getDay();
			this.date = date.getDate();

			// get dates as date values
			this.date1 = this.getDate(1,1);
			this.date2 = this.getDate(1,2);
			this.date3 = this.getDate(2,3);
			this.date4 = this.getDate(2,4);

			// create all date strings for display from date values
			this.dateString1 = this.date1.toDateString() + " " + this.firstSessionStart;
			this.dateString2 = this.date2.toDateString() + " " + this.secondSessionStart;
			this.dateString3 = this.date3.toDateString() + " " + this.thirdSessionStart;
			this.dateString4 = this.date4.toDateString() + " " + this.fourthSessionStart;

			this.checkSubjects();

			this.lessonService.getLessons()
			.subscribe(
				(lessons: Lesson[]) => {
					this.lessons = lessons;
					this.loaded = true;
				}
			)
	}

	//sorts the available lessons into the correct lists for the form
	checkSubject(){
		this.subjectLessons = [];
		for(var i=0; i<this.lessons.length; i++){
			if((this.lessons[i].subject == this.myForm.value.subject)
			&& (this.lessons[i].curriculum == this.curriculum)){
				if(this.lessons[i].curriculum == '128'){
					if(this.lessons[i].stage == this.stage){
						this.subjectLessons.push(this.lessons[i]);
					}
					else if(this.lessons[i].subject == "OralTest"){
						this.subjectLessons.push(this.lessons[i]);
					}
				}
				else if (this.lessons[i].curriculum == 'SS'){
					if(this.lessons[i].level == this.level){
						this.subjectLessons.push(this.lessons[i]);
					}
				}
				else if(this.lessons[i].curriculum == 'G0'){
					this.subjectLessons.push(this.lessons[i]);
				}
				else if(this.lessons[i].curriculum == 'G'){
					if(this.lessons[i].stage == this.stage){
						this.subjectLessons.push(this.lessons[i]);
					}
				}
				else if(this.lessons[i].curriculum == 'K'){
					if(this.lessons[i].stage == this.stage){
						this.subjectLessons.push(this.lessons[i]);
					}
				}
				else if(this.lessons[i].curriculum == 'K35'){
					if(this.lessons[i].stage == this.stage){
						this.subjectLessons.push(this.lessons[i]);
					}
				}
				else if(this.lessons[i].curriculum == 'GK35'){
					if(this.lessons[i].stage == this.stage){
						this.subjectLessons.push(this.lessons[i]);
					}
				}
				else if(this.lessons[i].curriculum == 'G035'){
					if(this.lessons[i].stage == this.stage){
						this.subjectLessons.push(this.lessons[i]);
					}
				}
			}
		}
		this.subjectLessons = this.orderByLessonNo(this.subjectLessons);
		this.myForm.value.lesson = "";
	}

	//check selected options in form and display only relevant sub options
	checkSubjects(){
		if(
			this.curriculum == '128' &&
			this.stage == 1){
				this.subjectList = this.subjects128S1;
			}
		else if (
			this.curriculum == '128' &&
			this.stage == 2){
				this.subjectList = this.subjects128S2;
			}
		else if (
			this.curriculum == '128' &&
			this.stage == 3){
				this.subjectList = this.subjects128S3;
			}
		else if (
			this.curriculum == '128' &&
			this.stage == 31){
				this.subjectList = this.subjectsSE1;
			}
		else if (
			this.curriculum == '128' &&
			this.stage == 4){
				this.subjectList = this.subjects128S4;
			}
		else if (
			this.curriculum == '128' &&
			(this.stage == 5 || this.stage == 6 || this.stage == 7)){
				this.subjectList = this.subjects128S57;
			}
		else if (
			this.curriculum == '128'){
				this.subjectList = this.subjects128S8;
			}
		else if (
			this.curriculum == 'SS'){
				this.subjectList = this.subjectsSS;
			}

		else if (
			this.curriculum == 'K'){
				this.subjectList = this.subjectsK;
			}

		else if(
			this.curriculum == 'G'){
				if(this.stage == 1 || this.stage == 2){
					this.subjectList = this.subjectsG1;
				}
				else if(this.stage == 3 || this.stage == 4 || this.stage == 5 || this.stage == 6){
					this.subjectList = this.subjectsG2;
				}
			}

		else if (
			this.curriculum == 'G0'){
				this.subjectList = this.subjectsG0;
			}

		else if (
			this.curriculum == 'K35'){
				this.subjectList = this.subjectsK35;
			}

		else if (
			this.curriculum == 'GK35'){
				this.subjectList = this.subjectsGK35;
			}

		else if (
			this.curriculum == 'G035'){
				this.subjectList = this.subjectsG035;
			}

	}

	orderByLessonNo(lessons: Lesson[]){
		return lessons.sort(function(a,b){
			return a.lessonNo - b.lessonNo;
		});
	}

	// day is the relative day of the week of the class, classes come in twice a week so this number can be 1 or 2
	// session is the number of the session on that day, so can again be 1 or 2
	// even for classes that come in for 4 classes in one day this can still be used
	getDate(day: number, session: number){
		var difference: number = 0;
		var classDate: Date;
		var tempDate: number;
		var time: string = '';

		//find the difference between today and the day of the class (in days)
		if(day==1){
			if(this.day>this.day1Value && this.day1Value!=0){
				difference = (7-this.day+Number(this.day1Value));
			}
			else if(this.day1Value == 0){
				difference = (7-this.day);
			}
			else{
				difference = Number(this.day1Value) - this.day;
			}
		}
		else {
			if(this.day>this.day2Value && this.day2Value!=0){
				difference = (7-this.day+Number(this.day2Value));
			}
			else if(this.day2Value==0){
				difference = (7-this.day);
			}
			else{
				difference = Number(this.day2Value) - this.day;
			}
		}

		if(session == 1){
			time = this.firstSessionStart;
		}
		else if(session == 2){
			time = this.secondSessionStart;
		}
		else if(session == 3){
			time = this.thirdSessionStart;
		}
		else if(session == 4){
			time = this.fourthSessionStart;
		}
		// create the temporary date of the class depending on calculated difference
		tempDate = this.date + difference;

		classDate = new Date(this.fullYear, this.month, tempDate);

		var dateString: string = classDate.toDateString();

		var modifiedDateString: string = dateString + " " + time + ":00 +0800";

		// get the Date value from the string to be used to create the displayable date
		var dateValue: any = Date.parse(modifiedDateString);

		dateValue = new Date(dateValue);

		return dateValue;
	}

	onSubmit(){
		this.adding = true;
		const weeklyLesson = new WeeklyLesson(
			this.classCode,
			this.myForm.value.time,
			this.firstSessionLength,
			this.myForm.value.subject,
			this.myForm.value.lesson,
			{
				curriculum: "",
		    stage: 0,
		    level: "",
		    subject: "",
		    lessonNo: 0,
		    lessonTitle: "",
		    keyWords: "",
		    keySentences: "",
		    objectives: "",
		    supplies: "",
		    activities: ""
			},
			this.curriculum,
			this.level,
			this.stage
		)
		this.weeklyLessonsService.addWeeklyLesson(weeklyLesson)
			.subscribe(
				data => console.log(data),
				error => console.error(error)
			);
		this.myForm.reset();
	}

}
