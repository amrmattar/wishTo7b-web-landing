
$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    items: 3, // Number of items to display by default
    loop: true, // Infinite loop
    margin: 10, // Space between items
    responsive: {
      0: {
        items: 1, // 1 item in the carousel for small screens
      },
      576: {
        items: 2, // 2 items for screens wider than 576px
      },
      992: {
        items: 3, // 3 items for screens wider than 992px
      }

    }
  });
});
// Initiate the venobox plugin
$(window).on('load', function () {
  $('.venobox').venobox();
});

const apiUrl = 'https://wisht7b-api.algorithms.ws/api/v1/posts'
 const allapi = "https://wisht7b-api.algorithms.ws/api/v1/posts?limit=1000";
const apiToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MCIsImlzcyI6Ildhc2hUbzdiIiwiaWF0IjoxNjk4NzU1MjY4Mzk0LCJleHAiOjE2OTg3NTU4NzMxOTR9.ljgz2r-CV-crQZpXz1P7vo4owjkeHewCXtW4kk0jBMg";

const headers = new Headers({
  "Authorization": `Bearer ${apiToken}`,
});
// Button 1 Data
const button1Data = [
  { name: "Person 1", PersonImage: "images/01.jpg", image: "images/emo1.png" },
  { name: "Person 2", PersonImage: "images/02.jpg", image: "images/emo2.png" },
  { name: "Person 3", PersonImage: "images/03.jpg", image: "images/emo1.png" },
  { name: "Person 4", PersonImage: "images/04.jpg", image: "images/ic.png" },
  { name: "Person 5", PersonImage: "images/05.jpg", image: "images/emo1.png" },
  { name: "Person 6", PersonImage: "images/08.jpg", image: "images/emo2.png" }
];

const comentData = [
  { name: "Person 1", PersonImage: "images/01.jpg", image: "images/emo1.png", txt: "اهلا وسهلا بكم جميعا" },
  { name: "Person 2", PersonImage: "images/02.jpg", image: "images/emo2.png", txt: "لا تنسي فهد حضور الاجتماع " },
  { name: "Person 3", PersonImage: "images/03.jpg", image: "images/emo1.png", txt: "هذا النص للتجريب" },
  { name: "Person 4", PersonImage: "images/04.jpg", image: "images/ic.png", txt: "هناك حقيقة مثبتة منذ زمن طويل وهي ان المحتوي المقروء لصفحة ما سيلهي القارئ عن التركيز عن الشكل الخارجي للنص" },
  { name: "Person 5", PersonImage: "images/05.jpg", image: "images/emo1.png", txt: "لاتنسي تحجز لي هديه من الملفا يا فهد" },
  { name: "Person 6", PersonImage: "images/08.jpg", image: "images/emo2.png", txt: "لا تؤجل عمل اليوم الي الغد" }
];
const selectElement = document.getElementById("product-filter");
let searchInput = document.getElementById('product-search');
searchInput.addEventListener('input',handleSearch  );
let searchInput2 = document.getElementById('product-search2');

