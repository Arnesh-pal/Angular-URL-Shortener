import { ChangeDetectionStrategy, Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, UrlData } from '../../services/api.service';

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './admin.component.html',
    // ========================================================================
    // THIS LINE HAS BEEN FIXED
    // ========================================================================
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit {
    isLoading = signal(true);
    urlHistory = signal<UrlData[]>([]);
    private apiService = inject(ApiService);

    ngOnInit(): void {
        this.loadUrls();
    }

    async loadUrls() {
        this.isLoading.set(true);
        try {
            const urls = await this.apiService.getUrls();
            this.urlHistory.set(urls);
        } catch (error) {
            console.error('Failed to load URLs', error);
        } finally {
            this.isLoading.set(false);
        }
    }

    handleLinkClick(clickedUrl: UrlData) {
        // This is the "optimistic" update. We update our local state immediately.
        this.urlHistory.update(currentUrls =>
            currentUrls.map(url =>
                url._id === clickedUrl._id
                    ? { ...url, clicks: url.clicks + 1 } // Create a new object with the incremented count
                    : url
            )
        );
        // The browser's default behavior for the link's href will open the new tab
        // and the backend will register the "real" click.
    }

    // This helper function is still needed for the template
    getFullShortUrl(shortCode: string): string {
        return this.apiService.getFullShortUrl(shortCode);
    }
}