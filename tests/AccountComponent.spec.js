import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import AccountComponent from '@/components/AccountComponent.vue';
import { createPinia, setActivePinia } from 'pinia';
import { userService } from '@/services/UserService.ts';
import { Snackbar } from '@/utils/snackbar.ts';
import { SnackbarType } from '@/enums/snackbar.ts';

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('@/services/UserService.ts', () => ({
  userService: {
    updateUserInfo: vi.fn(),
    updatePassword: vi.fn(),
  },
}));

vi.mock('@/stores/user', () => ({
  useUserStore: () => ({
    user: {
      id: 'user-id',
      email: 'test@example.com',
      username: 'testuser',
    },
    setUser: vi.fn(),
  }),
}));

vi.mock('@/utils/snackbar.ts', () => ({
  Snackbar: {
    showSnackbar: vi.fn(),
  },
}));

describe('AccountComponent', () => {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
    wrapper = mount(AccountComponent, {
      global: {
        stubs: ['router-link', 'font-awesome-icon'],
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the component properly', () => {
    expect(wrapper.find('form').exists()).toBe(true);
    expect(wrapper.find('input#email').element.value).toBe('test@example.com');
    expect(wrapper.find('input#username').element.value).toBe('testuser');
  });

  it('validates and updates user info successfully', async () => {
    userService.updateUserInfo.mockResolvedValueOnce();

    await wrapper.find('input#email').setValue('new-email@example.com');
    await wrapper.find('input#username').setValue('new-username');
    await wrapper.find('form').trigger('submit.prevent');

    expect(userService.updateUserInfo).toHaveBeenCalledWith('user-id', {
      email: 'new-email@example.com',
      username: 'new-username',
    });
    expect(Snackbar.showSnackbar).toHaveBeenCalledWith(
      'User info updated successfully!',
      SnackbarType.SUCCESS,
    );
  });

  it('resets form to original values on user info update failure', async () => {
    userService.updateUserInfo.mockRejectedValueOnce(new Error('Update failed'));

    await wrapper.find('input#email').setValue('invalid-email@example.com');
    await wrapper.find('input#username').setValue('invalid-username');
    await wrapper.find('form').trigger('submit.prevent');

    expect(Snackbar.showSnackbar).toHaveBeenCalledWith(
      'Failed to update user info. Reverting changes.',
      SnackbarType.ERROR,
    );

    expect(wrapper.find('input#email').element.value).toBe('test@example.com');
    expect(wrapper.find('input#username').element.value).toBe('testuser');
  });

  it('changes password successfully', async () => {
    userService.updatePassword.mockResolvedValueOnce();

    await wrapper.find('input#old-password').setValue('old-password');
    await wrapper.find('input#new-password').setValue('new-password');
    await wrapper.find('input#confirm-password').setValue('new-password');
    await wrapper.find('form').trigger('submit.prevent');


    expect(Snackbar.showSnackbar).toHaveBeenCalledWith(
      'User info updated successfully!',
      SnackbarType.SUCCESS
    );
  });

});
