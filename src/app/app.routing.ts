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

import { AuthGuard } from './auth/auth-guard.service';

const APP_ROUTES: Routes = [
	{ path: '', component: HomeComponent, pathMatch: 'full' },
	{ path: 'classes', canActivate: [AuthGuard], component: ClassesComponent },
	{ path: 'classes/add', canActivate: [AuthGuard], component: AddClassComponent },
	{ path: 'classes/show-class/:id', canActivate: [AuthGuard], component: ShowClassComponent },
	{ path: 'classes/show-class/:id/addlesson', canActivate: [AuthGuard], component: AddNextLessonComponent },
	{ path: 'classes/show-class/:id/edit', canActivate: [AuthGuard], component: EditClassComponent },
	{ path: 'classes/show-class/:id/kids', canActivate: [AuthGuard], component: AddKidComponent },
	{ path: 'classes/show-class/:id/kids/:name', canActivate: [AuthGuard], component: KidComponent },
	{ path: 'classes/show-class/:id/kids/:name/edit', canActivate: [AuthGuard], component: EditKidComponent },
	{ path: 'lessons', canActivate: [AuthGuard], component: LessonsComponent },
	{ path: 'lessons/curriculums', canActivate: [AuthGuard], component: CurriculumComponent },
	{ path: 'lessons/add', canActivate: [AuthGuard], component: AddLessonComponent },
	{ path: 'lessons/show-lesson/:curriculum/:level/:subject/:lessonNo', canActivate: [AuthGuard], component: ShowLessonComponent },
	{ path: 'lessons/show-lesson/:curriculum/:level/:subject/:lessonNo/edit', canActivate: [AuthGuard], component: EditLessonComponent},
	{ path: 'lessons/show-lesson/:curriculum/standardised/:stage/:subject/:lessonNo', canActivate: [AuthGuard], component: ShowLessonComponent },
	{ path: 'lessons/show-lesson/:curriculum/standardised/:stage/:subject/:lessonNo/edit', canActivate: [AuthGuard], component: EditLessonComponent },
	{ path: 'schedule', canActivate: [AuthGuard], component: CalendarComponent },
	{ path: 'schedule/add-lesson', canActivate: [AuthGuard], component: AddIrregularLessonComponent },
	{ path: 'about', canActivate: [AuthGuard], component: HelpComponent },
	{ path: 'new', component: NewFeatureComponent },
	{ path: '**', component: HomeComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
