import { mount } from '../node_modules/@vue/test-utils';
import CompletionProfil from '../src/views/Completion-profil.vue';

test('Test of the Completion-profil vue', () => {
    const wrapper = mount(CompletionProfil);
    const updateUserMock = jest.fn();
    wrapper.setMethods({ updateUser: updateUserMock });

    // Fill out the form
    wrapper.find('#firstname').setValue('John');
    wrapper.find('#lastname').setValue('Doe');
    wrapper.find('#birthdate').setValue('1990-01-01');
    wrapper.find('#sexe').setValue('Homme');
    wrapper.find('#description').setValue('Lorem ipsum');
    wrapper.find('#location').setValue('Paris, France');
    wrapper.find('#favoriteEquipment').setValue('Camera');
    wrapper.find('#xpPro').setValue('Lorem ipsum');

    // Submit the form
    wrapper.find('form').trigger('submit.prevent');

    // Check that updateUser was called with the correct arguments
    expect(updateUserMock).toHaveBeenCalledWith({
        userId: null,
        firstname: 'John',
        lastname: 'Doe',
        birthdate: '1990-01-01',
        sexe: 'Homme',
        description: 'Lorem ipsum',
        location: 'Paris, France',
        favoriteEquipment: 'Camera',
        xpPro: 'Lorem ipsum',
    });
});