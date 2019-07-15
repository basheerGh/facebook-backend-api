fetch('http://localhost:3001/auth/facebook/callback', {
  mode: 'cors',
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
}
)
  .then(result => console.log(result))
  

fetch('http://localhost:3001')
  .then(res => res.json())
  .then(result => {
      console.log(result)

  })


