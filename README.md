# nsfw-check-api
an api to check if an image is NSFW or not

## development

- clone the repo and checkout to the repo directory
- install packages - `npm i`
- run your application - `node index.js` or `npm start`
- hit api on http://localhost:8888/


#### Routes
- `/` to check api status
- `/check`,`/nsfw` - both GET and POST api you can hit

pass url as query param in GET api and url as body payload in POST api

ex - http://localhost:8888/check?url=https://imgur.com/mjU5ML3.png


<br/><br/><br/>
<address>
Author: Jagan
</address>