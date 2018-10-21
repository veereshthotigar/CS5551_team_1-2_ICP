import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public id: number;
  public name: string;
  public course: string;
  public major: string;
  public minor: string;
  url:string;
  message:Observable<any>;
  constructor(private http: HttpClient) { }
  onCreate(){
    this.url = 'http://127.0.0.1:3000/student/create';
    this.http.post(this.url,{
      class_id: this.id ,
      name: this.name,
      course_of_study: this.course,
      major: this.major,
      minor: this.minor,
    })
      .subscribe(
        (res:any)=>{
          this.message = res.message;
          alert(this.message);
          console.log(this.message);
        }
      )
  }
  ngOnInit() {
  }

}
