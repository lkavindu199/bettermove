import { CollectionConfig } from 'payload/types';

const Faqs: CollectionConfig = {
  slug: 'faqs',
  access: {
    read: () => true,
  },
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'order', 'category'],
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      min: 0,
      max: 5,
      admin: {
        description: 'Display order (1-5 shows in FAQ, 0 hides in main page)',
      },
      validate: (val) => {
        if (![0, 1, 2, 3, 4, 5].includes(Number(val))) {
          return 'Order must be between 0 and 5';
        }
        return true;
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'faq-categories',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
};

export default Faqs;