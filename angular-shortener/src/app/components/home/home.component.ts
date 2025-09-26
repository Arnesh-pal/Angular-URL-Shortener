import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// Import the CORRECT UrlData interface from the service
import { ApiService, UrlData } from '../../services/api.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './home.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
    isLoading = signal(false);
    errorMessage = signal<string | null>(null);
    // Use the imported UrlData type for the signal
    lastShortenedUrl = signal<UrlData | null>(null);
    isCopied = signal(false);

    private apiService = inject(ApiService);

    async onUrlSubmit(event: Event) {
        event.preventDefault();
        const input = (event.target as HTMLFormElement).querySelector('input');
        if (!input?.value) return;

        this.isLoading.set(true);
        this.errorMessage.set(null);
        this.lastShortenedUrl.set(null);
        this.isCopied.set(false);

        try {
            const newUrl = await this.apiService.shortenUrl(input.value);
            this.lastShortenedUrl.set(newUrl);
            input.value = '';
        } catch (error) {
            this.errorMessage.set('Could not shorten the URL. Is the backend running?');
            console.error(error);
        } finally {
            this.isLoading.set(false);
        }
    }

    // The link's href will handle the redirect and click registration
    // We don't need to do anything extra here.
    onShortUrlClick() {
        // This is handled by the backend redirect, no action needed.
    }

    copyToClipboard(text: string) {
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
            this.isCopied.set(true);
            setTimeout(() => this.isCopied.set(false), 2000);
        }).catch(err => {
            this.errorMessage.set('Could not copy to clipboard.');
        });
    }
}