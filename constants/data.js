import moment from 'moment';

const data = [
  {
    name: 'Hardware',
    amount: '$1,500',
    date: moment(),
    isReceived: true,
    items: [
      {
        name: 'Monitor',
        amount: '$85',
      },
      {
        name: 'Main CPU',
        amount: '$358.00',
      },
      {
        name: 'RAM',
        amount: '$450.5',
      },
    ],
  },
  {
    name: 'Software',
    amount: '$1,093',
    date: moment(),
    isReceived: true,
    items: [
      {
        name: 'Win 10 Pro',
        amount: '$100',
      },
      {
        name: 'Photoshop Adobe',
        amount: '$358.00',
      },
      {
        name: 'kaspersky',
        amount: '$450.5',
      },
      {
        name:'Pubg',
        amount:'$200'
      },
    ],
  },
  {
    name: 'Internet',
    amount: '$893',
    date: moment(),
    isReceived: true,
    items: [
      {
        name: 'Monitor',
        amount: '$85',
      },
      {
        name: 'Main CPU',
        amount: '$358.00',
      },
      {
        name: 'RAM',
        amount: '$450.5',
      },
    ],
  },
  {
    name: 'Office',
    amount: '$375.37',
    date: moment(),
    isReceived: false,
    items: [
      {
        name: 'Monitor',
        amount: '$85',
      },
      {
        name: 'Main CPU',
        amount: '$358.00',
      },
      {
        name: 'RAM',
        amount: '$450.5',
      },
    ],
  },
  {
    name: 'Accessories',
    amount: '$151.33',
    date: moment(),
    isReceived: true,
    items: [
      {
        name: 'Monitor',
        amount: '$85',
      },
      {
        name: 'Main CPU',
        amount: '$358.00',
      },
      {
        name: 'RAM',
        amount: '$450.5',
      },
    ],
  },
];

export default data;