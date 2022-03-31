import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import { AuthService } from '@auth0/auth0-angular';
import { WeeklyLessonsService } from '../weekly-lesson.service';
import { WeeklyLesson } from '../weekly-lesson.model';
import { Lesson } from '../../../lessons/lessons.model';
import { LessonService } from '../../../lessons/lessons.service';

@Component ({
	selector: 'add-irregular-lesson',
	templateUrl: './add-irregular-lesson.component.html',
	styleUrls: ['./add-irregular-lesson.component.css']
})

export class AddIrregularLessonComponent implements OnInit {

  myForm!: FormGroup;
  error = false;
  errorMessage = '';
  timeNow!: Date;
	loaded: boolean = false;
	adding: boolean = false;

	curriculumIsSS: boolean = false;
	curriculumIsG0: boolean = false;
	curriculumIsG: boolean = false;
	curriculumIsK: boolean = false;
	is35: boolean = false;

	subjectList!: {title: string, value: string}[];
	curriculum!: string
	stage!: string;
	level!: string;

  date1!: Date;
  date2!: Date;
  date3!: Date;
  date4!: Date;
  date5!: Date;
  date6!: Date;
  date7!: Date;
  date8!: Date;
  date9!: Date;
  date10!: Date;
  dateString1!: string;
  dateString2!: string;
  dateString3!: string;
  dateString4!: string;
  dateString5!: string;
  dateString6!: string;
  dateString7!: string;
  dateString8!: string;
  dateString9!: string;
  dateString10!: string;

	lessons: Lesson[] = [];
	subjectLessons: Lesson[] = [];

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

	constructor(private fb: FormBuilder, public authService: AuthService, public weeklyLessonsService: WeeklyLessonsService, public lessonService: LessonService, private router: Router) {
	}

	ngOnInit(): any {
		this.authService.isAuthenticated$.subscribe((response) => {
			if(!response){
				this.router.navigate(['/home']);
			}
		})

		this.adding = false;
			this.myForm = this.fb.group({
          classCode: ['', Validators.required],
          curriculum: ['', Validators.required],
          stage: [''],
          level: [''],
					subject: ['', Validators.required],
					lesson: ['', Validators.required],
					date: ['', Validators.required],
          hour: ['', Validators.required],
          minute: ['', Validators.required],
          length: ['', Validators.required]
			});
      this.timeNow = new Date();
			this.date1 = new Date();
      this.date2 = new Date(this.date1.getTime() + (1*24*60*60*1000));
      this.date3 = new Date(this.date1.getTime() + (2*24*60*60*1000));
      this.date4 = new Date(this.date1.getTime() + (3*24*60*60*1000));
      this.date5 = new Date(this.date1.getTime() + (4*24*60*60*1000));
      this.date6 = new Date(this.date1.getTime() + (5*24*60*60*1000));
      this.date7 = new Date(this.date1.getTime() + (6*24*60*60*1000));
      this.date8 = new Date(this.date1.getTime() + (7*24*60*60*1000));
      this.date9 = new Date(this.date1.getTime() + (8*24*60*60*1000));
      this.date10 = new Date(this.date1.getTime() + (9*24*60*60*1000));
      this.dateString1 = this.date1.getDate() + " " + this.getMonth(this.date1.getMonth());
      this.dateString2 = this.date2.getDate() + " " + this.getMonth(this.date2.getMonth());
      this.dateString3 = this.date3.getDate() + " " + this.getMonth(this.date3.getMonth());
      this.dateString4 = this.date4.getDate() + " " + this.getMonth(this.date4.getMonth());
      this.dateString5 = this.date5.getDate() + " " + this.getMonth(this.date5.getMonth());
      this.dateString6 = this.date6.getDate() + " " + this.getMonth(this.date6.getMonth());
      this.dateString7 = this.date7.getDate() + " " + this.getMonth(this.date7.getMonth());
      this.dateString8 = this.date8.getDate() + " " + this.getMonth(this.date8.getMonth());
      this.dateString9 = this.date9.getDate() + " " + this.getMonth(this.date9.getMonth());
      this.dateString10 = this.date10.getDate() + " " + this.getMonth(this.date10.getMonth());

			this.lessonService.getLessons()
			.subscribe(
				(lessons: Lesson[]) => {
					this.lessons = lessons;
					this.loaded = true;
				}
			)
	}

