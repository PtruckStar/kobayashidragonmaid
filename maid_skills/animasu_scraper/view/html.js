const h = (content) => { return `
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body {
    background-color: #f1f1f1;
    font-family: sans-serif;
  }
  a {
    text-decoration: none;
  }
  #content {
    display: grid;
    place-items: center;
    justify-items: center;
  }
  .list-wraper {
    max-width: 600px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    justify-content: stretch;
  }
  a.list {
    text-decoration: none;
    font-family: sans-serif;
    color: black;
    overflow: hidden;
    padding-bottom: 0.5rem;
    background-color: white;
    box-shadow: 0 0 2px -2px black;
    border-radius: 0.5rem;
  }
  a.list > img {
    width: 100%;
    margin-bottom: 0.5rem;
  }
  a.list > h3 {
    margin: 0;
    padding: 0 0.5rem;
  }
  a.list > span {
    font-size: 0.75rem;
    padding: 0 0.5rem;
  }
  
  form {
      width: 100%;
      background-color: white;
      border-radius: 0.5rem;
      padding: 0;
      margin: 1em 0;
      overflow: hidden;
      max-width: 600px;
    }
  input[type="text"] {
      width: 70%;
      border: none;
      height: 2rem;
      font-size: 1em;
    }
  input[type="submit"] {
      background-color: #3478F6;
      -webkit-appearance: none;
      appearance: none;
      border-radius: 0;
      border: none;
      float: right;
      height: 2rem;
      margin: 0;
      font-size: 1em;
    }
    
  .stream {
      background-color: white;
      border-radius: 0.5rem;
      overflow: hidden;
      padding: 1rem;
      margin-top: 0.5rem;
      max-width: 600px;
      box-shadow: rgba(0, 0, 0, 0.2) Opx 0.5rem 1.2rem;
      box-sizing: border-box;
    }
    .stream > p {
      color:#aaa;
    }
    iframe {
      width: 100%;
      border: none;
      border-radius: 0.5rem;
      margin:0;
      padding:0;
      background-color: black;
      max-width: 600px;
    }
    h3 {
      margin:0;
      padding:0;
    }
    
    .eps_list_wraper {
      padding:0;
      margin:0;
    }
    .eps_list {
      width: 100%;
      height: 15rem;
      overflow-y: scroll;
    }
    .eps_list :nth-child(2n+1) {
      background-color: #f1f1f1;
    }
    .eps_list > div > a {
      float: right;
      color: #3478F6;
    }
    .eps_list > div > span {
      text-overflow: ellipsis; 
      overflow: hidden; 
      white-space: nowrap;
      display: inline-block;
    }
    .eps_list > div {
      height: 1.5rem;
      padding: 0.5rem;
      border-bottom: dashed 1px black;
      display: block;
    }
    
  .navbar {
      display: flex;
      justify-content: center;
      gap: 1em;
      height: 2.5rem;
      background-color: white;
      border-radius: 0.5rem;
      overflow: hidden;
      margin-top: 0.5rem;
      width: 100%;
      max-width: 600px;
    }
    .nav {
      flex-grow: 1;
      font-size: 2rem;
      text-align: center;
    }
    .nav > a {
      color: #3478F6;
    }
    
  #footer {
      margin: 2rem;
      text-align: center;
      color: #D0D0D0;
    }
  .notfound {
    font-size: 3rem;
    color: #D0D0D0;
    text-align: center;
    vertical-align: middle;
    margin-top:3rem
  }
  
  @media(min-width:48em) {
    .list-wraper {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
</style>
</head>
<body>

<div id="content">
  ${content}
</div>

<div id="footer">
  <p>rahayu.</p>
</div>

</body>
</html>
`}


module.exports = h