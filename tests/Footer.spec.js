import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import Footer from "@/components/Footer.vue";

const push = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push,
  }),
}));

describe('FooterComponent', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Footer, {
      global: {
        stubs: {
          'router-link': {
            template: '<a :href="to" :class="$attrs.class"><slot /></a>',
            props: ['to']
          },
          'font-awesome-icon': true
        },
      },
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('has correct attributes for social media links', () => {
    const socialLinks = wrapper.findAll('a.tw-icon')
    expect(socialLinks).toHaveLength(3)

    socialLinks.forEach(link => {
      expect(link.attributes('rel')).toBe('noopener noreferrer')
      expect(link.attributes('target')).toBe('_blank')
    })
  })

  it('renders imprint link with correct text', () => {
    const imprintLink = wrapper.find('a[href="/imprint"]')
    expect(imprintLink.exists()).toBe(true)
    expect(imprintLink.classes()).toContain('tw-link-style')
  })

  it('renders privacy policy link with correct text', () => {
    const privacyLink = wrapper.find('a[href="/data-privacy"]')
    expect(privacyLink.exists()).toBe(true)
    expect(privacyLink.classes()).toContain('tw-link-style')
  })
});
