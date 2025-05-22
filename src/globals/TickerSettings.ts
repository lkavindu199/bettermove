import { GlobalConfig } from 'payload/types';

const TickerSettings: GlobalConfig = {
  slug: 'ticker-settings',
  access: {
    read: () => true,
  },
  label: 'Scrolling Ticker Settings',
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
        }
      ],
      defaultValue: [
        { text: "100% trusted transportation" },
        { text: "Award-winning service" },
        { text: "24/7 customer support" }
      ]
    },
    {
      name: 'speed',
      type: 'number',
      defaultValue: 20,
      admin: {
        description: 'Animation speed (lower is faster)'
      }
    }
  ],
};

export default TickerSettings;