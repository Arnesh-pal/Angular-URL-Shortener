import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment'; // Import the environment

export interface UrlData {
    _id: string;
    originalUrl: string;
    shortCode: string;
    clicks: number;
    createdAt: string;
    shortUrl?: string;
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private http = inject(HttpClient);
    // Use the apiUrl from the imported environment object
    private apiUrl = environment.apiUrl;

    getUrls(): Promise<UrlData[]> {
        return lastValueFrom(this.http.get<UrlData[]>(`${this.apiUrl}/api/urls`));
    }

    shortenUrl(originalUrl: string): Promise<UrlData> {
        return lastValueFrom(this.http.post<UrlData>(`${this.apiUrl}/api/shorten`, { originalUrl }));
    }

    registerClick(shortCode: string): Promise<any> {
        return Promise.resolve();
    }

    getFullShortUrl(shortCode: string): string {
        return `${this.apiUrl}/${shortCode}`;
    }
}