console.clear();


const getAllPost = async(category)=>{
let url = "";
 url = category?`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`:
 url= `https://openapi.programming-hero.com/api/retro-forum/posts/`;

const res = await fetch(url);
const data = await res.json();
displayData(data.posts);
};

const getNewPost= async ()=>{
   const url = "https://openapi.programming-hero.com/api/retro-forum/latest-posts";
   const res = await fetch(url);
   const data = await res.json();
   displayLatestPost(data);
}


let count = 0;
const displayCount=(title, viewCount)=>{
  count++;
  document.getElementById("h2").innerText = count;
 const countDiv =  document.getElementById("countDiv");
 const div = document.createElement("div");
 div.innerHTML = `
   <div class="flex items-center justify-between">
      <h4 id="title4" class="font-bold text-xl">${title}</h4>
      <P><i class="fa-regular fa-eye"></i> <span>${viewCount}</span></P>
      <p class="opacity-50">
        <i class="fa-solid fa-check-double text-green-500"></i> Mark
        as read (<span id="markAsReadCounter">${count}</span>)
      </p>
   </div>
 `
 countDiv.appendChild(div)
   
}


const displayLatestPost=(NewPost)=>{
  const newPostDiv = document.getElementById("latest-post-container");
  NewPost.map(item=>{
    let div = document.createElement("div");
    div.innerHTML = `
    <div class="card lg:w-96 pb-5 bg-base-100 shadow-2xl">
          <figure class="lg:px-6 px-4 pt-4 lg:pt-8">
              <img
                  src=${item.cover_image}
                  alt="Shoes"
                  class="rounded-xl"
              />
          </figure>
          <div class="p-5 lg:p-10 space-y-4 lg:space-y-5">
              <p class="opacity-50 text-start">
                  <i class="fa-solid fa-calendar-days me-2"></i>${item.author?.posted_date || "No Publish Date"}
              </p>
              <h2 class="card-title text-start">${item.title}</h2>
              <p class="text-start">
                  ${item.description}
              </p>
              <div class="card-actions flex gap-5 items-center">
                  <div class="avatar">
                      <div
                          class="lg:w-12 w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                      >
                          <img
                          src=${item.profile_image}
                          />
                      </div>
                  </div>
              <div>
              <h3 class="text-start font-extrabold">${item.author.name}</h3>
              <p class="text-start opacity-60">${item.author?.designation || "Unknown"}</p>
          </div>
      </div>
    `

    newPostDiv.appendChild(div);
  })
}

const displayData = (posts)=>{
 const postContainer = document.getElementById("post-container");
 postContainer.innerHTML = "";
    setTimeout(()=>{
    
      posts.map(item=>{
        let cardDiv = document.createElement("div");
        cardDiv.classList.add("bg-gray-200", "p-6", "rounded-xl" ,"flex", "gap-20")
        cardDiv.innerHTML =`
          <div class="w-1/12">
             <div class="p-12 bg-white rounded-xl relative">
             ${item.isActive===true ? `<div class="h-4 w-4 absolute top-0 right-0 bg-green-500 rounded-full"></div>`:
              `<div class="h-4 w-4 absolute top-0 right-0 bg-red-500 rounded-full"></div>`
             }       
             </div> 
          </div>
          <div class="taxDiv w-11/12">
             <div class="flex gap-12 font-bold mb-2 text-gray-500">
               <p>#${item.category}</p>
               <p>author: ${item.author.name}</p>
             </div>
             <div class="mb-2">
               <h1 class="text-xl font-bold">${item.title}</h1>
             </div>
             <div class="border-b pb-4 mb-3 border-gray-400 border-dashed">
               <p class="text-gray-500 ">${item.description}</p>
             </div>
             <div class="flex justify-between">
                <div class="flex gap-4 md:gap-12">
                  <p class="flex gap-4 items-center text-gray-500">
                    <span><i class="fa-regular fa-comment-dots"></i></span> <span>${item.comment_count}</span>
                  </p>
                  <p class="flex gap-4 items-center text-gray-500">
                    <span><i class="fa-regular fa-eye"></i></span> <span>${item.view_count}</span>
                  </p>
                  <p class="flex gap-4 items-center text-gray-500">
                    <span><i class="fa-regular fa-clock"></i></span> <span>${item.posted_time} min</span>
                  </p>
               </div>
               <div class="p-2 w-10 h-10 rounded-full text-center bg-green-500">
                <button onclick="displayCount('${item.title}','${item.view_count}')" class="text-white"><i class="fa-solid fa-envelope-open"></i></button>
               </div>
             </div>
          </div>
        `
       postContainer.appendChild(cardDiv);
      })

    },1000);
    
};





setTimeout(()=>{
  getAllPost();
  document.getElementById("postLoader").classList.add("hidden");
},1000);

getNewPost();

const handleSearchByCategory=()=>{
    let inputValue = document.getElementById("searchPosts").value;
    setTimeout(()=>{
      getAllPost(inputValue);
    },1000)
}
