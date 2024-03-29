import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable()
export class APIService {
    
    constructor(private http: HttpClient) {
    }

    public get<T>(path: string, queryParameters?: object): Observable<T> {
        const uri = this.createURI(path, queryParameters);
        const headers = this.createRequestHeaders();

        return this.http.get<T>(uri, {headers: headers});
    }

    public post<T>(path: string, data: Object, queryParameters?: Object): Observable<T> {
        const uri = this.createURI(path, queryParameters);
        const headers = this.createRequestHeaders();

        return this.http.post<T>(uri, data, {headers: headers});
    }

    public put<T>(path: string, data: Object, queryParameters?: Object): Observable<T> {
        const uri = this.createURI(path, queryParameters);
        const headers = this.createRequestHeaders();

        return this.http.put<T>(uri, data, {headers: headers});
    }

    public delete<T>(path: string, queryParameters?: Object): Observable<T> {
        const uri = this.createURI(path, queryParameters);
        const headers = this.createRequestHeaders();

        return this.http.delete<T>(uri, {headers: headers});
    }

    private createURI(path: string, queryParameters: object): string {
        // const queryString = this.createQueryString(queryParameters);
        return `${environment.reviveORAPIUrl}${path}`;
    }

    private createRequestHeaders(): HttpHeaders {
        const headers = new HttpHeaders();
        return headers;
    }

    // Deprecated
    private createQueryString(queryParameters: object): string {
        let queryString = '';
        if (typeof queryParameters === 'object') {
            Object.keys(queryParameters).forEach(function (key) {
                const value = queryParameters[key];
                const prefix = queryString.length === 0 ? '?' : '&';
                queryString += `${prefix}${key}=${value}`;
            });
        }
        return queryString;
    }

}
