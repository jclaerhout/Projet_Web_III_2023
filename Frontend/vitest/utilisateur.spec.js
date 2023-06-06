import { shallowMount } from '@vue/test-utils';
import { describe, it, expect} from "vitest";

import Utilisateur from '../src/views/utilisateur.vue';

describe('User page', () => {
    it('renders user informations', () => {
        const user = {
            name: 'Doe',
            firstname: 'John',
            email: 'johndoe@gmail.com',
            location: 'Paris',
            link:'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
            description: 'Ma photo',
        };
        const wrapper = shallowMount(Utilisateur, {
            data() {
                return {
                    user: user,
                };
            },
        });

        expect(wrapper.find('h4').text()).toBe('Doe John');
        expect(wrapper.find('[v-if="user.email"]').text()).toBe('johndoe@gmail.com');
        expect(wrapper.find('[v-if="user.location"]').text()).toBe('Paris');
        expect(wrapper.find('v-img').attributes('src')).toBe('https://cdn.vuetifyjs.com/images/cards/sunshine.jpg');
        expect(wrapper.find('#description').text()).toBe('Ma photo');
    });
})