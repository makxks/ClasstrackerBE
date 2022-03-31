import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';

import { AuthService } from '@auth0/auth0-angular';
import { LessonService } from './lessons.service';
import { Lesson } from './lessons.model';

@Component ({
	selector: 'app-lessons',
	templateUrl: './lessons.component.html',
	styleUrls: ['./lessons.component.css']
})

export class LessonsComponent implements OnInit {
	myForm!: FormGroup;

	allLessons:Lesson[] = [];
	selected: Lesson[] = [];
	selectedLS: string = "";
	selectedSubject: string = "";
	clickedSubject: string = "";
	clicked: string = "";
	windowWidth: number = window.innerWidth;

	curriculumModel:string = "";
	stageModel:string = "";
	levelModel:string = "";
	subjectModel:string = "";

	demos: Lesson[] = [];

	l5BR:Lesson[] = [];
	l5Drama:Lesson[] = [];
	l5GL:Lesson[] = [];
	l5LCT:Lesson[] = [];
	l5Science:Lesson[] = [];
	l5VPE:Lesson[] = [];
	l5WC:Lesson[] = [];

	//SS1 SS2 SS3 SS4 - need to add subject arrays here, only add new ones
	SS1LS:Lesson[] = [];
	SS1M: Lesson[] = [];
	SS1S: Lesson[] = [];
	SS1ST: Lesson[] = [];

	SS2LS:Lesson[] = [];
	SS2M: Lesson[] = [];
	SS2S: Lesson[] = [];
	SS2ST: Lesson[] = [];

	SS3LS:Lesson[] = [];
	SS3M: Lesson[] = [];
	SS3S: Lesson[] = [];
	SS3ST: Lesson[] = [];

	SS4LS:Lesson[] = [];
	SS4M: Lesson[] = [];
	SS4S: Lesson[] = [];
	SS4ST: Lesson[] = [];
	//end of SS subjects
	sTest: Lesson[] = [];

	s1StArt:Lesson[] = [];
	s1StMusic:Lesson[] = [];
	s1StGL:Lesson[] = [];
	s1StOpenClass:Lesson[] = [];

	s2StArt:Lesson[] = [];
	s2StMusic:Lesson[] = [];
	s2StGL:Lesson[] = [];
	s2StReading:Lesson[] = [];
	s2StOpenClass:Lesson[] = [];

	s3StGL:Lesson[] = [];
	s3StReading:Lesson[] = [];
	s3StScience:Lesson[] = [];
	s3StVPE:Lesson[] = [];
	s3StWC:Lesson[] = [];
	s3StOpenClass:Lesson[] = [];

	sE1StGL:Lesson[] = [];
	sE1StReading:Lesson[] = [];
	sE1StScience:Lesson[] = [];
	sE1StVPE:Lesson[] = [];
	sE1StWC:Lesson[] = [];
	sE1StOpenClass:Lesson[] = [];

	s4StGL:Lesson[] = [];
	s4StReading:Lesson[] = [];
	s4StScience:Lesson[] = [];
	s4StLT:Lesson[] = [];
	s4StVPE:Lesson[] = [];
	s4StWC:Lesson[] = [];
	s4StOpenClass:Lesson[] = [];

	s5StGL:Lesson[] = [];
	s5StReading:Lesson[] = [];
	s5StScience:Lesson[] = [];
	s5StLT:Lesson[] = [];
	s5StVPE:Lesson[] = [];
	s5StWC:Lesson[] = [];
	s5StOpenClass:Lesson[] = [];

	s6StGL:Lesson[] = [];
	s6StReading:Lesson[] = [];
	s6StScience:Lesson[] = [];
	s6StLT:Lesson[] = [];
	s6StVPE:Lesson[] = [];
	s6StWC:Lesson[] = [];
	s6StOpenClass:Lesson[] = [];

	s7StGL:Lesson[] = [];
	s7StReading:Lesson[] = [];
	s7StScience:Lesson[] = [];
	s7StLT:Lesson[] = [];
	s7StVPE:Lesson[] = [];
	s7StWC:Lesson[] = [];
	s7StOpenClass:Lesson[] = [];

	s8StDrama: Lesson[] = [];
	s8StGL:Lesson[] = [];
	s8StReading:Lesson[] = [];
	s8StScience:Lesson[] = [];
	s8StLT:Lesson[] = [];
	s8StVPE:Lesson[] = [];
	s8StWC:Lesson[] = [];
	s8StOpenClass:Lesson[] = [];

	s9StDrama: Lesson[] = [];
	s9StGL:Lesson[] = [];
	s9StReading:Lesson[] = [];
	s9StScience:Lesson[] = [];
	s9StLT:Lesson[] = [];
	s9StVPE:Lesson[] = [];
	s9StWC:Lesson[] = [];
	s9StOpenClass:Lesson[] = [];

	s10StDrama: Lesson[] = [];
	s10StGL:Lesson[] = [];
	s10StReading:Lesson[] = [];
	s10StScience:Lesson[] = [];
	s10StLT:Lesson[] = [];
	s10StVPE:Lesson[] = [];
	s10StWC:Lesson[] = [];
	s10StOpenClass:Lesson[] = [];

	k1AICanExplore:Lesson[] = [];
	k1AShowtime:Lesson[] = [];

	k1BICanExplore:Lesson[] = [];
	k1BShowtime:Lesson[] = [];

	k2AICanExplore:Lesson[] = [];
	k2AShowtime:Lesson[] = [];

	k2BICanExplore:Lesson[] = [];
	k2BShowtime:Lesson[] = [];

	k3AICanExplore:Lesson[] = [];
	k3AShowtime:Lesson[] = [];

	k3BICanExplore:Lesson[] = [];
	k3BShowtime:Lesson[] = [];

	g0CLIL:Lesson[] = [];
	g0OpenClass:Lesson[] = [];

	g1ACLIL:Lesson[] = [];
	g1APhonics:Lesson[] = [];
	g1AMidterm: Lesson[] = [];
	g1ASpeakingTest: Lesson[] = [];

	g1BCLIL:Lesson[] = [];
	g1BPhonics:Lesson[] = [];
	g1BMidterm: Lesson[] = [];
	g1BSpeakingTest: Lesson[] = [];

	g2ACLIL:Lesson[] = [];
	g2ALanguageFocus:Lesson[] = [];
	g2APhonics:Lesson[] = [];
	g2AProject:Lesson[] = [];
	g2AMidterm: Lesson[] = [];
	g2ASpeakingTest: Lesson[] = [];

	g2BCLIL:Lesson[] = [];
	g2BLanguageFocus:Lesson[] = [];
	g2BPhonics:Lesson[] = [];
	g2BProject:Lesson[] = [];
	g2BMidterm: Lesson[] = [];
	g2BSpeakingTest: Lesson[] = [];

	g3ACLIL:Lesson[] = [];
	g3ALanguageFocus:Lesson[] = [];
	g3APhonics:Lesson[] = [];
	g3AProject:Lesson[] = [];
	g3AMidterm: Lesson[] = [];
	g3ASpeakingTest: Lesson[] = [];

	g3BCLIL:Lesson[] = [];
	g3BLanguageFocus:Lesson[] = [];
	g3BPhonics:Lesson[] = [];
	g3BProject:Lesson[] = [];
	g3BMidterm: Lesson[] = [];
	g3BSpeakingTest: Lesson[] = [];

	k1ICanSay:Lesson[] = [];
	k1ICanTalk:Lesson[] = [];
	k1Storytime:Lesson[] = [];
	k1ICanExplore:Lesson[] = [];
	k1ICanRead:Lesson[]=[];
	k1Showtime:Lesson[]=[];

	k2ICanSay:Lesson[] = [];
	k2ICanTalk:Lesson[] = [];
	k2Storytime:Lesson[] = [];
	k2ICanExplore:Lesson[] = [];
	k2ICanRead:Lesson[]=[];
	k2Showtime:Lesson[]=[];

	k3ICanSay:Lesson[] = [];
	k3ICanTalk:Lesson[] = [];
	k3Storytime:Lesson[] = [];
	k3ICanExplore:Lesson[] = [];
	k3ICanRead:Lesson[]=[];
	k3Showtime:Lesson[]=[];