	//checkCurriculum checks the currently selected choices in the form so that only the applicable following options can be shown
  checkCurriculum(){
		if ((<HTMLInputElement>document.getElementById('curriculum')).value == 'Demo') {
			document.getElementById('stage')!.style.display = 'none';
			document.getElementById('level')!.style.display = 'none';
			this.curriculum = "Demo";
    }
		else if ((<HTMLInputElement>document.getElementById('curriculum')).value == '128') {
			document.getElementById('stage')!.style.display = 'block';
			document.getElementById('level')!.style.display = 'none';
			this.curriculum = "128";
			this.curriculumIsSS = false;
			this.curriculumIsG0 = false;
			this.curriculumIsG = false;
			this.curriculumIsK = false;
			this.is35 = false;
    }
		else if ((<HTMLInputElement>document.getElementById('curriculum')).value == 'SS')
		{
			document.getElementById('stage')!.style.display = 'none';
      document.getElementById('level')!.style.display = 'block';
			this.curriculumIsSS = true;
			this.curriculumIsG0 = false;
			this.curriculumIsG = false;
			this.curriculumIsK = false;
			this.is35 = false;
			this.curriculum = "SS";
    }

		else if((<HTMLInputElement>document.getElementById('curriculum')).value == 'K')
		{
			document.getElementById('stage')!.style.display = 'block';
      document.getElementById('level')!.style.display = 'none';
			this.curriculumIsG0 = false;
			this.curriculumIsG = false;
			this.curriculumIsK = true;
			this.curriculumIsSS = false;
			this.is35 = false;
			this.curriculum = "K";
		}

		else if((<HTMLInputElement>document.getElementById('curriculum')).value == 'G')
		{
			document.getElementById('stage')!.style.display = 'block';
      document.getElementById('level')!.style.display = 'none';
			this.curriculumIsG0 = false;
			this.curriculumIsG = true;
			this.curriculumIsK = false;
			this.curriculumIsSS = false;
			this.is35 = false;
			this.curriculum = "G";
		}

		else if((<HTMLInputElement>document.getElementById('curriculum')).value == 'G0')
		{
			document.getElementById('stage')!.style.display = 'none';
      document.getElementById('level')!.style.display = 'none';
			this.curriculumIsG0 = true;
			this.curriculumIsG = false;
			this.curriculumIsK = false;
			this.curriculumIsSS = false;
			this.is35 = false;
			this.curriculum = "G0";
		}

		else if((<HTMLInputElement>document.getElementById('curriculum')).value == 'GK35' || (<HTMLInputElement>document.getElementById('curriculum')).value == 'K35' || (<HTMLInputElement>document.getElementById('curriculum')).value == 'G035')
		{
			document.getElementById('stage')!.style.display = 'block';
      document.getElementById('level')!.style.display = 'none';
			this.curriculumIsG0 = false;
			this.curriculumIsG = false;
			this.curriculumIsK = false;
			this.curriculumIsSS = false;
			this.is35 = true;
			if((<HTMLInputElement>document.getElementById('curriculum')).value == 'GK35'){
				this.curriculum = "GK35";
			}
			else if((<HTMLInputElement>document.getElementById('curriculum')).value == 'K35'){
				this.curriculum = "K35";
			}
			else if((<HTMLInputElement>document.getElementById('curriculum')).value == 'GO35'){
				this.curriculum = "G035";
			}
		}
		this.checkSubjects();
		this.checkSubject();
	}

	//checkSubject sorts the lessons into the correct lists for the form, by subject
	checkSubject(){
		this.subjectLessons = [];
		this.stage = this.myForm.value.stage;
		this.level = this.myForm.value.level;
		for(var i=0; i<this.lessons.length; i++){
			if((this.lessons[i].subject == this.myForm.value.subject)
			&& (this.lessons[i].curriculum == this.myForm.value.curriculum)){
				if(this.lessons[i].curriculum == 'Demo'){
					this.subjectLessons.push(this.lessons[i]);
				}
				else if(this.lessons[i].curriculum == '128'){
					if(this.lessons[i].stage == this.myForm.value.stage){
						this.subjectLessons.push(this.lessons[i]);
					}
					else if(this.lessons[i].subject == "OralTest"){
						this.subjectLessons.push(this.lessons[i]);
					}
				}
				else if (this.lessons[i].curriculum == 'SS'){
					if(this.lessons[i].level == this.myForm.value.level){
						this.subjectLessons.push(this.lessons[i]);
					}
				}
				else if(this.lessons[i].curriculum == 'G0'){
					this.subjectLessons.push(this.lessons[i]);
				}
				else if(this.lessons[i].curriculum == 'G'){
					if(this.lessons[i].stage == this.myForm.value.stage){
						this.subjectLessons.push(this.lessons[i]);
					}
				}
				else if(this.lessons[i].curriculum == 'K'){
					if(this.lessons[i].stage == this.myForm.value.stage){
						this.subjectLessons.push(this.lessons[i]);
					}
				}
				else if(this.lessons[i].curriculum == 'K35'){
					if(this.lessons[i].stage == this.myForm.value.stage){
						this.subjectLessons.push(this.lessons[i]);
					}
				}
				else if(this.lessons[i].curriculum == 'GK35'){
					if(this.lessons[i].stage == this.myForm.value.stage){
						this.subjectLessons.push(this.lessons[i]);
					}
				}
				else if(this.lessons[i].curriculum == 'G035'){
					if(this.lessons[i].stage == this.myForm.value.stage){
						this.subjectLessons.push(this.lessons[i]);
					}
				}
			}
		}
		this.subjectLessons = this.orderByLessonNo(this.subjectLessons);
		this.myForm.value.lesson = "";
	}

