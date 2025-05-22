import { GlobalConfig } from 'payload/types';

const GallerySettings: GlobalConfig = {
  slug: 'gallery-settings',
  access: {
    read: () => true,
  },
  label: 'Gallery Page Settings',
  fields: [
    {
      name: 'imagepageTitle',
      type: 'text',
      defaultValue: 'Image gallery',
    },
    {
      name: 'imagehighlightedText',
      type: 'text',
    },
    {
        name: 'videopageTitle',
        type: 'text',
        defaultValue: 'Video gallery',
      },
      {
        name: 'videohighlightedText',
        type: 'text',
      },
  ],
};

export default GallerySettings;