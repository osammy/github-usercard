/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

const myUrl = "https://api.github.com/users/osammy/followers";

async function renderFollowers(url) {
  let followersUrls = [];
  followersUrls = await getFollowersUrls(url);
  // try {
  //   const response = await axios.get(url);
  //   followersArrOfInfo = response.data;
  //   followersUrls = followersArrOfInfo.map(follower => follower.url);
  //   // console.log(followersUrls.length)
  // } catch (e) {
  //   alert("err");
  // }
  let followersData = [];
  try {
    const followersData = await getFollowers(followersUrls);
    render(followersData);
  } catch (e) {
    console.log(e);
  }
}


async function getFollowers(followersUrls) {
  return new Promise((resolve, reject) => {

      try {
        const followersData = [];
        followersUrls.forEach(async followerUrl => {
        const response = await axios.get(followerUrl);
        followersData.push(response.data);
        if (followersUrls.length === followersData.length) resolve(followersData);
        })
      } catch (e) {
        reject(e)
      }

  });
}

async function getFollowersUrls(url) {
  return new Promise(async (resolve, reject) => {

  try {
    const response = await axios.get(url);
    followersArrOfInfo = response.data;
    console.log(followersArrOfInfo)
    followersUrls = followersArrOfInfo.map(follower => follower.url);
    resolve(followersUrls)
  } catch (e) {
    reject(e)
  }

  });
}

function render(data) {
  const Cards = document.querySelector(".cards");

  data.forEach(follower => {
    Card = createComponent(follower);
    Cards.appendChild(Card);
  });
}



/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
function createComponent(data) {
  const {
    avatar_url,
    html_url,
    followers,
    following,
    bio,
    location,
    name,
    login
  } = data;

  const div1 = document.createElement("div");
  div1.setAttribute("class", "card");

  const img = document.createElement("img");
  img.setAttribute("src", avatar_url);
  div1.appendChild(img);

  const h3 = document.createElement("h3");
  h3.setAttribute("class", "name");
  h3.textContent = name;

  const p1 = document.createElement("p");
  p1.setAttribute("class", "username");
  p1.textContent = login;

  const p2 = document.createElement("p");
  p2.textContent = `Location: ${location}`;

  const p3 = document.createElement("p");
  // const a = document.createElement("a");
  // a.setAttribute("href", html_url);
  // a.textContent = html_url;
  p3.innerHTML = `Profile: <a href=${html_url}>${html_url}</a>`;

  const p4 = document.createElement("p");
  p4.textContent = `Followers: ${followers}`;

  const p5 = document.createElement("p");
  p5.textContent = `Following: ${following}`;

  const p6 = document.createElement("p");
  p6.textContent = `Bio: ${bio}`;

  const div2 = document.createElement("div");
  div2.setAttribute("class", "card-info");

  div2.appendChild(h3);
  div2.appendChild(p1);
  div2.appendChild(p2);
  div2.appendChild(p3);
  div2.appendChild(p4);
  div2.appendChild(p5);
  div2.appendChild(p6);

  div1.appendChild(div2);

  return div1;
}

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

renderFollowers(myUrl);