import { Kid } from './kid/kid.model';
import { WeeklyLesson } from './show-class/weekly-lesson.model';

export class Class {
  //each class within an office has a unique classCode
  //across all offices this is most likely not true but user + classCode will always be unique

  //classcode is encouraged to include center name (e.g. BJFZ) as this will also help with identifying sent classes
  classCode: string;
  curriculum: string;
  stage: string;
  level: string;
  session1Day: number;
  session1Time1Hour: number;
  session1Time1Minute: number;
  session1Time2Hour: number;
  session1Time2Minute: number;
  session1Length: number;
  session2Day: number;
  session2Time1Hour: number;
  session2Time1Minute: number;
  session2Time2Hour: number;
  session2Time2Minute: number;
  session2Length: number;
  ct: string;
  user: string;
  kids?: Kid[];
  weeklyLessons?: WeeklyLesson[];
  addedByOther?: boolean;
  addedBy?: string;
  comments?: string;

  // in hours and minutes the first number is the session number the second
  // is the class number (hour12 is first session 2nd class)

	constructor(
    classCode: string,
    curriculum: string,
    stage: string,
    level: string,
    day1: number,
    hour11: number,
    minute11: number,
    hour12: number,
    minute12: number,
    length1: number,
    day2: number,
    hour21: number,
    minute21: number,
    hour22: number,
    minute22: number,
    length2: number,
    ct: string,
    user: string,
    kids?: Kid[],
    weeklyLessons?: WeeklyLesson[],
    addedByOther?: boolean,
    addedBy?: string,
    comments?: string) {
		this.classCode = classCode;
    this.curriculum = curriculum;
    this.stage = stage;
    this.level = level;
    this.session1Day = day1;
    this.session1Time1Hour = hour11;
    this.session1Time1Minute = minute11;
    this.session1Time2Hour = hour12;
    this.session1Time2Minute = minute12;
    this.session1Length = length1;
    this.session2Day = day2;
    this.session2Time1Hour = hour21;
    this.session2Time1Minute = minute21;
    this.session2Time2Hour = hour22;
    this.session2Time2Minute = minute22;
    this.session2Length = length2;
    this.ct = ct;
    this.user = user;
    this.kids = kids;
    this.weeklyLessons = weeklyLessons;
    this.addedByOther = addedByOther;
    this.addedBy = addedBy;
    this.comments = comments;
	}
}
