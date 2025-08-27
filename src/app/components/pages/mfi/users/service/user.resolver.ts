import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from './user.service';
import { catchError, of } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class UserDetailResolver implements Resolve<any> {
  constructor(
    private userService: UserService,
    private router: Router,
    private ms: MessageService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = Number(route.paramMap.get('id'));

    return this.userService.getOneUser(id).pipe(
      catchError(() => {
        this.router.navigate(['/mfi/users']);
        this.ms.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User not found or server error',
        });
        return of(null);
      })
    );
  }
}

export const userResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const userService = inject(UserService);
  return userService.getUsers();
};