	k4ICanSay:Lesson[] = [];
	k4ICanTalk:Lesson[] = [];
	k4Storytime:Lesson[] = [];
	k4ICanExplore:Lesson[] = [];
	k4ICanRead:Lesson[]=[];
	k4Showtime:Lesson[]=[];

	gk1ICanSay:Lesson[] = [];
	gk1ICanTalk:Lesson[] = [];
	gk1Storytime:Lesson[] = [];
	gk1ICanExplore:Lesson[] = [];
	gk1ICanRead:Lesson[]=[];
	gk1Showtime:Lesson[]=[];

	gk2ICanSay:Lesson[] = [];
	gk2ICanTalk:Lesson[] = [];
	gk2Storytime:Lesson[] = [];
	gk2ICanExplore:Lesson[] = [];
	gk2ICanRead:Lesson[]=[];
	gk2Showtime:Lesson[]=[];

	gk3ICanSay:Lesson[] = [];
	gk3ICanTalk:Lesson[] = [];
	gk3Storytime:Lesson[] = [];
	gk3ICanExplore:Lesson[] = [];
	gk3ICanRead:Lesson[]=[];
	gk3Showtime:Lesson[]=[];

	gk4ICanSay:Lesson[] = [];
	gk4ICanTalk:Lesson[] = [];
	gk4Storytime:Lesson[] = [];
	gk4ICanExplore:Lesson[] = [];
	gk4ICanRead:Lesson[]=[];
	gk4Showtime:Lesson[]=[];

	g0351clil:Lesson[] = [];
	g0351ls:Lesson[] = [];
	g0351lsr:Lesson[] = [];
	g0351rlf:Lesson[] = [];
	g0351review:Lesson[] = [];
	g0351vlfr:Lesson[] = [];

	g0352clil:Lesson[] = [];
	g0352ls:Lesson[] = [];
	g0352lsr:Lesson[] = [];
	g0352rlf:Lesson[] = [];
	g0352review:Lesson[] = [];
	g0352vlfr:Lesson[] = [];

	g0353clil:Lesson[] = [];
	g0353ls:Lesson[] = [];
	g0353lsr:Lesson[] = [];
	g0353rlf:Lesson[] = [];
	g0353review:Lesson[] = [];
	g0353vlfr:Lesson[] = [];

	g0354clil:Lesson[] = [];
	g0354ls:Lesson[] = [];
	g0354lsr:Lesson[] = [];
	g0354rlf:Lesson[] = [];
	g0354review:Lesson[] = [];
	g0354vlfr:Lesson[] = [];

	loaded: boolean = false;

	curriculumIsSS: boolean = false;
	curriculumIsG0: boolean = false;
	curriculumIsG: boolean = false;
	curriculumIsK: boolean = false;
	is35: boolean = false;

	subjectList: {title: string, value: string}[] = [];
	curriculum: string = "";
	stage: string = "";
	level: string = "";

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

	constructor(public authService: AuthService, public lessonService: LessonService, private fb: FormBuilder, private router: Router){}

	ngOnInit(){
		this.authService.isAuthenticated$.subscribe((response) => {
			if(!response){
				this.router.navigate(['/home']);
			}
		})

		this.myForm = this.fb.group({
				curriculum: [''],
				stage: [''],
				level: [''],
				subject: ['']
		});

		if(!this.lessonService.loadedLessons || this.lessonService.changed){
			this.loaded = false;
			this.lessonService.getLessons()
				.subscribe(
					(lessons: Lesson[]) => {
						this.allLessons = lessons;

						//put lessons into correct lesson arrays by subject
						this.organiseLessons(this.allLessons);
						if(this.selectedSubject != ""){
							this.selected = this.orderByLessonNo(this.selected);
						}
						this.loaded = true;
					}
				)
		}
		else{
			this.allLessons = this.lessonService.lessons;
			this.organiseLessons(this.allLessons);
			if(this.selectedSubject != ""){
				this.selected = this.orderByLessonNo(this.selected);
			}
			this.loaded = true;
		}
	}

