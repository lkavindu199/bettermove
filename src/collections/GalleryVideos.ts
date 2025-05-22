import { CollectionConfig } from 'payload/types';

const GalleryVideos: CollectionConfig = {
  slug: 'videos',
  access: {
    read: () => true,
  },
  labels: {
    singular: 'Video',
    plural: 'Videos',
  },
  admin: {
    useAsTitle: 'altText',
    defaultColumns: ['altText', 'videoUpload', 'videoUrl', 'order'],
  },
  fields: [
    {
      name: 'videoUpload',
      label: 'Video File Upload',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload a video file (optional if using video URL)',
      },
    },
    {
      name: 'videoUrl',
      label: 'External Video URL',
      type: 'text',
      admin: {
        description: 'YouTube or Vimeo URL (optional if uploading video)',
      },
    },
    {
      name: 'thumbnail',
      label: 'Thumbnail Image',
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

export default GalleryVideos;
