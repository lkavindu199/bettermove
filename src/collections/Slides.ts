import { CollectionConfig } from 'payload/types';

const Slides: CollectionConfig = {
  slug: 'slides',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'buttonText',
      type: 'text',
    },
    {
      name: 'buttonLink',
      type: 'text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'reviews',
      type: 'group',
      fields: [
        {
          name: 'rating',
          type: 'number',
        },
        {
          name: 'count',
          type: 'number',
        }
      ]
    },
    {
      name: 'satisfyCustomerImages',
      label: 'Satisfy Customer Images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        }
      ]
    }
  ],
};

export default Slides;
