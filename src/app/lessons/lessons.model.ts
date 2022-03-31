export class Lesson {
  curriculum: string;
  stage: number;
  level: string;
  subject: string;
  lessonNo: number;
  lessonTitle: string;
  keyWords: string;
  keySentences: string;
  objectives: string;
  supplies: string;
  activities: string;
  id?: string;

	constructor(
    curriculum: string,
    stage: number,
    level: string,
    subject: string,
    lessonNo: number,
    lessonTitle: string,
    keyWords: string,
    keySentences: string,
    objectives: string,
    supplies: string,
    activities: string,
    id?: string) {
      this.curriculum = curriculum;
      this.stage = stage;
      this.level = level;
      this.subject = subject;
      this.lessonNo = lessonNo;
      this.lessonTitle = lessonTitle;
      this.keyWords = keyWords;
      this.keySentences = keySentences;
      this.objectives = objectives;
      this.supplies = supplies;
      this.activities = activities;
      this.id = id;
	}
}