searchInput2.addEventListener('input',handlesearchforselectetype  );
let posts = [];
let originalPosts = [];
let allPosts = [];
let currentPageData;
let alldata = [];
let mydata = [];

      fetch(allapi, {
          method: 'GET',
          headers: headers
        })
          .then(response => response.json())
          .then(res => {
       
            alldata = res;
            
          //  initiatePagination(res);
          //  console.log(data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
    function clearItems() {
      const paginationContainer = document.getElementById('pagination-container');
      paginationContainer.innerHTML = ''; // Clear the container's content
    }
    async function fetchData(page = 1) {
      try {

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: headers
        });

        const data = await response.json();
      
        initiatePagination(data,'');
        allPosts = allPosts.concat(data.data);
        renderItems(data.data);

        return data.data;
      } catch (error) {
        console.error('Error fetching data:', error);
    
        throw error;
      }
    }
 
    async function initializePage() {
      try {
    
      
        // Fetch data from the API
        posts = await fetchData();
        // Keep a copy of the original data for resetting
        originalPosts = [...posts];
        // Display all data initially
        currentPageData = posts;
      //  console.log(allPosts);
        displayAllData(posts);
        searchInput2.style.display="none"
      } catch (error) {
        // Handle errors
        console.error('Error initializing page:', error);
      
      }
    }

  function displayAllData(data) {
    const selectedType = selectElement.value;
    clearCardContainer(); 

  
    if (selectedType === 'all') {
      data.forEach(item => {
        console.log(item);
        if (item.type === 'MUSIC') {
          createMusicCard(item);
        } else if (item.type === 'MOVIE') {
          createFilmCard(item);
        } else if (item.type === 'IMAGE') {
          createImageCard(item);
        } else if (item.type === 'TEXT') {
          createTextCard(item);
        }else if (item.type === 'OCCASION') {
          createOccasionCard(item);
        }else if (item.type === 'GIFT') {
          createGiftCard(item);
        }else if (item.type === 'VIDEO') {
          createVedioCard(item);
        }
        
        
      });
    }
  }

 


  function clearCardContainer() {
    const musicCardContainer = document.getElementById('seven');
    const filmCardContainer = document.getElementById('Film');
   const notFoundMessage = document.getElementById('notFoundMessage');
    const eight = document.getElementById('eight');
    const textdiv = document.getElementById('textdiv');
    const OCCASION = document.getElementById('OCCASION');
    const GIFT = document.getElementById('GIFT');
    const VIDEO = document.getElementById('VIDEO');
  
    // Remove existing cards from the containers
    musicCardContainer.innerHTML = '';
    filmCardContainer.innerHTML = '';
    notFoundMessage.innerHTML = '';
    eight.innerHTML = '';
    textdiv.innerHTML = '';
    OCCASION.innerHTML = '';
    GIFT.innerHTML = '';
    VIDEO.innerHTML = '';
   // allpaganation.style.display='none'
 
  }
  function initiatePagination(data,type) {
    clearCardContainer();
    renderItems(data.data);
    renderPaginationControls(data,type);
  }
  // function handleSearch() {
  //   displaysearchData(allPosts); 
  // }




 
  function handlePageChange(url, pageNumber, type ) {
    const updatedUrl = type !== '' ? `${url}&type=${type}` : url;
  
    fetch(updatedUrl, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        initiatePagination(data, type);
        currentPageData = data.data;
    
        console.log(`Navigated to page ${pageNumber} with type ${type}`);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }
  

  function renderPaginationControls(data,type) {

    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = '';
    const paginationContainer2 = document.getElementById('pagination-container2');
    paginationContainer2.innerHTML = '';

    // Create Next and Previous buttons
    const nextButton = document.createElement('button');
    const nextIcon = document.createElement('span');
    nextIcon.className = 'fa-solid fa-chevron-left'; 
    nextButton.appendChild(nextIcon);
    if (data.links.next) {
      nextButton.addEventListener('click', () => handlePageChange(data.links.next, data.page + 1, type));
   
    } else {
      nextButton.disabled = true;
    }

    const prevButton = document.createElement('button');
    const prevIcon = document.createElement('span');
    prevIcon.className = 'fa-solid fa-chevron-right'; 
    prevButton.appendChild(prevIcon);
    if (data.links.prev) {
      prevButton.addEventListener('click', () => handlePageChange(data.links.prev, data.page - 1, type));
     // console.log(currentPageData);
    } else {
      prevButton.disabled = true;
    }

    // Conditionally hide Previous button on the first page
    if (data.page === 1) {
      prevButton.style.display = 'none';
    }
      if(type !== ''){
        paginationContainer2.appendChild(prevButton);
      }else{
        paginationContainer.appendChild(prevButton);
      }
  

    // Create page number buttons with a limit (e.g., 5 pages)
    const limit = 3;
    const startPage = Math.max(1, data.page - Math.floor(limit / 2));
    const endPage = Math.min(data.pageCount, startPage + limit - 1);

    for (let i = startPage; i <= endPage; i++) {
      const pageButton = document.createElement('button');
      pageButton.innerText = i;
      pageButton.addEventListener('click', () => handlePageChange(`https://wisht7b-api.algorithms.ws/api/v1/posts?page=${i}`, i,type));
 // console.log(currentPageData);
      // Highlight the current page
      if (i === data.page) {
        pageButton.classList.add('active');
      }
      if(type !== ''){
        paginationContainer2.appendChild(pageButton);
      }else{
        paginationContainer.appendChild(pageButton);
      }
     // paginationContainer.appendChild(pageButton);
    }
    if(type !== ''){
      paginationContainer2.appendChild(nextButton);
    }else{
      paginationContainer.appendChild(nextButton);
    }
   // paginationContainer.appendChild(nextButton);
  }
  function renderItems(items) {
    // Clear existing items
    clearCardContainer();
  
    // Render each item on the page
    items.forEach(item => {
   //   console.log(item);
      const selectedType = selectElement.value;
      if (selectedType === 'OCCASION') {
        createOccasionCard(item);
      }
      else if (item.type === 'MUSIC') {
        createMusicCard(item);
      } else if (item.type === 'MOVIE') {
        createFilmCard(item);
      } else if (item.type === 'IMAGE') {
        createImageCard(item);
      } else if (item.type === 'TEXT') {
        createTextCard(item);
      } else if (item.type === 'GIFT') {
        createGiftCard(item);
      } else if (item.type === 'VIDEO') {
        createVedioCard(item);
      }
     else if (selectedType === 'all') {
        // Render based on item type
        if (item.type === 'MUSIC') {
          createMusicCard(item);
        } else if (item.type === 'MOVIE') {
          createFilmCard(item);
        } else if (item.type === 'IMAGE') {
          createImageCard(item);
        } else if (item.type === 'TEXT') {
          createTextCard(item);
        } else if (item.type === 'OCCASION') {
          createOccasionCard(item);
        } else if (item.type === 'GIFT') {
          createGiftCard(item);
        } else if (item.type === 'VIDEO') {
          createVedioCard(item);
        }
      }
    });
  }
 
  window.addEventListener('load', initializePage);



  selectElement.addEventListener("change", () => {
    const selectedValue = selectElement.value;
    if(selectedValue){
      //searchInput.style.display="none";
    //  searchInput.value = ''
    }
    if (selectedValue === "all") {
     searchInput2.style.display="none";
     searchInput.style.display="block";
      const paginationContainer = document.getElementById('pagination-container');
      const paginationContainer4 = document.getElementById('pagination-container4');
      paginationContainer.style.display="flex";
      paginationContainer4.style.display="none";
      initializePage()
      displayAllData(originalPosts); 
    } else {
      searchInput.style.display="none";
      searchInput2.style.display="block";
      searchInput.value='';
      searchInput2.value='';
      if(searchInput2.value === ''){
        console.log("search is empty");
       
        const paginationContainer3 = document.getElementById('pagination-container3');
        const paginationContainer4 = document.getElementById('pagination-container4');
        paginationContainer4.style.display="none";
        paginationContainer3.style.display="none";
      }
      const paginationContainer2 = document.getElementById('pagination-container2');
      const paginationContainer3 = document.getElementById('pagination-container3');
      const paginationContainer4 = document.getElementById('pagination-container4');
      if(paginationContainer2){

        paginationContainer2.style.display="flex";
      }
      // else if(paginationContainer3 && searchInput2 !==''){

      //   paginationContainer3.style.display="none";
      // }
      else if(paginationContainer3 && searchInput2 ===''){

        paginationContainer3.style.display="none";
      }
      const filteredData = originalPosts.filter(item => item.type === selectedValue);
   
     displayFilteredDataWithPagination(selectedValue)
    }
  });

  async function displayFilteredDataWithPagination(type) {
    try {
      // Fetch data for the selected type
      const response = await fetch(`https://wisht7b-api.algorithms.ws/api/v1/posts?type=${type}`, {
        method: 'GET',
        headers: headers
      });
  
      const filteredData = await response.json();
      initiatePagination(filteredData,type);
      fetchalldatabytype(type)
      //displayAllData(filteredData.data)
     // displayFilteredData(filteredData.data , type)
     // handleSearchfilterd(filteredData.data , type)
      console.log(`filteredData by type ${type}`,filteredData);
      
    } catch (error) {
      console.error('Error fetching filtered data:', error);
    }
  }


  function handleSearch() {
 
    const searchTerm = document.getElementById('product-search').value.trim().toLowerCase();
    const notFoundMessageContainer = document.getElementById('notFoundMessage');
    console.log('notFoundMessageContainer:', notFoundMessageContainer);
    if (searchTerm === '') {
     
      hidePagination()
      
      initializePage()
    }
    else{
      showPagination()
    }
   
              // Filter posts based on the search term
    const filteredData = alldata.data.filter(item => {
      return (
        (item.type && item.type.toLowerCase().includes(searchTerm)) ||
      (item.owner && item.owner.fullname && item.owner.fullname.toLowerCase().includes(searchTerm)) ||
      (item.content && item.content && item.content.toLowerCase().includes(searchTerm))||
      (item.occasion && item.occasion.name && item.occasion.name.toLowerCase().includes(searchTerm))
 
   
      );
    });
    const allpaganation = document.getElementById("all-paganation");
    currentPageData = filteredData;
    console.log(filteredData);
    const selectedType = selectElement.value;
    // Display the filtered data in HTML using the displayAllData function
    if (filteredData.length > 0) {
      allpaganation.style.display="block"
      displayAllsearchData(filteredData,1);
      searchrenderPaginationControls(filteredData)
    }
    else {
      const allpaganation = document.getElementById("all-paganation");
      allpaganation.style.display="none"
      clearCardContainer();
      console.log("no data herere");
      //notFoundMessageContainer.innerHTML = '<div>Static Content</div>';
      notFoundMessageContainer.innerHTML = `
      <div class="container notfound">
        <div class="row">
          <div>
            لا توجد نتائج للبحث
          </div>
        </div>
      </div>`;
    
    }
    }

  
  const itemsPerPage = 10;
  let currentPage = 1;
  let totalPages = 1


  function searchrenderPaginationControls(filteredData) {
    totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginationContainer1 = document.getElementById('pagination-container');
    paginationContainer1.innerHTML = '';
    const paginationContainer2 = document.getElementById('pagination-container2');
    paginationContainer2.innerHTML = '';
  
    const paginationContainer3 = document.getElementById('pagination-container3');
    paginationContainer3.innerHTML = '';
    const paginationContainer4 = document.getElementById('pagination-container4');
    paginationContainer4.innerHTML = '';
    const visiblePages = 3; // Number of visible pages at a time
    const halfVisible = Math.floor(visiblePages / 2);

    // Calculate the start and end indices for the visible pages
    let start = Math.max(currentPage - halfVisible, 1);
    let end = Math.min(start + visiblePages - 1, totalPages);

    if (end - start + 1 < visiblePages) {
        // Adjust the start index if the visible pages are less than the desired number
        start = Math.max(end - visiblePages + 1, 1);
    }
  // Create "Previous" button
  const prevButton = document.createElement('button');
  const prevIcon = document.createElement('span');
  prevIcon.className = 'fa-solid fa-chevron-right'; 
  prevButton.appendChild(prevIcon);
  prevButton.id = "prv";
  prevButton.onclick = function () {
      if (currentPage > 1) {
          changePage(currentPage - 1, filteredData);
      }
  };
  paginationContainer3.appendChild(prevButton);

    // Create pagination links
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.innerText = i;
      if (i === currentPage) {
        pageButton.classList.add('active');
    }
        // const link = document.createElement('a');
        // link.href = '#';
        // link.textContent = i;
        pageButton.onclick = function () {
            changePage(i, filteredData);
        };

        paginationContainer3.appendChild(pageButton);
    }
   
    
 
     // Create "Next" button
     const nextButton = document.createElement('button');
    //  nextButton.textContent = 'Next';
     const nextIcon = document.createElement('span');
     nextIcon.className = 'fa-solid fa-chevron-left'; 
     nextButton.appendChild(nextIcon);
     nextButton.id = "next";
     nextButton.onclick = function () {
         if (currentPage < totalPages) {
             changePage(currentPage + 1, filteredData);
         }
     };
     paginationContainer3.appendChild(nextButton);
     updateButtonState();
}
// function changePage(page, filteredData) {
//   displayAllsearchData(filteredData, page);
// }
function changePage(page, filteredData) {
  console.log(page);
  currentPage = page;
  displayAllsearchData(filteredData, page);
  searchrenderPaginationControls(filteredData);
}
function changePage2(page, filteredData) {
  console.log(page);
  currentPage = page;
  displayAllsearchselectedData(filteredData, page);
  searchrenderPaginationControlsforselected(filteredData);
}
function displayAllsearchData(data, page) {
  const selectedType = selectElement.value;
  clearCardContainer(); 

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = data.slice(startIndex, endIndex);


  if (selectedType === 'all') {
    currentPageData .forEach(item => {
      if (item.type === 'MUSIC') {
        createMusicCard(item);
      } else if (item.type === 'MOVIE') {
        createFilmCard(item);
      } else if (item.type === 'IMAGE') {
        createImageCard(item);
      } else if (item.type === 'TEXT') {
        createTextCard(item);
      }else if (item.type === 'OCCASION') {
        createOccasionCard(item);
      }else if (item.type === 'GIFT') {
        createGiftCard(item);
      }else if (item.type === 'VIDEO') {
        createVedioCard(item);
      }
      
      
    });
  }
}

function hidePagination() {
  const paginationContainer = document.getElementById('pagination-container3');
  paginationContainer.style.display = 'none';
}
function showPagination() {
  const paginationContainer = document.getElementById('pagination-container3');
  paginationContainer.style.display = 'flex';
}

function prevPage() {
  if (currentPage > 1) {
      changePage(currentPage - 1, currentPageData);
  }
}

// Function to go to the next page
function nextPage() {
  if (currentPage < totalPages) {
      changePage(currentPage + 1, currentPageData);
  }
}


function updateButtonState() {
  const prevButton = document.getElementById('prv');
  const nextButton = document.getElementById('next');

  if (currentPage === 1) {
      prevButton.style.display = 'none'; // Hide "Previous" button on the first page
  } else {
      prevButton.style.display = 'block';
  }

  if (currentPage === totalPages) {
      nextButton.disabled = true; // Disable "Next" button on the last page
  } else {
      nextButton.disabled = false;
  }
}
function contains(selector, text) {
  const elements = document.querySelectorAll(selector);
  return Array.from(elements).find(element => element.textContent.includes(text));
}



function fetchalldatabytype(type) {
  const updatedUrl = type !== '' ? `${allapi}&type=${type}` : allapi;

  fetch(updatedUrl, {
    method: 'GET',
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      mydata = data.data
  
    })
    .catch((error) => console.error('Error fetching data:', error));
}

