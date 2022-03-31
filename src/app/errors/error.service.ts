import { EventEmitter } from '@angular/core';

import { Error } from "./error.model";

export class ErrorService {
	errorOccurred = new EventEmitter<Error>();

	handleError(errorCode: string, errorMessage: string){
		// handle errors with known or passed in error messages
		if(errorMessage){
			const errorData = new Error(errorCode, errorMessage);
			this.errorOccurred.emit(errorData);
		}
		// handle unknown errors
		else {
			const errorData = new Error("Something went wrong", "An unknown error occurred");
			this.errorOccurred.emit(errorData);
		}
	}
}
