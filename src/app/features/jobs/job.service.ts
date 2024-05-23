import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job, JobDetail } from './job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = '/jobs';
  private favoritesKey = 'favorites';

  constructor(private http: HttpClient) { }

  // Get all jobs from the API
  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }

  // Get job details by ID from the API
  getJobById(id: number): Observable<JobDetail> {
    return this.http.get<JobDetail>(`${this.apiUrl}/${id}`);
  }

  // Get favorite jobs from local storage
  getFavorites(): Job[] {
    const favorites = localStorage.getItem(this.favoritesKey);
    return favorites ? JSON.parse(favorites) : [];
  }

  // Toggle a job as favorite
  toggleFavorite(job: Job): void {
    const favorites = this.getFavorites();
    const index = favorites.findIndex(favorite => favorite.id === job.id);
    if (index === -1) {
      favorites.push(job);
    } else {
      favorites.splice(index, 1);
    }
    localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
  }

  // Check if a job is favorited
  isFavorited(job: Job): boolean {
    return this.getFavorites().some(favorite => favorite.id === job.id);
  }
}