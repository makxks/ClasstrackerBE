import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ClassesService } from '../classes.service';
import { Class } from '../classes.model';

@Component ({
	selector: 'classes-delete',
	templateUrl: './delete-class.component.html',
	styleUrls: ['./delete-class.component.css']
})

export class DeleteClassComponent implements OnInit {
	classCode: string;
	classDetails!: Class;
  display = 'none';

  constructor(private classesService: ClassesService,private route: ActivatedRoute) {
		this.classCode = route.snapshot.params['id'];
  }

  onDeleteCancelled() {
		this.display = 'none';
	};

  onDeleteAccepted(classDetails: Class) {
    this.classesService.deleteClass(classDetails)
      .subscribe(
        (result: any) => {
					console.log(result)
				});
		this.display = 'none';
	};

	ngOnInit(){
    this.classesService.deleteOccurred
      .subscribe(
				(classDetails: Class) => {
					this.classDetails = classDetails;
					this.display = 'block';
				}
			)
	};
}
