import { CollectionConfig } from 'payload/types';

const BlogCategories: CollectionConfig = {
  slug: 'blog-categories',
  access: {
    read: () => true,
  },
  labels: {
    singular: 'Blog Category',
    plural: 'Blog Categories',
  },
  admin: {
    useAsTitle: 'name',
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
    },
  ],
};

export default BlogCategories;