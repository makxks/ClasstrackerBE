import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '@auth0/auth0-angular';
import { Lesson } from '../lessons.model';
import { LessonService } from '../lessons.service';

@Component ({
	selector: 'lesson-edit',
	templateUrl: './edit-lesson.component.html',
	styleUrls: ['./edit-lesson.component.css']
})

export class EditLessonComponent implements OnInit {
	myForm!: FormGroup;
  	error = false;
  	errorMessage = '';

	lesson!: Lesson;

	curriculum: string = "";
	stage: number = 0;
	level: string = "";
	subject: string = "";
	lessonNo: number = 0;
	editing: boolean = false;

	lessonCode: string = "";

	constructor(private fb: FormBuilder, route: ActivatedRoute, private router: Router, public authService: AuthService, public lessonService: LessonService) {
		this.curriculum = route.snapshot.params['curriculum'];
		this.stage = route.snapshot.params['stage'];
		this.level = route.snapshot.params['level'];
		this.subject = route.snapshot.params['subject'];
		this.lessonNo = route.snapshot.params['lessonNo'];
	}

	ngOnInit(): any {
		this.authService.isAuthenticated$.subscribe((response) => {
			if(!response){
				this.router.navigate(['/home']);
			}
		})
		
		this.editing = false;
		this.lessonService.getLesson(this.curriculum, this.stage, this.level, this.subject, this.lessonNo)
			.subscribe(
				(lesson: any) => {
					this.lesson = lesson;
				}
			);
		// a simpler form as some of the details (lesson name, number curriculum etc) are not allowed to be changed here
		// form uses ngModels to display the data that already exists for the lesson being edited
		this.myForm = this.fb.group({
				keyWords: ['', Validators.required],
				keySentences: ['', Validators.required],
				objectives: ['', Validators.required],
				supplies: ['', Validators.required],
				activities: ['', Validators.required]
		});

		if(this.level != ""){
			this.lessonCode = this.curriculum + "/" + this.level + "/" + this.subject + "/" + this.lessonNo;
		} else {
			this.lessonCode = this.curriculum + "/standardised/" + this.stage + "/" + this.subject + "/" + this.lessonNo;
		}

	}

	onSubmit(){
		this.editing = true;
		const lesson = new Lesson(
			this.lesson.curriculum,
			this.lesson.stage,
			this.lesson.level,
			this.lesson.subject,
			this.lesson.lessonNo,
			this.lesson.lessonTitle,
			this.myForm.value.keyWords,
			this.myForm.value.keySentences,
			this.myForm.value.objectives,
			this.myForm.value.supplies,
			this.myForm.value.activities
		);
		this.lessonService.editLesson(this.lesson.curriculum, this.lesson.stage, this.lesson.level, this.lesson.subject, this.lesson.lessonNo, lesson)
			.subscribe({
				next: (data) => {
					console.log(data);
					if(this.level){
						this.router.navigate(['/lessons/show-lesson/' + this.curriculum + "/" + this.level + "/" + this.subject + "/" + this.lessonNo ]);
					}
					else if(this.stage){
						this.router.navigate(['/lessons/show-lesson/' + this.curriculum + "/standardised/" + this.stage + "/" + this.subject + "/" + this.lessonNo ]);
					}

				},
				error: (error) => console.error(error)
			});
	}
}
