Multiple/single choice result object

```javascript
{
  question: 'Question Here',
  type_id: 3,
  position: 1,
  result: [
    { choice: 'Choice 1', count: 6 },
    { choice: 'Choice 2', count: 5 },
  ]
}
```

Rank result object

```javascript
{
  question: 'Question Here',
  type_id: 6,
  position: 2,
  result: [
    {
      question: 'Row 1', result:
      [
        {choice: 'Column 1', count: 5}
        {choice: 'Column 2', count: 6}
      ]
    },
    {
      question: 'Row 2', result:
      [
        {choice: 'Column 1', count: 2}
        {choice: 'Column 2', count: 8}
      ]
    },
  ]
}
```
