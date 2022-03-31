export class Error {
	code: string;
	message: string;

	constructor(code: string, message: string) {
		this.code = code;
		this.message = message;
	}
}
