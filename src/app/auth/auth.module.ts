import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const authRoutes: Routes = [
    {path: '', component: AuthComponent}
];

@NgModule({
    declarations: [AuthComponent],
    imports: [RouterModule.forChild(authRoutes), FormsModule]
})
export class AuthModule {}
