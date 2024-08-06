import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../master.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginObj: any = {
    emailId: '',
    password: '',
  };

  masterService = inject(MasterService);
  routerService = inject(Router);

  onLogin() {
    alert("login called")
    this.masterService.login(this.loginObj).subscribe((data: any) => {
      if (data.result) {
        this.routerService.navigateByUrl('dashboard');
      } else {
        alert(data.message);
      }
    });
  }
}
