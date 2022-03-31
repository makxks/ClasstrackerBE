export class Kid {
  //each kid belongs to a class and a user
  kidsName: string;
  age: number;
  strengths: string;
  weaknesses: string;
  comments: string;
  user: string;
  classCode: string;
  hasPhoto?: boolean;

	constructor(kidsName: string, age: number, strengths: string, weaknesses: string, comments: string, user: string, classCode: string, hasPhoto?: boolean) {
		this.kidsName = kidsName;
    this.age = age;
    this.strengths = strengths;
    this.weaknesses = weaknesses;
    this.comments = comments;
    this.user = user;
    this.classCode = classCode;
    this.hasPhoto = hasPhoto;
	}
}
