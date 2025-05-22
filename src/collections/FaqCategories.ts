import { CollectionConfig } from 'payload/types';

const FaqCategories: CollectionConfig = {
  slug: 'faq-categories',
  access: {
    read: () => true,
  },
  labels: {
    singular: 'FAQ Category',
    plural: 'FAQ Categories',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
};

export default FaqCategories;
