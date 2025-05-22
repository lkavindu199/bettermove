import { GlobalConfig } from 'payload/types';

const FaqSettings: GlobalConfig = {
  slug: 'faq-settings',
  access: {
    read: () => true,
  },
  label: 'FAQ Section Settings',
  fields: [
    {
      name: 'pageTitle',
      type: 'text',
      defaultValue: 'Answers to your questions',
      required: true,
    },
    {
      name: 'highlightedText',
      type: 'text',
      defaultValue: 'moving questions',
    },
    {
      name: 'sidebarTitle',
      type: 'text',
      defaultValue: 'How can we help?',
    },
    {
      name: 'sidebarContent',
      type: 'textarea',
      defaultValue: 'Get in touch with us for more help.',
    },
    {
      name: 'sidebarContact',
      type: 'group',
      fields: [
        {
          name: 'phone',
          type: 'text',
          required: true,
          defaultValue: '+1234567890',
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          defaultValue: 'help@example.com',
        },
        {
          name: 'address',
          type: 'text',
          required: true,
          defaultValue: '123 Main St, Anytown',
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'YouTube Video URL',
      defaultValue: 'https://www.youtube.com/watch?v=uPpuVV42YsQ',
    },
  ],
};

export default FaqSettings;
