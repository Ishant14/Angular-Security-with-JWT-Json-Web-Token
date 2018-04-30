import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../common/token-storage.service';


@Component({
      moduleId: module.id,
      templateUrl: 'login.component.html'
})

export class LoginComponent {
  constructor(private router: Router, private authService: AuthService, 
    private token: TokenStorageService) {
  }

  username: string;
  password: string;

  login(): void {
    this.authService.attemptAuth(this.username, this.password).subscribe(
      data => {
        console.log("token: "+data);
        this.token.saveToken(data.token);
        this.router.navigate(['/home']);
      }
    );
  }
}