import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@auth0/auth0-angular';
import { ClassesService } from './classes.service';
import { Class } from './classes.model';

@Component ({
	selector: 'app-classes',
	templateUrl: './classes.component.html',
	styleUrls: ['./classes.component.css']
})

export class ClassesComponent implements OnInit {
	userClasses: Class[] = [];
	loaded: boolean = false;
	addedClasses: Class[] = [];

	constructor(public classesService: ClassesService, public authService: AuthService, private router: Router){}

	ngOnInit() {
		this.authService.isAuthenticated$.subscribe((response) => {
			if(!response){
				this.router.navigate(['/home']);
			}
		})
		if(!this.classesService.loadedClasses || this.classesService.changed){
			this.loaded = false;
			this.classesService.getClasses()
				.subscribe(
					(userClasses: Class[]) => {
						this.userClasses = userClasses;
						this.loaded = true;

						this.userClasses.forEach(userClass => {
							if(userClass.addedByOther){
								this.addedClasses.push(userClass);
							};
						});

						if(this.addedClasses.length > 0){
							this.classesService.receivedSharedClass(this.addedClasses);
						}
					}
				);
		}
		else{
			this.userClasses = this.classesService.classes;
			this.loaded = true;
		}
	};
};
