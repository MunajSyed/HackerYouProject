# Quiz

## Question 1
> Create a route to handle CR[UD] operations for our Stock resource

```javascript
// POST /stocks

// Payload
{
  stockSymbol: 'SHOP',
}

// GET /stocks
// Response
{
  data: [
    { id: '...', stockSymbol: 'SHOP', userId: '...' },
    { id: '...', stockSymbol: 'SHOP', userId: '...' },
    { id: '...', stockSymbol: 'SHOP', userId: '...' },
    // ...
  ]
}
```
## Question 2
> Update the `Placeholder` component to fetch all stocks from our API
