import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import { AuthService } from '@auth0/auth0-angular';
import { LessonService } from '../lessons.service';
import { Lesson } from '../lessons.model';

@Component ({
	selector: 'lesson-add',
	templateUrl: './add-lesson.component.html',
	styleUrls: ['./add-lesson.component.css']
})

export class AddLessonComponent implements OnInit {
	myForm!: FormGroup;
	error = false;
	errorMessage = '';
	subjectList: {title: string, value: string}[] = [];
	curriculumIsSS: boolean = false;
	curriculumIsG0: boolean = false;
	curriculumIsG: boolean = false;
	curriculumIsK: boolean = false;
	is35: boolean = false;
	numberOfLessons: number = 1;
	stage: number = 0;
	lessonNo: number = 0;
	adding: boolean = false;
	indexModify: number = 0;

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
	subjectsG035: {title: string, value: string}[] = [{title: "CLIL", value: "CLIL"}, {title: "Letters & Sounds", value: "Letters & Sounds"}, {title: "Letters & Sounds Review", value: "Letters & Sounds Review"}, {title: "Reading & LF", value: "Reading & LF"}, {title: "Review", value: "Review"}, {title: "Vocab & LF Review & Test", value: "Vocab & LF Review & Test"}]

	maxLessons: number = 0;

  maxLessonsByC: { [key:string]: { [key:string]: { [key:string]: number } }  } = {
    "SS": {
      "SS1": {"Life Skills": 22, "Maths": 24, "Science": 48, "Speaking Test": 1},
      "SS2": {"Life Skills": 22, "Maths": 24, "Science": 48, "Speaking Test": 1},
      "SS3": {"Life Skills": 22, "Maths": 24, "Science": 48, "Speaking Test": 1},
      "SS4": {"Life Skills": 22, "Maths": 24, "Science": 48, "Speaking Test": 1}
    },
    "128": {
      "1": {"Art": 18, "Music": 8, "GlobalLeadership": 6, "OpenClass": 1},
      "2": {"Art": 12, "Music": 8, "Reading": 8, "GlobalLeadership": 6, "OpenClass": 1},
      "3": {"GlobalLeadership": 6, "Science": 8, "Reading": 8, "WC": 8, "VPE": 4, "OpenClass": 1},
      "SE1": {"GlobalLeadership": 6, "Science": 8, "Reading": 8, "WC": 8, "VPE": 4, "OpenClass": 1},
      "4": {"GlobalLeadership": 6, "Science": 8, "Reading": 8, "WC": 8, "VPE": 4, "OpenClass": 1},
      "5": {"GlobalLeadership": 6, "LogicalThinking": 6, "Science": 8, "Reading": 8, "WC": 6, "VPE": 4, "OpenClass": 1},
      "6": {"GlobalLeadership": 6, "LogicalThinking": 6, "Science": 8, "Reading": 8, "WC": 6, "VPE": 4, "OpenClass": 1},
      "7": {"GlobalLeadership": 6, "LogicalThinking": 6, "Science": 8, "Reading": 8, "WC": 6, "VPE": 4, "OpenClass": 1},
      "8": {"Drama": 10, "GlobalLeadership": 6, "LogicalThinking": 6, "Science": 8, "Reading": 8, "WC": 6, "VPE": 4, "OpenClass": 1},
      "9": {"Drama": 10, "GlobalLeadership": 6, "LogicalThinking": 6, "Science": 8, "Reading": 8, "WC": 6, "VPE": 4, "OpenClass": 1},
      "10": {"Drama": 10, "GlobalLeadership": 6, "LogicalThinking": 6, "Science": 8, "Reading": 8, "WC": 6, "VPE": 4, "OpenClass": 1}
    },
    "K": {
      "1": {"I Can Explore": 6, "Showtime": 6},
      "2": {"I Can Explore": 6, "Showtime": 6},
      "3": {"I Can Explore": 6, "Showtime": 6},
      "4": {"I Can Explore": 6, "Showtime": 6},
      "5": {"I Can Explore": 6, "Showtime": 6},
      "6": {"I Can Explore": 6, "Showtime": 6}
    },
    "G0": {
      "0": {"CLIL": 9, "OpenClass": 1}
    },
    "G": {
      "1": {"CLIL": 10, "Phonics": 9, "Language Focus": 9, "Speaking Test": 1, "Midterm": 1},
      "2": {"CLIL": 10, "Phonics": 9, "Language Focus": 9, "Speaking Test": 1, "Midterm": 1},
      "3": {"CLIL": 10, "Phonics": 6, "Language Focus": 6, "Project": 6, "Speaking Test": 1, "Midterm": 1},
      "4": {"CLIL": 10, "Phonics": 6, "Language Focus": 6, "Project": 6, "Speaking Test": 1, "Midterm": 1},
      "5": {"CLIL": 10, "Phonics": 6, "Language Focus": 6, "Project": 6, "Speaking Test": 1, "Midterm": 1},
      "6": {"CLIL": 10, "Phonics": 6, "Language Focus": 6, "Project": 6, "Speaking Test": 1, "Midterm": 1}
    },
    "K35": {
      "1": {"I Can Explore": 4, "I Can Read": 4, "I Can Say": 4, "I Can Talk": 4, "Showtime": 4, "Storytime": 4, "OpenClass": 1},
      "2": {"I Can Explore": 4, "I Can Read": 4, "I Can Say": 4, "I Can Talk": 4, "Showtime": 4, "Storytime": 4, "OpenClass": 1},
      "3": {"I Can Explore": 4, "I Can Read": 4, "I Can Say": 4, "I Can Talk": 4, "Showtime": 4, "Storytime": 4, "OpenClass": 1},
      "4": {"I Can Explore": 4, "I Can Read": 4, "I Can Say": 4, "I Can Talk": 4, "Showtime": 4, "Storytime": 4, "OpenClass": 1},
    },
    "GK35": {
      "1": {"I Can Explore": 4, "I Can Read": 4, "I Can Say": 4, "I Can Talk": 4, "Showtime": 4, "Storytime": 4, "OpenClass": 1},
      "2": {"I Can Explore": 4, "I Can Read": 4, "I Can Say": 4, "I Can Talk": 4, "Showtime": 4, "Storytime": 4, "OpenClass": 1},
      "3": {"I Can Explore": 4, "I Can Read": 4, "I Can Say": 4, "I Can Talk": 4, "Showtime": 4, "Storytime": 4, "OpenClass": 1},
      "4": {"I Can Explore": 4, "I Can Read": 4, "I Can Say": 4, "I Can Talk": 4, "Showtime": 4, "Storytime": 4, "OpenClass": 1},
    },
	"G035": {
		"1": {"CLIL": 5, "Letters & Sounds": 5, "Letters & Sounds Review": 0, "Reading & LF": 5, "Review": 5, "Vocab & LF Review & Test": 0},
		"2": {"CLIL": 4, "Letters & Sounds": 4, "Letters & Sounds Review": 0, "Reading & LF": 4, "Review": 4, "Vocab & LF Review & Test": 0},
		"3": {"CLIL": 5, "Letters & Sounds": 5, "Letters & Sounds Review": 0, "Reading & LF": 5, "Review": 5, "Vocab & LF Review & Test": 0},
		"4": {"CLIL": 4, "Letters & Sounds": 4, "Letters & Sounds Review": 0, "Reading & LF": 4, "Review": 4, "Vocab & LF Review & Test": 0}
	}
  }

