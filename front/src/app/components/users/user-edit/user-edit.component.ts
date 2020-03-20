import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public id;
  public user;
  public success_message;
  public password;
  public identity;

  constructor(
    private _route: ActivatedRoute,
    private _userService : UserService,
    private _router : Router,
  ) { 
    this.identity = this._userService.getIdentity();
  }

  ngOnInit() {

    if(this.identity.role == 'ADMIN'){
      this._route.params.subscribe(params=>{
        this.id = params['id'];
        
        this._userService.get_user(this.id).subscribe(
          response=>{
            console.log(response);
            this.user = response.user;
          },
          error=>{
  
          }
        )
  
        
      });
    }else{
      this._router.navigate(['dashboard']);
    }

  }

  success_alert(){
    this.success_message = '';
  }

  onSubmit(userForm){
    if(userForm.valid){
      this._userService.editar({
        _id: this.id,
        nombres:userForm.value.nombres,
        email:userForm.value.email,
        password:userForm.value.password,
        role: userForm.value.role,
      }).subscribe(
        response=>{
          this.success_message = 'Se actualizo los datos usuario';
          console.log(response);
      
        },
        error=>{

        }
      );
    }
  }

}
