import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WeeklyLessonsService } from './weekly-lesson.service';
import { WeeklyLesson } from './weekly-lesson.model';

@Component ({
	selector: 'weekly-lesson-delete',
	templateUrl: './delete-weekly-lesson.component.html',
	styleUrls: ['./delete-weekly-lesson.component.css']
})

export class DeleteWeeklyLessonComponent implements OnInit {
	weeklyLesson!: WeeklyLesson;
  display = 'none';
	deleting = false;

  constructor(private weeklyLessonsService: WeeklyLessonsService,private route: ActivatedRoute) {}

  onDeleteCancelled() {
		this.display = 'none';
	}

  onDeleteAccepted(weeklyLesson: WeeklyLesson) {
		this.deleting = true;
    this.weeklyLessonsService.deleteWeeklyLesson(weeklyLesson)
      .subscribe(
        (result) => {
					console.log("deleted " + weeklyLesson + ". After deletion is now: " + result);
					this.deleting = false;
				});
	}

	ngOnInit(){
    this.weeklyLessonsService.deleteOccurred
      .subscribe(
				(weeklyLesson: WeeklyLesson) => {
					this.weeklyLesson = weeklyLesson;
					this.display = 'block';
				}
			)

		this.weeklyLessonsService.deleteComplete
      .subscribe(
				(weeklyLesson: WeeklyLesson) => {
					this.display = 'none';
					this.deleting = false;
				}
			)
	}
}
