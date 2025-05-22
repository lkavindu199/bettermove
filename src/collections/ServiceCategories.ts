import { CollectionConfig } from 'payload/types';

const ServiceCategories: CollectionConfig = {
  slug: 'service-categories',
  access: {
    read: () => true,
  },
  labels: {
    singular: 'Service Category',
    plural: 'Service Categories',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Used for category URLs',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
};

export default ServiceCategories;