	constructor(private fb: FormBuilder, public lessonService: LessonService, public authService: AuthService, private router: Router) {
	}

	ngOnInit(): any {
		this.authService.isAuthenticated$.subscribe((response) => {
			if(!response){
				this.router.navigate(['/home']);
			}
		})

		this.adding = false;
		this.myForm = this.fb.group({
				curriculum: ['', Validators.required],
				level: [''],
				stage: [''],
				subject: ['', Validators.required],
				lessonNo: ['', Validators.required],
				lessonTitle: ['', Validators.required],
				keyWords: ['', Validators.required],
				keySentences: ['', Validators.required],
				objectives: ['', Validators.required],
				supplies: ['', Validators.required],
				activities: ['', Validators.required]
		});
	}

	onSubmit(){
		this.adding = true;
		this.stage = this.myForm.value.stage;
		if(!this.stage || this.stage == null || this.stage == undefined || this.curriculumIsG0){
			this.stage = 0;
		}
		this.lessonNo = this.myForm.value.lessonNo;
		if(this.myForm.value.subject == 'Midterm'){
			this.lessonNo = 1;
		}
		const lesson = new Lesson(
			this.myForm.value.curriculum,
			this.stage,
			this.myForm.value.level,
			this.myForm.value.subject,
			this.lessonNo,
			this.myForm.value.lessonTitle,
			this.myForm.value.keyWords,
			this.myForm.value.keySentences,
			this.myForm.value.objectives,
			this.myForm.value.supplies,
			this.myForm.value.activities
		);
		this.lessonService.addLesson(lesson)
			.subscribe({
				next: (data) => console.log(data),
				error: (error) => console.error(error)
			});
		this.myForm.reset();
	}

