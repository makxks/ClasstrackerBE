import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '@auth0/auth0-angular';
import { KidService } from '../kid.service';
import { Kid } from '../kid.model';

@Component ({
	selector: 'edit-kid',
	templateUrl: './edit-kid.component.html',
	styleUrls: ['./edit-kid.component.css']
})

export class EditKidComponent {
	kid!: Kid;

	myForm!: FormGroup;
  	error = false;
  	errorMessage = '';
	classCode: string;
	kidsName: string;
	editing: boolean = false;
	username: string = "";

	constructor(private fb: FormBuilder, route: ActivatedRoute, public authService: AuthService, public kidService: KidService, private router: Router) {
		this.classCode = route.snapshot.params['id'];
		this.kidsName = route.snapshot.params['name'];
	}

	ngOnInit(): any {
		this.authService.isAuthenticated$.subscribe((response) => {
			if(!response){
				this.router.navigate(['/home']);
			}
		})
		this.editing = false;
		this.kidService.getKid(this.classCode, this.kidsName)
			.subscribe(
				(kid: Kid) => {
					this.kid = kid;
				}
			);

		this.myForm = this.fb.group({
				name: ['', Validators.required],
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
		this.editing = true;
		const kid = new Kid(
			this.myForm.value.name,
			this.myForm.value.age,
			this.myForm.value.strengths,
			this.myForm.value.weaknesses,
			this.myForm.value.comments,
			this.username,
			this.classCode
		);
		this.kidService.editKid(this.classCode, this.kidsName, kid)
			.subscribe({
				next: (data) => {
					console.log(data);
					this.router.navigate(['/classes/show-class/' + this.classCode + "/kids/" + data.kidsName ]);
				},
				error: (error) => console.error(error)
			})
	}
}
