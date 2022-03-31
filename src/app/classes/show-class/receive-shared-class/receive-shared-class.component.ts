import { Component, OnInit } from '@angular/core';

import { ClassesService } from '../../classes.service';
import { Class } from "../../classes.model";

@Component({
	selector: 'receive-class',
	templateUrl: './receive-shared-class.component.html',
	styleUrls: ['./receive-shared-class.component.css']
})

export class ReceiveSharedClassComponent implements OnInit {
  shareTo!: String;
	receivedClasses!: Class[];
	display = 'none';

	constructor(private classesService: ClassesService){}

	closeWindow() {
		this.display = 'none';
	}

	ngOnInit() {
    this.classesService.hasSharedClass.
			subscribe(
				(sharedClasses: Class[]) => {
					this.receivedClasses = sharedClasses;
					this.display = 'block';
				}
			)
	}
}