function handlesearchforselectetype() {
  const notFoundMessageContainer = document.getElementById('notFoundMessage');
  const searchTerm = document.getElementById('product-search2').value.trim().toLowerCase();
  const selectedType = selectElement.value;
   if (searchTerm === '') {
   
    hidePagination2()
    displayFilteredDataWithPagination(selectedType)
  //  initializePage()
  }
  else{
    showPagination2()
  }
 
            // Filter posts based on the search term
  const myselecteddata = mydata.filter(item => {
    return (
      (item.type && item.type.toLowerCase().includes(searchTerm)) ||
      (item.owner && item.owner.fullname && item.owner.fullname.toLowerCase().includes(searchTerm)) ||
      (item.content && item.content && item.content.toLowerCase().includes(searchTerm))||
      (item.occasion && item.occasion.name && item.occasion.name.toLowerCase().includes(searchTerm))
 
    );
  });

  //currentPageData = filteredData;
  console.log(myselecteddata);
  const allpaganation = document.getElementById("all-paganation");
  // Display the filtered data in HTML using the displayAllData function
  if (myselecteddata.length > 0) {
 
    displayAllsearchselectedData(myselecteddata,1);
    searchrenderPaginationControlsforselected(myselecteddata)
    allpaganation.style.display="block"
  }
  else {
    
    allpaganation.style.display="none"
    clearCardContainer();
    console.log("no data herere");
    //notFoundMessageContainer.innerHTML = '<div>Static Content</div>';
    notFoundMessageContainer.innerHTML = `
    <div class="container notfound">
      <div class="row">
        <div>
          لا توجد نتائج للبحث
        </div>
      </div>
    </div>`;
  
  
  }
  }

  function displayAllsearchselectedData(data, page) {
    const selectedType = selectElement.value;
    clearCardContainer(); 
  
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = data.slice(startIndex, endIndex);
  
  

      currentPageData .forEach(item => {
        if (item.type === 'MUSIC') {
          createMusicCard(item);
        } else if (item.type === 'MOVIE') {
          createFilmCard(item);
        } else if (item.type === 'IMAGE') {
          createImageCard(item);
        } else if (item.type === 'TEXT') {
          createTextCard(item);
        }else if (item.type === 'OCCASION') {
          createOccasionCard(item);
        }else if (item.type === 'GIFT') {
          createGiftCard(item);
        }else if (item.type === 'VIDEO') {
          createVedioCard(item);
        }
        
        
      });
    
  }
  function searchrenderPaginationControlsforselected(filteredData) {
    totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginationContainer1 = document.getElementById('pagination-container');
    paginationContainer1.innerHTML = '';
    const paginationContainer2 = document.getElementById('pagination-container2');
    paginationContainer2.innerHTML = '';
  
    const paginationContainer3 = document.getElementById('pagination-container3');
    paginationContainer3.innerHTML = '';
    const paginationContainer4 = document.getElementById('pagination-container4');
    paginationContainer4.innerHTML = '';
    const visiblePages = 3; // Number of visible pages at a time
    const halfVisible = Math.floor(visiblePages / 2);

    // Calculate the start and end indices for the visible pages
    let start = Math.max(currentPage - halfVisible, 1);
    let end = Math.min(start + visiblePages - 1, totalPages);

    if (end - start + 1 < visiblePages) {
        // Adjust the start index if the visible pages are less than the desired number
        start = Math.max(end - visiblePages + 1, 1);
    }
  // Create "Previous" button
  const prevButton = document.createElement('button');
  const prevIcon = document.createElement('span');
  prevIcon.className = 'fa-solid fa-chevron-right'; 
  prevButton.appendChild(prevIcon);
  prevButton.id = "prv2";
  prevButton.onclick = function () {
      if (currentPage > 1) {
        changePage2(currentPage - 1, filteredData);
      }
  };
  paginationContainer4.appendChild(prevButton);

    // Create pagination links
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.innerText = i;
      if (i === currentPage) {
        pageButton.classList.add('active');
    }
        // const link = document.createElement('a');
        // link.href = '#';
        // link.textContent = i;
        pageButton.onclick = function () {
          changePage2(i, filteredData);
        };

        paginationContainer4.appendChild(pageButton);
    }
   
    
 
     // Create "Next" button
     const nextButton = document.createElement('button');
    //  nextButton.textContent = 'Next';
     const nextIcon = document.createElement('span');
     nextIcon.className = 'fa-solid fa-chevron-left'; 
     nextButton.appendChild(nextIcon);
     nextButton.id = "next2";
     nextButton.onclick = function () {
         if (currentPage < totalPages) {
          changePage2(currentPage + 1, filteredData);
         }
     };
     paginationContainer4.appendChild(nextButton);
     updateButtonState2();
}


function hidePagination2() {
  const paginationContainer = document.getElementById('pagination-container4');
  paginationContainer.style.display = 'none';
}
function showPagination2() {
  const paginationContainer = document.getElementById('pagination-container4');
  paginationContainer.style.display = 'flex';
}




