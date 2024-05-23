import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Job } from '../job.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-job-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './job-item.component.html',
  styleUrl: './job-item.component.css'
})
export class JobItemComponent {

  @Input() job!: Job;
  @Input() isFavorited!: boolean;
  @Input() isFavoriteList: boolean = false;
  @Output() toggleFavorite = new EventEmitter<Job>();

  onToggleFavorite(): void {
    this.toggleFavorite.emit(this.job);
  }
}
