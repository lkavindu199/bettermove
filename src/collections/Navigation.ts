import { CollectionConfig } from 'payload/types';

const linkTypeOptions = [
  { label: 'Internal Page', value: 'internal' },
  { label: 'External URL', value: 'external' },
  { label: 'Anchor Link', value: 'anchor' },
];

const Navigation: CollectionConfig = {
  slug: 'navigation',
  labels: {
    singular: 'Navigation Item',
    plural: 'Navigation Items',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'linkType', 'order'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'linkType',
      type: 'select',
      options: linkTypeOptions,
      required: true,
      defaultValue: 'internal',
    },
    {
      name: 'internalUrl',
      type: 'text',
      label: 'Internal URL (e.g. /about)',
      admin: {
        condition: (_, siblingData) => siblingData.linkType === 'internal',
      },
    },
    {
      name: 'externalUrl',
      type: 'text',
      label: 'External URL (e.g. https://example.com)',
      admin: {
        condition: (_, siblingData) => siblingData.linkType === 'external',
      },
    },
    {
      name: 'anchorId',
      type: 'text',
      label: 'Anchor (e.g. #features)',
      admin: {
        condition: (_, siblingData) => siblingData.linkType === 'anchor',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'subItems',
      type: 'array',
      label: 'Submenu Items',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'linkType',
          type: 'select',
          options: linkTypeOptions,
          required: true,
          defaultValue: 'internal',
        },
        {
          name: 'internalUrl',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData.linkType === 'internal',
          },
        },
        {
          name: 'externalUrl',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData.linkType === 'external',
          },
        },
        {
          name: 'anchorId',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData.linkType === 'anchor',
          },
        },
      ],
    },
  ],
};

export default Navigation;
