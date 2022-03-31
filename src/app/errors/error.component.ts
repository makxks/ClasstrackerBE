import { Component, OnInit } from '@angular/core';

import { ErrorService } from './error.service';
import { Error } from "./error.model";

@Component({
	selector: 'app-error',
	templateUrl: './error.component.html',
	styleUrls: ['./error.component.css']
})

export class ErrorComponent implements OnInit {
	error: Error = new Error("", "");
	display = 'none';

	constructor(private errorService: ErrorService){}

	onErrorHandled() {
		this.display = 'none';
	}

	ngOnInit() {
		// display the modal when an error is detected through the errorService
		this.errorService.errorOccurred.
			subscribe(
				(error: Error) => {
					this.error = error;
					this.display = 'block';
				}
			)
	}
}
