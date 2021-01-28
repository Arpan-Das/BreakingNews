// Your API key is: e63d3cde20844832bb205892b96ca700
// var url = 'http://newsapi.org/v2/top-headlines?' +
//           'country=us&' +
//           'apiKey=API_KEY';
// http://newsapi.org/v2/top-headlines?country=in&apiKey=e63d3cde20844832bb205892b96ca700

let apikey = 'e63d3cde20844832bb205892b96ca700';
let country = 'in';
let source = 'the-times-of-india';

let newsAcordian = document.getElementById('newsAccordion');
let spinner = document.getElementById('spinner');
let image = document.getElementById('image');
let li = document.getElementById('li');

const xhr = new XMLHttpRequest();

xhr.open('GET', `http://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apikey}`, true);

let string = ``;
let img = ``;
let list = ``;

xhr.onload = function () {

    spinner.innerHTML = '';

    if (this.status == 200) {
        let news = JSON.parse(this.responseText);
        for (key in news.articles) {

            string += `<div class="accordion-item" >
                            <h2 class="accordion-header" id="heading${key}">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${key}" aria-expanded="false" aria-controls="collapse${key}">
                               <b>${parseInt(key) + 1} :> </b> ${news.articles[key].title}.               
                                <span class="badge bg-light text-dark">${news.articles[key].publishedAt}</span>
                            </button>
                            </h2>
                            <div id="collapse${key}" class="accordion-collapse collapse" aria-labelledby="heading${key}" data-bs-parent="newsAccordion" >
                            <div class="accordion-body">
                            <strong>${news.articles[key].description}.</strong>
                            ${news.articles[key].content != null ? news.articles[key].content : ''} 
                                <a href = "${news.articles[key].url}" target = "_blank"> Read more here.</a>
                            </div>
                            </div>
                        </div>`;
            
            list += `<li data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${key}" 
                    ${key==0?'class="active"':''}></li>`;
            
            img += `<div class="carousel-item ${key == 0 ? 'active': ''}">
                        <img src="${news.articles[key].urlToImage}" class="d-block w-100" height="500" >
                        <div class="carousel-caption d-none d-md-block">
                        <h5 style="color:black;">${news.articles[key].title}.</h5>
                        </div>
                    </div>`;
        }

        image.innerHTML = img;
        li.innerHTML = list;
        newsAcordian.innerHTML = string;

    } else {
        console.log('some error occured');
    }

}
xhr.send();

