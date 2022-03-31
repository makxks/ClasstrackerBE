import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LessonService } from '../lessons.service';
import { Lesson } from '../lessons.model';

@Component ({
	selector: 'lessons-delete',
	templateUrl: './delete-lesson.component.html',
	styleUrls: ['./delete-lesson.component.css']
})

export class DeleteLessonComponent implements OnInit {
  lesson!: Lesson;

  curriculum: string;
	stage: number;
	level: string;
	subject: string;
	lessonNo: number;
  display = 'none';

  constructor(private lessonService: LessonService, private route: ActivatedRoute) {
    this.curriculum = route.snapshot.params['curriculum'];
		this.stage = route.snapshot.params['stage'];
		this.level = route.snapshot.params['level'];
		this.subject = route.snapshot.params['subject'];
		this.lessonNo = route.snapshot.params['lessonNo'];
  }

  onDeleteCancelled() {
		this.display = 'none';
	}

  onDeleteAccepted(lesson: Lesson) {
    this.lessonService.deleteLesson(lesson)
      .subscribe(
        (result: any) => {
					console.log(result);
				});
		this.display = 'none';
	}

	ngOnInit(){
    this.lessonService.deleteOccurred
      .subscribe(
				(lesson: Lesson) => {
					this.lesson = lesson;
					this.display = 'block';
				}
			)
	}
}
