import {SnackbarType} from "@/enums/snackbar.ts";
import config from "@/config.json";

export class Snackbar {
  static snackbarElement: HTMLElement | null = null;

  static currentHideTimeout: ReturnType<typeof setTimeout> | null = null;

  static showSnackbar(
    message: string,
    type = SnackbarType.GENERAL,
    duration: number = config.SNACKBAR_GENERAL_DURATION
  ) {
    if (!this.snackbarElement) {
      this.createSnackbar();
    }

    // Update the message
    const snackbarMessage = this.snackbarElement?.querySelector('#snackbar-message');
    if (snackbarMessage) {
      snackbarMessage.textContent = message;
    }

    // Remove previously added classes
    this.snackbarElement?.classList.remove(
      'snackbar-success',
      'snackbar-warn',
      'snackbar-error',
      'snackbar-general'
    );

    // Apply the correct class and override duration if needed
    switch (type) {
      case SnackbarType.SUCCESS:
        this.snackbarElement?.classList.add('snackbar-success');
        duration = config.SNACKBAR_SUCCESS_DURATION;
        break;
      case SnackbarType.WARN:
        this.snackbarElement?.classList.add('snackbar-warn');
        duration = config.SNACKBAR_WARNING_DURATION;
        break;
      case SnackbarType.ERROR:
        this.snackbarElement?.classList.add('snackbar-error');
        duration = config.SNACKBAR_ERROR_DURATION;
        break;
      default:
        this.snackbarElement?.classList.add('snackbar-general');
        break;
    }

    // Clear any existing hide-timer
    if (this.currentHideTimeout) {
      clearTimeout(this.currentHideTimeout);
      this.currentHideTimeout = null;
    }

    this.snackbarElement?.classList.add('show');

    this.currentHideTimeout = setTimeout(() => {
      this.snackbarElement?.classList.remove('show');
    }, duration);
  }

  private static createSnackbar() {
    const snackbar = document.createElement('div');
    snackbar.classList.add('snackbar');
    snackbar.innerHTML = `
      <div class="flex justify-between items-center">
        <span id="snackbar-message"></span>
        <button id="snackbar-close"
          class="ml-5 bg-none text-white cursor-pointer font-medium p-0 hover:text-gray-100">
          Close
        </button>
      </div>
    `;

    document.body.appendChild(snackbar);
    this.snackbarElement = snackbar;

    const closeButton = snackbar.querySelector('#snackbar-close');
    closeButton?.addEventListener('click', () => {
      if (this.currentHideTimeout) {
        clearTimeout(this.currentHideTimeout);
        this.currentHideTimeout = null;
      }
      this.snackbarElement?.classList.remove('show');
    });
  }
}
