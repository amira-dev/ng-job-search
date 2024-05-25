import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JobService } from '../job.service';
import { JobDetail } from '../job.model';

import { Observable, of } from 'rxjs';
import { catchError, map, filter, switchMap, tap } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.css'
})
export class JobDetailComponent implements OnInit {
  job$!: Observable<JobDetail | null>;
  sanitizedDescription!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.job$ = this.route.paramMap.pipe(
      map((paramMap: ParamMap) => paramMap.get('id')),
      filter(id => !!id),  // Filtrer les valeurs nulles ou indéfinies
      switchMap(id => this.jobService.getJobById(Number(id)).pipe(
        tap((job) => {
          this.sanitizedDescription = this.sanitizer.bypassSecurityTrustHtml(job.description).toString();
        }),
        catchError(error => {
          console.error('Error fetching job details', error);
          this.router.navigate(['/jobs']);
          return of(null);
        })
      ))
    );
  }

  goBack(): void {
    this.router.navigate(['/jobs']);
  }

}