	// only display relevant choices based on already selected form options
	checkCurriculum(){
		if(this.myForm.value.curriculum == 'Demo'){
			document.getElementById('stage')!.style.display = 'none';
			document.getElementById('level')!.style.display = 'none';
		}
		else if (this.myForm.value.curriculum == '128') {
			document.getElementById('stage')!.style.display = 'block';
			document.getElementById('level')!.style.display = 'none';
			this.curriculumIsG0 = false;
			this.curriculumIsG = false;
			this.curriculumIsK = false;
			this.curriculumIsSS = false;
			this.is35 = false;
    }
		else if(this.myForm.value.curriculum == 'SS')
		{
			document.getElementById('stage')!.style.display = 'none';
      		document.getElementById('level')!.style.display = 'block';
			this.curriculumIsG0 = false;
			this.curriculumIsG = false;
			this.curriculumIsK = false;
			this.curriculumIsSS = true;
			this.is35 = false;
		}

		else if(this.myForm.value.curriculum == 'K')
		{
			document.getElementById('stage')!.style.display = 'block';
      		document.getElementById('level')!.style.display = 'none';
			this.curriculumIsG0 = false;
			this.curriculumIsG = false;
			this.curriculumIsK = true;
			this.curriculumIsSS = false;
			this.is35 = false;
		}

		else if(this.myForm.value.curriculum == 'G')
		{
			document.getElementById('stage')!.style.display = 'block';
      		document.getElementById('level')!.style.display = 'none';
			this.curriculumIsG0 = false;
			this.curriculumIsG = true;
			this.curriculumIsK = false;
			this.curriculumIsSS = false;
			this.is35 = false;
		}

		else if(this.myForm.value.curriculum == 'G0')
		{
			document.getElementById('stage')!.style.display = 'none';
      		document.getElementById('level')!.style.display = 'none';
			this.curriculumIsG0 = true;
			this.curriculumIsG = false;
			this.curriculumIsK = false;
			this.curriculumIsSS = false;
			this.is35 = false;
			this.myForm.value.stage = 0;
		}

		else if(this.myForm.value.curriculum == 'GK35' || this.myForm.value.curriculum == "K35" || this.myForm.value.curriculum == "G035")
		{
			document.getElementById('stage')!.style.display = 'block';
      		document.getElementById('level')!.style.display = 'none';
			this.curriculumIsG0 = false;
			this.curriculumIsG = false;
			this.curriculumIsK = false;
			this.curriculumIsSS = false;
			this.is35 = true;
		}

	}

	// only display relevant choices based on already selected form options
	checkSubjects(){
		if(this.myForm.value.curriculum == '128' || this.myForm.value.curriculum == 'G0' || this.myForm.value.curriculum == 'G' || this.myForm.value.curriculum == 'K'){
			this.myForm.value.level = '';
		}
		else if(this.myForm.value.curriculum == 'SS'){
			this.myForm.value.stage = '';
		}

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
			this.myForm.value.stage == '1'){
				this.subjectList = this.subjects128S1;
			}
		else if (
			this.myForm.value.curriculum == '128' &&
			this.myForm.value.stage == '2'){
				this.subjectList = this.subjects128S2;
			}
		else if (
			this.myForm.value.curriculum == '128' &&
			this.myForm.value.stage == '3'){
				this.subjectList = this.subjects128S3;
			}
		else if (
			this.myForm.value.curriculum == '128' &&
			this.myForm.value.stage == '31'){
				this.subjectList = this.subjectsSE1;
			}
		else if (
			this.myForm.value.curriculum == '128' &&
			this.myForm.value.stage == '4'){
				this.subjectList = this.subjects128S4;
			}
		else if (
			this.myForm.value.curriculum == '128' &&
			(this.myForm.value.stage == '5' || this.myForm.value.stage == '6' || this.myForm.value.stage == '7')){
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

	// sets choice for number of lessons according to how many lessons there are in the curriculum
	checkNumberOfClasses(){
    if(this.myForm.value.curriculum == 'Demo'){
			this.numberOfLessons = 3;
		}
		else if(this.myForm.value.subject == 'OralTest'){
			this.numberOfLessons = 1;
		}
		else if(this.myForm.value.subject == 'Speaking Test'){
			this.numberOfLessons = 1;
		}
		else if(this.myForm.value.curriculum == 'SS'){
			this.numberOfLessons = this.maxLessonsByC[this.myForm.value.curriculum][this.myForm.value.level][this.myForm.value.subject];
		}
		else{
			this.numberOfLessons = this.maxLessonsByC[this.myForm.value.curriculum][this.myForm.value.stage][this.myForm.value.subject];
		}
  }

	getStage(){
		switch(this.myForm.value.stage){
			case "0":
				return 0;
			case "1":
				return 1;
			case "2":
				return 2;
			case "3":
				return 3;
			case "4":
				return 4;
			case "31":
				return "SE1";
			case "5":
				return 5;
			case "6":
				return 6;
			case "7":
				return 7;
			case "8":
				return 8;
			case "9":
				return 9;
			case "10":
				return 10;
		}
		return;
	};

	getLevel(){
		switch(this.myForm.value.level){
			case "5":
				return 5;
			case "SS1":
				return "SS1";
			case "SS2":
				return "SS2";
			case "SS3":
				return "SS3";
			case "SS4":
				return "SS4";
		}
		return;
	};

	doIndexModify(){
		if(this.is35 && this.myForm.value.curriculum!='G035' && this.myForm.value.stage%2 == 0){
			this.indexModify = 4;
		}
		else if(this.is35 && this.myForm.value.curriculum=='G035' && this.myForm.value.stage%2 == 0){
			this.indexModify = 5;
		}
		else{
			this.indexModify = 0;
		}
	}

};
