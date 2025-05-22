import { CollectionConfig } from 'payload/types';

const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    read: () => true,
  },
  labels: {
    singular: 'Project',
    plural: 'Projects',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'featuredImage', 'order'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'shortDescription',
      type: 'text',
      required: true,
      maxLength: 100,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Project Content',
    },
    {
      name: 'budget',
      type: 'text',
      label: 'Budget',
    },
    {
      name: 'duration',
      type: 'text',
      label: 'Duration',
    },
    {
      name: 'date',
      type: 'date',
      label: 'Project Date',
    },
    {
      name: 'category',
      type: 'text',
      label: 'Category',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        description: 'Used for the project detail page URL',
      },
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

export default Projects;