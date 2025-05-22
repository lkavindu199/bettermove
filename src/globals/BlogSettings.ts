import { GlobalConfig } from 'payload/types';

const BlogSettings: GlobalConfig = {
  slug: 'blog-settings',
  access: {
    read: () => true,
  },
  label: 'Blog Section Settings',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: "Expert Advice for Stress-",
      required: true,
    },
    {
      name: 'highlightedText',
      type: 'text',
      defaultValue: "Free Moves",
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: "Stay informed with our expert moving advice and practical insights. Whether you're relocating locally or long-distance, our blog has everything you need to make your journey seamless.",
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    }
  ],
};

export default BlogSettings;