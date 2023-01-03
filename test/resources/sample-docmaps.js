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
                outputs: [
                  {
                    doi: '10.1234/2022.1.2.012',
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
                ],
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
                    doi: '10.1234/2022.11.22.123',
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
                    doi: '10.1234/2022.11.22.456',
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
                    doi: '10.1234/2022.11.22.789',
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
                outputs: [
                  {
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
                ],
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
            'next-step': '_:b-7be1d33d-efaa-4fbb-ac73-1b5363b74c3a',
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
          '_:b-7be1d33d-efaa-4fbb-ac73-1b5363b74c3a': {
            assertions: [
              {
                item: 'https://doi.org/10.1101/452276',
                status: 'published',
              },
            ],
            actions: [
              {
                outputs: [
                  {
                    doi: '10.1371/journal.pone.0217516',
                    type: 'journal-publication',
                    uri: 'https://doi.org/10.1371/journal.pone.0217516',
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
  '10.21203/rs.3.rs-955726': [
    {
      '@context': 'https://w3id.org/docmaps/context.jsonld',
      id: 'https://sciety.org/docmaps/v1/articles/10.21203/rs.3.rs-955726/v1/biophysics-colab.docmap.json',
      type: 'docmap',
      created: '2021-12-21T10:31:00.000Z',
      updated: '2022-05-17T10:00:10.633Z',
      publisher: {
        id: 'https://biophysics.sciencecolab.org',
        name: 'Biophysics Colab',
        logo: 'https://sciety.org/static/groups/biophysics-colab--4bbf0c12-629b-4bb8-91d6-974f4df8efb2.png',
        homepage: 'https://biophysics.sciencecolab.org',
        account: {
          id: 'https://sciety.org/groups/biophysics-colab',
          service: 'https://sciety.org',
        },
      },
      'first-step': '_:b0',
      steps: {
        '_:b0': {
          assertions: [],
          inputs: [
            {
              doi: '10.21203/rs.3.rs-955726/v1',
              url: 'https://doi.org/10.21203/rs.3.rs-955726/v1',
            },
          ],
          actions: [
            {
              participants: [
                {
                  actor: { name: 'anonymous', type: 'person' },
                  role: 'peer-reviewer',
                },
              ],
              outputs: [
                {
                  type: 'review-article',
                  published: '2021-12-17T13:59:00.000Z',
                  content: [
                    {
                      type: 'web-page',
                      url: 'https://hypothes.is/a/iDLPjF9BEeyhWi89_nqmpA',
                    },
                    {
                      type: 'web-page',
                      url: 'https://sciety.org/articles/activity/10.21203/rs.3.rs-955726/v1#hypothesis:iDLPjF9BEeyhWi89_nqmpA',
                    },
                    {
                      type: 'web-content',
                      url: 'https://sciety.org/evaluations/hypothesis:iDLPjF9BEeyhWi89_nqmpA/content',
                    },
                  ],
                },
              ],
            },
            {
              participants: [
                {
                  actor: { name: 'anonymous', type: 'person' },
                  role: 'peer-reviewer',
                },
              ],
              outputs: [
                {
                  type: 'review-article',
                  published: '2022-01-10T19:38:00.000Z',
                  content: [
                    {
                      type: 'web-page',
                      url: 'https://hypothes.is/a/8h6HBnJMEeyIDzNrTJzkOA',
                    },
                    {
                      type: 'web-page',
                      url: 'https://sciety.org/articles/activity/10.21203/rs.3.rs-955726/v1#hypothesis:8h6HBnJMEeyIDzNrTJzkOA',
                    },
                    {
                      type: 'web-content',
                      url: 'https://sciety.org/evaluations/hypothesis:8h6HBnJMEeyIDzNrTJzkOA/content',
                    },
                  ],
                },
              ],
            },
            {
              participants: [
                {
                  actor: { name: 'anonymous', type: 'person' },
                  role: 'peer-reviewer',
                },
              ],
              outputs: [
                {
                  type: 'review-article',
                  published: '2022-05-17T09:52:32.797Z',
                  content: [
                    {
                      type: 'web-page',
                      url: 'https://hypothes.is/a/EqExCNXHEey74zd9EjVy7g',
                    },
                    {
                      type: 'web-page',
                      url: 'https://sciety.org/articles/activity/10.21203/rs.3.rs-955726/v1#hypothesis:EqExCNXHEey74zd9EjVy7g',
                    },
                    {
                      type: 'web-content',
                      url: 'https://sciety.org/evaluations/hypothesis:EqExCNXHEey74zd9EjVy7g/content',
                    },
                  ],
                },
              ],
            },
          ],
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
            name: 'bioRxiv',
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
              contents: [
                {
                  date: new Date('2020-07-23T19:26:50.243990+00:00'),
                  doi: undefined,
                  src: 'Loading...',
                },
                {
                  date: new Date('2020-07-23T19:26:51.010612+00:00'),
                  doi: undefined,
                  src: 'Loading...',
                },
                {
                  date: new Date('2020-07-23T19:26:49.980324+00:00'),
                  doi: undefined,
                  src: 'Loading...',
                },
              ],
              date: new Date('2020-07-23T19:26:49.980324+00:00'),
              type: 'reviews',
            },
            {
              contents: [
                {
                  date: new Date('2020-07-23T19:26:51.484215+00:00'),
                  doi: '10.1234/2022.1.2.012',
                  src: 'Loading...',
                },
              ],
              date: new Date('2020-07-23T19:26:51.484215+00:00'),
              type: 'response',
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
            name: 'bioRxiv',
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
              contents: [
                {
                  date: new Date('2022-02-09T18:21:15.407641+00:00'),
                  doi: '10.1234/2022.11.22.123',
                  src: 'Loading...',
                },
                {
                  date: new Date('2022-02-09T18:21:15.077442+00:00'),
                  doi: '10.1234/2022.11.22.456',
                  src: 'Loading...',
                },
                {
                  date: new Date('2022-02-09T18:21:14.076802+00:00'),
                  doi: '10.1234/2022.11.22.789',
                  src: 'Loading...',
                },
              ],
              date: new Date('2022-02-09T18:21:14.076802+00:00'),
              type: 'reviews',
            },
            {
              contents: [
                {
                  date: new Date('2022-02-09T18:21:16.420772+00:00'),
                  doi: undefined,
                  src: 'Loading...',
                },
              ],
              date: new Date('2022-02-09T18:21:16.420772+00:00'),
              type: 'response',
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
              contents: [
                {
                  date: new Date('2022-05-27T05:02:20.022255+00:00'),
                  doi: undefined,
                  src: 'Loading...',
                },
              ],
              date: new Date('2022-05-27T05:02:20.022255+00:00'),
              type: 'reviews',
            },
            {
              date: null,
              doi: '10.1371/journal.pone.0217516',
              type: 'journal-publication',
              uri: 'https://doi.org/10.1371/journal.pone.0217516',
            },
          ],
        },
      ],
    },
  },
  '10.21203/rs.3.rs-955726': {
    summary: '',
    timeline: {
      groups: [
        {
          publisher: {
            name: 'Research Square',
            uri: 'https://www.researchsquare.com',
          },
          items: [
            {
              date: null,
              type: 'preprint-posted',
              uri: 'https://doi.org/10.21203/rs.3.rs-955726/v1',
            },
          ],
        },
        {
          publisher: {
            name: 'Biophysics Colab',
            uri: 'https://biophysics.sciencecolab.org',
          },
          items: [
            {
              date: new Date('2021-12-17T13:59:00.000Z'),
              doi: undefined,
              type: 'review-article',
              uri: 'https://hypothes.is/a/iDLPjF9BEeyhWi89_nqmpA',
            },
            {
              date: new Date('2022-01-10T19:38:00.000Z'),
              doi: undefined,
              type: 'review-article',
              uri: 'https://hypothes.is/a/8h6HBnJMEeyIDzNrTJzkOA',
            },
            {
              date: new Date('2022-05-17T09:52:32.797Z'),
              doi: undefined,
              type: 'review-article',
              uri: 'https://hypothes.is/a/EqExCNXHEey74zd9EjVy7g',
            },
          ],
        },
      ],
    },
  },
};
