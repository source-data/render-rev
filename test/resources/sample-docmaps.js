export const docmapsByDoi = {
  '10.1101/2020.07.20.212886': [
    {
      docmap: {
        'first-step': '_:b-431e7d1f-7db6-444c-a21d-14faed52ccc2',
        provider: 'https://eeb.embo.org',
        created: '2022-09-21T09:10:51.7Z',
        generatedAt: '2022-09-21T09:10:51.7Z',
        publisher: {
          peer_review_policy: 'https://reviewcommons.org/reviewers',
          name: 'review commons',
          url: 'https://reviewcommons.org',
        },
        id: 'https://eeb.embo.org/api/v2/docmap/10.1101/2020.07.20.212886',
        type: 'docmap',
        steps: {
          '_:b-78d61114-764f-41a4-a00e-29eefa14bcc3': {
            assertions: [
              {
                item: 'https://doi.org/10.1101/2020.07.20.212886',
                status: '',
              },
            ],
            actions: [
              {
                outputs: {
                  published: '2020-07-23T19:26:51.484215+00:00',
                  type: 'author-response',
                  uri: 'https://eeb.embo.org/api/v2/review_material/1837714',
                  content: [
                    {
                      id: '10.1101/2020.07.20.212886',
                      type: 'web-page',
                      service: 'https://biorxiv.org',
                      url: 'https://biorxiv.org/content/10.1101/2020.07.20.212886#review',
                    },
                    {
                      id: '1837714',
                      type: 'web-page',
                      service: 'https://eeb.embo.org',
                      url: 'https://eeb.embo.org/api/v2/review_material/1837714',
                    },
                    {
                      id: 'ddoLMM0aEeqoVrMgA6Yx0w',
                      type: 'web-page',
                      service: 'https://hypothes.is',
                      url: 'https://hypothes.is/a/ddoLMM0aEeqoVrMgA6Yx0w',
                    },
                  ],
                },
                participants: [
                  {
                    actor: {
                      firstName: 'Yubo',
                      type: 'person',
                      familyName: 'Cheng',
                    },
                    role: 'author',
                  },
                  {
                    actor: {
                      firstName: 'Luke',
                      type: 'person',
                      familyName: 'Saville',
                    },
                    role: 'author',
                  },
                  {
                    actor: {
                      firstName: 'Athanasios',
                      type: 'person',
                      familyName: 'Zovoilis',
                    },
                    role: 'author',
                  },
                  {
                    actor: {
                      firstName: 'Majid',
                      type: 'person',
                      familyName: 'Mohajerani',
                    },
                    role: 'author',
                  },
                  {
                    actor: {
                      firstName: 'Christopher',
                      type: 'person',
                      familyName: 'Isaac',
                    },
                    role: 'author',
                  },
                  {
                    actor: {
                      firstName: 'Babita',
                      type: 'person',
                      familyName: 'Gollen',
                    },
                    role: 'author',
                  },
                  {
                    actor: {
                      firstName: 'Jogender',
                      type: 'person',
                      familyName: 'Mehla',
                    },
                    role: 'author',
                  },
                ],
              },
            ],
            inputs: [
              { uri: 'https://eeb.embo.org/api/v2/review_material/1837718' },
              { uri: 'https://eeb.embo.org/api/v2/review_material/1837715' },
              { uri: 'https://eeb.embo.org/api/v2/review_material/1837719' },
            ],
          },
          '_:b-431e7d1f-7db6-444c-a21d-14faed52ccc2': {
            'next-step': '_:b-78d61114-764f-41a4-a00e-29eefa14bcc3',
            assertions: [
              {
                item: 'https://doi.org/10.1101/2020.07.20.212886',
                status: 'reviewed',
              },
            ],
            actions: [
              {
                outputs: [
                  {
                    published: '2020-07-23T19:26:50.243990+00:00',
                    type: 'review',
                    uri: 'https://eeb.embo.org/api/v2/review_material/1837718',
                    content: [
                      {
                        id: '10.1101/2020.07.20.212886',
                        type: 'web-page',
                        service: 'https://biorxiv.org',
                        url: 'https://biorxiv.org/content/10.1101/2020.07.20.212886#review',
                      },
                      {
                        id: 'dPqpQM0aEeqnEbNVsAC2Gw',
                        type: 'web-page',
                        service: 'https://hypothes.is/',
                        url: 'https://hypothes.is/a/dPqpQM0aEeqnEbNVsAC2Gw',
                      },
                      {
                        id: '1837718',
                        type: 'web-page',
                        service: 'https://eeb.embo.org/',
                        url: 'https://eeb.embo.org/api/v2/review_material/1837718',
                      },
                    ],
                  },
                ],
                participants: [
                  {
                    actor: { name: 'anonymous', type: 'person' },
                    role: 'peer-reviewer',
                  },
                ],
              },
              {
                outputs: [
                  {
                    published: '2020-07-23T19:26:51.010612+00:00',
                    type: 'review',
                    uri: 'https://eeb.embo.org/api/v2/review_material/1837715',
                    content: [
                      {
                        id: 'dXLjdM0aEeqJVpd1GQZfAQ',
                        type: 'web-page',
                        service: 'https://hypothes.is/',
                        url: 'https://hypothes.is/a/dXLjdM0aEeqJVpd1GQZfAQ',
                      },
                      {
                        id: '10.1101/2020.07.20.212886',
                        type: 'web-page',
                        service: 'https://biorxiv.org',
                        url: 'https://biorxiv.org/content/10.1101/2020.07.20.212886#review',
                      },
                      {
                        id: '1837715',
                        type: 'web-page',
                        service: 'https://eeb.embo.org/',
                        url: 'https://eeb.embo.org/api/v2/review_material/1837715',
                      },
                    ],
                  },
                ],
                participants: [
                  {
                    actor: { name: 'anonymous', type: 'person' },
                    role: 'peer-reviewer',
                  },
                ],
              },
              {
                outputs: [
                  {
                    published: '2020-07-23T19:26:49.980324+00:00',
                    type: 'review',
                    uri: 'https://eeb.embo.org/api/v2/review_material/1837719',
                    content: [
                      {
                        id: 'dMsVVM0aEeqpiHvipzDs-Q',
                        type: 'web-page',
                        service: 'https://hypothes.is/',
                        url: 'https://hypothes.is/a/dMsVVM0aEeqpiHvipzDs-Q',
                      },
                      {
                        id: '1837719',
                        type: 'web-page',
                        service: 'https://eeb.embo.org/',
                        url: 'https://eeb.embo.org/api/v2/review_material/1837719',
                      },
                      {
                        id: '10.1101/2020.07.20.212886',
                        type: 'web-page',
                        service: 'https://biorxiv.org',
                        url: 'https://biorxiv.org/content/10.1101/2020.07.20.212886#review',
                      },
                    ],
                  },
                ],
                participants: [
                  {
                    actor: { name: 'anonymous', type: 'person' },
                    role: 'peer-reviewer',
                  },
                ],
              },
            ],
            inputs: [
              {
                published: '2020-07-21T00:00:00Z',
                uri: 'https://doi.org/10.1101/2020.07.20.212886',
                doi: '10.1101/2020.07.20.212886',
              },
            ],
          },
        },
      },
    },
  ],
  '10.1101/2021.10.26.465695': [
    {
      docmap: {
        'first-step': '_:b-a4df011c-4a0d-47a8-8197-75fb78c6d877',
        provider: 'https://eeb.embo.org',
        created: '2022-09-22T00:06:15.803Z',
        generatedAt: '2022-09-22T00:06:15.803Z',
        publisher: {
          peer_review_policy: 'https://reviewcommons.org/reviewers',
          name: 'review commons',
          url: 'https://reviewcommons.org',
        },
        id: 'https://eeb.embo.org/api/v2/docmap/10.1101/2021.10.26.465695',
        type: 'docmap',
        steps: {
          '_:b-a4df011c-4a0d-47a8-8197-75fb78c6d877': {
            'next-step': '_:b-351d9569-2829-454b-9dfc-7f95507fe824',
            assertions: [
              {
                item: 'https://doi.org/10.1101/2021.10.26.465695',
                status: 'reviewed',
              },
            ],
            actions: [
              {
                outputs: [
                  {
                    published: '2022-02-09T18:21:15.407641+00:00',
                    type: 'review',
                    uri: 'https://eeb.embo.org/api/v2/review_material/20539358',
                    content: [
                      {
                        id: '20539358',
                        type: 'web-page',
                        service: 'https://eeb.embo.org/',
                        url: 'https://eeb.embo.org/api/v2/review_material/20539358',
                      },
                      {
                        id: '10.1101/2021.10.26.465695',
                        type: 'web-page',
                        service: 'https://biorxiv.org',
                        url: 'https://biorxiv.org/content/10.1101/2021.10.26.465695#review',
                      },
                      {
                        id: 'EWM9QonVEeyZ1UP1Ek9W3g',
                        type: 'web-page',
                        service: 'https://hypothes.is/',
                        url: 'https://hypothes.is/a/EWM9QonVEeyZ1UP1Ek9W3g',
                      },
                    ],
                  },
                ],
                participants: [
                  {
                    actor: { name: 'anonymous', type: 'person' },
                    role: 'peer-reviewer',
                  },
                ],
              },
              {
                outputs: [
                  {
                    published: '2022-02-09T18:21:15.077442+00:00',
                    type: 'review',
                    uri: 'https://eeb.embo.org/api/v2/review_material/20539359',
                    content: [
                      {
                        id: '20539359',
                        type: 'web-page',
                        service: 'https://eeb.embo.org/',
                        url: 'https://eeb.embo.org/api/v2/review_material/20539359',
                      },
                      {
                        id: '10.1101/2021.10.26.465695',
                        type: 'web-page',
                        service: 'https://biorxiv.org',
                        url: 'https://biorxiv.org/content/10.1101/2021.10.26.465695#review',
                      },
                      {
                        id: 'ETFRponVEeyQCrc0YKW7Yw',
                        type: 'web-page',
                        service: 'https://hypothes.is/',
                        url: 'https://hypothes.is/a/ETFRponVEeyQCrc0YKW7Yw',
                      },
                    ],
                  },
                ],
                participants: [
                  {
                    actor: { name: 'anonymous', type: 'person' },
                    role: 'peer-reviewer',
                  },
                ],
              },
              {
                outputs: [
                  {
                    published: '2022-02-09T18:21:14.076802+00:00',
                    type: 'review',
                    uri: 'https://eeb.embo.org/api/v2/review_material/20539360',
                    content: [
                      {
                        id: '20539360',
                        type: 'web-page',
                        service: 'https://eeb.embo.org/',
                        url: 'https://eeb.embo.org/api/v2/review_material/20539360',
                      },
                      {
                        id: '10.1101/2021.10.26.465695',
                        type: 'web-page',
                        service: 'https://biorxiv.org',
                        url: 'https://biorxiv.org/content/10.1101/2021.10.26.465695#review',
                      },
                      {
                        id: 'EJc5BInVEey7Nhcc_EWwnw',
                        type: 'web-page',
                        service: 'https://hypothes.is/',
                        url: 'https://hypothes.is/a/EJc5BInVEey7Nhcc_EWwnw',
                      },
                    ],
                  },
                ],
                participants: [
                  {
                    actor: { name: 'anonymous', type: 'person' },
                    role: 'peer-reviewer',
                  },
                ],
              },
            ],
            inputs: [
              {
                published: '2021-10-26T00:00:00Z',
                uri: 'https://doi.org/10.1101/2021.10.26.465695',
                doi: '10.1101/2021.10.26.465695',
              },
            ],
          },
          '_:b-351d9569-2829-454b-9dfc-7f95507fe824': {
            assertions: [
              { item: 'https://doi.org/10.1101/2021.10.26.465695', status: '' },
            ],
            actions: [
              {
                outputs: {
                  published: '2022-02-09T18:21:16.420772+00:00',
                  type: 'author-response',
                  uri: 'https://eeb.embo.org/api/v2/review_material/20539357',
                  content: [
                    {
                      id: '10.1101/2021.10.26.465695',
                      type: 'web-page',
                      service: 'https://biorxiv.org',
                      url: 'https://biorxiv.org/content/10.1101/2021.10.26.465695#review',
                    },
                    {
                      id: 'EgAsdInVEeyPEgtK4clUNg',
                      type: 'web-page',
                      service: 'https://hypothes.is',
                      url: 'https://hypothes.is/a/EgAsdInVEeyPEgtK4clUNg',
                    },
                    {
                      id: '20539357',
                      type: 'web-page',
                      service: 'https://eeb.embo.org',
                      url: 'https://eeb.embo.org/api/v2/review_material/20539357',
                    },
                  ],
                },
                participants: [
                  {
                    actor: {
                      firstName: 'Felix Y.',
                      type: 'person',
                      familyName: 'Zhou',
                    },
                    role: 'author',
                  },
                  {
                    actor: {
                      firstName: 'Siu-Shing',
                      type: 'person',
                      familyName: 'Wong',
                    },
                    role: 'author',
                  },
                  {
                    actor: {
                      firstName: 'Zachary M.',
                      type: 'person',
                      familyName: 'Wilmott',
                    },
                    role: 'author',
                  },
                  {
                    actor: {
                      firstName: 'Kwai-Yin',
                      type: 'person',
                      familyName: 'Chau',
                    },
                    role: 'author',
                  },
                  {
                    actor: {
                      firstName: 'Saroj',
                      type: 'person',
                      familyName: 'Saurya',
                    },
                    role: 'author',
                  },
                  {
                    actor: {
                      firstName: 'Jordan W.',
                      type: 'person',
                      familyName: 'Raff',
                    },
                    role: 'author',
                  },
                  {
                    actor: {
                      firstName: 'Ines',
                      type: 'person',
                      familyName: 'Alvarez-Rodrigo',
                    },
                    role: 'author',
                  },
                  {
                    actor: {
                      firstName: 'Alain',
                      type: 'person',
                      familyName: 'Goriely',
                    },
                    role: 'author',
                  },
                ],
              },
            ],
            inputs: [
              { uri: 'https://eeb.embo.org/api/v2/review_material/20539358' },
              { uri: 'https://eeb.embo.org/api/v2/review_material/20539359' },
              { uri: 'https://eeb.embo.org/api/v2/review_material/20539360' },
            ],
          },
        },
      },
    },
    {
      docmap: {
        'first-step': '_:b-ca656813-248b-4c75-b001-6a40b57f6697',
        provider: 'https://eeb.embo.org',
        created: '2022-09-22T00:06:15.803Z',
        generatedAt: '2022-09-22T00:06:15.803Z',
        publisher: {
          peer_review_policy:
            'https://www.embopress.org/page/journal/17444292/refereeguide',
          name: 'embo press',
          url: 'https://embopress.org/',
        },
        id: 'https://eeb.embo.org/api/v2/docmap/10.1101/2021.10.26.465695',
        type: 'docmap',
        steps: {
          '_:b-ca656813-248b-4c75-b001-6a40b57f6697': {
            assertions: [
              {
                item: 'https://doi.org/10.1101/2021.10.26.465695',
                status: 'reviewed',
              },
            ],
            actions: [
              {
                outputs: [
                  {
                    published: '2022-05-27T05:02:20.022255+00:00',
                    type: 'review',
                    uri: 'https://eeb.embo.org/api/v2/review_material/22676192',
                    content: [
                      {
                        id: 'L9_-2N16EeyKUptliO7zpQ',
                        type: 'web-page',
                        service: 'https://hypothes.is/',
                        url: 'https://hypothes.is/a/L9_-2N16EeyKUptliO7zpQ',
                      },
                      {
                        id: '22676192',
                        type: 'web-page',
                        service: 'https://eeb.embo.org/',
                        url: 'https://eeb.embo.org/api/v2/review_material/22676192',
                      },
                      {
                        id: '10.1101/2021.10.26.465695',
                        type: 'web-page',
                        service: 'https://biorxiv.org',
                        url: 'https://biorxiv.org/content/10.1101/2021.10.26.465695#review',
                      },
                    ],
                  },
                ],
              },
            ],
            inputs: [
              {
                published: '2021-10-26T00:00:00Z',
                uri: 'https://doi.org/10.1101/2021.10.26.465695',
                doi: '10.1101/2021.10.26.465695',
              },
            ],
          },
        },
      },
    },
  ],
};

