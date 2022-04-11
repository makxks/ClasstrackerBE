import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AuthService } from '@auth0/auth0-angular';
import { ClassesService } from "../classes.service";
import { Class } from "../classes.model";
import { Router } from '@angular/router';

@Component ({
	selector: 'add-class',
	templateUrl: './add-class.component.html',
	styleUrls: ['./add-class.component.css']
})

export class AddClassComponent implements OnInit {
	myForm!: FormGroup;
  	error = false;
  	errorMessage = '';
	stage = '';
	curriculumIsSS: boolean = false;
	curriculumIsG0: boolean = false;
	curriculumIsG: boolean = false;
	curriculumIsK: boolean = false;
	is35: boolean = false;
	hasThreeSessions: boolean = false;
	adding: boolean = false;
	username: string = "";

	constructor(public classesService: ClassesService, public authService: AuthService, private router: Router) {
	}

	onSubmit(){
		this.adding = true;
		this.stage = this.myForm.value.stage;
		if(!this.stage || this.stage == null){
			this.stage = '0';
		}

		var session3day;
		var session3hour;
		var session3minute;
		var session4hour;
		var session4minute;

		//due to differences in the way the curriculums work there is a need to set the values of session 3 and 4 to 0 so they can be submitted
		//these values are needed as the models are set up to need 4 session times (all old curriculum classes have 4 sessions)
		//these values are never used or seen by users
		//perhaps it would be cleaner to set up a new model and new routes to hold these newer classes
		//these curriculums only have 2 sessions a week not 4
		if(this.curriculumIsG0 || this.curriculumIsK || (this.curriculumIsG && !this.hasThreeSessions)){
			session3day = 0;
			session3hour = 0;
			session3minute = 0;
			session4hour = 0;
			session4minute = 0;
		}
		//G curriculum has 3 sessions a week
		else if(this.curriculumIsG && this.hasThreeSessions){
			session3day = this.myForm.value.day1;
			session3hour = this.myForm.value.hour21;
			session3minute = this.myForm.value.minute21;
			session4hour = 0;
			session4minute = 0;
		}
		else{
			session3day = this.myForm.value.day2;
			session3hour = this.myForm.value.hour21;
			session3minute = this.myForm.value.minute21;
			session4hour = this.myForm.value.hour22;
			session4minute = this.myForm.value.minute22;
		}

		const userClass = new Class(
			this.myForm.value.classCode,
			this.myForm.value.curriculum,
			this.stage,
			this.myForm.value.level,
			this.myForm.value.day1,
			this.myForm.value.hour11,
			this.myForm.value.minute11,
			this.myForm.value.hour12,
			this.myForm.value.minute12,
			this.myForm.value.length1,
			session3day,
			session3hour,
			session3minute,
			session4hour,
			session4minute,
			this.myForm.value.length1,
			this.myForm.value.ct,
			this.username
		);
		this.classesService.addClass(userClass)
			.subscribe({
				next: (data) => console.log(data),
				error: (error) => console.error(error)
			});
		this.myForm.reset();
	}

