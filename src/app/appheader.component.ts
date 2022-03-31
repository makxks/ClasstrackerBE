import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

import { AuthService } from '@auth0/auth0-angular';
import { Observable, Subscription } from 'rxjs';
import { UserService } from './auth/user.service';

@Component ({
	selector: 'app-header',
	templateUrl: './appheader.component.html',
	styleUrls: ['./appheader.component.css']
})

export class AppHeaderComponent implements OnInit {
	loggedIn: boolean = false;
	constructor(@Inject(DOCUMENT) public document: Document, public authService: AuthService){}


	ngOnInit(): void {
		this.authService.isAuthenticated$.subscribe((response: any) => {
			console.log(response);
			this.loggedIn = response;
		})
	}
}
