import { mount, shallowMount } from '@vue/test-utils';
import { describe, it, expect} from "vitest";

import App from '../src/app.vue';

describe('App', () => {
  it('renders the component', () => {
    const wrapper = shallowMount(App);
    expect(wrapper.exists()).toBe(true);
  });
  it('calls handleSearch when search input is focused', async () => {
    const wrapper = mount(App);
    await wrapper.find('v-text-field').trigger('click')

  });
  it('check the data', () => {
    const wrapper = mount (App);
    const dataApp = wrapper.get('[placeholder="Recherche"]');
    expect(dataApp.searchQuery).toBe(undefined);
  });
  it('renders the connection button', () => {
    const wrapper = mount(App);
    expect(wrapper.find('[to="/connection"]').exists()).toBe(true);
  })
  it('does not render the profile link', () => {
    const wrapper = mount(App);
    expect(wrapper.find('[to="/profil"]').exists()).toBe(false);
  });
  it('does not render the deconnection button', () => {
    const wrapper = mount(App);
    expect(wrapper.find('[v-if="isConnected"]').exists()).toBe(false);
  });
});