	checkCurriculum(){
		//check for new curriculum
		//display only relevant options in form based on selections already made
		if ((<HTMLInputElement>document.getElementById('curriculum')).value == '128') {
			document.getElementById('stage')!.style.display = 'block';
      		document.getElementById('level')!.style.display = 'none';
			document.getElementById('times2')!.style.display = 'block';
			document.getElementById('hour21')!.style.display = 'block';
			document.getElementById('minute21')!.style.display = 'block';
			document.getElementById('hour22')!.style.display = 'block';
			document.getElementById('minute22')!.style.display = 'block';
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
			document.getElementById('times2')!.style.display = 'block';
			document.getElementById('hour21')!.style.display = 'block';
			document.getElementById('minute21')!.style.display = 'block';
			document.getElementById('hour22')!.style.display = 'block';
			document.getElementById('minute22')!.style.display = 'block';
			this.curriculumIsSS = true;
			this.curriculumIsG0 = false;
			this.curriculumIsG = false;
			this.curriculumIsK = false;
			this.is35 = false;
    }

		else if((<HTMLInputElement>document.getElementById('curriculum')).value == 'K')
		{
			document.getElementById('stage')!.style.display = 'block';
      		document.getElementById('level')!.style.display = 'none';
			document.getElementById('times2')!.style.display = 'none';
			document.getElementById('hour21')!.style.display = 'none';
			document.getElementById('minute21')!.style.display = 'none';
			document.getElementById('hour22')!.style.display = 'none';
			document.getElementById('minute22')!.style.display = 'none';
			this.curriculumIsG0 = false;
			this.curriculumIsG = false;
			this.curriculumIsK = true;
			this.curriculumIsSS = false;
			this.is35 = false;
		}

		else if((<HTMLInputElement>document.getElementById('curriculum')).value == 'G')
		{
			document.getElementById('stage')!.style.display = 'block';
      		document.getElementById('level')!.style.display = 'none';
			document.getElementById('times2')!.style.display = 'none';
			document.getElementById('hour21')!.style.display = 'none';
			document.getElementById('minute21')!.style.display = 'none';
			document.getElementById('hour22')!.style.display = 'none';
			document.getElementById('minute22')!.style.display = 'none';
			this.curriculumIsG0 = false;
			this.curriculumIsG = true;
			this.curriculumIsK = false;
			this.curriculumIsSS = false;
			this.is35 = false;

			if(this.hasThreeSessions){
				document.getElementById('hour21')!.style.display = 'block';
				document.getElementById('minute21')!.style.display = 'block';
			}
		}

		else if((<HTMLInputElement>document.getElementById('curriculum')).value == 'G0')
		{
			document.getElementById('stage')!.style.display = 'none';
      		document.getElementById('level')!.style.display = 'none';
			document.getElementById('times2')!.style.display = 'none';
			document.getElementById('hour21')!.style.display = 'none';
			document.getElementById('minute21')!.style.display = 'none';
			document.getElementById('hour22')!.style.display = 'none';
			document.getElementById('minute22')!.style.display = 'none';
			this.curriculumIsG0 = true;
			this.curriculumIsG = false;
			this.curriculumIsK = false;
			this.curriculumIsSS = false;
			this.is35 = false;
		}

		else if((<HTMLInputElement>document.getElementById('curriculum')).value == 'GK35' || (<HTMLInputElement>document.getElementById('curriculum')).value == 'K35' || (<HTMLInputElement>document.getElementById('curriculum')).value == 'G035')
		{
			document.getElementById('stage')!.style.display = 'block';
      		document.getElementById('level')!.style.display = 'none';
			document.getElementById('times2')!.style.display = 'none';
			document.getElementById('hour21')!.style.display = 'none';
			document.getElementById('minute21')!.style.display = 'none';
			document.getElementById('hour22')!.style.display = 'none';
			document.getElementById('minute22')!.style.display = 'none';
			this.curriculumIsG0 = false;
			this.curriculumIsG = false;
			this.curriculumIsK = false;
			this.curriculumIsSS = false;
			this.is35 = true;
		}
	}

	ngOnInit(): any {
		this.authService.isAuthenticated$.subscribe((response) => {
			if(!response){
				this.router.navigate(['/home']);
			}
		})
		//day 2 hour21 minute21 hour22 minute22 no longer required due to change to new curriculum classes that may not have these times
		this.myForm = new FormGroup({
			'classCode': new FormControl('', [
				Validators.required,
				this.isValidClassCode
			]),
			'curriculum': new FormControl(null, Validators.required),
			'stage': new FormControl(null),
			'level': new FormControl(null),
			'day1': new FormControl(null, Validators.required),
			'hour11': new FormControl(null, Validators.required),
			'minute11': new FormControl(null, Validators.required),
			'hour12': new FormControl(null, Validators.required),
			'minute12': new FormControl(null, Validators.required),
			'length1': new FormControl(null, Validators.required),
			'day2': new FormControl(null),
			'hour21': new FormControl(null),
			'minute21': new FormControl(null),
			'hour22': new FormControl(null),
			'minute22': new FormControl(null),
			'ct': new FormControl('', Validators.required)
		})
		this.adding = false;
		this.setFormValidators();

		this.authService.user$.subscribe((response) => 
			this.username = response?.name!)
	}

	checkSessions(classHas3Sessions: boolean){
		if(classHas3Sessions){
			this.hasThreeSessions = true;
		}
		else {
			this.hasThreeSessions = false;
		}
		this.checkCurriculum();
		this.setOffsetStyles();
	}

	setOffsetStyles(){
		let styles = {
			'margin-left': '25%'
		};
		if(this.hasThreeSessions){
			styles = {
				'margin-left': '25%'
			}
		}
		else if(!this.hasThreeSessions){
			styles = {
				'margin-left': '0'
			}
		}
		return styles;
	}

	setFormValidators(){
		const stage = this.myForm.get('stage')!;
		const level = this.myForm.get('level')!;
		this.myForm.get('curriculum')!.valueChanges
			.subscribe(curriculum => {
					if(curriculum == "SS"){
						level.setValidators([Validators.required]);
						stage.setValidators(null);
					}
					else{
						level.setValidators(null);
						if(curriculum == "G0")
						{
							stage.setValidators(null);
						}
						else
						{
							stage.setValidators([Validators.required]);
						}
					}

					stage.updateValueAndValidity();
					level.updateValueAndValidity();
			})

	}

	isValidClassCode(control: FormControl): {[s: string]: boolean} | null {
			if (control.value && !control.value.match(/.*[A-Z]{3,7}.*[0-9]{6}[^/]?/) && !control.value.match(/.*[0-9]{6}.*[A-Z]{3,7}[^/]?/)) {
					return {notValid: true};
			}
			return null;
	}
}
