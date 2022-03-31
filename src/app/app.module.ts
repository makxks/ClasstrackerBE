import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AuthModule } from '@auth0/auth0-angular';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './appheader.component';
import { AppFooterComponent } from './appfooter.component';

import { HomeComponent } from './home/home.component';

import { AuthButtonComponent } from './auth/auth.component';

import { ErrorService } from './errors/error.service';
import { ErrorComponent } from './errors/error.component';

import { ClassesComponent } from './classes/classes.component';
import { ShowClassComponent } from './classes/show-class/show-class.component';
import { EditClassComponent } from './classes/show-class/edit-class/edit-class.component';
import { AddClassComponent } from './classes/add-class/add-class.component';
import { AddNextLessonComponent } from './classes/show-class/add-next-lesson/add-next-lesson.component';
import { ClassesService } from './classes/classes.service';
import { ClassListItemComponent } from './classes/class-list-item.component';
import { DeleteClassComponent } from './classes/show-class/delete-class.component';
import { ShareClassComponent } from './classes/show-class/share-class/share-class.component';
import { ReceiveSharedClassComponent } from './classes/show-class/receive-shared-class/receive-shared-class.component';
import { CompleteShareComponent } from './classes/show-class/complete-share/complete-share.component';
import { AddCommentsComponent } from './classes/show-class/add-comments/add-comments.component';
import { DeleteCommentsComponent } from './classes/show-class/delete-comments/delete-comments.component';

import { LessonsComponent } from './lessons/lessons.component';
import { LessonListBySubjectComponent } from './lessons/lesson-list-by-subject.component';
import { ShowLessonComponent } from './lessons/show-lesson/show-lesson.component';
import { EditLessonComponent } from './lessons/edit-lesson/edit-lesson.component';
import { AddLessonComponent } from './lessons/add-lesson/add-lesson.component';
import { WeeklyLessonComponent } from './classes/show-class/weekly-lesson.component';
import { LessonService } from './lessons/lessons.service';
import { WeeklyLessonsService } from './classes/show-class/weekly-lesson.service';
import { DeleteWeeklyLessonComponent } from './classes/show-class/delete-weekly-lesson.component';
import { DeleteLessonComponent } from './lessons/show-lesson/delete-lesson.component';
import { LessonHeaderComponent } from './lessons/lesson-header/lesson-header.component';

import { CurriculumComponent } from './lessons/curriculum.component';

import { KidComponent } from './classes/kid/kid.component';
import { EditKidComponent } from './classes/kid/edit-kid/edit-kid.component';
import { AddKidComponent } from './classes/kid/add-kid/add-kid.component';
import { KidService } from './classes/kid/kid.service';
import { KidsListItemComponent } from './classes/show-class/kid-list-item.component';
import { DeleteKidComponent } from './classes/kid/delete-kid/delete-kid.component';

import { CalendarComponent } from './calendar/calendar.component';
import { CalendarEntryComponent } from './calendar/calendar-entry.component';
import { AddIrregularLessonComponent } from './classes/show-class/add-irregular-lesson/add-irregular-lesson.component';

import { HelpComponent } from './help.component';

import { NewFeatureComponent } from './new-feature.component';

import { routing } from './app.routing';
import { environment as env } from '../environments/environment.prod';

@NgModule({
	declarations: [
		AppComponent,
		AppHeaderComponent,
		AppFooterComponent,
		HomeComponent,
		AuthButtonComponent,
		ErrorComponent,
		ClassesComponent,
		ShowClassComponent,
		EditClassComponent,
		AddClassComponent,
		ClassListItemComponent,
		ShareClassComponent,
		ReceiveSharedClassComponent,
		AddCommentsComponent,
		DeleteCommentsComponent,
		CompleteShareComponent,
		DeleteClassComponent,
		AddLessonComponent,
		LessonsComponent,
		LessonListBySubjectComponent,
		ShowLessonComponent,
		EditLessonComponent,
		AddNextLessonComponent,
		WeeklyLessonComponent,
		DeleteWeeklyLessonComponent,
		DeleteLessonComponent,
		LessonHeaderComponent,
		CurriculumComponent,
		KidComponent,
		EditKidComponent,
		AddKidComponent,
		KidsListItemComponent,
		DeleteKidComponent,
		CalendarComponent,
		CalendarEntryComponent,
		AddIrregularLessonComponent,
		HelpComponent,
		NewFeatureComponent
	],
	imports: [
		BrowserModule,
		routing,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		AuthModule.forRoot({
			...env.auth
		}),
	],
	providers: [
		ErrorService,
		ClassesService,
		KidService,
		LessonService,
		WeeklyLessonsService,
		// { provide: LocationStrategy, useClass: HashLocationStrategy }
	],
	bootstrap: [AppComponent]
})

export class AppModule {

}
