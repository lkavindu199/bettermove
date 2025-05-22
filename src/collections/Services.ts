// collections/Services.ts
import { CollectionConfig } from 'payload/types';

const Services: CollectionConfig = {
  slug: 'services',
  access: {
    read: () => true,
  },
  labels: {
    singular: 'Service',
    plural: 'Services',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'description', 'icon', 'order'],
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
      name: 'content',
      type: 'richText',
      label: 'Detailed Content',
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image (for single page)',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Determines display order (ascending)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        description: 'Used for the service detail page URL',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'service-categories',
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
};

export default Services;