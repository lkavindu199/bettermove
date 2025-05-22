import { CollectionConfig } from 'payload/types';

const WorkProcess: CollectionConfig = {
  slug: 'work-process',
  access: {
    read: () => true,
  },
  labels: {
    singular: 'Work Process Step',
    plural: 'Work Process Steps',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'description', 'icon'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Determines display order (ascending)',
      },
    },
  ],
};

export default WorkProcess;