function updateButtonState2() {
  const prevButton2 = document.getElementById('prv2');
  const nextButton2 = document.getElementById('next2');

  if (currentPage === 1) {
      prevButton2.style.display = 'none'; // Hide "Previous" button on the first page
  } else {
      prevButton2.style.display = 'block';
  }

  if (currentPage === totalPages) {
      nextButton2.disabled = true; // Disable "Next" button on the last page
  } else {
      nextButton2.disabled = false;
  }
}


























  function calculateTimeElapsed(specificDate) {
    // Convert the specific date to a JavaScript Date object
    specificDate = new Date(specificDate);

    // Get the current date and time
    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - specificDate;

    // Calculate the elapsed days, hours, and minutes
    const daysElapsed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursElapsed = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesElapsed = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    // Create a string to display the elapsed time
    let elapsedTimeString = '';
    if (daysElapsed > 0) {
      elapsedTimeString = `منذ ${daysElapsed} يوم${daysElapsed > 1 ? 'ًا' : ''}`;
    } else if (hoursElapsed > 0) {
      elapsedTimeString = `منذ ${hoursElapsed} ساعة`;
    } else {
      elapsedTimeString = `منذ ${minutesElapsed} دقيقة`;
    }

    return elapsedTimeString;
  }

  function createMusicCard(data) {
    const cardContainer = document.getElementById('seven');

    const card = document.createElement('div');
    card.className = 'col-lg-8 p-0 music-card';
    card.innerHTML = `
              <div class="card card-three" >
                  <div class="head-div d-flex justify-content-between">
                      <div class="family d-flex align-items-center gap-2">
                          <div class="persons-react1">
                              <img src="${data.owner.img}" class="persons-react" alt="">
                          </div>
                          <div class="falimy-data">
                              <p class="person-name">${data.owner.fullname}</p>
                              <div class="icons">
                                  <span dir="rtl"> <i class="fa-solid fa-clapperboard" style="margin: 0 4px;"></i>${data.type}</span>
                                  <span dir="rtl"> <i class="fa-solid fa-user-group" style="margin: 0 4px;"></i>شله
                                  الفله</span>
                                  </div>
                          </div>
                      </div>
                      <div class="d-flex align-items-end flex-column">
                          <div class="dropdown">
                              <div class="alarm btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                  <i class="fa-solid fa-ellipsis"></i>
                              </div>
                              <ul class="dropdown-menu">
                                  <li><a class="dropdown-item" href="#">رؤية التفاصيل</a></li>
                                  <li><a class="dropdown-item" href="#">حذف</a></li>
                              </ul>
                          </div>
                          <div class="time">
                              <span>${timeAgo(new Date(data.createdAt))}</span>
                          </div>
                      </div>
                  </div>
                  <div class="d-flex justify-content-center resturant-data">
                      <img class="card-img-top" src="${data.media.image}" alt="Card image cap">
                      <div class="whereIAM">
                          <span>أستمع الي </span><br>
                          <span>${data.media.artist} - ${data.media.name}</span>
                      </div>
                  </div>
                  <div class="card-body">
                      <div class="d-flex justify-content-between align-items-center">
                          <div>
                              <span> أحلي ما غني</span>
                          </div>
                          <div>
                              <span><i class="fa-regular fa-eye"></i> ${data.totalViews}</span>
                          </div>
                      </div>
                      <div class="d-flex reacts">
                        ${generateLikes(data.likes)}
                          <div class="persons-react-count" id="btn2" data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop" style="cursor: pointer;">
                             
                              <span>${data.likesCount > 0 ? '+' : ''}${data.likesCount}</span>
                           </div>
                      </div>
                                  <div class="d-flex justify-content-center">
                                     <span class="frist-hr"></span>
                                   </div>
                                  ${generateComments(data.comments)}
                          
                                  <div class="d-flex justify-content-center align-items-center mb-3 mt-4 readmore" id="comentbtn${data.id}"
                                  data-bs-toggle="modal" 
                                  data-bs-target="#largeModal" 
                                  style="cursor: pointer;"
                                  >
                                  <span style="font-weight: 500;">اقرا المزيد<i class="fa-solid fa-chevron-down"
                                    style="margin-right: 13px;"></i></span>
                                </div>
                  </div>
              </div>
          `;
    // const updatedButtons = document.querySelectorAll('.persons-react-count');
    // updatedButtons.forEach(button => {
    //   button.addEventListener('click', handleButtonClick);
    // });
    if (data.comments.length <= 1) {
     // console.log(data.comments.length);
      card.querySelector('.readmore').classList.add("hide");
    }
    if (data.comments.length === 0) {
      card.querySelector('.frist-hr').classList.add("hide");
    }
    const likebtn = card.querySelector(`#btn2`);

          if (likebtn) {
            likebtn.addEventListener('click', function () {
             
              console.log(data.id);
              displayLikesData(data.id)
           
            });
          }
    const readMoreButton = card.querySelector(`#comentbtn${data.id}`);

    if (readMoreButton) {
      readMoreButton.addEventListener('click', function () {
        displayCommentsData(data.id);
        console.log(data.id);
        
     
      });
    }
    cardContainer.appendChild(card);
    // const CommnetsButtons = document.querySelectorAll('.readmore');

    // CommnetsButtons.forEach(button => {
    //   button.addEventListener('click', function () {
    //     const dataId = button.id.replace("comentbtn", "");
    //     const data = currentPageData.find(item => item.id === parseInt(dataId));
     
    //     displayCommentsData(data.comments);
    //   });
    // });


  }
  // Function to create Film Post
  function createFilmCard(data) {
    const cardContainer = document.getElementById('Film');
    const card = document.createElement('div');
    card.className = 'col-lg-8 p-0 music-card';
    card.innerHTML = `
            <div class="card card-three" >
                <div class="head-div d-flex justify-content-between">
                    <div class="family d-flex align-items-center gap-2">
                        <div class="persons-react1">
                            <img src="${data.owner.img}" class="persons-react" alt="">
                        </div>
                        <div class="falimy-data">
                            <p class="person-name">${data.owner.fullname}</p>
                            <div class="icons">
                                <span dir="rtl"> <i class="fa-solid fa-clapperboard" style="margin: 0 4px;"></i>${data.type
      }</span>
                                <span dir="rtl"> <i class="fa-solid fa-user-group" style="margin: 0 4px;"></i>شله
                                الفله</span>
                                </div>
                        </div>
                    </div>
                    <div class="d-flex align-items-end flex-column">
                        <div class="dropdown">
                            <div class="alarm btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-ellipsis"></i>
                            </div>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">رؤية التفاصيل</a></li>
                                <li><a class="dropdown-item" href="#">حذف</a></li>
                            </ul>
                        </div>
                        <div class="time">
                            <span>${timeAgo(new Date(data.createdAt))}</span>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center resturant-data">
                    <img class="card-img-top" src="${data.media.image
      }" alt="Card image cap">
                    <div class="whereIAM">
                        <span>أشاهد</span><br>
                        <span>${data.media.artist} - ${data.media.name}</span>
                    </div>
                </div>
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                          <span> يستحق المشاهدة <i class="fa-solid fa-star" style="color: #f1830d;"></i></span>
                        </div>
                        <div>
                            <span><i class="fa-regular fa-eye"></i> ${data.totalViews}</span>
                        </div>
                    </div>
                    <div class="d-flex reacts">
                    ${generateLikes(data.likes)}
                      <div class="persons-react-count" id="btn2" data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop" style="cursor: pointer;">
                          <span>${data.likesCount > 0 ? '+' : ''}${data.likesCount}</span>
                       </div>
                  </div>
                                <div class="d-flex justify-content-center">
                                  <span class="frist-hr"></span>
                                </div>
                              
                                ${generateComments(data.comments)}
                          
                                <div class="d-flex justify-content-center align-items-center mb-3 mt-4 readmore" id="comentbtn${data.id}"
                                data-bs-toggle="modal" 
                                data-bs-target="#largeModal" 
                                style="cursor: pointer;"
                                >
                                <span style="font-weight: 500;" >اقرا المزيد<i class="fa-solid fa-chevron-down"
                                  style="margin-right: 13px;"></i></span>
                              </div>
                          
                </div>
            </div>
        `;
    // const updatedButtons = document.querySelectorAll('.persons-react-count');

    // updatedButtons.forEach(button => {

    //   button.addEventListener('click', handleButtonClick);
    // });
    const likebtn = card.querySelector(`#btn2`);

    if (likebtn) {
      likebtn.addEventListener('click', function () {
       
        console.log(data.id);
        displayLikesData(data.id)
     
      });
    }
    if (data.comments.length <= 1) {
     // console.log(data.comments.length);
      card.querySelector('.readmore').classList.add("hide");
    }
    if (data.comments.length == 0) {
      card.querySelector('.frist-hr').classList.add("hide");
    }
    // card.addEventListener('click', function () {
    //   // Log the item ID when the card is clicked
    //   console.log(data.id);
    // });
    const readMoreButton = card.querySelector(`#comentbtn${data.id}`);

    if (readMoreButton) {
      readMoreButton.addEventListener('click', function () {
        displayCommentsData(data.id);
        console.log(data.id);
        
     
      });
    }
    cardContainer.appendChild(card);
    // const CommnetsButtons = document.querySelectorAll('.readmore');

    // CommnetsButtons.forEach(button => {
    //   button.addEventListener('click', function () {
    //    // console.log(data.id);
    //     const dataId = button.id.replace("comentbtn", "");
    //     console.log( button.id);
    //     const data = currentPageData.find(item => item.id === parseInt(dataId));
     
    //     displayCommentsData(dataId);
    //   });
    // });
   
  }
  // Function to create Film Post
  function createImageCard(data) {
    const cardContainer = document.getElementById('eight');
    const card = document.createElement('div');
    card.className = 'col-lg-8 p-0 music-card';
    card.innerHTML = `
          <div class="card card-three" >
              <div class="head-div d-flex justify-content-between">
                  <div class="family d-flex align-items-center gap-2">
                      <div class="persons-react1">
                          <img src="${data.owner.img}" class="persons-react" alt="">
                      </div>
                      <div class="falimy-data">
                          <p class="person-name">${data.owner.fullname}</p>
                          <div class="icons">
                              <span dir="rtl"> <i class="fa-solid fa-image" style="margin: 0 4px;"></i>${data.type
      }</span>
                                <span dir="rtl"> <i class="fa-solid fa-user-group" style="margin: 0 4px;"></i>شله
                                  لندن</span>
                              </div>
                      </div>
                  </div>
                  <div class="d-flex align-items-end flex-column">
                      <div class="dropdown">
                          <div class="alarm btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              <i class="fa-solid fa-ellipsis"></i>
                          </div>
                          <ul class="dropdown-menu">
                              <li><a class="dropdown-item" href="#">رؤية التفاصيل</a></li>
                              <li><a class="dropdown-item" href="#">حذف</a></li>
                          </ul>
                      </div>
                      <div class="time">
                          <span>${timeAgo(new Date(data.createdAt))}</span>
                      </div>
                  </div>
              </div>
            
              <div class="d-flex justify-content-center resturant-data">
                  <img class="card-img-top" src="${data.files[0].preview}" alt="Card image cap">
              </div>
              <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                
              <div>
              <div class="d-flex reacts" style = "margin-top=0">
              ${generateLikes(data.likes)}
                <div class="persons-react-count" id="btn2" data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop" style="cursor: pointer;">
                    <span>${data.likesCount > 0 ? '+' : ''}${data.likesCount}</span>
                 </div>
            </div>
          </div>

          <div class="vission-comments">
          <div>
              <span>
                  <i class="fa-regular fa-eye"></i>
                  ${data.totalViews }
              </span>
          </div>
        
      </div>
              </div>
             
                          <div class="d-flex justify-content-center">
                            <span class="frist-hr"></span>
                          </div>
                        
                          ${generateComments(data.comments)}
                    
                          <div class="d-flex justify-content-center align-items-center mb-3 mt-4 readmore" id="comentbtn${data.id}"
                          data-bs-toggle="modal" 
                          data-bs-target="#largeModal" 
                          style="cursor: pointer;"
                          >
                          <span style="font-weight: 500;">اقرا المزيد<i class="fa-solid fa-chevron-down"
                            style="margin-right: 13px;"></i></span>
                        </div>
                    
          </div>
      </div>
      `;
    // const updatedButtons = document.querySelectorAll('.persons-react-count');

    // updatedButtons.forEach(button => {

    //   button.addEventListener('click', handleButtonClick);
    // });
    const likebtn = card.querySelector(`#btn2`);

    if (likebtn) {
      likebtn.addEventListener('click', function () {
       
        console.log(data.id);
        displayLikesData(data.id)
     
      });
    }
    if (data.comments.length <= 1) {
    //  console.log(data.comments.length);
      card.querySelector('.readmore').classList.add("hide");
    }
    if (data.comments.length == 0) {
      card.querySelector('.frist-hr').classList.add("hide");
    }
    const readMoreButton = card.querySelector(`#comentbtn${data.id}`);

    if (readMoreButton) {
      readMoreButton.addEventListener('click', function () {
        displayCommentsData(data.id);
        console.log(data.id);
        
     
      });
    }
    cardContainer.appendChild(card);
    // const CommnetsButtons = document.querySelectorAll('.readmore');

    // CommnetsButtons.forEach(button => {
    //   button.addEventListener('click', function () {
    //     const dataId = button.id.replace("comentbtn", "");
    //     const data = currentPageData.find(item => item.id === parseInt(dataId));
     
    //     displayCommentsData(data.comments);
    //   });
    // });
  }
  // Function to create Film Post
  function createTextCard(data) {
    const cardContainer = document.getElementById('textdiv');
    const card = document.createElement('div');
    card.className = 'col-lg-8 p-0 music-card';
    card.innerHTML = `
            <div class="card card-three" >
                <div class="head-div d-flex justify-content-between">
                    <div class="family d-flex align-items-center gap-2">
                        <div class="persons-react1">
                            <img src="${data.owner.img}" class="persons-react" alt="">
                        </div>
                        <div class="falimy-data">
                            <p class="person-name">${data.owner.fullname}</p>
                            <div class="icons">
                                <span dir="rtl"> <i class="fa-solid fa-clapperboard" style="margin: 0 4px;"></i>${data.type}</span>
                                <span dir="rtl"> <i class="fa-solid fa-user-group" style="margin: 0 4px;"></i>أيام
                                الثانوي</span>
                                </div>
                        </div>
                    </div>
                    <div class="d-flex align-items-end flex-column">
                        <div class="dropdown">
                            <div class="alarm btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-ellipsis"></i>
                            </div>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">رؤية التفاصيل</a></li>
                                <li><a class="dropdown-item" href="#">حذف</a></li>
                            </ul>
                        </div>
                        <div class="time">
                            <span>${timeAgo(new Date(data.createdAt))}</span>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center resturant-data">
                <div class="details">
                              <p> <span class="fact">${data.content}</span> </p>

                          </div>
                </div>
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                      
                       <div>
                       <div class="d-flex reacts">
                       ${generateLikes(data.likes)}
                         <div class="persons-react-count" id="btn2" data-bs-toggle="modal"
                             data-bs-target="#staticBackdrop" style="cursor: pointer;">
                             <span>${data.likesCount > 0 ? '+' : ''}${data.likesCount}</span>
                          </div>
                     </div>
                </div>

                <div class="vission-comments">
                <div>
                    <span>
                        <i class="fa-regular fa-eye"></i>
                        ${data.totalViews }
                    </span>
                </div>
                <div>
                    <span class="comment-num">
                        <i class="fa-regular fa-message"></i>
                        ${data.commentsCount}
                    </span>
                </div>
            </div>
                    </div>
                  
                                <div class="d-flex justify-content-center">
                                  <span class="frist-hr"></span>
                                </div>
                              
                                ${generateComments(data.comments)}
                          
                                <div class="d-flex justify-content-center align-items-center mb-3 mt-4 readmore" id="comentbtn${data.id}"
                                data-bs-toggle="modal" 
                                data-bs-target="#largeModal" 
                                style="cursor: pointer;"
                                >
                                <span style="font-weight: 500;">اقرا المزيد<i class="fa-solid fa-chevron-down"
                                  style="margin-right: 13px;"></i></span>
                              </div>
                          
                </div>
            </div>
        `;
    // const updatedButtons = document.querySelectorAll('.persons-react-count');

    // updatedButtons.forEach(button => {

    //   button.addEventListener('click', handleButtonClick);
    // });
    const likebtn = card.querySelector(`#btn2`);

    if (likebtn) {
      likebtn.addEventListener('click', function () {
       
        console.log(data.id);
        displayLikesData(data.id)
     
      });
    }
    if (data.comments.length <= 1) {
    //  console.log(data.comments.length);
      card.querySelector('.readmore').classList.add("hide");
    }
    if (data.comments.length == 0) {
      card.querySelector('.frist-hr').classList.add("hide");
    }
    const readMoreButton = card.querySelector(`#comentbtn${data.id}`);

    if (readMoreButton) {
      readMoreButton.addEventListener('click', function () {
        displayCommentsData(data.id);
        console.log(data.id);
        
     
      });
    }
    cardContainer.appendChild(card);
    // const CommnetsButtons = document.querySelectorAll('.readmore');

    // CommnetsButtons.forEach(button => {
    //   button.addEventListener('click', function () {
    //     const dataId = button.id.replace("comentbtn", "");
    //     const data = currentPageData.find(item => item.id === parseInt(dataId));
     
    //     displayCommentsData(data.comments);
    //   });
    // });
  }

  // Function to create OCCASION Post
  function createOccasionCard(data) {
    const cardContainer = document.getElementById('OCCASION');
    const card = document.createElement('div');
    card.className = 'col-lg-8 p-0 music-card';
    card.innerHTML = `
    <div class="card card-nine"
    style="background-image: url('${data.occasion.img}');"
    
    >
    <div class=" head-div d-flex justify-content-end">
        <div class="dropdown">
            <div class=" alarm btn btn-secondary dropdown-toggle" type="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-ellipsis"></i>
            </div>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">رؤية التفاصيل</a></li>
                <li><a class="dropdown-item" href="#">حذف</a></li>

            </ul>
        </div>
    </div>

    <div class="d-flex justify-content-between align-items-center outer-person">
        <div class="d-flex align-items-center gap-2">
            <div class="person-img">
                <img src="${data.owner.img}" alt="">
            </div>
            <p class="person-name">${data.owner.fullname}</p>
        </div>

        <button class="wish">
            وش تحب
            <i class="fa-solid fa-less-than"></i>
        </button>
    </div>
    <div class="card-body">

        <div class="d-flex justify-content-between comments">
            <div class="vission-name">
                <p>${data.occasion.name} <span>${timeAgo(new Date(data.occasion.fullDate))}</span></p>
            </div>
            <div class="vission-comments">
                <div>
                    <span>  <i class="fa-regular fa-eye"></i>   ${data.totalViews }</span>
                </div>
                <div>
                    <span class="comment-num">
                        <i class="fa-regular fa-message"></i>
                        ${data.commentsCount}
                    </span>
                </div>
            </div>
        </div>
        <div class="d-flex flex-column ">
          
            <p>${data.occasion.end ? '<span class="fact">انتهت</span>' : '<span class="fact">لم تنتهي</span>'}</p>

        </div>
        <div class="d-flex reacts" style="margin-top:25px">
        ${generateLikes(data.likes)}
          <div class="persons-react-count" id="btn2" data-bs-toggle="modal"
              data-bs-target="#staticBackdrop" style="cursor: pointer;">
              <span>${data.likesCount > 0 ? '+' : ''}${data.likesCount}</span>
           </div>
      </div>
        
          ${generateComments(data.comments)}

          <div class="d-flex justify-content-center align-items-center mb-3 mt-4 readmore" id="comentbtn${data.id}"
          data-bs-toggle="modal" 
          data-bs-target="#largeModal" 
          style="cursor: pointer;"
          >
          <span style="font-weight: 500;">اقرا المزيد<i class="fa-solid fa-chevron-down"
            style="margin-right: 13px;"></i></span>
        </div>

      </div>
      </div>
        `;
    // const updatedButtons = document.querySelectorAll('.persons-react-count');

    // updatedButtons.forEach(button => {

    //   button.addEventListener('click', handleButtonClick);
    // });
    const likebtn = card.querySelector(`#btn2`);

    if (likebtn) {
      likebtn.addEventListener('click', function () {
       
        console.log(data.id);
        displayLikesData(data.id)
     
      });
    }
    if (data.comments.length <= 1) {
    //  console.log(data.comments.length);
      card.querySelector('.readmore').classList.add("hide");
    }
    // if (data.comments.length == 0) {
    //   card.querySelector('.frist-hr').classList.add("hide");
    // }
    cardContainer.appendChild(card);
    const readMoreButton = card.querySelector(`#comentbtn${data.id}`);

    if (readMoreButton) {
      readMoreButton.addEventListener('click', function () {
        displayCommentsData(data.id);
        console.log(data.id);
        
     
      });
    }
    // const CommnetsButtons = document.querySelectorAll('.readmore');

    // CommnetsButtons.forEach(button => {
    //   button.addEventListener('click', function () {
    //     console.log(button);
    //     const dataId = button.id.replace("comentbtn", "");
    //     const data = currentPageData.find(item => item.id === parseInt(dataId));
     
    //     displayCommentsData(data.comments);
    //   });
    // });
  }
  function createGiftCard(data) {
    const cardContainer = document.getElementById('GIFT');
    const card = document.createElement('div');
    card.className = 'col-lg-8 p-0 music-card';
    card.innerHTML = `
    <div class="card card-gift"
    style="background-image: url('${data.gift.img}');"
    >
                      <div class=" head-div d-flex justify-content-end">
                          <div class="dropdown">
                              <div class=" alarm btn btn-secondary dropdown-toggle" type="button"
                                  data-bs-toggle="dropdown" aria-expanded="false">
                                  <i class="fa-solid fa-ellipsis"></i>
                              </div>
                              <ul class="dropdown-menu">
                                  <li><a class="dropdown-item" href="#">رؤية التفاصيل</a></li>
                                  <li><a class="dropdown-item" href="#">حذف</a></li>

                              </ul>
                          </div>
                      </div>

                      <div class="d-flex justify-content-between align-items-center outer-person">
                          <div class="d-flex align-items-center gap-2">
                              <div class="person-img">
                              <img src="${data.owner.img}" alt="">
                              </div>
                              <p class="person-name"> ${data.owner.fullname}</p>
                          </div>

                          <button class="wish">
                              وش تحب
                              <i class="fa-solid fa-less-than"></i>
                          </button>
                      </div>
                      <div class="card-body">


                      <div class="d-flex reacts" style="margin-top = 0">
                      ${generateLikes(data.likes)}
                        <div class="persons-react-count" id="btn2" data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop" style="cursor: pointer;">
                            <span>${data.likesCount > 0 ? '+' : ''}${data.likesCount}</span>
                         </div>
                    </div>
                          <div class="d-flex justify-content-center">
                          <span class="frist-hr"></span>
                        </div>
                      
                        ${generateComments(data.comments)}
                
                        <div class="d-flex justify-content-center align-items-center mb-3 mt-4 readmore" id="comentbtn${data.id}"
                        data-bs-toggle="modal" 
                        data-bs-target="#largeModal" 
                        style="cursor: pointer;"
                        >
                        <span style="font-weight: 500;">اقرا المزيد<i class="fa-solid fa-chevron-down"
                          style="margin-right: 13px;"></i></span>
                      </div>
                
                    </div>
                    </div>
        `;
    // const updatedButtons = document.querySelectorAll('.persons-react-count');

    // updatedButtons.forEach(button => {

    //   button.addEventListener('click', handleButtonClick);
    // });
    const likebtn = card.querySelector(`#btn2`);

    if (likebtn) {
      likebtn.addEventListener('click', function () {
       
        console.log(data.id);
        displayLikesData(data.id)
     
      });
    }
    if (data.comments.length <= 1) {
  //    console.log(data.comments.length);
      card.querySelector('.readmore').classList.add("hide");
    }
    if (data.comments.length == 0) {
      card.querySelector('.frist-hr').classList.add("hide");
    }
    const readMoreButton = card.querySelector(`#comentbtn${data.id}`);

    if (readMoreButton) {
      readMoreButton.addEventListener('click', function () {
        displayCommentsData(data.id);
        console.log(data.id);
        
     
      });
    }
    cardContainer.appendChild(card);
    // const CommnetsButtons = document.querySelectorAll('.readmore');

    // CommnetsButtons.forEach(button => {
    //   button.addEventListener('click', function () {
    //     const dataId = button.id.replace("comentbtn", "");
    //     const data = currentPageData.find(item => item.id === parseInt(dataId));
     
    //     displayCommentsData(data.comments,data.id);
    //   });
    // });
  }
  function createVedioCard(data) {
    const cardContainer = document.getElementById('VIDEO');
    const card = document.createElement('div');
    card.className = 'col-lg-8 p-0 music-card';
    card.innerHTML = `
                <div class="card card-three">
                <div class=" head-div d-flex justify-content-between">
                    <div class="family d-flex align-items-center gap-2">
                        <div class="persons-react1">
                        <img src="${data.owner.img}" class="persons-react" alt="">
                        </div>
                        <div class="falimy-data">
                        <p class="person-name">${data.owner.fullname}</p>
                            <div class="icons">
                                <span dir="rtl"> <i class="fa-brands fa-youtube"
                                        style="margin: -2px 4px;"></i>${data.type}</span>
                                <span dir="rtl"> <i class="fa-solid fa-earth-americas"
                                        style="margin: 0 4px;"></i>عام</span>

                            </div>

                        </div>
                    </div>
                    <div class="d-flex align-items-end flex-column">
                        <div class="dropdown">
                            <div class=" alarm btn btn-secondary dropdown-toggle" type="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-ellipsis"></i>
                            </div>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">رؤية التفاصيل</a></li>
                                <li><a class="dropdown-item" href="#">حذف</a></li>

                            </ul>
                        </div>
                        <div class="time">
                        <span>${timeAgo(new Date(data.createdAt))}</span>
                        </div>
                    </div>

                </div>
                <div class="d-flex justify-content-center resturant-data why-us">
                    <div class="video-box" style="width: 100%;" id="videoContainer">
                        <img id="thumbnail" class="img-fluid" src="${data.files[0].preview}" alt="Video Thumbnail" style="max-width: 100%; height: auto; ">
                        <button class="venobox play-btn mb-4"
                          onclick="playVideo('${data.files[0].link}')"></button>
                    </div>
                </div>
              


              <div class="card-body">

              <div class="d-flex justify-content-between align-items-center">
              <div>
                  <span>يستحق المشاهدة</span>
              </div>
              <div>
                  <span><i class="fa-regular fa-eye"></i></span>
                  <span>${data.totalViews }</span>
              </div>

          </div>
          <div class="d-flex reacts">
          ${generateLikes(data.likes)}
            <div class="persons-react-count" id="btn2" data-bs-toggle="modal"
                data-bs-target="#staticBackdrop" style="cursor: pointer;">
                <span>${data.likesCount > 0 ? '+' : ''}${data.likesCount}</span>
             </div>
        </div>
              <div class="d-flex justify-content-center">
              <span class="frist-hr"></span>
            </div>
          
            ${generateComments(data.comments)}
    
            <div class="d-flex justify-content-center align-items-center mb-3 mt-4 readmore" id="comentbtn${data.id}"
            data-bs-toggle="modal" 
            data-bs-target="#largeModal" 
            style="cursor: pointer;"
            >
            <span style="font-weight: 500;">اقرا المزيد<i class="fa-solid fa-chevron-down"
              style="margin-right: 13px;"></i></span>
          </div>
    
        </div>
        </div>
        `;
          // const updatedButtons = document.querySelectorAll('.persons-react-count');

          // updatedButtons.forEach(button => {

          //   button.addEventListener('click', handleButtonClick);
          // });
          const likebtn = card.querySelector(`#btn2`);

          if (likebtn) {
            likebtn.addEventListener('click', function () {
             
              console.log(data.id);
              displayLikesData(data.id)
           
            });
          }
          if (data.comments.length <= 1) {
          //  console.log(data.comments.length);
            card.querySelector('.readmore').classList.add("hide");
          }
          if (data.comments.length == 0) {
            card.querySelector('.frist-hr').classList.add("hide");
          }
          
          const readMoreButton = card.querySelector(`#comentbtn${data.id}`);

          if (readMoreButton) {
            readMoreButton.addEventListener('click', function () {
              displayCommentsData(data.id);
              console.log(data.id);
              
           
            });
          }
          cardContainer.appendChild(card);
          // const CommnetsButtons = document.querySelectorAll('.readmore');

          // CommnetsButtons.forEach(button => {
          //   button.addEventListener('click', function () {
          //     const dataId = button.id.replace("comentbtn", "");
          //     const data = currentPageData.find(item => item.id === parseInt(dataId));
     
          //     displayCommentsData(data.comments);
          //   });
          // });
  }
  function createLocationCard(data) {
  //   const cardContainer = document.getElementById('LOCATION');
  //   const card = document.createElement('div');
  //   card.className = 'col-lg-8 p-0 music-card';
  //   getCountryName(coordinates, function (country) {
  //   card.innerHTML = `
  //   <div class="card card-three">
  //   <div class=" head-div d-flex justify-content-between">
  //       <div class="family d-flex align-items-center gap-2">
  //           <div class="persons-react1">
  //               <img src="./images/01.jpg" class=" persons-react " alt="">
  //           </div>
  //           <div class="falimy-data">
  //               <p class="person-name">أبو دينا</p>
  //               <div class="icons">
  //                   <span dir="rtl"> <i class="fa-solid fa-location-dot"
  //                           style="margin: 0 4px;"></i>الرياض</span>
  //                   <span dir="rtl"> <i class="fa-solid fa-user-group"
  //                           style="margin: 0 4px;"></i>العائلة</span>

  //               </div>

  //           </div>
  //       </div>
  //       <div class="d-flex align-items-end flex-column">
  //           <div class="dropdown">
  //               <div class=" alarm btn btn-secondary dropdown-toggle" type="button"
  //                   data-bs-toggle="dropdown" aria-expanded="false">
  //                   <i class="fa-solid fa-ellipsis"></i>
  //               </div>
  //               <ul class="dropdown-menu">
  //                   <li><a class="dropdown-item" href="#">رؤية التفاصيل</a></li>
  //                   <li><a class="dropdown-item" href="#">حذف</a></li>

  //               </ul>
  //           </div>
  //           <div class="time">
  //               <span>منذ 3 ساعات</span>
  //           </div>
  //       </div>

  //   </div>
  //   <div class="d-flex justify-content-center resturant-data">
  //       <img class="card-img-top" src="./images/shepreani.jpg" alt="Card image cap">
      
  //       <div class="whereIAM">
  //           <span>انا في</span><br>
  //           <span>${data.location.coordinates}</span><br>
  //           <span><i class="fa-solid fa-location-dot" style="margin: 0 4px;"></i> ${country} </span>

  //       </div>
  //   </div>
  //   <div class="card-body">
  //       <div class="d-flex justify-content-between align-items-center">
  //           <div>
  //               <span><i class="fa-solid fa-user-large"></i> انا مع </span>

  //               <span> <a href="#" class="Iam-With">فهد الدوبخ</a></span>
  //           </div>
  //           <div>
  //               <span><i class="fa-regular fa-eye"></i> 50</span>
  //           </div>

  //       </div>
  //       <div class="d-flex reacts">
  //           <div class="persons-react1">
  //               <a href="#" target="_blank"> <img src="./images/01.jpg" class=" persons-react "
  //                       alt=""></a>
  //               <img class="emoji" src="./images/emo1.png" alt="">
  //           </div>
  //           <div class="persons-react2">
  //               <a href="#" target="_blank"> <img src="./images/02.jpg" class="persons-react"
  //                       alt=""></a>
  //               <img class="emoji" src="./images/emo2.png" alt="">
  //           </div>
  //           <div class="persons-react3">
  //               <a href="#" target="_blank"> <img src="./images/03.jpg" class="persons-react "
  //                       alt=""></a>
  //               <img class="emoji" src="./images/ic.png" alt="">
  //           </div>
          
  //           <div class="persons-react-count" id="btn3" data-bs-toggle="modal"
  //               data-bs-target="#staticBackdrop" style="cursor: pointer;">
  //               <span>+6</span>
  //           </div>
  //       </div>
  //       <div class="d-flex justify-content-center">
  //           <span class="frist-hr"></span>
  //       </div>
        
  //       <div class="d-flex  comment-box align-items-center">
  //           <div class="persons-react1">
  //               <img src="./images/01.jpg" class=" persons-react " alt="">

  //           </div>
  //           <div class="bg-white">
  //               <div class="comment-info ">
  //                   <div class="d-flex justify-content-between">
  //                       <p class="comment-person-name">بدر الدريعي</p>
  //                       <span class="comment-time"> منذ 12 دقيقة</span>
  //                   </div>
  //                   <div class="d-flex mt-2 comment-time">
  //                       <span>لاتنسي تحجز لي هديه من الملفا يا فهد</span>
  //                   </div>
  //               </div>
  //           </div>
  //       </div>
  //       <div class="d-flex justify-content-center align-items-center mb-3 mt-4 readmore" id="comentbtn3"
  //           data-bs-toggle="modal" data-bs-target="#largeModal" style="cursor: pointer;">
  //           <span style="font-weight: 500;">اقرا المزيد<i class="fa-solid fa-chevron-down"
  //                   style="margin-right: 13px;"></i></span>
  //       </div>
  //   </div>

  // </div>
  //       `;
  //         const updatedButtons = document.querySelectorAll('.persons-react-count');
  //         updatedButtons.forEach(button => {

  //           button.addEventListener('click', handleButtonClick);
  //         });
  //         if (data.comments.length <= 1) {
  //           console.log(data.comments.length);
  //           card.querySelector('.readmore').classList.add("hide");
  //         }
  //         if (data.comments.length == 0) {
  //           card.querySelector('.frist-hr').classList.add("hide");
  //         }
  //         cardContainer.appendChild(card);
  //         const CommnetsButtons = document.querySelectorAll('.readmore');
  //         CommnetsButtons.forEach(button => {
  //           button.addEventListener('click', function () {
  //             const dataId = button.id.replace("comentbtn", "");
  //             const data = posts.find(item => item.id === parseInt(dataId));
  //             displayCommentsData(data.comments);
  //           });
  //         });
  // })
  }



  function playVideo(videoUrl) {
  //console.log(videoUrl);
  const videoContainer = document.getElementById("videoContainer");
  videoContainer.innerHTML = `<video controls autoplay src="${videoUrl}" style="max-width: 100%; height: auto;width: 100%"></video>`;

  }
  var coordinates = [24.774265, 46.738586];

  function getCountryName(coordinates, callback) {
    var geocoder = new google.maps.Geocoder();

    // Create a LatLng object using the provided coordinates
    var latLng = new google.maps.LatLng(coordinates[0], coordinates[1]);

    // Perform reverse geocoding
    geocoder.geocode({ 'location': latLng }, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          // Loop through address components to find the country
          var country;
          for (var i = 0; i < results[0].address_components.length; i++) {
            var component = results[0].address_components[i];
            if (component.types.includes('country')) {
              country = component.long_name;
              break;
            }
          }

          if (country) {
            callback(country);
          } else {
            console.error('Country not found');
          }
        } else {
          console.error('No results found');
        }
      } else {
        console.error('Geocoder failed due to: ' + status);
      }
    });
  }


  // Helper function to calculate time ago
  function timeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) {
      return ` منذ ${seconds} ثواني`;
    } else if (seconds < 3600) {
      return ` منذ ${Math.floor(seconds / 60)} دقائق`;
    } else if (seconds < 86400) {
      return ` منذ ${Math.floor(seconds / 3600)} ساعات`;
    } else {
      return ` منذ ${Math.floor(seconds / 86400)} أيام`;
    }
  }

  function generateComments(comments) {
    if (comments.length === 0) {
      return ''; // Return an empty string if there are no comments
    }

    const firstComment = comments[0];

    const commentHTML = `
          <div class="d-flex comment-box align-items-center">
            <div class="persons-react1">
            <a href="" class="personal" target="_blank" > 
              <img src="${firstComment.user.img}" class=" persons-react " alt="">
              </a>
            </div>
            <div class="bg-white">
              <div class="comment-info">
                <div class="d-flex justify-content-between">
                <a href="" class="personal" target="_blank" > 
                  <p class="comment-person-name">${firstComment.user.fullname}</p>
                  </a>
                  <span class="comment-time">${timeAgo(new Date(firstComment.createdAt))}</span>
                </div>
                <div class="d-flex mt-2 comment-time">
                  <span>${firstComment.comment}</span>
                </div>
              </div>
            </div>
          </div>
        `;

    return commentHTML;
  }
  function generateLikes(likes) {
    console.log(likes);
    if (likes.length === 0) {
     
  
      return ``; // Return an empty string if there are no comments
    }
    const slicedLikes = likes.slice(0, 3);
    const firstlike = likes[0];

//     const likeHTML = `
//     <div class="d-flex reacts">
//     <div class="persons-react1">
//         <a href="#" target="_blank"> <img src="./images/01.jpg" class=" persons-react "
//                 alt=""></a>
//         <img class="emoji" src="./images/emo1.png" alt="">
//     </div>
//     <div class="persons-react2">
//         <a href="#" target="_blank"> <img src="./images/02.jpg" class="persons-react"
//                 alt=""></a>
//         <img class="emoji" src="./images/emo2.png" alt="">
//     </div>
//     <div class="persons-react3">
//         <a href="#" target="_blank"> <img src="./images/03.jpg" class="persons-react "
//                 alt=""></a>
//         <img class="emoji" src="./images/ic.png" alt="">
//     </div>
//     <div class="persons-react-count" id="btn2" data-bs-toggle="modal"
//         data-bs-target="#staticBackdrop" style="cursor: pointer;">
//         <span>+${data.likesCount}</span>
//     </div>

// </div>
//         `;

//     return likeHTML;
    const likeHTML = slicedLikes.map((like, index) => `
    
        <div class="persons-react1">
          <a href="#" target="_blank">
            <img src="${like.user.img}" class="persons-react" alt="${like.user.fullname}">
          </a>
          <img class="emoji" src="${like.reaction.img}" alt="Reaction Emoji">
        </div>
     
   
      `).join('');

      return likeHTML;
      }

      


  nasda: [
    {
        "id": 8,
        "createdAt": "2023-11-02T05:32:45.548Z",
        "user": {
            "fullname": "بدر الدريعي",
            "id": 2,
            "img": "https://wisht7b-api.algorithms.ws/uploads/595f7777-22e7-403d-9fe4-347d4a82cf71.jpeg"
        },
        "reaction": {
            "img": "https://wisht7b-api.algorithms.ws/uploads/08e62a06-7b32-4eca-a62b-0061ff337d7f.png",
            "id": 1
        }
    },
    {
      "id": 9,
      "createdAt": "2023-11-02T05:32:45.548Z",
      "user": {
          "fullname": "بدر الدريعي",
          "id": 2,
          "img": "https://wisht7b-api.algorithms.ws/uploads/595f7777-22e7-403d-9fe4-347d4a82cf71.jpeg"
      },
      "reaction": {
          "img": "https://wisht7b-api.algorithms.ws/uploads/08e62a06-7b32-4eca-a62b-0061ff337d7f.png",
          "id": 1
      }
  },
  {
    "id": 10,
    "createdAt": "2023-11-02T05:32:45.548Z",
    "user": {
        "fullname": "بدر الدريعي",
        "id": 2,
        "img": "https://wisht7b-api.algorithms.ws/uploads/595f7777-22e7-403d-9fe4-347d4a82cf71.jpeg"
    },
    "reaction": {
        "img": "https://wisht7b-api.algorithms.ws/uploads/08e62a06-7b32-4eca-a62b-0061ff337d7f.png",
        "id": 1
    }
},
{
  "id": 11,
  "createdAt": "2023-11-02T05:32:45.548Z",
  "user": {
      "fullname": "بدر الدريعي",
      "id": 2,
      "img": "https://wisht7b-api.algorithms.ws/uploads/595f7777-22e7-403d-9fe4-347d4a82cf71.jpeg"
  },
  "reaction": {
      "img": "https://wisht7b-api.algorithms.ws/uploads/08e62a06-7b32-4eca-a62b-0061ff337d7f.png",
      "id": 1
  }
},
  
]







  // function displayCommentsData(id) {
  //   console.log(id);
  //   // const modal = document.getElementById("largeModal");
  //   // const modalContent = document.getElementById("modalCommentContent");

  //   // modalContent.innerHTML = ''; // Clear previous content

  //   // data.forEach(comment => {
  //   //   const commentBox = document.createElement('div');
  //   //   commentBox.classList.add('d-flex', 'align-items-center', 'modelcomment-box');

  //   //   commentBox.innerHTML = `
  //   //         <div class="persons-react1">
  //   //         <img src="${comment.user.img}" class=" persons-react " alt="">
  //   //         </div>
  //   //         <div class="bg-white">
  //   //           <div class="comment-info">
  //   //             <div class="d-flex justify-content-between">
  //   //               <p class="comment-person-name">${comment.user.fullname}</p>
  //   //               <span class="comment-time">${timeAgo(new Date(comment.createdAt))}</span>
  //   //             </div>
  //   //             <div class="d-flex mt-2 comment-time">
  //   //               <span>${comment.comment}</span>
  //   //             </div>
  //   //           </div>
  //   //         </div>
  //   //       `;

  //   //   modalContent.appendChild(commentBox);
  //   // });
  // }

  
 function displayCommentsData(id) {
  console.log(id);
  fetch(`https://wisht7b-api.algorithms.ws/api/v1/posts/${id}/getPostComments`, {
   method: 'GET',
   headers: headers
 })
   .then(response => response.json())
   .then(res => {
     let postcomments = res.data
     console.log(res.data);
      const modal = document.getElementById("largeModal");
   const modalContent = document.getElementById("modalCommentContent");

   modalContent.innerHTML = ''; // Clear previous content

   postcomments.forEach(comment => {
     const commentBox = document.createElement('div');
     commentBox.classList.add('d-flex', 'align-items-center', 'modelcomment-box');

     commentBox.innerHTML = `
           <div class="persons-react1">
           <a href="" target="_blank" >
           <img src="${comment.user.img}" class=" persons-react " alt="">
           </a>
           </div>
           <div class="bg-white">
             <div class="comment-info">
               <div class="d-flex justify-content-between">
               <a href="" class="personal" target="_blank" >  <p class="comment-person-name">${comment.user.fullname}</p></a>
                 <span class="comment-time">${timeAgo(new Date(comment.createdAt))}</span>
               </div>
               <div class="d-flex mt-2 comment-time">
                 <span>${comment.comment}</span>
               </div>
             </div>
           </div>
         `;

     modalContent.appendChild(commentBox);
   });
   })
   .catch(error => {

     console.error('Error:', error);
   });
  
 }
  
