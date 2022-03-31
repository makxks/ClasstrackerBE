import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { ClassesComponent } from './classes/classes.component';
import { ShowClassComponent } from './classes/show-class/show-class.component';
import { EditClassComponent } from './classes/show-class/edit-class/edit-class.component';
import { AddClassComponent } from './classes/add-class/add-class.component';
import { AddNextLessonComponent } from './classes/show-class/add-next-lesson/add-next-lesson.component';

import { LessonsComponent } from './lessons/lessons.component';
import { ShowLessonComponent } from './lessons/show-lesson/show-lesson.component';
import { EditLessonComponent } from './lessons/edit-lesson/edit-lesson.component';
import { AddLessonComponent } from './lessons/add-lesson/add-lesson.component';

import { CurriculumComponent } from './lessons/curriculum.component';

import { KidComponent } from './classes/kid/kid.component';
import { EditKidComponent } from './classes/kid/edit-kid/edit-kid.component';
import { AddKidComponent } from './classes/kid/add-kid/add-kid.component';

import { CalendarComponent } from './calendar/calendar.component';
import { AddIrregularLessonComponent } from './classes/show-class/add-irregular-lesson/add-irregular-lesson.component';

import { HelpComponent } from './help.component';

import { NewFeatureComponent } from './new-feature.component';

const APP_ROUTES: Routes = [
	{ path: '', component: HomeComponent, pathMatch: 'full' },
	{ path: 'classes', component: ClassesComponent },
	{ path: 'classes/add', component: AddClassComponent },
	{ path: 'classes/show-class/:id', component: ShowClassComponent },
	{ path: 'classes/show-class/:id/addlesson', component: AddNextLessonComponent },
	{ path: 'classes/show-class/:id/edit', component: EditClassComponent },
	{ path: 'classes/show-class/:id/kids', component: AddKidComponent },
	{ path: 'classes/show-class/:id/kids/:name', component: KidComponent },
	{ path: 'classes/show-class/:id/kids/:name/edit', component: EditKidComponent },
	{ path: 'lessons', component: LessonsComponent },
	{ path: 'lessons/curriculums', component: CurriculumComponent },
	{ path: 'lessons/add', component: AddLessonComponent },
	{ path: 'lessons/show-lesson/:curriculum/:level/:subject/:lessonNo', component: ShowLessonComponent },
	{ path: 'lessons/show-lesson/:curriculum/:level/:subject/:lessonNo/edit', component: EditLessonComponent},
	{ path: 'lessons/show-lesson/:curriculum/standardised/:stage/:subject/:lessonNo', component: ShowLessonComponent },
	{ path: 'lessons/show-lesson/:curriculum/standardised/:stage/:subject/:lessonNo/edit', component: EditLessonComponent },
	{ path: 'schedule', component: CalendarComponent },
	{ path: 'schedule/add-lesson', component: AddIrregularLessonComponent },
	{ path: 'about', component: HelpComponent },
	{ path: 'new', component: NewFeatureComponent },
	{ path: '**', component: HomeComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
