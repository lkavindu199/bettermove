import { CollectionConfig } from 'payload/types';

const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  access: {
    read: () => true,
  },
  labels: {
    singular: 'Blog Post',
    plural: 'Blog Posts',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedDate', 'author', 'categories'],
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '');
            }
            return value;
          }
        ]
      }
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      validate: (val) => {
        if (!val) return 'Title is required';
        if (val.length < 5) return 'Title must be at least 5 characters';
        return true;
      }
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        elements: [
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'blockquote',
          'link',
          'ol',
          'ul',
          'indent',
        ],
        leaves: [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'code',
        ],
        link: {
          fields: [
            {
              name: 'rel',
              label: 'Rel Attribute',
              type: 'select',
              options: [
                {
                  label: 'None',
                  value: '',
                },
                {
                  label: 'No follow',
                  value: 'nofollow',
                },
                {
                  label: 'Sponsored',
                  value: 'sponsored',
                },
                {
                  label: 'UGC',
                  value: 'ugc',
                },
              ],
            },
            {
              name: 'target',
              label: 'Target',
              type: 'select',
              defaultValue: '_self',
              options: [
                {
                  label: 'Same Tab',
                  value: '_self',
                },
                {
                  label: 'New Tab',
                  value: '_blank',
                },
              ],
            },
          ],
        },
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      defaultValue: () => new Date(),
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'team-members',
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'blog-categories',
      hasMany: true,
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
        {
          name: 'link',
          type: 'text',
          label: 'Tag URL',
          admin: {
            description: 'Optional link for this tag',
          },
        }
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          label: 'Platform',
          required: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'X (Twitter)', value: 'twitter' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          label: 'Profile URL',
          required: true,
          admin: {
            placeholder: 'https://socialmedia.com/yourhandle',
          },
        }
      ],
      maxRows: 4,
    },    
    {
      name: 'meta',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'text',
        },
        {
          name: 'keywords',
          type: 'text',
        },
        {
          name: 'canonicalURL',
          type: 'text',
          label: 'Canonical URL',
          admin: {
            description: 'Optional canonical URL if this content appears elsewhere',
          },
          validate: (val) => {
            if (!val) return true;
            try {
              new URL(val);
              return true;
            } catch (err) {
              return 'Please enter a valid URL';
            }
          },
        }
      ]
    }
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        if (!data.title || !data.featuredImage || !data.slug) {
          throw new Error('Missing required fields: title, featuredImage, or slug');
        }
        return data;
      }
    ],
    afterRead: [
      async ({ doc }) => {
        if (doc.externalLinks) {
          doc.externalLinks = doc.externalLinks.map(link => {
            if (link.url && !link.url.startsWith('http')) {
              return {
                ...link,
                url: `https://${link.url.replace(/^https?:\/\//, '')}`
              };
            }
            return link;
          });
        }
        return doc;
      }
    ]
  }
};

export default BlogPosts;