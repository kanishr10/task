import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { userDetails } from './user_details';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  userForm!: FormGroup;

  editUserId: number | null = null;

  constructor(private http: HttpClient,
    // private fb : FormBuilder
  ){}

  ngOnInit(){
    this.initForm();
    this.getUsers();
  }

  users: any[] = [];
  isEdit = false;


  initForm(){
   
    this.userForm = new FormGroup({
      name: new FormControl('',[Validators.required,Validators.minLength(3)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      age: new FormControl('',[Validators.required,Validators.min(1)]),
    })
  }

  onSubmit(){
    console.log("working")
    if(this.userForm.invalid){
      this.userForm.markAllAsTouched();
      return;
    }

      const userData = this.userForm.value;
      console.log(userData);

      if(this.isEdit && this.editUserId !== null){
    this.http.put(`http://localhost:3000/users/${this.editUserId}`,userData).subscribe(()=>{
      this.getUsers();
      this.resetForm();
    });
  } else{
    this.http.post(`http://localhost:3000/users`,userData).subscribe(()=>{
      this.getUsers();
      this.userForm.reset();
    });
  }
  }

  getUsers(){
    this.http.get<userDetails[]>('http://localhost:3000/users').subscribe((data)=>{
        this.users = data;  
    });
  }

  onDelete(id: number){
    this.http.delete(`http://localhost:3000/users/${id}`).subscribe(()=>{
        this.getUsers();  
    });
  }

  onEdit(user: any){
      this.userForm.patchValue(user);
      this.isEdit = true;
      this.editUserId = user.id;
  }

  resetForm(){
    this.userForm.reset();
    this.isEdit = false;
    this.editUserId = null;
  }

  title = 'Task2';
}
