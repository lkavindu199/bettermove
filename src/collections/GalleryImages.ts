import { CollectionConfig } from 'payload/types';

const GalleryImages: CollectionConfig = {
  slug: 'gallery-images',
  access: {
    read: () => true,
  },
  labels: {
    singular: 'Gallery Image',
    plural: 'Gallery Images',
  },
  admin: {
    useAsTitle: 'altText',
    defaultColumns: ['altText', 'image', 'order'],
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'altText',
      type: 'text',
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

export default GalleryImages;
