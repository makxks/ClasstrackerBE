import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Kid } from '../kid/kid.model';
import { KidService } from '../kid/kid.service';

@Component ({
	selector: 'app-kid-list-item',
	templateUrl: './kid-list-item.component.html',
	styleUrls: ['./kid-list-item.component.css']
})

export class KidsListItemComponent implements OnInit {
  @Input() kid!: Kid;
	classCode: string = "";
	request: any = null;

	constructor(private kidService: KidService, private route: ActivatedRoute){
		this.classCode = route.snapshot.params['id'];
	}

	ngOnInit(){
	}

	onDelete(kid: Kid){
		this.kidService.handleDelete(kid)
	}

}
