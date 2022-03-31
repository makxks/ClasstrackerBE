import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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

	constructor(private fb: FormBuilder, public route: ActivatedRoute, public kidService: KidService, public authService: AuthService, private router: Router) {
		this.classCode = route.snapshot.params['id'];
	}

	ngOnInit(): any {
		this.authService.isAuthenticated$.subscribe((response) => {
			if(!response){
				this.router.navigate(['/home']);
			}
		})
		this.adding = false;
		this.myForm = this.fb.group({
				kidsName: ['', Validators.required],
				age: [''],
				strengths: [''],
				weaknesses: [''],
				comments: ['']
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
			.subscribe(
				data => console.log(data),
				error => console.error(error)
			);
		this.myForm.reset();
	}
}
