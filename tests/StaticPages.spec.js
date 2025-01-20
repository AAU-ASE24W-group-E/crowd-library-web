// import { mount } from '@vue/test-utils';
// import { describe, it, beforeEach, vi, expect,afterEach } from 'vitest';
// import { createPinia, setActivePinia } from 'pinia';
// import Imprint from '@/components/Imprint.vue';
// import DataPrivacy from '@/components/DataPrivacy.vue'
// import ImprintView from '@/views/static/ImprintView.vue'
//
// vi.mock('vue-router', () => ({
//   useRouter: () => ({
//     push: vi.fn(),
//   }),
// }));
// describe('Imprint', () => {
//   let wrapper;
//
//   beforeEach(() => {
//     setActivePinia(createPinia());
//     vi.clearAllMocks();
//     wrapper = mount(Imprint, {
//       global: {
//         stubs: ['router-link', 'font-awesome-icon'],
//       },
//     });
//   });
//
//   afterEach(() => {
//     vi.restoreAllMocks();
//   });
//
//   it('should render the components correctly', () => {
//     expect(wrapper.find('.tw-page-container').exists()).toBe(true);
//   });
// });
//
// describe('Imprint view', () => {
//   let wrapper;
//
//   beforeEach(() => {
//     setActivePinia(createPinia());
//     vi.clearAllMocks();
//     wrapper = mount(ImprintView, {
//       global: {
//         stubs: ['router-link', 'font-awesome-icon'],
//       },
//     });
//   });
//
//   afterEach(() => {
//     vi.restoreAllMocks();
//   });
//
//   it('should render the components correctly', () => {
//     expect(wrapper.find('.tw-page-container').exists()).toBe(true);
//   });
// });
//
// describe('DataPrivacy', () => {
//   let wrapper;
//
//   beforeEach(() => {
//     setActivePinia(createPinia());
//     vi.clearAllMocks();
//     wrapper = mount(DataPrivacy, {
//       global: {
//         stubs: ['router-link', 'font-awesome-icon'],
//       },
//     });
//   });
//
//   afterEach(() => {
//     vi.restoreAllMocks();
//   });
//
//   it('should render the components correctly', () => {
//     expect(wrapper.find('.tw-page-container').exists()).toBe(true);
//   });
// });
