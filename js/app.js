// I try my best though i can do it much more ifficently and this is completly done by me. I know that I can do better 

// initially display all data in seperate section recent and old => Note[I can make it more effiecinet by using more functions] 
const dsiplayData = (alldata) => {
    let numberOflongStory = 0;
    let numberOfShortStory = 0;

    const recentDataContainer = document.getElementById('recent');
    const oldDataContainer = document.getElementById('old');

    alldata.map(data => {
        let d = new Date(data.datetime);
        if (parseInt(data.datetime.slice(0, 4)) === 2022) {
            const innerDiv = document.createElement('div');
            if (data.type == 'long') {
                ++numberOflongStory;
                innerDiv.classList.add('long');
            }

            else {
                ++numberOfShortStory;
                innerDiv.classList.add('short');
            }
            innerDiv.innerHTML = ` 
            <div class="col">
                    <div class="my-card d-flex">
                        <div>
                            <h5 class="card-title p-0 m-0" >${data.title != "NULL" ? data.title : ''}</h5>
                            <p id="card_details" class="card-text" tabindex="0" data-bs-toggle="tooltip" title="${data.body}">${data.title != "NULL" ? data.body.slice(0, 85) + ' ...' : data.body.slice(0, 190) + ' ...'}
                            </p>
                            <p class="p-0 m-0"" style="color: #bcb8b1;" >${String(d).slice(4, 8) + d.getDate() + ', ' + d.getFullYear() + ' | ' + parseInt(d.getHours() - 6) + ':' + String(d).slice(22, 24) + ' ' + String(parseInt(d.getHours()) > 12 ? "PM" : "AM")
                }</p >

                        </div >
    <div>
        <img id="im" class="rounded" width="150px" src="${data.image != "NULL" ? data.image : ''}" alt="">
    </div>

                    </div >
                </div > `
            recentDataContainer.appendChild(innerDiv);
        }
        else {


            const innerDiv = document.createElement('div');
            if (data.type == 'long') {
                ++numberOflongStory
                innerDiv.classList.add('long');
                console.log(data.image);
            }
            else {
                ++numberOfShortStory;
                innerDiv.classList.add('short');
            }
            innerDiv.innerHTML = ` 
            <div class="col">
                    <div class="my-card d-flex">
                        <div>
                            <h5 class="card-title p-0 m-0">${data.title != "NULL" ? data.title : ''}</h5>
                            <p id="card_details" class="card-text" tabindex="0" data-bs-toggle="tooltip" title="${data.body}">${data.title != "NULL" ? data.body.slice(0, 70) + ' ...' : data.body.slice(0, 150) + ' ...'}
                            </p>
                            <p class="p-0 m-0"" style="color: #bcb8b1;" >${String(d).slice(4, 8) + d.getDate() + ', ' + d.getFullYear() + ' | ' + parseInt(d.getHours() - 6) + ':' + String(d).slice(22, 24) + ' ' + String(parseInt(d.getHours()) > 12 ? "PM" : "AM")
                }</p >

                        </div >
    <div>
        <img id="im" class="rounded" width="150px" src="${data.image}" alt="">
    </div>

                    </div >
                </div > `
            oldDataContainer.appendChild(innerDiv);
            //  image of id-2 did not load but if i replaced it with another url then it works perfectly 
        }
    })
    document.getElementById('longStoriesNumber').innerText = numberOflongStory;
    document.getElementById('shortStoriesNumber').innerText = numberOfShortStory;
}

// reload or refresh data after delete
const loadandShowData = () => {
    document.getElementById('recent').innerHTML = '';
    document.getElementById('old').innerHTML = '';
    document.getElementById('longStories').checked = true;
    document.getElementById('shortStories').checked = true;
    loadPosts();
}


//  delete all data and show msg
const deleteall = () => {
    showHiddenMsg('001', 'none');
    showHiddenMsg('002', 'none');
    document.getElementById('recent').innerHTML = `<h3 class="py-4 my-4 rounded  col-12 text-center" style="background-color: #3a3b3c">all data deleted. Please refresh or load again </h3>
    `;
    document.getElementById('old').innerHTML = `<h3 class="py-4 my-4 rounded col-12 text-center" style="background-color: #3a3b3c">all data deleted. Please refresh or load again </h3>
    
    <button type="button" class="btn btn-primary p-2 y-4 col-12 text-center" onclick=loadandShowData()>Refresh</button>`
        ;
    document.getElementById('longStoriesNumber').innerText = 0;
    document.getElementById('shortStoriesNumber').innerText = 0;
}


// longStories toggle button activity
document.getElementById('longStories').addEventListener('click', function () {
    const longpost = document.getElementsByClassName("long");
    if (document.getElementById('longStories').checked == true) {
        showHiddenMsg('001', 'none');
        showHiddenMsg('002', 'none');
        for (const post of longpost) {
            post.style.display = "block"
        }
    }

    else {
        if (document.getElementById('shortStories').checked == false && document.getElementById('longStories').checked == false) {
            showHiddenMsg('001', 'block')
            showHiddenMsg('002', 'block')
        }
        for (const post of longpost) {
            post.style.display = "none"
        }
    }
})

const showHiddenMsg = (id, type) => {
    document.getElementById(id).style.display = type;
}
// shortStories toggle button activity
document.getElementById('shortStories').addEventListener('click', function () {
    const posts = document.getElementsByClassName("short");
    if (document.getElementById('shortStories').checked == true) {
        showHiddenMsg('001', 'none');
        showHiddenMsg('002', 'none');
        for (const post of posts) {
            post.style.display = "block"
        }
    }
    else {
        if (document.getElementById('shortStories').checked == false && document.getElementById('longStories').checked == false) {
            showHiddenMsg('001', 'block');
            showHiddenMsg('002', 'block')
        }
        for (const post of posts) {
            post.style.display = "none"
        }
    }

})



// fetch data from data.js

const loadPosts = async () => {
    let data = await fetch('../data/data.json');
    posts = await data.json();
    dsiplayData(posts);
    console.log(posts);
    // fetch("../data/data.json")
    //     .then(res => res.json())
    //     .then(data => dsiplayData(data));
}
loadPosts();
