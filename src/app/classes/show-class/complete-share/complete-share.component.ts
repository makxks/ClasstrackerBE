import { Component, OnInit } from '@angular/core';

import { ClassesService } from '../../classes.service';
import { Class } from '../../classes.model';

@Component({
  selector: 'complete-share',
  templateUrl: './complete-share.component.html',
  styleUrls: ['./complete-share.component.css']
})

export class CompleteShareComponent implements OnInit {
  sharedClass!: Class;
  classCode: string = '';

	display = 'none';

  constructor(private classesService: ClassesService){}

  ngOnInit(){
      this.classesService.shareComplete
        .subscribe(
          (shareClass) => {
            this.sharedClass = shareClass;
            this.classCode = shareClass.classCode;
            this.display = 'block';
          })
  }

  closeWindow() {
		this.display = 'none';
	}
}