	// sort lessons into their correct levels, stages, and subjects
	organiseLessons(lessons: Lesson[]){
		for(var i=0; i<lessons.length; i++){
			if(lessons[i].curriculum == 'Demo'){
				this.demos.push(lessons[i]);
			}
			else if(lessons[i].curriculum == 'SS'){
				if(lessons[i].level == "SS1"){
					switch(lessons[i].subject){
						case "Life Skills":
							this.SS1LS.push(lessons[i]);
							break;
						case "Maths":
							this.SS1M.push(lessons[i]);
							break;
						case "Science":
							this.SS1S.push(lessons[i]);
							break;
						case "Speaking Test":
							this.SS1ST.push(lessons[i]);
							break;
					}
				}
				if(lessons[i].level == "SS2"){
					switch(lessons[i].subject){
						case "Life Skills":
							this.SS2LS.push(lessons[i]);
							break;
						case "Maths":
							this.SS2M.push(lessons[i]);
							break;
						case "Science":
							this.SS2S.push(lessons[i]);
							break;
						case "Speaking Test":
							this.SS2ST.push(lessons[i]);
							break;
					}
				}
				if(lessons[i].level == "SS3"){
					switch(lessons[i].subject){
						case "Life Skills":
							this.SS3LS.push(lessons[i]);
							break;
						case "Maths":
							this.SS3M.push(lessons[i]);
							break;
						case "Science":
							this.SS3S.push(lessons[i]);
							break;
						case "Speaking Test":
							this.SS3ST.push(lessons[i]);
							break;
					}
				}
				if(lessons[i].level == "SS4"){
					switch(lessons[i].subject){
						case "Life Skills":
							this.SS4LS.push(lessons[i]);
							break;
						case "Maths":
							this.SS4M.push(lessons[i]);
							break;
						case "Science":
							this.SS4S.push(lessons[i]);
							break;
						case "Speaking Test":
							this.SS4ST.push(lessons[i]);
							break;
					}
				}
			}
			else if(lessons[i].curriculum == '192'){
				if(lessons[i].level == "5"){
					switch(lessons[i].subject){
						case "BookReading":
							this.l5BR.push(lessons[i]);
							break;
						case "Drama":
							this.l5Drama.push(lessons[i]);
							break;
						case "GlobalLeadership":
							this.l5GL.push(lessons[i]);
							break;
						case "LogicalThinking":
							this.l5LCT.push(lessons[i]);
							break;
						case "Science":
							this.l5Science.push(lessons[i]);
							break;
						case "VPE":
							this.l5VPE.push(lessons[i]);
							break;
						case "WC":
							this.l5WC.push(lessons[i]);
							break;
					}
				}
			}
			else if(lessons[i].curriculum == '128'){
				if(lessons[i].subject == "OralTest"){
					this.sTest.push(lessons[i]);
				}
				else if(lessons[i].stage == 1){
					switch(lessons[i].subject){
						case "Art":
							this.s1StArt.push(lessons[i]);
							break;
						case "GlobalLeadership":
							this.s1StGL.push(lessons[i]);
							break;
						case "Music":
							this.s1StMusic.push(lessons[i]);
							break;
						case "OpenClass":
							this.s1StOpenClass.push(lessons[i]);
							break;
					}
				}
				else if(lessons[i].stage == 2){
					switch(lessons[i].subject){
						case "Art":
							this.s2StArt.push(lessons[i]);
							break;
						case "GlobalLeadership":
							this.s2StGL.push(lessons[i]);
							break;
						case "Music":
							this.s2StMusic.push(lessons[i]);
							break;
						case "Reading":
							this.s2StReading.push(lessons[i]);
							break;
						case "OpenClass":
							this.s2StOpenClass.push(lessons[i]);
							break;
					}
				}
				else if(lessons[i].stage == 3){
					switch(lessons[i].subject){
						case "Reading":
							this.s3StReading.push(lessons[i]);
							break;
						case "GlobalLeadership":
							this.s3StGL.push(lessons[i]);
							break;
						case "Science":
							this.s3StScience.push(lessons[i]);
							break;
						case "VPE":
							this.s3StVPE.push(lessons[i]);
							break;
						case "WC":
							this.s3StWC.push(lessons[i]);
							break;
						case "OpenClass":
							this.s3StOpenClass.push(lessons[i]);
							break;
					}
				}
				else if(lessons[i].stage == 4){
					switch(lessons[i].subject){
						case "Reading":
							this.s4StReading.push(lessons[i]);
							break;
						case "GlobalLeadership":
							this.s4StGL.push(lessons[i]);
							break;
						case "Science":
							this.s4StScience.push(lessons[i]);
							break;
						case "VPE":
							this.s4StVPE.push(lessons[i]);
							break;
						case "WC":
							this.s4StWC.push(lessons[i]);
							break;
						case "LogicalThinking":
							this.s4StLT.push(lessons[i]);
							break;
						case "OpenClass":
							this.s4StOpenClass.push(lessons[i]);
							break;
					}
				}
				else if(lessons[i].stage == 31){
					switch(lessons[i].subject){
						case "Reading":
							this.sE1StReading.push(lessons[i]);
							break;
						case "GlobalLeadership":
							this.sE1StGL.push(lessons[i]);
							break;
						case "Science":
							this.sE1StScience.push(lessons[i]);
							break;
						case "VPE":
							this.sE1StVPE.push(lessons[i]);
							break;
						case "WC":
							this.sE1StWC.push(lessons[i]);
							break;
						case "OpenClass":
							this.sE1StOpenClass.push(lessons[i]);
							break;
					}
				}
				else if(lessons[i].stage == 5){
					switch(lessons[i].subject){
						case "Reading":
							this.s5StReading.push(lessons[i]);
							break;
						case "GlobalLeadership":
							this.s5StGL.push(lessons[i]);
							break;
						case "Science":
							this.s5StScience.push(lessons[i]);
							break;
						case "VPE":
							this.s5StVPE.push(lessons[i]);
							break;
						case "WC":
							this.s5StWC.push(lessons[i]);
							break;
						case "LogicalThinking":
							this.s5StLT.push(lessons[i]);
							break;
						case "OpenClass":
							this.s5StOpenClass.push(lessons[i]);
							break;
					}
				}
				else if(lessons[i].stage == 6){
					switch(lessons[i].subject){
						case "Reading":
							this.s6StReading.push(lessons[i]);
							break;
						case "GlobalLeadership":
							this.s6StGL.push(lessons[i]);
							break;
						case "Science":
							this.s6StScience.push(lessons[i]);
							break;
						case "VPE":
							this.s6StVPE.push(lessons[i]);
							break;
						case "WC":
							this.s6StWC.push(lessons[i]);
							break;
						case "LogicalThinking":
							this.s6StLT.push(lessons[i]);
							break;
						case "OpenClass":
							this.s6StOpenClass.push(lessons[i]);
							break;
					}
				}
				else if(lessons[i].stage == 7){
					switch(lessons[i].subject){
						case "Reading":
							this.s7StReading.push(lessons[i]);
							break;
						case "GlobalLeadership":
							this.s7StGL.push(lessons[i]);
							break;
						case "Science":
							this.s7StScience.push(lessons[i]);
							break;
						case "VPE":
							this.s7StVPE.push(lessons[i]);
							break;
						case "WC":
							this.s7StWC.push(lessons[i]);
							break;
						case "LogicalThinking":
							this.s7StLT.push(lessons[i]);
							break;
						case "OpenClass":
							this.s7StOpenClass.push(lessons[i]);
							break;
					}
				}
				else if(lessons[i].stage == 8){
					switch(lessons[i].subject){
						case "Drama":
							this.s8StDrama.push(lessons[i]);
							break;
						case "Reading":
							this.s8StReading.push(lessons[i]);
							break;
						case "GlobalLeadership":
							this.s8StGL.push(lessons[i]);
							break;
						case "Science":
							this.s8StScience.push(lessons[i]);
							break;
						case "VPE":
							this.s8StVPE.push(lessons[i]);
							break;
						case "WC":
							this.s8StWC.push(lessons[i]);
							break;
						case "LogicalThinking":
							this.s8StLT.push(lessons[i]);
							break;
						case "OpenClass":
							this.s8StOpenClass.push(lessons[i]);
							break;
					}
				}
				else if(lessons[i].stage == 9){
					switch(lessons[i].subject){
						case "Drama":
							this.s9StDrama.push(lessons[i]);
							break;
						case "Reading":
							this.s9StReading.push(lessons[i]);
							break;
						case "GlobalLeadership":
							this.s9StGL.push(lessons[i]);
							break;
						case "Science":
							this.s9StScience.push(lessons[i]);
							break;
						case "VPE":
							this.s9StVPE.push(lessons[i]);
							break;
						case "WC":
							this.s9StWC.push(lessons[i]);
							break;
						case "LogicalThinking":
							this.s9StLT.push(lessons[i]);
							break;
						case "OpenClass":
							this.s9StOpenClass.push(lessons[i]);
							break;
					}
				}
				else if(lessons[i].stage == 10){
					switch(lessons[i].subject){
						case "Drama":
							this.s10StDrama.push(lessons[i]);
							break;
						case "Reading":
							this.s10StReading.push(lessons[i]);
							break;
						case "GlobalLeadership":
							this.s10StGL.push(lessons[i]);
							break;
						case "Science":
							this.s10StScience.push(lessons[i]);
							break;
						case "VPE":
							this.s10StVPE.push(lessons[i]);
							break;
						case "WC":
							this.s10StWC.push(lessons[i]);
							break;
						case "LogicalThinking":
							this.s10StLT.push(lessons[i]);
							break;
						case "OpenClass":
							this.s10StOpenClass.push(lessons[i]);
							break;
					}
				}
			}
			else if(lessons[i].curriculum == "G0"){
				switch(lessons[i].subject){
					case "CLIL":
						this.g0CLIL.push(lessons[i]);
						break;
					case "OpenClass":
						this.g0OpenClass.push(lessons[i]);
						break;
				}
			}
			else if(lessons[i].curriculum == "G"){
				if(lessons[i].stage == 1){
					switch(lessons[i].subject){
						case "CLIL":
							this.g1ACLIL.push(lessons[i]);
							break;
						// Phonics is currently in the curriculum for some classes but will be removed later
						case "Phonics":
							this.g1APhonics.push(lessons[i]);
							break;
						case "Midterm":
							this.g1AMidterm.push(lessons[i]);
							break;
						case "Speaking Test":
							this.g1ASpeakingTest.push(lessons[i]);
							break;
					}
				}
				else if(lessons[i].stage == 2){
					switch(lessons[i].subject){
						case "CLIL":
							this.g1BCLIL.push(lessons[i]);
							break;
						// Phonics is currently in the curriculum for some classes but will be removed later
						case "Phonics":
							this.g1BPhonics.push(lessons[i]);
							break;
						case "Midterm":
							this.g1BMidterm.push(lessons[i]);
							break;
						case "Speaking Test":
							this.g1BSpeakingTest.push(lessons[i]);
							break;
					}
				}
				else if(lessons[i].stage == 3){
					switch(lessons[i].subject){
						case "CLIL":
							this.g2ACLIL.push(lessons[i]);
							break;
						case "Language Focus":
							this.g2ALanguageFocus.push(lessons[i]);
							break;
						// Phonics is currently in the curriculum for some classes but will be removed later
						case "Phonics":
							this.g2APhonics.push(lessons[i]);
							break;
						case "Midterm":
							this.g2AMidterm.push(lessons[i]);
							break;
						case "Speaking Test":
							this.g2ASpeakingTest.push(lessons[i]);
							break;
					}
				}
				else if(lessons[i].stage == 4){
					switch(lessons[i].subject){
						case "CLIL":
							this.g2BCLIL.push(lessons[i]);
							break;
						case "Language Focus":
							this.g2BLanguageFocus.push(lessons[i]);
							break;
						// Phonics is currently in the curriculum for some classes but will be removed later
						case "Phonics":
							this.g2BPhonics.push(lessons[i]);
							break;
						case "Project":
							this.g2BProject.push(lessons[i]);
							break;
						case "Midterm":
							this.g2BMidterm.push(lessons[i]);
							break;
						case "Speaking Test":
							this.g2BSpeakingTest.push(lessons[i]);
							break;
					}
				}
				else if(lessons[i].stage == 5){
					switch(lessons[i].subject){
						case "CLIL":
							this.g3ACLIL.push(lessons[i]);
							break;
						case "Language Focus":
							this.g3ALanguageFocus.push(lessons[i]);
							break;
						// Phonics is currently in the curriculum for some classes but will be removed later
						case "Phonics":
							this.g3APhonics.push(lessons[i]);
							break;
						case "Midterm":
							this.g3AMidterm.push(lessons[i]);
							break;
						case "Speaking Test":
							this.g3ASpeakingTest.push(lessons[i]);
							break;
					}
				}
				else if(lessons[i].stage == 6){
					switch(lessons[i].subject){
						case "CLIL":
							this.g3BCLIL.push(lessons[i]);
							break;
						case "Language Focus":
							this.g3BLanguageFocus.push(lessons[i]);
							break;
						// Phonics is currently in the curriculum for some classes but will be removed later
						case "Phonics":
							this.g3BPhonics.push(lessons[i]);
							break;
						case "Project":
							this.g3BProject.push(lessons[i]);
							break;
						case "Midterm":
							this.g3BMidterm.push(lessons[i]);
							break;
						case "Speaking Test":
							this.g3BSpeakingTest.push(lessons[i]);
							break;
					}
				}
			}
			else if(lessons[i].curriculum == "K" && !(lessons[i].curriculum == "K35")){
				if(lessons[i].stage == 1){
					switch(lessons[i].subject){
						case "I Can Explore":
							this.k1AICanExplore.push(lessons[i]);
							break
						case "Showtime":
							this.k1AShowtime.push(lessons[i]);
							break;
					}
				}
				else if(lessons[i].stage == 2){
					switch(lessons[i].subject){
						case "I Can Explore":
							this.k1BICanExplore.push(lessons[i]);
							break
						case "Showtime":
							this.k1BShowtime.push(lessons[i]);
							break;
					}
				}
				else if(lessons[i].stage == 3){
					switch(lessons[i].subject){
						case "I Can Explore":
							this.k2AICanExplore.push(lessons[i]);
							break
						case "Showtime":
							this.k2AShowtime.push(lessons[i]);
							break;
					}
				}
				else if(lessons[i].stage == 4){
					switch(lessons[i].subject){
						case "I Can Explore":
							this.k2BICanExplore.push(lessons[i]);
							break
						case "Showtime":
							this.k2BShowtime.push(lessons[i]);
							break;
					}
				}
				else if(lessons[i].stage == 5){
					switch(lessons[i].subject){
						case "I Can Explore":
							this.k3AICanExplore.push(lessons[i]);
							break
						case "Showtime":
							this.k3AShowtime.push(lessons[i]);
							break;
					}
				}
				else if(lessons[i].stage == 6){
					switch(lessons[i].subject){
						case "I Can Explore":
							this.k3BICanExplore.push(lessons[i]);
							break
						case "Showtime":
							this.k3BShowtime.push(lessons[i]);
							break;
					}
				}
			}
			else if(lessons[i].curriculum == "GK35"){
				if(lessons[i].stage == 1){
					switch(lessons[i].subject){
						case "I Can Say":
							this.gk1ICanSay.push(lessons[i]);
							break;
						case "I Can Talk":
							this.gk1ICanTalk.push(lessons[i]);
							break;
						case "Storytime":
							this.gk1Storytime.push(lessons[i]);
							break;
						case "I Can Explore":
							this.gk1ICanExplore.push(lessons[i]);
							break
						case "I Can Read":
							this.gk1ICanRead.push(lessons[i]);
							break;
						case "Showtime":
							this.gk1Showtime.push(lessons[i]);
							break;
					}
				}
				else if(lessons[i].stage == 2){
					switch(lessons[i].subject){
						case "I Can Say":
							this.gk2ICanSay.push(lessons[i]);
							break;
						case "I Can Talk":
							this.gk2ICanTalk.push(lessons[i]);
							break;
						case "Storytime":
							this.gk2Storytime.push(lessons[i]);
							break;
						case "I Can Explore":
							this.gk2ICanExplore.push(lessons[i]);
							break
						case "I Can Read":
							this.gk2ICanRead.push(lessons[i]);
							break;
						case "Showtime":
							this.gk2Showtime.push(lessons[i]);
							break;
					}
				}
				else if(lessons[i].stage == 3){
					switch(lessons[i].subject){
						case "I Can Say":
							this.gk3ICanSay.push(lessons[i]);
							break;
						case "I Can Talk":
							this.gk3ICanTalk.push(lessons[i]);
							break;
						case "Storytime":
							this.gk3Storytime.push(lessons[i]);
							break;
						case "I Can Explore":
							this.gk3ICanExplore.push(lessons[i]);
							break
						case "I Can Read":
							this.gk3ICanRead.push(lessons[i]);
							break;
						case "Showtime":
							this.gk3Showtime.push(lessons[i]);
							break;
					}
				}
				else if(lessons[i].stage == 4){
					switch(lessons[i].subject){
						case "I Can Say":
							this.gk4ICanSay.push(lessons[i]);
							break;
						case "I Can Talk":
							this.gk4ICanTalk.push(lessons[i]);
							break;
						case "Storytime":
							this.gk4Storytime.push(lessons[i]);
							break;
						case "I Can Explore":
							this.gk4ICanExplore.push(lessons[i]);
							break
						case "I Can Read":
							this.gk4ICanRead.push(lessons[i]);
							break;
						case "Showtime":
							this.gk4Showtime.push(lessons[i]);
							break;
					}
				}
			}
			else if(lessons[i].curriculum == "K35"){
				if(lessons[i].stage == 1){
					switch(lessons[i].subject){
						case "I Can Say":
							this.k1ICanSay.push(lessons[i]);
							break;
						case "I Can Talk":
							this.k1ICanTalk.push(lessons[i]);
							break;
						case "Storytime":
							this.k1Storytime.push(lessons[i]);
							break;
						case "I Can Explore":
							this.k1ICanExplore.push(lessons[i]);
							break
						case "I Can Read":
							this.k1ICanRead.push(lessons[i]);
							break;
						case "Showtime":
							this.k1Showtime.push(lessons[i]);
							break;
					}
				}
				else if(lessons[i].stage == 2){
					switch(lessons[i].subject){
						case "I Can Say":
							this.k2ICanSay.push(lessons[i]);
							break;
						case "I Can Talk":
							this.k2ICanTalk.push(lessons[i]);
							break;
						case "Storytime":
							this.k2Storytime.push(lessons[i]);
							break;
						case "I Can Explore":
							this.k2ICanExplore.push(lessons[i]);
							break
						case "I Can Read":
							this.k2ICanRead.push(lessons[i]);
							break;
						case "Showtime":
							this.k2Showtime.push(lessons[i]);
							break;
					}
				}
				else if(lessons[i].stage == 3){
					switch(lessons[i].subject){
						case "I Can Say":
							this.k3ICanSay.push(lessons[i]);
							break;
						case "I Can Talk":
							this.k3ICanTalk.push(lessons[i]);
							break;
						case "Storytime":
							this.k3Storytime.push(lessons[i]);
							break;
						case "I Can Explore":
							this.k3ICanExplore.push(lessons[i]);
							break
						case "I Can Read":
							this.k3ICanRead.push(lessons[i]);
							break;
						case "Showtime":
							this.k3Showtime.push(lessons[i]);
							break;
					}
				}
				else if(lessons[i].stage == 4){
					switch(lessons[i].subject){
						case "I Can Say":
							this.k4ICanSay.push(lessons[i]);
							break;
						case "I Can Talk":
							this.k4ICanTalk.push(lessons[i]);
							break;
						case "Storytime":
							this.k4Storytime.push(lessons[i]);
							break;
						case "I Can Explore":
							this.k4ICanExplore.push(lessons[i]);
							break
						case "I Can Read":
							this.k4ICanRead.push(lessons[i]);
							break;
						case "Showtime":
							this.k4Showtime.push(lessons[i]);
							break;
					}
				}
			}
			else if(lessons[i].curriculum == "G035"){
				if(lessons[i].stage == 1){
					switch(lessons[i].subject){
						case "Letters & Sounds":
							this.g0351ls.push(lessons[i]);
							break;
						case "Letters & Sounds Review":
							this.g0351lsr.push(lessons[i]);
							break;
						case "Reading & LF":
							this.g0351rlf.push(lessons[i]);
							break;
						case "CLIL":
							this.g0351clil.push(lessons[i]);
							break
						case "Vocab & LF Review & Test":
							this.g0351vlfr.push(lessons[i]);
							break;
						case "Review":
							this.g0351review.push(lessons[i]);
							break;
					}
				}
				else if(lessons[i].stage == 2){
					switch(lessons[i].subject){
						case "Letters & Sounds":
							this.g0352ls.push(lessons[i]);
							break;
						case "Letters & Sounds Review":
							this.g0352lsr.push(lessons[i]);
							break;
						case "Reading & LF":
							this.g0352rlf.push(lessons[i]);
							break;
						case "CLIL":
							this.g0352clil.push(lessons[i]);
							break
						case "Vocab & LF Review & Test":
							this.g0352vlfr.push(lessons[i]);
							break;
						case "Review":
							this.g0352review.push(lessons[i]);
							break;
					}
				}
				else if(lessons[i].stage == 3){
					switch(lessons[i].subject){
						case "Letters & Sounds":
							this.g0353ls.push(lessons[i]);
							break;
						case "Letters & Sounds Review":
							this.g0353lsr.push(lessons[i]);
							break;
						case "Reading & LF":
							this.g0353rlf.push(lessons[i]);
							break;
						case "CLIL":
							this.g0353clil.push(lessons[i]);
							break
						case "Vocab & LF Review & Test":
							this.g0353vlfr.push(lessons[i]);
							break;
						case "Review":
							this.g0353review.push(lessons[i]);
							break;
					}
				}
				else if(lessons[i].stage == 4){
					switch(lessons[i].subject){
						case "Letters & Sounds":
							this.g0354ls.push(lessons[i]);
							break;
						case "Letters & Sounds Review":
							this.g0354lsr.push(lessons[i]);
							break;
						case "Reading & LF":
							this.g0354rlf.push(lessons[i]);
							break;
						case "CLIL":
							this.g0354clil.push(lessons[i]);
							break
						case "Vocab & LF Review & Test":
							this.g0354vlfr.push(lessons[i]);
							break;
						case "Review":
							this.g0354review.push(lessons[i]);
							break;
					}
				}
			}
		}
	}

