import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

import { ClassesService } from '../../classes.service';

@Component({
	selector: 'add-comments',
	templateUrl: './add-comments.component.html',
	styleUrls: ['./add-comments.component.css']
})

export class AddCommentsComponent implements OnInit {
	display = 'none';
  classCode: string = "";
  adding: boolean = false;
  myForm!: FormGroup;

	constructor(private classesService: ClassesService, private fb: FormBuilder){}

	closeWindow() {
		this.display = 'none';
	}

	ngOnInit() {
    this.myForm = this.fb.group({
        comments: ['', Validators.required]
    });

    this.classesService.startAddComments.
			subscribe(
				(classCode: string) => {
          this.display = "block";
          this.classCode = classCode;
				}
			)
    this.classesService.addCommentsComplete.
      subscribe(
        (classCode: string) => {
          if(classCode == this.classCode){
            this.closeWindow();
            this.adding = false;
            this.classCode = "";
          }
        }
      )
	}

  submitComments(){
    this.adding = true;
		console.log(this.myForm.value.comments);
    this.classesService.addComments(this.classCode, this.myForm.value.comments)
      .subscribe(
        (comments: string) => {
          console.log("Added comments: " + comments);
        }
      );
  }
}
