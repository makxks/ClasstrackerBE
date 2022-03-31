import { Component, Input } from '@angular/core';

import { Lesson } from './lessons.model';

@Component ({
	selector: 'app-lesson-list-item',
	templateUrl: './lesson-list-by-subject.component.html',
	styleUrls: ['./lesson-list-by-subject.component.css']
})

export class LessonListBySubjectComponent {
  @Input() lesson!: Lesson;
}
