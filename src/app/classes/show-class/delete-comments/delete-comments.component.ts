import { Component, OnInit } from '@angular/core';

import { ClassesService } from '../../classes.service';
import { Class } from "../../classes.model";

@Component({
	selector: 'delete-comments',
	templateUrl: './delete-comments.component.html',
	styleUrls: ['./delete-comments.component.css']
})

export class DeleteCommentsComponent implements OnInit {
	display = 'none';
  classCode: string = "";
  deleting: boolean = false;

	constructor(private classesService: ClassesService){}

	closeWindow() {
		this.display = 'none';
	}

	ngOnInit() {
    this.classesService.startDeleteComments.
			subscribe(
				(classCode: string) => {
          this.display = 'block';
          this.classCode = classCode;
				}
			)
    this.classesService.completeDeleteComments.
      subscribe(
        (classCode: string) => {
          if(classCode == this.classCode){
            this.closeWindow();
            this.classCode = "";
            this.deleting = false;
          }
        }
      )
	}

  deleteComments() {
    this.deleting = true;
    this.classesService.deleteComments(this.classCode)
      .subscribe(
        (object) => {
          console.log(object);
        }
      );
  }
}
