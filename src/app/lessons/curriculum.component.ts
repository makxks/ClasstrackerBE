import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup } from "@angular/forms";

import { AuthService } from '@auth0/auth0-angular';

@Component ({
	selector: 'app-curriculums',
	templateUrl: './curriculum.component.html',
	styleUrls: ['./curriculum.component.css']
})

export class CurriculumComponent implements OnInit {
  myForm!: FormGroup;
  curriculum: string = "";

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService){}

  ngOnInit(): any {
		this.authService.isAuthenticated$.subscribe((response) => {
			if(!response){
				this.router.navigate(['/home']);
			}
		})

		this.myForm = this.fb.group({
				curriculum: ['']
		});
	}

  setCurriculum(){
    if(document.getElementById(this.curriculum)){
      document.getElementById(this.curriculum)!.style.display = 'none';
    }

    this.curriculum = this.myForm.value.curriculum;

    if(document.getElementById(this.myForm.value.curriculum)){
      document.getElementById(this.myForm.value.curriculum)!.style.display = 'block';
    }
  }

  goToLesson(curriculum: string, stageLevel: string, subject: string, lessonNo: number){
    var routeString = '';
    if(curriculum == '128'){
      routeString = 'lessons/show-lesson/128/standardised/' + stageLevel + '/' + subject + '/' + lessonNo;
    }
    else if(curriculum == '192'){
      routeString = 'lessons/show-lesson/192/' + stageLevel + '/' + subject + '/' + lessonNo;
    }
    else if(curriculum == 'SS'){
      routeString = 'lessons/show-lesson/SS/' + stageLevel + '/' + subject + '/' + lessonNo;
    }
    this.router.navigate([routeString]);
  }
}
