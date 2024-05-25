import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobListComponent } from './job-list.component';
import { JobService } from '../job.service';
import { of } from 'rxjs';

describe('JobListComponent', () => {
  let component: JobListComponent;
  let fixture: ComponentFixture<JobListComponent>;
  let mockJobService: jasmine.SpyObj<JobService>;

  beforeEach(async () => {
    mockJobService = jasmine.createSpyObj('JobService', ['getJobs']);
    await TestBed.configureTestingModule({
      declarations: [JobListComponent],
      providers: [{ provide: JobService, useValue: mockJobService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display jobs', () => {
    const mockJobs = [
      {
        id: 96513,
        companyName: "Luxury Presence",
        title: "Sr. Backend Engineer - Canada",
        companyLogo: "https://interstate21.com/job-search-app/Luxury.jpg",
        reference: "96513-sr-software-engineer-latam",
      },
      {
        id: 96515,
        companyName: "Twitch",
        title: "Director - Communications",
        companyLogo: "https://interstate21.com/job-search-app/Twitch.jpg",
        reference: "96515-director-communications",
      },
      {
        id: 103528,
        companyName: "Subspace Network",
        title: "AI Partnerships & Business Development Lead",
        companyLogo: "https://interstate21.com/job-search-app/Subspace.jpg",
        reference: "103528-ai-partnerships-business-development-lead",
      },
    ];
    mockJobService.getJobs.and.returnValue(of(mockJobs));

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const jobElements = compiled.querySelectorAll('.job-item');

    expect(jobElements.length).toBe(3); // Assuming each job is rendered with class 'job-item'
    expect(jobElements[0].textContent).toContain('Luxury Presence');
    expect(jobElements[1].textContent).toContain('Twitch');
    expect(jobElements[2].textContent).toContain('Subspace Network');
  });

});
