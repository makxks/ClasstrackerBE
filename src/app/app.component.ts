import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from './auth/user.service';

@Component ({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
	constructor(public authService: AuthService, private userService: UserService) {}

	ngOnInit(): void {
		this.authService.user$.subscribe((user: any) => {
			console.log("should create a user");
			this.userService.createUser(user.name);
		})
	}
}
