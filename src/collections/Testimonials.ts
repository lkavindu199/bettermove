import { CollectionConfig } from 'payload/types';

const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: {
    read: () => true,
  },
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
  },
  admin: {
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'rating'],
  },
  fields: [
    {
      name: 'authorName',
      type: 'text',
      required: true,
    },
    {
      name: 'authorTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
    },
    {
      name: 'authorImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
};

export default Testimonials;