export const reviewProcessByDoi = {
  '10.1101/2020.07.20.212886': {
    summary: '',
    timeline: {
      groups: [
        {
          publisher: {
            name: 'biorxiv',
            uri: 'https://www.biorxiv.org',
          },
          items: [
            {
              date: new Date('2020-07-21T00:00:00Z'),
              type: 'preprint-posted',
              uri: 'https://doi.org/10.1101/2020.07.20.212886',
            },
          ],
        },
        {
          publisher: {
            name: 'review commons',
            uri: 'https://reviewcommons.org',
          },
          items: [
            {
              type: 'reviews',
              date: new Date('2020-07-23T19:26:49.980324+00:00'),
              uris: [
                'https://eeb.embo.org/api/v2/review_material/1837718',
                'https://eeb.embo.org/api/v2/review_material/1837715',
                'https://eeb.embo.org/api/v2/review_material/1837719',
              ],
            },
            {
              date: new Date('2020-07-23T19:26:51.484215+00:00'),
              type: 'response',
              uri: 'https://eeb.embo.org/api/v2/review_material/1837714',
            },
          ],
        },
      ],
    },
  },
  '10.1101/2021.10.26.465695': {
    summary: '',
    timeline: {
      groups: [
        {
          publisher: {
            name: 'biorxiv',
            uri: 'https://www.biorxiv.org',
          },
          items: [
            {
              date: new Date('2021-10-26T00:00:00Z'),
              type: 'preprint-posted',
              uri: 'https://doi.org/10.1101/2021.10.26.465695',
            },
          ],
        },
        {
          publisher: {
            name: 'review commons',
            uri: 'https://reviewcommons.org',
          },
          items: [
            {
              type: 'reviews',
              date: new Date('2022-02-09T18:21:14.076802+00:00'),
              uris: [
                'https://eeb.embo.org/api/v2/review_material/20539358',
                'https://eeb.embo.org/api/v2/review_material/20539359',
                'https://eeb.embo.org/api/v2/review_material/20539360',
              ],
            },
            {
              date: new Date('2022-02-09T18:21:16.420772+00:00'),
              type: 'response',
              uri: 'https://eeb.embo.org/api/v2/review_material/20539357',
            },
          ],
        },
        {
          publisher: {
            name: 'embo press',
            uri: 'https://embopress.org/',
          },
          items: [
            {
              date: new Date('2022-05-27T05:02:20.022255+00:00'),
              type: 'reviews',
              uris: ['https://eeb.embo.org/api/v2/review_material/22676192'],
            },
          ],
        },
      ],
    },
  },
};