	orderByLessonNo(lessons: Lesson[]){
		return lessons.sort(function(a,b){
			return a.lessonNo - b.lessonNo;
		});
	}

	// lessons -> selected and will be the displayed list of lessons
	// selectedLS and selectedSubject are to display as a list heading
	// clickedSubject is to change the display of the selected button using an ngClass
	selectSubjectList(lessons: Lesson[], levelStage: string, subject: string, clickedSubject: string){
		this.selected = this.orderByLessonNo(lessons);
		this.selectedSubject = subject;
		this.clickedSubject = clickedSubject;
		this.selectedLS = levelStage;
	}

	resetSubsequentSettings(number: Number){
		if(this.selectedSubject!="Demo"){
			if(number >= 1){
				this.myForm.value.subject = "";
				this.subjectModel = "";
			}
			if(number >= 2){
				this.myForm.value.level = "";
				this.levelModel = "";
				this.myForm.value.stage = "";
				this.stageModel = "";
			}
			this.selected = [];
		}
	}

	resetLevel(){
		this.myForm.value.level = "";
		this.levelModel = "";
	}

	resetStage(){
		this.myForm.value.stage = "";
		this.stageModel = "";
	}

	newSelectSubjectList(){
		this.selectedSubject = this.myForm.value.subject;
		if(this.curriculumIsSS){
			this.selectedLS = this.myForm.value.level;
		}
		else if ((this.myForm.value.curriculum == "K" || this.myForm.value.curriculum == "G") && !(this.myForm.value.curriculum == "GK35" || this.myForm.value.curriculum == "K35")){
			switch(this.myForm.value.stage){
				case "1":
					this.selectedLS = "1A";
					break;
				case "2":
					this.selectedLS = "1B";
					break;
				case "3":
					this.selectedLS = "2A";
					break;
				case "4":
					this.selectedLS = "2B";
					break;
				case "5":
					this.selectedLS = "3A";
					break;
				case "6":
					this.selectedLS = "3B";
					break;
				case "7":
					this.selectedLS = "4A";
					break;
				case "8":
					this.selectedLS = "4B";
					break;
			}
		}
		else {
			this.selectedLS = this.myForm.value.stage;
		}

		switch(this.myForm.value.curriculum){
			case "SS":
				switch(this.myForm.value.level){
					case "SS1":
							switch(this.selectedSubject){
								case "Maths":
									this.selected = this.orderByLessonNo(this.SS1M);
									break;
								case "Science":
									this.selected = this.orderByLessonNo(this.SS1S);
									break;
								case "Life Skills":
									this.selected = this.orderByLessonNo(this.SS1LS);
									break;
								case "Speaking Test":
									this.selected = this.orderByLessonNo(this.SS1ST);
									break;
							}
						break;
					case "SS2":
							switch(this.selectedSubject){
								case "Maths":
									this.selected = this.orderByLessonNo(this.SS2M);
									break;
								case "Science":
									this.selected = this.orderByLessonNo(this.SS2S);
									break;
								case "Life Skills":
									this.selected = this.orderByLessonNo(this.SS2LS);
									break;
								case "Speaking Test":
									this.selected = this.orderByLessonNo(this.SS2ST);
									break;
							}
						break;
					case "SS3":
							switch(this.selectedSubject){
								case "Maths":
									this.selected = this.orderByLessonNo(this.SS3M);
									break;
								case "Science":
									this.selected = this.orderByLessonNo(this.SS3S);
									break;
								case "Life Skills":
									this.selected = this.orderByLessonNo(this.SS3LS);
									break;
								case "Speaking Test":
									this.selected = this.orderByLessonNo(this.SS3ST);
									break;
							}
						break;
					case "SS4":
							switch(this.selectedSubject){
								case "Maths":
									this.selected = this.orderByLessonNo(this.SS4M);
									break;
								case "Science":
									this.selected = this.orderByLessonNo(this.SS4S);
									break;
								case "Life Skills":
									this.selected = this.orderByLessonNo(this.SS4LS);
									break;
								case "Speaking Test":
									this.selected = this.orderByLessonNo(this.SS4ST);
									break;
							}
						break;
				}
				break;
			case "128":
				switch(this.myForm.value.stage){
					case "1":
						switch(this.selectedSubject){
							case "Art":
								this.selected = this.orderByLessonNo(this.s1StArt);
								break;
							case "Music":
								this.selected = this.orderByLessonNo(this.s1StMusic);
								break;
							case "GlobalLeadership":
								this.selected = this.orderByLessonNo(this.s1StGL);
								break;
							case "OpenClass":
								this.selected = this.orderByLessonNo(this.s1StOpenClass);
								break;
						}
						break;
					case "2":
						switch(this.selectedSubject){
							case "Art":
								this.selected = this.orderByLessonNo(this.s2StArt);
								break;
							case "Music":
								this.selected = this.orderByLessonNo(this.s2StMusic);
								break;
							case "GlobalLeadership":
								this.selected = this.orderByLessonNo(this.s2StGL);
								break;
							case "Reading":
								this.selected = this.orderByLessonNo(this.s2StReading);
								break;
							case "OpenClass":
								this.selected = this.orderByLessonNo(this.s2StOpenClass);
								break
						}
						break;
					case "3":
						switch(this.selectedSubject){
							case "GlobalLeadership":
								this.selected = this.orderByLessonNo(this.s3StGL);
								break;
							case "Reading":
								this.selected = this.orderByLessonNo(this.s3StReading);
								break;
							case "WC":
								this.selected = this.orderByLessonNo(this.s3StWC);
								break;
							case "VPE":
								this.selected = this.orderByLessonNo(this.s3StVPE);
								break;
							case "Science":
								this.selected = this.orderByLessonNo(this.s3StScience);
								break;
							case "OpenClass":
								this.selected = this.orderByLessonNo(this.s3StOpenClass);
								break;
						}
						break;
					case "31":
						switch(this.selectedSubject){
							case "GlobalLeadership":
								this.selected = this.orderByLessonNo(this.sE1StGL);
								break;
							case "Reading":
								this.selected = this.orderByLessonNo(this.sE1StReading);
								break;
							case "WC":
								this.selected = this.orderByLessonNo(this.sE1StWC);
								break;
							case "VPE":
								this.selected = this.orderByLessonNo(this.sE1StVPE);
								break;
							case "Science":
								this.selected = this.orderByLessonNo(this.sE1StScience);
								break;
							case "OpenClass":
								this.selected = this.orderByLessonNo(this.sE1StOpenClass);
								break;
						}
						break;
					case "4":
						switch(this.selectedSubject){
							case "GlobalLeadership":
								this.selected = this.orderByLessonNo(this.s4StGL);
								break;
							case "Reading":
								this.selected = this.orderByLessonNo(this.s4StReading);
								break;
							case "WC":
								this.selected = this.orderByLessonNo(this.s4StWC);
								break;
							case "VPE":
								this.selected = this.orderByLessonNo(this.s4StVPE);
								break;
							case "Science":
								this.selected = this.orderByLessonNo(this.s4StScience);
								break;
							case "OpenClass":
								this.selected = this.orderByLessonNo(this.s4StOpenClass);
								break;
							case "OralTest":
								this.selected = this.orderByLessonNo(this.sTest);
								break;
						}
						break;
					case "5":
						switch(this.selectedSubject){
							case "GlobalLeadership":
								this.selected = this.orderByLessonNo(this.s5StGL);
								break;
							case "Reading":
								this.selected = this.orderByLessonNo(this.s5StReading);
								break;
							case "WC":
								this.selected = this.orderByLessonNo(this.s5StWC);
								break;
							case "VPE":
								this.selected = this.orderByLessonNo(this.s5StVPE);
								break;
							case "Science":
								this.selected = this.orderByLessonNo(this.s5StScience);
								break;
							case "OpenClass":
								this.selected = this.orderByLessonNo(this.s5StOpenClass);
								break;
							case "LogicalThinking":
								this.selected = this.orderByLessonNo(this.s5StLT);
								break;
							case "OralTest":
								this.selected = this.orderByLessonNo(this.sTest);
								break;
						}
						break;
					case "6":
						switch(this.selectedSubject){
							case "GlobalLeadership":
								this.selected = this.orderByLessonNo(this.s6StGL);
								break;
							case "Reading":
								this.selected = this.orderByLessonNo(this.s6StReading);
								break;
							case "WC":
								this.selected = this.orderByLessonNo(this.s6StWC);
								break;
							case "VPE":
								this.selected = this.orderByLessonNo(this.s6StVPE);
								break;
							case "Science":
								this.selected = this.orderByLessonNo(this.s6StScience);
								break;
							case "OpenClass":
								this.selected = this.orderByLessonNo(this.s6StOpenClass);
								break;
							case "LogicalThinking":
								this.selected = this.orderByLessonNo(this.s6StLT);
								break;
							case "OralTest":
								this.selected = this.orderByLessonNo(this.sTest);
								break;
						}
						break;
					case "7":
						switch(this.selectedSubject){
							case "GlobalLeadership":
								this.selected = this.orderByLessonNo(this.s7StGL);
								break;
							case "Reading":
								this.selected = this.orderByLessonNo(this.s7StReading);
								break;
							case "WC":
								this.selected = this.orderByLessonNo(this.s7StWC);
								break;
							case "VPE":
								this.selected = this.orderByLessonNo(this.s7StVPE);
								break;
							case "Science":
								this.selected = this.orderByLessonNo(this.s7StScience);
								break;
							case "OpenClass":
								this.selected = this.orderByLessonNo(this.s7StOpenClass);
								break;
							case "LogicalThinking":
								this.selected = this.orderByLessonNo(this.s7StLT);
								break;
							case "OralTest":
								this.selected = this.orderByLessonNo(this.sTest);
								break;
						}
						break;
					case "8":
						switch(this.selectedSubject){
							case "GlobalLeadership":
								this.selected = this.orderByLessonNo(this.s8StGL);
								break;
							case "Reading":
								this.selected = this.orderByLessonNo(this.s8StReading);
								break;
							case "WC":
								this.selected = this.orderByLessonNo(this.s8StWC);
								break;
							case "VPE":
								this.selected = this.orderByLessonNo(this.s8StVPE);
								break;
							case "Science":
								this.selected = this.orderByLessonNo(this.s8StScience);
								break;
							case "OpenClass":
								this.selected = this.orderByLessonNo(this.s8StOpenClass);
								break;
							case "LogicalThinking":
								this.selected = this.orderByLessonNo(this.s8StLT);
								break;
							case "Drama":
								this.selected = this.orderByLessonNo(this.s8StDrama);
								break;
							case "OralTest":
								this.selected = this.orderByLessonNo(this.sTest);
								break;
						}
						break;
					case "9":
						switch(this.selectedSubject){
							case "GlobalLeadership":
								this.selected = this.orderByLessonNo(this.s9StGL);
								break;
							case "Reading":
								this.selected = this.orderByLessonNo(this.s9StReading);
								break;
							case "WC":
								this.selected = this.orderByLessonNo(this.s9StWC);
								break;
							case "VPE":
								this.selected = this.orderByLessonNo(this.s9StVPE);
								break;
							case "Science":
								this.selected = this.orderByLessonNo(this.s9StScience);
								break;
							case "OpenClass":
								this.selected = this.orderByLessonNo(this.s9StOpenClass);
								break;
							case "LogicalThinking":
								this.selected = this.orderByLessonNo(this.s9StLT);
								break;
							case "Drama":
								this.selected = this.orderByLessonNo(this.s9StDrama);
								break;
							case "OralTest":
								this.selected = this.orderByLessonNo(this.sTest);
								break;
						}
						break;
					case "10":
						switch(this.selectedSubject){
							case "GlobalLeadership":
								this.selected = this.orderByLessonNo(this.s10StGL);
								break;
							case "Reading":
								this.selected = this.orderByLessonNo(this.s10StReading);
								break;
							case "WC":
								this.selected = this.orderByLessonNo(this.s10StWC);
								break;
							case "VPE":
								this.selected = this.orderByLessonNo(this.s10StVPE);
								break;
							case "Science":
								this.selected = this.orderByLessonNo(this.s10StScience);
								break;
							case "OpenClass":
								this.selected = this.orderByLessonNo(this.s10StOpenClass);
								break;
							case "LogicalThinking":
								this.selected = this.orderByLessonNo(this.s10StLT);
								break;
							case "Drama":
								this.selected = this.orderByLessonNo(this.s10StDrama);
								break;
							case "OralTest":
								this.selected = this.orderByLessonNo(this.sTest);
								break;
						}
						break;
				}
				break;
			case "G0":
				switch(this.selectedSubject){
					case "CLIL":
						this.selected = this.orderByLessonNo(this.g0CLIL);
						break;
					case "OpenClass":
						this.selected = this.orderByLessonNo(this.g0OpenClass);
						break;
				}
				break;
			case "G":
				switch(this.myForm.value.stage){
					case "1":
						switch(this.selectedSubject){
							case "CLIL":
								this.selected = this.orderByLessonNo(this.g1ACLIL);
								break;
							case "Speaking Test":
								this.selected = this.orderByLessonNo(this.g1ASpeakingTest);
								break;
							case "Midterm":
								this.selected = this.orderByLessonNo(this.g1AMidterm);
								break;
						}
						break;
					case "2":
						switch(this.selectedSubject){
							case "CLIL":
								this.selected = this.orderByLessonNo(this.g1BCLIL);
								break;
							case "Speaking Test":
								this.selected = this.orderByLessonNo(this.g1BSpeakingTest);
								break;
							case "Midterm":
								this.selected = this.orderByLessonNo(this.g1BMidterm);
								break;
						}
						break;
					case "3":
						switch(this.selectedSubject){
							case "CLIL":
								this.selected = this.orderByLessonNo(this.g2ACLIL);
								break;
							case "Langeuage Focus":
								this.selected = this.orderByLessonNo(this.g2ALanguageFocus);
								break;
							case "Speaking Test":
								this.selected = this.orderByLessonNo(this.g2ASpeakingTest);
								break;
							case "Midterm":
								this.selected = this.orderByLessonNo(this.g2AMidterm);
								break;
						}
						break;
					case "4":
						switch(this.selectedSubject){
							case "CLIL":
								this.selected = this.orderByLessonNo(this.g2BCLIL);
								break;
							case "Langeuage Focus":
								this.selected = this.orderByLessonNo(this.g2BLanguageFocus);
								break;
							case "Speaking Test":
								this.selected = this.orderByLessonNo(this.g2BSpeakingTest);
								break;
							case "Midterm":
								this.selected = this.orderByLessonNo(this.g2BMidterm);
								break;
						}
						break;
					case "5":
						switch(this.selectedSubject){
							case "CLIL":
								this.selected = this.orderByLessonNo(this.g3ACLIL);
								break;
							case "Langeuage Focus":
								this.selected = this.orderByLessonNo(this.g3ALanguageFocus);
								break;
							case "Speaking Test":
								this.selected = this.orderByLessonNo(this.g3ASpeakingTest);
								break;
							case "Midterm":
								this.selected = this.orderByLessonNo(this.g3AMidterm);
								break;
						}
						break;
					case "6":
						switch(this.selectedSubject){
							case "CLIL":
								this.selected = this.orderByLessonNo(this.g3BCLIL);
								break;
							case "Langeuage Focus":
								this.selected = this.orderByLessonNo(this.g3BLanguageFocus);
								break;
							case "Speaking Test":
								this.selected = this.orderByLessonNo(this.g3BSpeakingTest);
								break;
							case "Midterm":
								this.selected = this.orderByLessonNo(this.g3BMidterm);
								break;
						}
						break;
				}
				break;
			case "K":
				switch(this.myForm.value.stage){
					case "1":
						switch(this.selectedSubject){
							case "I Can Explore": {
								this.selected = this.orderByLessonNo(this.k1AICanExplore);
								break;
							}
							case "Showtime": {
								this.selected = this.orderByLessonNo(this.k1AShowtime);
								break;
							}
						}
						break;
					case "2":
						switch(this.selectedSubject){
							case "I Can Explore": {
								this.selected = this.orderByLessonNo(this.k1BICanExplore);
								break;
							}
							case "Showtime": {
								this.selected = this.orderByLessonNo(this.k1BShowtime);
								break;
							}
						}
						break;
					case "3":
						switch(this.selectedSubject){
							case "I Can Explore": {
								this.selected = this.orderByLessonNo(this.k2AICanExplore);
								break;
							}
							case "Showtime": {
								this.selected = this.orderByLessonNo(this.k2AShowtime);
								break;
							}
						}
						break;
					case "4":
						switch(this.selectedSubject){
							case "I Can Explore": {
								this.selected = this.orderByLessonNo(this.k2BICanExplore);
								break;
							}
							case "Showtime": {
								this.selected = this.orderByLessonNo(this.k2BShowtime);
								break;
							}
						}
						break;
					case "5":
						switch(this.selectedSubject){
							case "I Can Explore": {
								this.selected = this.orderByLessonNo(this.k3AICanExplore);
								break;
							}
							case "Showtime": {
								this.selected = this.orderByLessonNo(this.k3AShowtime);
								break;
							}
						}
						break;
					case "6":
						switch(this.selectedSubject){
							case "I Can Explore": {
								this.selected = this.orderByLessonNo(this.k3BICanExplore);
								break;
							}
							case "Showtime": {
								this.selected = this.orderByLessonNo(this.k3BShowtime);
								break;
							}
						}
						break;
				}
				break;
			case "K35":
				switch(this.myForm.value.stage){
					case "1":
						switch(this.selectedSubject){
							case "I Can Say": {
								this.selected = this.orderByLessonNo(this.k1ICanSay);
								break;
							}
							case "I Can Talk": {
								this.selected = this.orderByLessonNo(this.k1ICanTalk);
								break;
							}
							case "Storytime": {
								this.selected = this.orderByLessonNo(this.k1Storytime);
								break;
							}
							case "I Can Explore": {
								this.selected = this.orderByLessonNo(this.k1ICanExplore);
								break;
							}
							case "I Can Read": {
								this.selected = this.orderByLessonNo(this.k1ICanRead);
								break;
							}
							case "Showtime": {
								this.selected = this.orderByLessonNo(this.k1Showtime);
								break;
							}
						}
						break;
					case "2":
						switch(this.selectedSubject){
							case "I Can Say": {
								this.selected = this.orderByLessonNo(this.k2ICanSay);
								break;
							}
							case "I Can Talk": {
								this.selected = this.orderByLessonNo(this.k2ICanTalk);
								break;
							}
							case "Storytime": {
								this.selected = this.orderByLessonNo(this.k2Storytime);
								break;
							}
							case "I Can Explore": {
								this.selected = this.orderByLessonNo(this.k2ICanExplore);
								break;
							}
							case "I Can Read": {
								this.selected = this.orderByLessonNo(this.k2ICanRead);
								break;
							}
							case "Showtime": {
								this.selected = this.orderByLessonNo(this.k2Showtime);
								break;
							}
						}
						break;
					case "3":
						switch(this.selectedSubject){
							case "I Can Say": {
								this.selected = this.orderByLessonNo(this.k3ICanSay);
								break;
							}
							case "I Can Talk": {
								this.selected = this.orderByLessonNo(this.k3ICanTalk);
								break;
							}
							case "Storytime": {
								this.selected = this.orderByLessonNo(this.k3Storytime);
								break;
							}
							case "I Can Explore": {
								this.selected = this.orderByLessonNo(this.k3ICanExplore);
								break;
							}
							case "I Can Read": {
								this.selected = this.orderByLessonNo(this.k3ICanRead);
								break;
							}
							case "Showtime": {
								this.selected = this.orderByLessonNo(this.k3Showtime);
								break;
							}
						}
						break;
					case "4":
						switch(this.selectedSubject){
							case "I Can Say": {
								this.selected = this.orderByLessonNo(this.k4ICanSay);
								break;
							}
							case "I Can Talk": {
								this.selected = this.orderByLessonNo(this.k4ICanTalk);
								break;
							}
							case "Storytime": {
								this.selected = this.orderByLessonNo(this.k4Storytime);
								break;
							}
							case "I Can Explore": {
								this.selected = this.orderByLessonNo(this.k4ICanExplore);
								break;
							}
							case "I Can Read": {
								this.selected = this.orderByLessonNo(this.k4ICanRead);
								break;
							}
							case "Showtime": {
								this.selected = this.orderByLessonNo(this.k4Showtime);
								break;
							}
						}
						break;
				}
				break;
			case "GK35":
				switch(this.myForm.value.stage){
					case "1":
						switch(this.selectedSubject){
							case "I Can Say": {
								this.selected = this.orderByLessonNo(this.gk1ICanSay);
								break;
							}
							case "I Can Talk": {
								this.selected = this.orderByLessonNo(this.gk1ICanTalk);
								break;
							}
							case "Storytime": {
								this.selected = this.orderByLessonNo(this.gk1Storytime);
								break;
							}
							case "I Can Explore": {
								this.selected = this.orderByLessonNo(this.gk1ICanExplore);
								break;
							}
							case "I Can Read": {
								this.selected = this.orderByLessonNo(this.gk1ICanRead);
								break;
							}
							case "Showtime": {
								this.selected = this.orderByLessonNo(this.gk1Showtime);
								break;
							}
						}
						break;
					case "2":
						switch(this.selectedSubject){
							case "I Can Say": {
								this.selected = this.orderByLessonNo(this.gk2ICanSay);
								break;
							}
							case "I Can Talk": {
								this.selected = this.orderByLessonNo(this.gk2ICanTalk);
								break;
							}
							case "Storytime": {
								this.selected = this.orderByLessonNo(this.gk2Storytime);
								break;
							}
							case "I Can Explore": {
								this.selected = this.orderByLessonNo(this.gk2ICanExplore);
								break;
							}
							case "I Can Read": {
								this.selected = this.orderByLessonNo(this.gk2ICanRead);
								break;
							}
							case "Showtime": {
								this.selected = this.orderByLessonNo(this.gk2Showtime);
								break;
							}
						}
						break;
					case "3":
						switch(this.selectedSubject){
							case "I Can Say": {
								this.selected = this.orderByLessonNo(this.gk3ICanSay);
								break;
							}
							case "I Can Talk": {
								this.selected = this.orderByLessonNo(this.gk3ICanTalk);
								break;
							}
							case "Storytime": {
								this.selected = this.orderByLessonNo(this.gk3Storytime);
								break;
							}
							case "I Can Explore": {
								this.selected = this.orderByLessonNo(this.gk3ICanExplore);
								break;
							}
							case "I Can Read": {
								this.selected = this.orderByLessonNo(this.gk3ICanRead);
								break;
							}
							case "Showtime": {
								this.selected = this.orderByLessonNo(this.gk3Showtime);
								break;
							}
						}
						break;
					case "4":
						switch(this.selectedSubject){
							case "I Can Say": {
								this.selected = this.orderByLessonNo(this.gk4ICanSay);
								break;
							}
							case "I Can Talk": {
								this.selected = this.orderByLessonNo(this.gk4ICanTalk);
								break;
							}
							case "Storytime": {
								this.selected = this.orderByLessonNo(this.gk4Storytime);
								break;
							}
							case "I Can Explore": {
								this.selected = this.orderByLessonNo(this.gk4ICanExplore);
								break;
							}
							case "I Can Read": {
								this.selected = this.orderByLessonNo(this.gk4ICanRead);
								break;
							}
							case "Showtime": {
								this.selected = this.orderByLessonNo(this.gk4Showtime);
								break;
							}
						}
						break;
				}
				break;
			case "G035":
				switch(this.myForm.value.stage){
					case "1":
						switch(this.selectedSubject){
							case "Letters & Sounds": {
								this.selected = this.orderByLessonNo(this.g0351ls);
								break;
							}
							case "Letters & Sounds Review": {
								this.selected = this.orderByLessonNo(this.g0351lsr);
								break;
							}
							case "Reading & LF": {
								this.selected = this.orderByLessonNo(this.g0351rlf);
								break;
							}
							case "CLIL": {
								this.selected = this.orderByLessonNo(this.g0351clil);
								break;
							}
							case "Vocab & LF Review & Test": {
								this.selected = this.orderByLessonNo(this.g0351vlfr);
								break;
							}
							case "Review": {
								this.selected = this.orderByLessonNo(this.g0351review);
								break;
							}
						}
						break;
					case "2":
						switch(this.selectedSubject){
							case "Letters & Sounds": {
								this.selected = this.orderByLessonNo(this.g0352ls);
								break;
							}
							case "Letters & Sounds Review": {
								this.selected = this.orderByLessonNo(this.g0352lsr);
								break;
							}
							case "Reading & LF": {
								this.selected = this.orderByLessonNo(this.g0352rlf);
								break;
							}
							case "CLIL": {
								this.selected = this.orderByLessonNo(this.g0352clil);
								break;
							}
							case "Vocab & LF Review & Test": {
								this.selected = this.orderByLessonNo(this.g0352vlfr);
								break;
							}
							case "Review": {
								this.selected = this.orderByLessonNo(this.g0352review);
								break;
							}
						}
						break;
					case "3":
						switch(this.selectedSubject){
							case "Letters & Sounds": {
								this.selected = this.orderByLessonNo(this.g0353ls);
								break;
							}
							case "Letters & Sounds Review": {
								this.selected = this.orderByLessonNo(this.g0353lsr);
								break;
							}
							case "Reading & LF": {
								this.selected = this.orderByLessonNo(this.g0353rlf);
								break;
							}
							case "CLIL": {
								this.selected = this.orderByLessonNo(this.g0353clil);
								break;
							}
							case "Vocab & LF Review & Test": {
								this.selected = this.orderByLessonNo(this.g0353vlfr);
								break;
							}
							case "Review": {
								this.selected = this.orderByLessonNo(this.g0353review);
								break;
							}
						}
						break;
					case "4":
						switch(this.selectedSubject){
							case "Letters & Sounds": {
								this.selected = this.orderByLessonNo(this.g0354ls);
								break;
							}
							case "Letters & Sounds Review": {
								this.selected = this.orderByLessonNo(this.g0354lsr);
								break;
							}
							case "Reading & LF": {
								this.selected = this.orderByLessonNo(this.g0354rlf);
								break;
							}
							case "CLIL": {
								this.selected = this.orderByLessonNo(this.g0354clil);
								break;
							}
							case "Vocab & LF Review & Test": {
								this.selected = this.orderByLessonNo(this.g0354vlfr);
								break;
							}
							case "Review": {
								this.selected = this.orderByLessonNo(this.g0354review);
								break;
							}
						}
						break;
				}
				break;
		}
	}

