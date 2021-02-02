import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import  {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    login(username, password) {
        const headers={'language':'en'};
        const body = {"email":username, "password":password,'deviceType':'3'};
        return this.http.post<any>(`${environment.apiUrl}/franchise/logIn`,body ,{headers})
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user.data.id));
                localStorage.setItem('cityId', JSON.stringify(user.data.cityId));
                localStorage.setItem('storeId', JSON.stringify(user.data.storeId));
                localStorage.setItem('franchiseId', JSON.stringify(user.data.franchiseId));
                localStorage.setItem('userTypeMsg', JSON.stringify(user.data.userTypeMsg));
                localStorage.setItem('authToken', JSON.stringify(user.data.authToken));
                localStorage.setItem('managerId', JSON.stringify(user.data.id));
                localStorage.setItem('userType', JSON.stringify(user.data.userType.toString()));
                
                
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        localStorage.removeItem('cityId');
        localStorage.removeItem('storeId');
        localStorage.removeItem('userTypeMsg');
        localStorage.removeItem('authToken');
        localStorage.removeItem('franchiseId');
        localStorage.removeItem('managerId');
        localStorage.removeItem('userType');


        this.currentUserSubject.next(null);
    }
   public getAuthToken(){
        return JSON.parse(localStorage.getItem('authToken'));
    }
}  