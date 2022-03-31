import { Component, Input } from '@angular/core';

import { ClassesService } from './classes.service';
import { Class } from './classes.model';

@Component ({
	selector: 'app-class-list-item',
	templateUrl: './class-list-item.component.html',
	styleUrls: ['./class-list-item.component.css']
})

export class ClassListItemComponent {
  @Input() userClass!: Class;

	constructor(private classesService: ClassesService){}

}