	newSelectDemo(){
		this.selectedSubject = "Demo";
		this.selectedLS = "All";
		this.selected = this.orderByLessonNo(this.demos);
	}

	onResize(event: any) {
	  this.windowWidth = event.target.innerWidth;
	}

	checkCurriculum(){
		if ((<HTMLInputElement>document.getElementById('curriculum')).value == 'Demo') {
			document.getElementById('stage')!.style.display = 'none';
			document.getElementById('level')!.style.display = 'none';
			document.getElementById('subject')!.style.display = 'none';
			this.curriculum = "Demo";
			this.curriculumIsSS = false;
			this.curriculumIsG0 = false;
			this.curriculumIsG = false;
			this.curriculumIsK = false;
			this.is35 = false;
			this.newSelectDemo();
		}
		else if ((<HTMLInputElement>document.getElementById('curriculum')).value == '128') {
			document.getElementById('stage')!.style.display = 'block';
			document.getElementById('level')!.style.display = 'none';
			document.getElementById('subject')!.style.display = 'block';
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
			document.getElementById('subject')!.style.display = 'block';
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
			document.getElementById('subject')!.style.display = 'block';
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
			document.getElementById('subject')!.style.display = 'block';
			this.curriculumIsG0 = false;
			this.curriculumIsG = true;
			this.curriculumIsK = false;
			this.curriculumIsSS = false;
			this.curriculum = "G";
		}

		else if((<HTMLInputElement>document.getElementById('curriculum')).value == 'GK35')
		{
			document.getElementById('stage')!.style.display = 'block';
			document.getElementById('level')!.style.display = 'none';
			document.getElementById('subject')!.style.display = 'block';
			this.curriculumIsG0 = false;
			this.curriculumIsG = false;
			this.curriculumIsK = false;
			this.curriculumIsSS = false;
			this.is35 = true;
			this.curriculum = "GK35";
		}

		else if((<HTMLInputElement>document.getElementById('curriculum')).value == 'K35')
		{
			document.getElementById('stage')!.style.display = 'block';
			document.getElementById('level')!.style.display = 'none';
			document.getElementById('subject')!.style.display = 'block';
			this.curriculumIsG0 = false;
			this.curriculumIsG = false;
			this.curriculumIsK = false;
			this.curriculumIsSS = false;
			this.is35 = true;
			this.curriculum = "K35";
		}

		else if((<HTMLInputElement>document.getElementById('curriculum')).value == 'G0')
		{
			document.getElementById('stage')!.style.display = 'none';
			document.getElementById('level')!.style.display = 'none';
			document.getElementById('subject')!.style.display = 'block';
			this.curriculumIsG0 = true;
			this.curriculumIsG = false;
			this.curriculumIsK = false;
			this.curriculumIsSS = false;
			this.is35 = false;
			this.curriculum = "G0";
		}

		else if((<HTMLInputElement>document.getElementById('curriculum')).value == 'G035')
		{
			document.getElementById('stage')!.style.display = 'block';
			document.getElementById('level')!.style.display = 'none';
			document.getElementById('subject')!.style.display = 'block';
			this.curriculumIsG0 = false;
			this.curriculumIsG = false;
			this.curriculumIsK = false;
			this.curriculumIsSS = false;
			this.is35 = true;
			this.curriculum = "G035";
		}

		else if((<HTMLInputElement>document.getElementById('curriculum')).value == ""){
				document.getElementById('stage')!.style.display = 'block';
				document.getElementById('level')!.style.display = 'none';
				document.getElementById('subject')!.style.display = 'block';
				this.curriculumIsG0 = false;
				this.curriculumIsG = false;
				this.curriculumIsK = false;
				this.curriculumIsSS = false;
				this.is35 = false;
		}
		this.checkSubjects();
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
			this.myForm.value.curriculum == 'G035'){
				this.subjectList = this.subjectsG035;
			}

		else if (
			this.myForm.value.curriculum == 'GK35'){
				this.subjectList = this.subjectsGK35;
			}

		else if (
			this.myForm.value.curriculum == 'K35'){
				this.subjectList = this.subjectsK35;
			}

	}

}
