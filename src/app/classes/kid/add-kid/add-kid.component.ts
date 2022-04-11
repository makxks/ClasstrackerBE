import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '@auth0/auth0-angular';
import { KidService } from '../kid.service';
import { Kid } from '../kid.model';

@Component ({
	selector: 'add-kid',
	templateUrl: './add-kid.component.html',
	styleUrls: ['./add-kid.component.css']
})

export class AddKidComponent implements OnInit {
	myForm!: FormGroup;
  	error = false;
  	errorMessage = '';
	classCode: string = '';
	adding: boolean = false;
	username: string = "";

	constructor(public route: ActivatedRoute, public kidService: KidService, public authService: AuthService, private router: Router) {
		this.classCode = route.snapshot.params['id'];
	}

	ngOnInit(): any {
		this.authService.isAuthenticated$.subscribe((response) => {
			if(!response){
				this.router.navigate(['/home']);
			}
		})
		this.adding = false;
		this.myForm = new FormGroup({
				'kidsName': new FormControl('', Validators.required),
				'age': new FormControl(''),
				'strengths': new FormControl(''),
				'weaknesses': new FormControl(''),
				'comments': new FormControl('')
		});
		this.authService.user$.subscribe((response) => {
			this.username = response?.name!;
		})
	}

	onSubmit(){
		this.adding = true;
		const kid = new Kid(
			this.myForm.value.kidsName,
			this.myForm.value.age,
			this.myForm.value.strengths,
			this.myForm.value.weaknesses,
			this.myForm.value.comments,
			this.username,
			this.classCode
		);
		this.kidService.addKid(kid)
			.subscribe({
				next: (data) => console.log(data),
				error: (error) => console.error(error)
			});
		this.myForm.reset();
	}
}
