import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component ({
  selector: 'lesson-header',
  templateUrl: './lesson-header.component.html',
  styleUrls: ['./lesson-header.component.css']
})

export class LessonHeaderComponent implements OnInit {
  loadChange = new EventEmitter<boolean>();

  lessonBaseRoute: string = '';
  curriculum: string = "";
  stage: string = "";
  level: string = "";
  subject: string = "";
  lessonNo: number = 0;
  nextLessonNo: number = 0;

  maxLessons: number = 0;

  indexModify: number = 0;

  maxLessonsByC: { [key:string]: { [key:string]: { [key:string]: number } }  } = {
    'SS': {
      'SS1': {'Life Skills': 22, 'Maths': 24, 'Science': 48, 'Speaking Test': 2},
      'SS2': {'Life Skills': 22, 'Maths': 24, 'Science': 48, 'Speaking Test': 2},
      'SS3': {'Life Skills': 22, 'Maths': 24, 'Science': 48, 'Speaking Test': 2},
      'SS4': {'Life Skills': 22, 'Maths': 24, 'Science': 48, 'Speaking Test': 2}
    },
    '128': {
      '1': {'Art': 18, 'Music': 8, 'GlobalLeadership': 6, 'OpenClass': 1},
      '2': {'Art': 12, 'Music': 8, 'Reading': 8, 'GlobalLeadership': 6, 'OpenClass': 1},
      '3': {'GlobalLeadership': 6, 'Science': 8, 'Reading': 8, 'WC': 8, 'VPE': 4, 'OpenClass': 1},
      'SE1': {'GlobalLeadership': 6, 'Science': 8, 'Reading': 8, 'WC': 8, 'VPE': 4, 'OpenClass': 1},
      '4': {'GlobalLeadership': 6, 'Science': 8, 'Reading': 8, 'WC': 8, 'VPE': 4, 'OpenClass': 1},
      '5': {'GlobalLeadership': 6, 'LogicalThinking': 6, 'Science': 8, 'Reading': 8, 'WC': 6, 'VPE': 4, 'OpenClass': 1},
      '6': {'GlobalLeadership': 6, 'LogicalThinking': 6, 'Science': 8, 'Reading': 8, 'WC': 6, 'VPE': 4, 'OpenClass': 1},
      '7': {'GlobalLeadership': 6, 'LogicalThinking': 6, 'Science': 8, 'Reading': 8, 'WC': 6, 'VPE': 4, 'OpenClass': 1},
      '8': {'Drama': 10, 'GlobalLeadership': 6, 'LogicalThinking': 6, 'Science': 8, 'Reading': 8, 'WC': 6, 'VPE': 4, 'OpenClass': 1},
      '9': {'Drama': 10, 'GlobalLeadership': 6, 'LogicalThinking': 6, 'Science': 8, 'Reading': 8, 'WC': 6, 'VPE': 4, 'OpenClass': 1},
      '10': {'Drama': 10, 'GlobalLeadership': 6, 'LogicalThinking': 6, 'Science': 8, 'Reading': 8, 'WC': 6, 'VPE': 4, 'OpenClass': 1}
    },
    'K': {
      '1': {'I Can Explore': 6, 'I Can Read': 6, 'I Can Say': 6, 'I Can Talk': 6, 'Showtime': 6, 'Storytime': 6, 'OpenClass': 1},
      '2': {'I Can Explore': 6, 'I Can Read': 6, 'I Can Say': 6, 'I Can Talk': 6, 'Showtime': 6, 'Storytime': 6, 'OpenClass': 1},
      '3': {'I Can Explore': 6, 'I Can Read': 6, 'I Can Say': 6, 'I Can Talk': 6, 'Showtime': 6, 'Storytime': 6, 'OpenClass': 1},
      '4': {'I Can Explore': 6, 'I Can Read': 6, 'I Can Say': 6, 'I Can Talk': 6, 'Showtime': 6, 'Storytime': 6, 'OpenClass': 1},
      '5': {'I Can Explore': 6, 'I Can Read': 6, 'I Can Say': 6, 'I Can Talk': 6, 'Showtime': 6, 'Storytime': 6, 'OpenClass': 1},
      '6': {'I Can Explore': 6, 'I Can Read': 6, 'I Can Say': 6, 'I Can Talk': 6, 'Showtime': 6, 'Storytime': 6, 'OpenClass': 1}
    },
    'G0': {
      '0': {'CLIL': 9, 'OpenClass': 1}
    },
    'G': {
      '1': {'CLIL': 9, 'Phonics': 9, 'Language Focus': 9, 'Speaking Test': 1, 'Midterm': 1},
      '2': {'CLIL': 9, 'Phonics': 9, 'Language Focus': 9, 'Speaking Test': 1, 'Midterm': 1},
      '3': {'CLIL': 6, 'Phonics': 6, 'Language Focus': 6, 'Project': 6, 'Speaking Test': 1, 'Midterm': 1},
      '4': {'CLIL': 6, 'Phonics': 6, 'Language Focus': 6, 'Project': 6, 'Speaking Test': 1, 'Midterm': 1},
      '5': {'CLIL': 6, 'Phonics': 6, 'Language Focus': 6, 'Project': 6, 'Speaking Test': 1, 'Midterm': 1},
      '6': {'CLIL': 6, 'Phonics': 6, 'Language Focus': 6, 'Project': 6, 'Speaking Test': 1, 'Midterm': 1}
    },
    'K35': {
      '1': {'I Can Explore': 4, 'I Can Read': 4, 'I Can Say': 4, 'I Can Talk': 4, 'Showtime': 4, 'Storytime': 4, 'OpenClass': 1},
      '2': {'I Can Explore': 4, 'I Can Read': 4, 'I Can Say': 4, 'I Can Talk': 4, 'Showtime': 4, 'Storytime': 4, 'OpenClass': 1},
      '3': {'I Can Explore': 4, 'I Can Read': 4, 'I Can Say': 4, 'I Can Talk': 4, 'Showtime': 4, 'Storytime': 4, 'OpenClass': 1},
      '4': {'I Can Explore': 4, 'I Can Read': 4, 'I Can Say': 4, 'I Can Talk': 4, 'Showtime': 4, 'Storytime': 4, 'OpenClass': 1},
    },
    'GK35': {
      '1': {'I Can Explore': 4, 'I Can Read': 4, 'I Can Say': 4, 'I Can Talk': 4, 'Showtime': 4, 'Storytime': 4, 'OpenClass': 1},
      '2': {'I Can Explore': 4, 'I Can Read': 4, 'I Can Say': 4, 'I Can Talk': 4, 'Showtime': 4, 'Storytime': 4, 'OpenClass': 1},
      '3': {'I Can Explore': 4, 'I Can Read': 4, 'I Can Say': 4, 'I Can Talk': 4, 'Showtime': 4, 'Storytime': 4, 'OpenClass': 1},
      '4': {'I Can Explore': 4, 'I Can Read': 4, 'I Can Say': 4, 'I Can Talk': 4, 'Showtime': 4, 'Storytime': 4, 'OpenClass': 1},
    }
  }

