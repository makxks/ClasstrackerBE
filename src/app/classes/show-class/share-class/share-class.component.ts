import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

import { AuthService } from '@auth0/auth0-angular';

import { ClassesService } from '../../classes.service';
import { Class } from '../../classes.model';
import { WeeklyLesson } from '../weekly-lesson.model';
import { Kid } from '../../kid/kid.model';

@Component({
	selector: 'share-class',
	templateUrl: './share-class.component.html',
	styleUrls: ['./share-class.component.css']
})

export class ShareClassComponent implements OnInit {
  myForm!: FormGroup;
  shareTo!: String;
	classToShare!: Class;
	display = 'none';
	shareClassCode: String = "";
	weeklyLessons: WeeklyLesson[] = [];
	kids: Kid[] = [];
	username: string = "";

	constructor(private classesService: ClassesService, private authService: AuthService, private fb: FormBuilder){}

	closeWindow() {
		this.display = 'none';
	}

	ngOnInit() {
		this.myForm = this.fb.group({
			shareTo: ['', Validators.compose(
						[Validators.required,
						this.checkSelfEmail.bind(this)]
					)]
		});

		this.classesService.shareStarted.
			subscribe(
				(sharedClass: Class) => {
					this.classToShare = sharedClass;
					this.shareClassCode = sharedClass.classCode;
					this.kids = sharedClass.kids!;
					this.weeklyLessons = sharedClass.weeklyLessons!;
					this.display = 'block';
				}
			)

		this.authService.user$.subscribe((response) => {
			this.username = response?.name!;
		})
	}

  onSubmit(){
    this.classesService.shareClassToAnotherTeacher(this.classToShare.classCode, this.myForm.value.shareTo, this.classToShare, this.weeklyLessons, this.kids);
		this.display = 'none';
    this.myForm.reset();
  }

	checkSelfEmail(control: FormControl): {[s: string]: boolean}{
		if (!this.myForm) {
				return {shareToSelf: true};

		}
		if (control.value == this.username) {
				return {shareToSelf: true};
		}
		return {};
	}
}
