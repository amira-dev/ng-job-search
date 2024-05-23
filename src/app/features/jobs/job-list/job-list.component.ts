import { Component, OnInit } from '@angular/core';
import { Job } from '../job.model';
import { JobService } from '../job.service';
import { CommonModule } from '@angular/common';
import { JobItemComponent } from '../job-item/job-item.component';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, JobItemComponent],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent implements OnInit {

  jobs$!: Observable<Job[]>; // Déclaré comme non nullable

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.jobs$ = this.jobService.getJobs();
  }

  toggleFavorite(job: Job): void {
    this.jobService.toggleFavorite(job);
  }

  isFavorited(job: Job): boolean {
    return this.jobService.isFavorited(job);
  }
}
