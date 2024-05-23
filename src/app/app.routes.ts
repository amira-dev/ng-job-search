
import { Routes } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/jobs",
        pathMatch: "full",
    },
    {
        path: "jobs",
        loadComponent: () => import('./features/jobs/job-list/job-list.component').then(m => m.JobListComponent)
    },
    {
        path: "jobs/:id",
        loadComponent: () => import('./features/jobs/job-detail/job-detail.component').then(m => m.JobDetailComponent)
    },
    {
        path: "favorites",
        loadComponent: () => import('./features/jobs/favorite-jobs/favorite-jobs.component').then(m => m.FavoriteJobsComponent)
    },
    { path: '**', component: NotFoundComponent }
];

