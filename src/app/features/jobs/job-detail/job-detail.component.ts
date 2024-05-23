import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JobService } from '../job.service';
import { JobDetail } from '../job.model';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.css'
})
export class JobDetailComponent implements OnInit {
  job$!: Observable<JobDetail | null>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      const jobId = Number(id);
      this.job$ = this.jobService.getJobById(jobId).pipe(
        catchError(error => {
          console.error('Error fetching job details', error);
          throw error; // Throw the error again to be caught by the subscriber
        })
      );
    } else {
      this.router.navigate(['/jobs']);
    }
  }

  goBack(): void {
    this.router.navigate(['/jobs']);
  }

}
