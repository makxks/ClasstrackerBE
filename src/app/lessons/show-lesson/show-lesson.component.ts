import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Lesson } from "../lessons.model";
import { AuthService } from '@auth0/auth0-angular';
import { LessonService } from '../lessons.service';

@Component ({
	selector: 'lesson-show',
	templateUrl: './show-lesson.component.html',
	styleUrls: ['./show-lesson.component.css']
})

export class ShowLessonComponent implements OnInit, DoCheck{
	lesson!: Lesson;

	curriculum: string = "";
	stage: number = 0;
	stageString: string = "";
	level: string = "";
	subject: string = "";
	lessonNo: number = 0;
	loaded: boolean = false;
	firstLoad: boolean = true;
	exists: boolean = true;
	newCurriculumStageString: string = "";

	constructor(private route: ActivatedRoute, public authService: AuthService, public lessonService: LessonService, private router: Router){
	}

	ngOnInit(){
		this.authService.isAuthenticated$.subscribe((response) => {
			if(!response){
				this.router.navigate(['/home']);
			}
		})

		this.route.params.subscribe( params => {
			if(this.lessonNo != params['lessonNo']){
				this.loaded = false;
			}

      this.curriculum = params['curriculum'];
  		this.stage = params['stage'];
  		this.level = params['level'];
  		this.subject = params['subject'];
  		this.lessonNo = params['lessonNo'];
			this.lessonService.getLesson(this.curriculum, this.stage, this.level, this.subject, this.lessonNo)
			.subscribe(
				(lesson: any) => {
					if(lesson!=null){
						this.lesson = lesson;
						this.loaded = true;

						this.stageString = this.createStageString(lesson);

						this.newCurriculumStageString = this.createNewStageString(lesson);
						this.resetComponentWithExist(lesson);
					}
					this.firstLoad = false;
				}
			);

    });
	}

	ngDoCheck(){
		if(!this.firstLoad){
			if(this.lesson != null){
				this.exists = true;
			}
			else if(this.lesson == null){
				this.exists = false;
			}


			if(this.exists && (this.lesson.lessonNo != this.route.snapshot.params['lessonNo'])){
				this.loaded = false;
			}
			else {
				this.loaded = true;
			}
		}
	}

	resetComponentWithExist(lesson: Lesson){
		if(lesson == null){
			this.exists = false;
		}
		else {
			this.exists = true;
		}
	}

	onDelete(lesson: Lesson){
		this.lessonService.handleDelete(lesson)
	}

	createStageString(lesson: Lesson){
		var string = "";
		if(lesson.curriculum == "128"){
			if(lesson.stage==31){
				string = "S-E1"
			}
			else{
				string = String(this.stage);
			}
		}
		return string;
	}

	createNewStageString(lesson: Lesson){
		var string = "";
		if(lesson.curriculum == "G" || lesson.curriculum == "K"){
			switch(lesson.stage){
				case 1:
					string = "1A";
					break;
				case 2:
					string = "1B";
					break;
				case 3:
					string = "2A";
					break;
				case 4:
					string = "2B";
					break;
				case 5:
					string = "3A";
					break;
				case 6:
					string = "3B";
					break;
				case 7:
					string = "4A";
					break;
				case 8:
					string = "4B";
					break;
			}
		}
		return string;
	}

}
