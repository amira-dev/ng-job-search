import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobItemComponent } from '../job-item/job-item.component';
import { Job } from '../job.model';
import { JobService } from '../job.service';

@Component({
  selector: 'app-favorite-jobs',
  standalone: true,
  imports: [CommonModule, JobItemComponent],
  templateUrl: './favorite-jobs.component.html',
  styleUrl: './favorite-jobs.component.css'
})
export class FavoriteJobsComponent implements OnInit {
  favoriteJobs: Job[] = [];

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.favoriteJobs = this.jobService.getFavorites();
  }

  // Toggle the favorite state of a job
  toggleFavorite(job: Job): void {
    this.jobService.toggleFavorite(job);
    // Update the list after toggling
    this.favoriteJobs = this.jobService.getFavorites();
  }

  // Method to check if a job is favorited
  isFavorited(job: Job): boolean {
    return this.jobService.isFavorited(job);
  }
}
