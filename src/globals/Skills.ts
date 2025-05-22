import { GlobalConfig } from 'payload/types';

const Skills: GlobalConfig = {
  slug: 'skills',
  access: {
    read: () => true,
  },
  label: 'Skills Section',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'buttonText',
      type: 'text',
      defaultValue: 'book service now',
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'position',
          type: 'select',
          options: [
            { label: 'Image 1', value: 'image-1' },
            { label: 'Image 2', value: 'image-2' },
          ],
          required: true,
        }
      ],
      maxRows: 2,
    },
    {
      name: 'skills',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'percentage',
          type: 'number',
          min: 0,
          max: 100,
          required: true,
        }
      ],
    },
  ],
};

export default Skills;