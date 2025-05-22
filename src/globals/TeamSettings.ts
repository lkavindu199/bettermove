import { GlobalConfig } from 'payload/types';

const TeamSettings: GlobalConfig = {
  slug: 'team-settings',
  access: {
    read: () => true,
  },
  label: 'Team Section Settings',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: "Professionals making your",
    },
    {
      name: 'highlightedText',
      type: 'text',
      defaultValue: "move seamless",
    },
  ],
};

export default TeamSettings;