	//checkSubjects also checks the currently selected choices in the form, but at the next level of the form
	checkSubjects(){
		if(this.myForm.value.curriculum == 'Demo'){
			this.subjectList = this.Demo;
		}
		else if(
			this.myForm.value.curriculum == '128' &&
			this.myForm.value.stage == '0'){
				this.subjectList = this.test;
		}
		else if(
			this.myForm.value.curriculum == '128' &&
			this.myForm.value.stage == 1){
				this.subjectList = this.subjects128S1;
			}
		else if (
			this.myForm.value.curriculum == '128' &&
			this.myForm.value.stage == 2){
				this.subjectList = this.subjects128S2;
			}
		else if (
			this.myForm.value.curriculum == '128' &&
			this.myForm.value.stage == 3){
				this.subjectList = this.subjects128S3;
			}
		else if (
			this.myForm.value.curriculum == '128' &&
			this.myForm.value.stage == 31){
				this.subjectList = this.subjectsSE1;
			}
		else if (
			this.myForm.value.curriculum == '128' &&
			this.myForm.value.stage == 4){
				this.subjectList = this.subjects128S4;
			}
		else if (
			this.myForm.value.curriculum == '128' &&
			(this.myForm.value.stage == 5 || this.myForm.value.stage == 6 || this.myForm.value.stage == 7)){
				this.subjectList = this.subjects128S57;
			}
		else if (
			this.myForm.value.curriculum == '128'){
				this.subjectList = this.subjects128S8;
			}
		else if (
			this.myForm.value.curriculum == 'SS'){
				this.subjectList = this.subjectsSS;
			}

		else if (
			this.myForm.value.curriculum == 'K'){
				this.subjectList = this.subjectsK;
			}

		else if(
			this.myForm.value.curriculum == 'G'){
				console.log("at G " + this.myForm.value.curriculum);
				if(this.myForm.value.stage == '1' || this.myForm.value.stage == '2'){
					this.subjectList = this.subjectsG1;
				}
				else if(this.myForm.value.stage == '3' || this.myForm.value.stage == '4' || this.myForm.value.stage == '5' || this.myForm.value.stage == '6'){
					this.subjectList = this.subjectsG2;
				}
			}

		else if (
			this.myForm.value.curriculum == 'G0'){
				this.subjectList = this.subjectsG0;
			}

		else if (
			this.myForm.value.curriculum == 'GK35'){
				this.subjectList = this.subjectsGK35;
			}

		else if (
			this.myForm.value.curriculum == 'K35'){
				this.subjectList = this.subjectsK35;
			}

		else if (
			this.myForm.value.curriculum == 'G035'){
				this.subjectList = this.subjectsG035;
			}
	}

	orderByLessonNo(lessons: Lesson[]){
		return lessons.sort(function(a,b){
			return a.lessonNo - b.lessonNo;
		});
	}

	getMonth(month: number){
		switch(month){
			case 0:
				return "Jan";
			case 1:
				return "Feb";
			case 2:
				return "Mar";
			case 3:
				return "Apr";
			case 4:
				return "May";
			case 5:
				return "Jun";
			case 6:
				return "Jul";
			case 7:
				return "Aug";
			case 8:
				return "Sep";
			case 9:
				return "Oct";
			case 10:
				return "Nov";
			case 11:
				return "Dec";
		}
		return;
	}

	onSubmit(){
		this.adding = true;
		var date = new Date(this.myForm.value.date + "");
    var time = new Date(date.getFullYear(), date.getMonth(), date.getDate(), this.myForm.value.hour, this.myForm.value.minute);

		var stage;
		var level;

		if(this.myForm.value.curriculum == "Demo" || this.myForm.value.subject == "OralTest" || this.curriculumIsG0){
			stage = 0;
			level = 0;
		}
		else {
			stage = this.myForm.value.stage;
			level = this.myForm.value.level;
		}

		const weeklyLesson = new WeeklyLesson(
			this.myForm.value.classCode,
			time,
			this.myForm.value.length,
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
			this.myForm.value.curriculum,
			level,
			stage
		)
		this.weeklyLessonsService.addIrregularLesson(weeklyLesson, this.myForm.value.curriculum, stage, level)
			.subscribe(
				data => console.log(data),
				error => console.error(error)
			);
		this.myForm.reset();
	}
}
