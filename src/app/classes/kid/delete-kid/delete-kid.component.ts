import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { KidService } from '../kid.service';
import { Kid } from '../kid.model';

@Component ({
	selector: 'kid-delete',
	templateUrl: './delete-kid.component.html',
	styleUrls: ['./delete-kid.component.css']
})

export class DeleteKidComponent implements OnInit {
  kid!: Kid;
	classCode: string;
  display = 'none';

  constructor(private kidService: KidService,private route: ActivatedRoute) {
		this.classCode = route.snapshot.params['id'];
  }

  onDeleteCancelled() {
		this.display = 'none';
	}

  onDeleteAccepted(kid: Kid) {
    this.kidService.deleteKid(this.classCode, this.kid.kidsName, this.kid)
      .subscribe(
        (result) => {
					console.log(result)
				});
	}

	ngOnInit(){
    this.kidService.deleteOccurred
      .subscribe(
				(kid: Kid) => {
					this.kid = kid;
					this.display = 'block';
				}
			)
	}
}