  constructor(private route: ActivatedRoute, private router: Router)
  {
  }

  ngOnInit(){
    this.route.params.subscribe( params => {
      this.curriculum = params['curriculum'];
  		this.stage = params['stage'];
  		this.level = params['level'];
  		this.subject = params['subject'];
  		this.lessonNo = params['lessonNo'];
      this.doIndexModify();

      if(this.curriculum == 'SS'){
        this.lessonBaseRoute = '/lessons/show-lesson/' + this.curriculum + '/' + this.level + '/' + this.subject + '/';
      }
      else {
        this.lessonBaseRoute = '/lessons/show-lesson/' + this.curriculum + '/standardised/' + this.stage + '/' + this.subject + '/';
      }
      this.maxLessons = this.getMaxLessons(this.curriculum, this.stage, this.level, this.subject);
      this.nextLessonNo = +this.lessonNo + 1;
    });
  }

  getMaxLessons(curriculum: string, stage: string, level: string, subject: string){
    if(curriculum == 'Demo'){
			return 3;
		}
		else if(subject == 'OralTest'){
			return 1;
		}
		else if(subject == 'Speaking Test'){
			return 1;
		}
		else if(curriculum == 'SS'){
      return this.maxLessonsByC[curriculum][level][subject];
    }
		else{
      return this.maxLessonsByC[curriculum][stage][subject];
    }
  }

  clickLessonButton(index: number){
    this.router.navigate([this.lessonBaseRoute + index]);
    this.loadChange.emit(false);
  }

  doIndexModify(){
		if((this.curriculum == 'K35' || this.curriculum == 'GK35') && (this.stage == '2' || this.stage == '4')){
			this.indexModify = 4;
		}
		else{
			this.indexModify = 0;
		}
	}
}
