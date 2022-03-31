import { Lesson } from '../../lessons/lessons.model';

//weeklyLesson holds a lesson that has been assigned to be taught to a class at a certain time

export class WeeklyLesson {
  classCode: string;
  timeValue: Date;
  classLength: number;
  subject: string;
  lessonNo: number;
  curriculum?: string;
  level?: string;
  stage?: number;
  lesson?: Lesson;
  prepped?: boolean;

	constructor(
    classCode: string,
    timeValue: Date,
    classLength: number,
    subject: string,
    lessonNo: number,
    lesson?: Lesson,
    curriculum?: string,
    level?: string,
    stage?: number,
    prepped?: boolean
  ) {
    this.classCode = classCode;
    this.timeValue = timeValue;
    this.classLength = classLength;
    this.subject = subject;
    this.lessonNo = lessonNo;
    this.curriculum = curriculum;
    this.level = level;
    this.stage = stage;
    this.lesson = lesson;
    this.prepped = prepped;
	}
}
