import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Kid } from './kid.model';
import { KidService } from './kid.service';
import { AuthService } from '@auth0/auth0-angular';

@Component ({
	selector: 'classes-kid',
	templateUrl: './kid.component.html',
	styleUrls: ['./kid.component.css']
})

export class KidComponent implements OnInit {
  kidName: string;
  classCode: string;
	kid!: Kid;
	loaded: boolean = false;

  constructor(route: ActivatedRoute, public kidService: KidService, public authService: AuthService, private router: Router) {
    this.kidName = route.snapshot.params['name'];
    this.classCode = route.snapshot.params['id'];
  }

	ngOnInit() {
		this.authService.isAuthenticated$.subscribe((response) => {
			if(!response){
				this.router.navigate(['/home']);
			}
		})
		this.kidService.getKid(this.classCode, this.kidName)
			.subscribe(
				(kid: Kid) => {
					this.kid = kid;
					this.loaded = true;
				}
			)
	}
}
