

    const apiUrl = 'https://wisht7b-api.algorithms.ws/api/v1/posts'
    const allapi = "https://wisht7b-api.algorithms.ws/api/v1/posts?limit=1000";
    const apiToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MCIsImlzcyI6Ildhc2hUbzdiIiwiaWF0IjoxNjk4NzU1MjY4Mzk0LCJleHAiOjE2OTg3NTU4NzMxOTR9.ljgz2r-CV-crQZpXz1P7vo4owjkeHewCXtW4kk0jBMg";

    const headers = new Headers({
      "Authorization": `Bearer ${apiToken}`,
    });

    const selectElement = document.getElementById("product-filter");
    let searchInput = document.getElementById('product-search');
    searchInput.addEventListener('input', handleSearch);
    let searchInput2 = document.getElementById('product-search2');

    searchInput2.addEventListener('input', handlesearchforselectetype);
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
          initiatePagination(data, '');
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
          displayAllData(posts);
          searchInput2.style.display = "none"
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
            }else if (item.type === 'LOCATION') {
              createLocationCard(item);
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
        const Locate = document.getElementById('Locate');
        // Remove existing cards from the containers
        musicCardContainer.innerHTML = '';
        filmCardContainer.innerHTML = '';
        notFoundMessage.innerHTML = '';
        eight.innerHTML = '';
        textdiv.innerHTML = '';
        OCCASION.innerHTML = '';
        GIFT.innerHTML = '';
        VIDEO.innerHTML = '';
        Locate.innerHTML = '';

      }
      function initiatePagination(data, type) {
        clearCardContainer();
        renderItems(data.data);
        renderPaginationControls(data, type);
      }

      function handlePageChange(url, pageNumber, type) {
        const updatedUrl = type !== '' ? `${url}&type=${type}` : url;
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

      function renderPaginationControls(data, type) {

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
        } else {
          prevButton.disabled = true;
        }
        // Conditionally hide Previous button on the first page
        if (data.page === 1) {
          prevButton.style.display = 'none';
        }
        if (type !== '') {
          paginationContainer2.appendChild(prevButton);
        } else {
          paginationContainer.appendChild(prevButton);
        }
        // Create page number buttons with a limit (e.g., 5 pages)
        const limit = 3;
        const startPage = Math.max(1, data.page - Math.floor(limit / 2));
        const endPage = Math.min(data.pageCount, startPage + limit - 1);

        for (let i = startPage; i <= endPage; i++) {
          const pageButton = document.createElement('button');
          pageButton.innerText = i;
          pageButton.addEventListener('click', () => handlePageChange(`https://wisht7b-api.algorithms.ws/api/v1/posts?page=${i}`, i, type));
          if (i === data.page) {
            pageButton.classList.add('active');
          }
          if (type !== '') {
            paginationContainer2.appendChild(pageButton);
          } else {
            paginationContainer.appendChild(pageButton);
          }
        }
        if (type !== '') {
          paginationContainer2.appendChild(nextButton);
        } else {
          paginationContainer.appendChild(nextButton);
        }
      }
      function renderItems(items) {
        // Clear existing items
        clearCardContainer();

        // Render each item on the page
        items.forEach(item => {
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
          }else if (item.type === 'LOCATION') {
            createLocationCard(item);
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
            } else if (item.type === 'LOCATION') {
              createLocationCard(item);
            }
          }
        });
      }

      window.addEventListener('load', initializePage);
        selectElement.addEventListener("change", () => {
          const selectedValue = selectElement.value;
          if (selectedValue) {
            //searchInput.style.display="none";
            //  searchInput.value = ''
          }
          if (selectedValue === "all") {
            searchInput2.style.display = "none";
            searchInput.style.display = "block";
            const paginationContainer = document.getElementById('pagination-container');
            const paginationContainer4 = document.getElementById('pagination-container4');
            paginationContainer.style.display = "flex";
            paginationContainer4.style.display = "none";
            initializePage()
            displayAllData(originalPosts);
          } else {
            searchInput.style.display = "none";
            searchInput2.style.display = "block";
            searchInput.value = '';
            searchInput2.value = '';
            if (searchInput2.value === '') {
              console.log("search is empty");

              const paginationContainer3 = document.getElementById('pagination-container3');
              const paginationContainer4 = document.getElementById('pagination-container4');
              paginationContainer4.style.display = "none";
              paginationContainer3.style.display = "none";
            }
            const paginationContainer2 = document.getElementById('pagination-container2');
            const paginationContainer3 = document.getElementById('pagination-container3');
            const paginationContainer4 = document.getElementById('pagination-container4');
            if (paginationContainer2) {

              paginationContainer2.style.display = "flex";
            }
            else if (paginationContainer3 && searchInput2 === '') {

              paginationContainer3.style.display = "none";
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
            initiatePagination(filteredData, type);
            fetchalldatabytype(type)
            console.log(`filteredData by type ${type}`, filteredData);

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
        else {
          showPagination()
        }

        // Filter posts based on the search term
        const filteredData = alldata.data.filter(item => {
          return (
            (item.type && item.type.toLowerCase().includes(searchTerm)) ||
            (item.owner && item.owner.fullname && item.owner.fullname.toLowerCase().includes(searchTerm)) ||
            (item.content && item.content && item.content.toLowerCase().includes(searchTerm)) ||
            (item.occasion && item.occasion.name && item.occasion.name.toLowerCase().includes(searchTerm))
          );
        });
        const allpaganation = document.getElementById("all-paganation");
        currentPageData = filteredData;
        console.log(filteredData);
        const selectedType = selectElement.value;
        // Display the filtered data in HTML using the displayAllData function
        if (filteredData.length > 0) {
          allpaganation.style.display = "block"
          displayAllsearchData(filteredData, 1);
          searchrenderPaginationControls(filteredData)
        }
        else {
          const allpaganation = document.getElementById("all-paganation");
          allpaganation.style.display = "none"
          clearCardContainer();
          console.log("no data herere");
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
          pageButton.onclick = function () {
            changePage(i, filteredData);
          };

          paginationContainer3.appendChild(pageButton);
        }

        // Create "Next" button
        const nextButton = document.createElement('button');
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
      function changePage(page, filteredData) {

        console.log(page);
        currentPage = page;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        displayAllsearchData(filteredData, page);
        searchrenderPaginationControls(filteredData);
      }
      function changePage2(page, filteredData) {
        console.log(page);
        currentPage = page;
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
          currentPageData.forEach(item => {
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
            } else if (item.type === 'LOCATION') {
              createLocationCard(item);
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
        }
        else {
          showPagination2()
        }
        // Filter posts based on the search term
        const myselecteddata = mydata.filter(item => {
          return (
            (item.type && item.type.toLowerCase().includes(searchTerm)) ||
            (item.owner && item.owner.fullname && item.owner.fullname.toLowerCase().includes(searchTerm)) ||
            (item.content && item.content && item.content.toLowerCase().includes(searchTerm)) ||
            (item.occasion && item.occasion.name && item.occasion.name.toLowerCase().includes(searchTerm))

          );
        });

        //currentPageData = filteredData;
        console.log(myselecteddata);
        const allpaganation = document.getElementById("all-paganation");
        // Display the filtered data in HTML using the displayAllData function
        if (myselecteddata.length > 0) {

          displayAllsearchselectedData(myselecteddata, 1);
          searchrenderPaginationControlsforselected(myselecteddata)
          allpaganation.style.display = "block"
        }
        else {

          allpaganation.style.display = "none"
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
        currentPageData.forEach(item => {
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
          else if (item.type === 'LOCATION') {
            createLocationCard(item);
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
                                <a href="" class="personal" target="_blank" > 
                                    <img src="${data.owner.img}" class="persons-react" alt="" onerror="handleImageError(this)">
                                </a>
                                </div>
                                <div class="falimy-data">
                                <a href="" class="personal" target="_blank" > 
                                    <p class="person-name">${data.owner.fullname}</p>
                                </a>
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
                            <img class="card-img-top" src="${data.media.image}" alt="Card image cap" onerror="handlebigImageError(this)">
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

        if (data.comments.length <= 1) {
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
                              <a href="" class="personal" target="_blank" > 
                                  <img src="${data.owner.img}" class="persons-react" alt="" onerror="handleImageError(this)">
                              </a>
                              </div>
                              <div class="falimy-data">
                              <a href="" class="personal" target="_blank" > 
                                  <p class="person-name">${data.owner.fullname}</p>
                              </a>
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
                          <img class="card-img-top" src="${data.media.image}" alt="" onerror="handlebigImageError(this)">
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
        const readMoreButton = card.querySelector(`#comentbtn${data.id}`);
        if (readMoreButton) {
          readMoreButton.addEventListener('click', function () {
            displayCommentsData(data.id);
            console.log(data.id);
          });
        }
        cardContainer.appendChild(card);

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
                            <a href="" class="personal" target="_blank" > 
                                <img src="${data.owner.img}" class="persons-react" alt="" onerror="handleImageError(this)">
                            </a>
                            </div>
                            <div class="falimy-data">
                            <a href="" class="personal" target="_blank" > 
                              <p class="person-name">${data.owner.fullname}</p>
                            </a>
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
                        <img class="card-img-top" src="${data.files[0].preview}" alt="" onerror="handlebigImageError(this)">
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
                        ${data.totalViews}
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
                              <a href="" class="personal" target="_blank" > 
                                <img src="${data.owner.img}" class="persons-react" alt="" onerror="handleImageError(this)">
                              </a>
                              </div>
                              <div class="falimy-data">
                              <a href="" class="personal" target="_blank" > 
                                  <p class="person-name">${data.owner.fullname}</p>
                              </a>
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
                              ${data.totalViews}
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

        const likebtn = card.querySelector(`#btn2`);

        if (likebtn) {
          likebtn.addEventListener('click', function () {

            console.log(data.id);
            displayLikesData(data.id)

          });
        }
        if (data.comments.length <= 1) {
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

      }

      // Function to create OCCASION Post
     
      function createOccasionCard(data) {
        const cardContainer = document.getElementById('OCCASION');
        const card = document.createElement('div');
        card.className = 'col-lg-8 p-0 music-card';
        card.innerHTML = `
        <div class="card card-three">
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
        <div class="d-flex justify-content-center resturant-data">
            <img class="card-img-new-top" src="${data.occasion.img}" alt="" onerror="handlebigImageError(this)">

            <div class="d-flex justify-content-between align-items-center whereIAM outer-person newgif">
                <div class="d-flex align-items-center gap-2">
                    <div class="person-img">
                      <a href="" class="personal" target="_blank" > 
                         <img src="${data.owner.img}" alt="" onerror="handleImageError(this)">
                       </a>
                    </div>
                    <a href="" class="personal" target="_blank" > 
                     <p class="person-name">${data.owner.fullname}</p>
                  </a>
                </div>

                <button class="wish">
                    وش تحب
                    <i class="fa-solid fa-less-than"></i>
                </button>
            </div>
        </div>
        <div class="card-body">

        <div class="d-flex justify-content-between comments">
            <div class="vission-name">
                <p>${data.occasion.name} <span>${timeAgo(new Date(data.occasion.fullDate))}</span></p>
            </div>
            <div class="vission-comments">
                <div>
                    <span>  <i class="fa-regular fa-eye"></i>   ${data.totalViews}</span>
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


        const likebtn = card.querySelector(`#btn2`);

        if (likebtn) {
          likebtn.addEventListener('click', function () {

            console.log(data.id);
            displayLikesData(data.id)

          });
        }
        if (data.comments.length <= 1) {

          card.querySelector('.readmore').classList.add("hide");
        }
        cardContainer.appendChild(card);
        const readMoreButton = card.querySelector(`#comentbtn${data.id}`);

        if (readMoreButton) {
          readMoreButton.addEventListener('click', function () {
            displayCommentsData(data.id);
            console.log(data.id);


          });
        }

      }
      function createGiftCard(data) {
        const cardContainer = document.getElementById('GIFT');
        const card = document.createElement('div');
        card.className = 'col-lg-8 p-0 music-card';
        card.innerHTML = `
        <div class="card card-three">
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
        <div class="d-flex justify-content-center resturant-data">
            <img class="card-img-new-top" src="${data.gift.img}" alt="" onerror="handlebigImageError(this)">

            <div class="d-flex justify-content-between align-items-center whereIAM outer-person newgif">
                <div class="d-flex align-items-center gap-2">
                    <div class="person-img">
                      <a href="" class="personal" target="_blank" > 
                         <img src="${data.owner.img}" alt="" onerror="handleImageError(this)">
                       </a>
                    </div>
                    <a href="" class="personal" target="_blank" > 
                     <p class="person-name">${data.owner.fullname}</p>
                  </a>
                </div>

                <button class="wish">
                    وش تحب
                    <i class="fa-solid fa-less-than"></i>
                </button>
            </div>
        </div>
       
        
        <div class="card-body">


        <div class="d-flex reacts" style="margin-top :0 !important">
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


        const likebtn = card.querySelector(`#btn2`);

        if (likebtn) {
          likebtn.addEventListener('click', function () {

            console.log(data.id);
            displayLikesData(data.id)

          });
        }
        if (data.comments.length <= 1) {

          card.querySelector('.readmore').classList.add("hide");
        }
        
        if (data.comments.length === 0) {
          card.querySelector('.frist-hr').classList.add("hide");
        }
        cardContainer.appendChild(card);
        const readMoreButton = card.querySelector(`#comentbtn${data.id}`);

        if (readMoreButton) {
          readMoreButton.addEventListener('click', function () {
            displayCommentsData(data.id);
            console.log(data.id);


          });
        }

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
                              <a href="" class="personal" target="_blank" > 
                                <img src="${data.owner.img}" class="persons-react" alt="" onerror="handleImageError(this)">
                              </a>
                              </div>
                              <div class="falimy-data">
                          <a href="" class="personal" target="_blank" > 
                              <p class="person-name">${data.owner.fullname}</p>
                          </a>
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
                              <img id="thumbnail" class="img-fluid" src="${data.files[0].preview}" alt="" onerror="handlebigImageError(this)" style="max-width: 100%; height: auto; ">
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
                        <span>${data.totalViews}</span>
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

        const likebtn = card.querySelector(`#btn2`);

        if (likebtn) {
          likebtn.addEventListener('click', function () {

            console.log(data.id);
            displayLikesData(data.id)

          });
        }
        if (data.comments.length <= 1) {
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
      }
            
      function createLocationCard(data) {
        const cardContainer = document.getElementById('Locate');
        const card = document.createElement('div');
        card.className = 'col-lg-8 p-0 music-card';

        card.innerHTML = `
                <div class="card card-three">
                <div class=" head-div d-flex justify-content-between">
                    <div class="family d-flex align-items-center gap-2">
                        <div class="persons-react1">
                        <a href="" class="personal" target="_blank" > 
                          <img src="${data.owner.img}" class="persons-react" alt="" onerror="handleImageError(this)">
                        </a>
                        </div>
                        <div class="falimy-data">
                        <a href="" class="personal" target="_blank" > 
                          <p class="person-name">${data.owner.fullname}</p>
                        </a> 
                            <div class="icons">
                            <span dir="rtl" class="contryname" > </span>
                              

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
                <div class="d-flex justify-content-center resturant-data">
            
              
                <div id="mapcontainer"></div>
                    <div class="whereIAM">
                        <span>انا في</span><br>
                        <a href="" target="_blank" class="d-flex align-items-center mapurl">
                        <i class="fa-solid fa-location-dot" style="margin: 0 4px;"> </i>
                          <p>
                          <span class="regionName"></span> —
                            <span class="area">  </span>
                          
                          </p>
                        </a>
                      
                    </div>
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
                    ${data.totalViews}
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

        const likebtn = card.querySelector(`#btn2`);

        if (likebtn) {
          likebtn.addEventListener('click', function () {
            console.log(data.id);
            displayLikesData(data.id)
          });
        }
        if (data.comments.length <= 1) {
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


        // MapKit code
        const mapContainer = card.querySelector('#mapcontainer');
        const mapId = 'map' + data.id;
        mapContainer.id = mapId;
        mapContainer.className = 'map-container';

        // Add the card to the container
        cardContainer.appendChild(card);

        // Initialize MapKit after the card is added to the DOM
        console.log('Initializing MapKit');
        mapkit.init({
          authorizationCallback: function (done) {
            done("eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkNWNzdCQlg1NVEifQ.eyJpc3MiOiI3VjMzN1RVTUhQIiwiaWF0IjoxNzAwNDgzMjM0LCJleHAiOjE3MzIwNjA4MDB9.1--SuZK6kPCIK6phmNH-14xsH5HKkaZqBokr-K61HSs5ZmXJcn6xPVpJYXsiDvk0c4sTzeXJP8jIZ8JDO-dvpQ"); // Replace with your MapKit JS key
          },
          language: "en"
        });

        const map = new mapkit.Map(mapId, {
          showsMapTypeControl: false,
          showsCompass: mapkit.FeatureVisibility.Hidden
        });
        const lang = data.location.coordinates[0];
        const lat = data.location.coordinates[1];
        console.log(lang, lat);
        var coordinateRegion = new mapkit.CoordinateRegion(
          new mapkit.Coordinate(lat,  lang),
          new mapkit.CoordinateSpan(0.234, 0.23423)
        );
        map.region = coordinateRegion;

        const coordinate = new mapkit.Coordinate(lat,  lang);
        const marker = new mapkit.MarkerAnnotation(coordinate);
        map.addAnnotation(marker);

        // Reverse geocoding
        const reverseGeocoder = new mapkit.Geocoder({
          language: "en"
        });

        reverseGeocoder.reverseLookup(coordinate, function (error, data) {
          if (error) {
            console.error("Reverse geocoding error:", error);
          } else {
            console.log(data);
            const placeName = data.results[0].name;
            const CeName = data.results[0].administrativeArea;
            const url = data.results[0]._wpURL;
            const country = data.results[0].country;
            console.log("Current location:", placeName);

            // Display place name on the card
            const mapurl = document.querySelector('.mapurl');
            if (mapurl) {
              mapurl.setAttribute("href", `${url}`)
            }
            const whereIAMElement = card.querySelector('.whereIAM');
            const contryname = card.querySelector('.contryname');
            const Area = document.querySelector(".area");
            const regionName = document.querySelector(".regionName");
            if (regionName) {
              regionName.innerText = `${placeName}`;
            }
            if (Area) {
              Area.innerText = `${CeName}`;
            }
            if (contryname) {
              contryname.innerHTML += `<i class="fa-solid fa-location-dot" style="margin: 0 4px;"></i>${country}`;
            }
          }
        });


      }






      function playVideo(videoUrl) {
        const videoContainer = document.getElementById("videoContainer");
        videoContainer.innerHTML = `<video controls autoplay src="${videoUrl}" style="max-width: 100%; height: auto;width: 100%"></video>`;
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
                    <img src="${firstComment.user.img}" class=" persons-react " alt="" onerror="handleImageError(this)">
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
       
        if (likes.length === 0) {
          return ``;
        }
        const slicedLikes = likes.slice(0, 3);
        const firstlike = likes[0];
        const likeHTML = slicedLikes.map((like, index) => `
          
              <div class="persons-react1">
                <a href="#" target="_blank">
                  <img src="${like.user.img}" class="persons-react" alt="${like.user.fullname}" onerror="handleImageError(this)">
                </a>
                <img class="emoji" src="${like.reaction.img}" alt="Reaction Emoji">
              </div>
          
        
            `).join('');

        return likeHTML;
      }

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
                <img src="${comment.user.img}" class=" persons-react " alt="" onerror="handleImageError(this)">
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

      function displayLikesData(id) {
        console.log(id);
        fetch(`https://wisht7b-api.algorithms.ws/api/v1/posts/${id}/getPostLikes`, {
          method: 'GET',
          headers: headers
        })
          .then(response => response.json())
          .then(res => {
            if (res && res.data) {
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
                        <img class="model-per-img" src="${like.user.img}" alt="" onerror="handleImageError(this)"/>
                        </a>
                        <a href="" class="personal" target="_blank" > 
                        <p>${like.user.fullname}</p>
                        </a>
                        <img class="model-per-react" src="${like.reaction.img}" alt="" />
                      
                    </div>
                    <div> <span class="comment-time">${timeAgo(new Date(like.createdAt))}</span></div>
                    
                    </li>
                  `;
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

      function handleImageError(imgElement) {
        imgElement.src = 'images/avatar-1.png'; 
        imgElement.alt = ''; 
      }
      function handlebigImageError(imgElement) {
        imgElement.src = 'images/error.png'; 
        imgElement.alt = ''; 
      }
      function handleBackgroundImageError(container) {
        container.style.backgroundImage = 'url("images/error.png")'; 
      }

 