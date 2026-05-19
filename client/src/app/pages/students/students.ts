import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';
import { Httpcall } from '../../services/httpcall';
import { Router } from '@angular/router';
import { Student } from '../../models/student.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'students',
  imports: [FormsModule],
  templateUrl: './students.html',
  styleUrl: './students.css',
})
export class Students implements OnInit {

  constructor(private auth: Auth, private http: Httpcall, private router: Router, private cdr: ChangeDetectorRef) { }
  loading: boolean = false;
  errorMessage: String = "";
  successMessage: String = "";
  students: Student[] = [];
  showStats: boolean = false;
  filtroCognome: string = "";

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.loading = true;
    this.errorMessage = "";
    this.http.getCall('/api/students').subscribe({
      next: (res) => {
        this.auth.saveToken(res.newToken);
        this.students = res.data;
        console.log(this.students);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = "Errore nel caricamento degli studenti";
        this.cdr.detectChanges();
      }
    });
  }
  cerca() {
    this.loading = true;
    this.errorMessage = "";
    this.http.postCall('/api/students/cercaPerCognome',{cognome:this.filtroCognome}).subscribe({
      next: (res) => {
        this.auth.saveToken(res.newToken);
        this.students = res.data;
        console.log(this.students);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = "Errore ricerca degli studenti";
        this.cdr.detectChanges();
      }
    });
  }
  nuovoStudente() {

  }
  caricaStatistiche() {

  }

  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }
}