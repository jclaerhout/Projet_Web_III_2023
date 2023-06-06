import { createRouter, createWebHistory } from 'vue-router';
import { mount } from '@vue/test-utils';
import { describe, it, expect} from "vitest";
import router from '../src/router/index.js';

import App from '../src/App.vue';
import Connection from '../src/views/Connection.vue';
import Inscription from '../src/views/Inscription.vue';
import Utilisateur from '../src/views/Utilisateur.vue';


describe('App.vue', () => {

    const mockRouter = createRouter({
        history: createWebHistory(),
        routes: router.options.routes,
    });

    it('renders the connection component', async () => {

      const wrapper = mount(App, {
        global: {
            plugins: [mockRouter],
        },
      });
      await mockRouter.push('/connection')
      await mockRouter.isReady()

      console.log(wrapper.html())
      const connectionComponent = wrapper.findComponent(Connection);
      expect(connectionComponent.exists()).toBe(true);
    });

    it('renders the inscription component', async () => {

      const wrapper = mount(App, {
        global: {
            plugins: [mockRouter],
        },
      });
      await mockRouter.push('/inscription')
      await mockRouter.isReady()

      console.log(wrapper.html())
      const connectionComponent = wrapper.findComponent(Inscription);
      expect(connectionComponent.exists()).toBe(true);
    });


    it('renders the utilisateur component', async () => {

      const wrapper = mount(App, {
        global: {
            plugins: [mockRouter],
        },
      });
      await mockRouter.push('/utilisateur/1')
      await mockRouter.isReady()

      console.log(wrapper.html())
      const connectionComponent = wrapper.findComponent(Utilisateur);
      expect(connectionComponent.exists()).toBe(true);
    });
});