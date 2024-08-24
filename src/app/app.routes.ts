import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DasboardComponent } from './pages/dasboard/dasboard.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { DepartmentComponent } from './pages/department/department.component';
import { ParentCategoryComponent } from './pages/parent-category/parent-category.component';
import { ChildCategoryComponent } from './pages/child-category/child-category.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DasboardComponent,
      },
      {
        path: 'employee',
        component: EmployeeComponent,
      },
      {
        path: 'department',
        component: DepartmentComponent,
      },
      {
        path:'parent-category',
        component:ParentCategoryComponent
      },
      {
        path:'child-category',
        component:ChildCategoryComponent
      },
      {
        path:'employee',
        component:EmployeeComponent
      }
    ],
  },
];
