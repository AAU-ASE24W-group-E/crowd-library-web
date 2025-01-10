import {beforeEach, describe, expect, it, vi} from 'vitest';
import config from '@/config.json';
import {Snackbar} from "@/utils/snackbar.ts";
import {SnackbarType} from "@/enums/snackbar.ts";

describe('Snackbar', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    Snackbar.snackbarElement = null;
    Snackbar.currentHideTimeout = null;


  });
  it('should create a new snackbar if it does not exist', () => {
    expect(document.querySelector('.snackbar')).toBeNull();

    Snackbar.showSnackbar('Hello World');

    const snackbarEl = document.querySelector('.snackbar');
    expect(snackbarEl).not.toBeNull();
  });

  it('should set the snackbar message correctly', () => {
    const testMessage = 'Test Message';
    Snackbar.showSnackbar(testMessage);

    const messageEl = document.querySelector('#snackbar-message');
    expect(messageEl?.textContent).toBe(testMessage);
  });

  it('should apply general class and default duration when type is not specified', () => {
    Snackbar.showSnackbar('Hello World');

    const snackbarEl = document.querySelector('.snackbar');
    expect(snackbarEl?.classList.contains('snackbar-general')).toBe(true);
  })

  it('should apply success class when type is success and override duration', () => {
    Snackbar.showSnackbar('Hello World', SnackbarType.SUCCESS);

    const snackbarEl = document.querySelector('.snackbar');
    expect(snackbarEl?.classList.contains('snackbar-success')).toBe(true);

    const spySetTimeout = vi.spyOn(global, 'setTimeout');
    Snackbar.showSnackbar('Success Message 2', SnackbarType.SUCCESS);
    expect(spySetTimeout).toHaveBeenLastCalledWith(expect.any(Function), config.SNACKBAR_SUCCESS_DURATION);
  })

  it('should apply warn class when type is warn and override duration', () => {
    Snackbar.showSnackbar('Hello World', SnackbarType.WARN);

    const snackbarEl = document.querySelector('.snackbar');
    expect(snackbarEl?.classList.contains('snackbar-warn')).toBe(true);

    const spySetTimeout = vi.spyOn(global, 'setTimeout');
    Snackbar.showSnackbar('Success Message 2', SnackbarType.WARN);
    expect(spySetTimeout).toHaveBeenLastCalledWith(expect.any(Function), config.SNACKBAR_WARNING_DURATION);
  })

  it('should apply error class when type is error and override duration', () => {
    Snackbar.showSnackbar('Hello World', SnackbarType.ERROR);

    const snackbarEl = document.querySelector('.snackbar');
    expect(snackbarEl?.classList.contains('snackbar-error')).toBe(true);

    const spySetTimeout = vi.spyOn(global, 'setTimeout');
    Snackbar.showSnackbar('Success Message 2', SnackbarType.ERROR);
    expect(spySetTimeout).toHaveBeenLastCalledWith(expect.any(Function), config.SNACKBAR_ERROR_DURATION);
  })

  it('should remove previous class when showing a new snackbar type', () => {
    Snackbar.showSnackbar('Success First', SnackbarType.SUCCESS);
    let snackbarEl = document.querySelector('.snackbar');
    expect(snackbarEl?.classList.contains('snackbar-success')).toBe(true);

    Snackbar.showSnackbar('Error Second', SnackbarType.ERROR);
    snackbarEl = document.querySelector('.snackbar');
    expect(snackbarEl?.classList.contains('snackbar-success')).toBe(false);
    expect(snackbarEl?.classList.contains('snackbar-error')).toBe(true);
  });

  it('should hide snackbar after the specified duration', async () => {
    vi.useFakeTimers();

    Snackbar.showSnackbar('Hide test', SnackbarType.GENERAL, 1000);
    const snackbarEl = document.querySelector('.snackbar');
    expect(snackbarEl?.classList.contains('show')).toBe(true);

    // Advance time and check if the class is removed
    vi.runAllTimers();
    expect(snackbarEl?.classList.contains('show')).toBe(false);

    vi.useRealTimers();
  });

  it('should close snackbar immediately when close button is clicked', () => {
    Snackbar.showSnackbar('Close button test');
    const closeButton = document.querySelector('#snackbar-close');
    const snackbarEl = document.querySelector('.snackbar');

    expect(snackbarEl?.classList.contains('show')).toBe(true);

    closeButton?.dispatchEvent(new MouseEvent('click'));
    expect(snackbarEl?.classList.contains('show')).toBe(false);
  });
});
