import { GlobalConfig } from 'payload/types';

const ContactInfoGlobal: GlobalConfig = {
  slug: 'contact-info',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'phone', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'address', type: 'text', required: true },
    { name: 'sectionTitle', type: 'text', label: 'Section Title' },
    { name: 'sectionSubtitle', type: 'text', label: 'Section Subtitle' },
    { name: 'callToActionText', type: 'text', label: 'Call to Action Text', defaultValue: "Call to question" },
    { name: 'emailText', type: 'text', label: 'Email Text', defaultValue: "Send e-mail" },
    { name: 'visitText', type: 'text', label: 'Visit Text', defaultValue: "Visit anytime" },
    { name: 'formTitle', type: 'text', label: 'Form Title', defaultValue: "Send message with us" },
    {
      label: 'Google Map Location',
      name: 'location',
      type: 'group',
      fields: [
        { name: 'latitude', type: 'number', required: true },
        { name: 'longitude', type: 'number', required: true },
      ],
    },
  ],
};

export default ContactInfoGlobal;