//  function displayLikesData(id) {
//   console.log(id);
//   fetch(`https://wisht7b-api.algorithms.ws/api/v1/posts/${id}/getPostLikes`, {
//    method: 'GET',
//    headers: headers
//  })
//    .then(response => response.json())
//    .then(res => {
//     if(res){
//       let postlikes = res.data.likes
//       console.log(res.data);
//        const modal = document.getElementById("staticBackdrop");
//     const modalContent = document.getElementById("modalContent");
 
//     modalContent.innerHTML = `<ul>`; // Clear previous content
//     postlikes.forEach(like => {
//      const likesbox = document.createElement('div');
//      likesbox.classList.add('d-flex', 'align-items-center', 'modelcomment-box');
 
//      modalContent.innerHTML += `
//      <li>
//      <img class="model-per-img" src="${like.user.img}" alt="${project.name}" />
//        <p>${like.user.fullname}</p>
//        <img class="model-per-react" src="${like.reaction.img}" alt="${project.name}" />
//      </li>
//    `;
 
//      modalContent.appendChild(likesbox);
//    });
//     }
  
//    })
//    .catch(error => {

//      console.error('Error:', error);
//    });
  
//  }

function displayLikesData(id) {
  console.log(id);
  fetch(`https://wisht7b-api.algorithms.ws/api/v1/posts/${id}/getPostLikes`, {
    method: 'GET',
    headers: headers
  })
    .then(response => response.json())
    .then(res => {
      if (res && res.data ) {
        let postlikes = res.data;
        console.log(res.data);
        const modal = document.getElementById("staticBackdrop");
        const modalContent = document.getElementById("modalContent");

        modalContent.innerHTML = `<ul>`; // Clear previous content

        if (postlikes.length > 0) {
          postlikes.forEach(like => {
           
            modalContent.innerHTML += `
              <li>
              
               <div class="likeperdiv">
               <a href="" class="personal" target="_blank" > 
                  <img class="model-per-img" src="${like.user.img}" alt="" />
                  </a>
                  <a href="" class="personal" target="_blank" > 
                  <p>${like.user.fullname}</p>
                  </a>
                  <img class="model-per-react" src="${like.reaction.img}" alt="" />
                
               </div>
               <div> <span class="comment-time">${timeAgo(new Date(like.createdAt))}</span></div>
              
              </li>
            `;

          //  modalContent.appendChild(likesbox);
          });
        } else {
          // Handle the case where there are no likes
          modalContent.innerHTML += `<p class="nolikes">لا توجد اعجابات حاليا </p>`;
        }
      } else {
        // Handle the case where the response or required data is missing
        console.error('Invalid response:', res);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

  const Commentbuttons = document.querySelectorAll('.readmore');
  function handlecommentButtonClick(data) {
    displayCommentsData(data);
  }

  const buttons = document.querySelectorAll('.persons-react-count');
  function handleButtonClick() {
    //console.log("Button clicked");
    displayModalData(button1Data);
  }
  buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
  });
  function displayModalData(data) {

    const modal = document.getElementById("staticBackdrop");
    const modalContent = document.getElementById("modalContent");

    modalContent.innerHTML = `<ul>`;

    data.forEach(project => {
      modalContent.innerHTML += `
        <li>
        <img class="model-per-img" src="${project.PersonImage}" alt="${project.name}" />
          <p>${project.name}</p>
          <img class="model-per-react" src="${project.image}" alt="${project.name}" />
        </li>
      `;
    });
  }

asd = [
  {
    "status": "ACTIVE",
    "likesCount": 0,
    "type": "MUSIC",
    "commentsCount": 0,
    "privacy": "PUBLIC",
    "location": {
      "coordinates": []
    },
    "media": {
      "name": "أذان الفجر بصوت اعجوبة الزمان",
      "year": "2021-06-30T12:00:00Z",
      "artist": "الشيخ عبدالباسط عبدالصمد",
      "image": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/30/f1/da/30f1da6c-71c1-98ec-c31b-991012792bd7/196292016536.jpg/1024x1024bb.png",
      "type": "song"
    },
    "isLike": false,
    "totalViews": 0,
    "viewsCount": 0,
    "id": 105,
    "createdAt": "2023-11-02T14:22:27.714Z",
    "files": [],
    "owner": {
      "fullname": "",
      "id": 69,
      "img": "https://wisht7b-api.algorithms.ws/uploads/cf0c3159-e360-4178-9176-ad93e8c38dba.jpg"
    },
    "comments": [],
    "likes": []
  },
  {
    "content": "الفايكنقز قادمون ",
    "status": "ACTIVE",
    "likesCount": 0,
    "type": "MUSIC",
    "commentsCount": 0,
    "privacy": "PUBLIC",
    "location": {
      "coordinates": []
    },
    "media": {
      "name": "Reflections on a Hero",
      "year": "2019-12-06T12:00:00Z",
      "artist": "Trevor Morris",
      "image": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/e6/68/de/e668de0d-6150-3d3a-dfe7-a522ddc97ac9/886448091431.jpg/1024x1024bb.png",
      "type": "song"
    },
    "isLike": false,
    "totalViews": 0,
    "viewsCount": 0,
    "id": 109,
    "createdAt": "2023-11-03T05:41:40.852Z",
    "files": [],
    "owner": {
      "fullname": "",
      "id": 69,
      "img": "https://wisht7b-api.algorithms.ws/uploads/cf0c3159-e360-4178-9176-ad93e8c38dba.jpg"
    },
    "comments": [],
    "likes": []
  },
  {
    "content": "\nه",
    "status": "ACTIVE",
    "likesCount": 0,
    "type": "MOVIE",
    "commentsCount": 0,
    "privacy": "PUBLIC",
    "location": {
      "coordinates": []
    },
    "media": {
      "name": "The Departed",
      "year": "2014-10-23T00:00:00-07:00",
      "artist": "Martin Scorsese",
      "image": "https://is1-ssl.mzstatic.com/image/thumb/Video5/v4/a7/04/a5/a704a571-38f2-8441-2c4b-63144b775a8b/Departed_1400x2100_EN.jpg/1024x1024bb.png",
      "trackPreview": "https://video-ssl.itunes.apple.com/itunes-assets/Video111/v4/03/c6/b4/03c6b4db-0faa-c447-59b0-32e8ea9d4c60/mzvf_29129859488161134.640x352.h264lc.U.p.m4v",
      "type": "movie"
    },
    "isLike": false,
    "totalViews": 0,
    "viewsCount": 0,
    "id": 133,
    "createdAt": "2023-11-10T20:58:12.209Z",
    "files": [],
    "owner": {
      "fullname": "badr",
      "phone": "+966564646590",
      "id": 69,
      "img": "https://wisht7b-api.algorithms.ws/uploads/64cb024f-eb06-4a00-832c-6c159a964f2f.png"
    },
    "comments": [],
    "likes": []
  },
  {
    "status": "ACTIVE",
    "likesCount": 0,
    "type": "MOVIE",
    "commentsCount": 1,
    "privacy": "PUBLIC",
    "location": {
      "coordinates": []
    },
    "media": {
      "name": "Mission: Impossible - Dead Reckoning Part One",
      "year": "2023-07-12T00:00:00-07:00",
      "artist": "Christopher McQuarrie",
      "image": "https://is1-ssl.mzstatic.com/image/thumb/Video126/v4/ef/ef/7d/efef7d8c-ab79-bdcf-1c69-899e9b90e2e6/f4454f0a-9074-4859-a1b2-b7987cde2fa1_MissionImpossibleDeadReckoningPart1_EN_2000x3000_TTStack.jpg/1024x1024bb.png",
      "trackPreview": "https://video-ssl.itunes.apple.com/itunes-assets/Video116/v4/18/e5/65/18e56512-93e3-fd73-623f-f3765f74e177/mzvf_1200022234514146743.640x352.h264lc.U.p.m4v",
      "type": "movie"
    },
    "isLike": false,
    "totalViews": 0,
    "viewsCount": 0,
    "id": 139,
    "createdAt": "2023-11-10T21:10:59.706Z",
    "files": [],
    "owner": {
      "fullname": "badr",
      "phone": "+966564646590",
      "id": 69,
      "img": "https://wisht7b-api.algorithms.ws/uploads/64cb024f-eb06-4a00-832c-6c159a964f2f.png"
    },
    "comments": [
      {
        "comment": "الفلم رهيب",
        "type": "MAIN",
        "id": 29,
        "createdAt": "2023-11-10T21:12:06.462Z",
        "user": {
          "fullname": "badr",
          "username": "bader23",
          "img": "64cb024f-eb06-4a00-832c-6c159a964f2f.png",
          "id": 69
        }
      }
    ],
    "likes": []
  }
]






