window.addEventListener("load", function () {
  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  numberWithCommas(69000);
  // console.log("티켓랭킹코딩")

  const fileName = "book.json";

  const xhr = new XMLHttpRequest();

  xhr.open("GET", fileName);
  xhr.send();

  xhr.onreadystatechange = function (event) {
    // console.log("데이터 전송 상태 확인", event.target.readyState);
    if (event.target.readyState === XMLHttpRequest.DONE) {
      // console.log("자료 가져오는데 성공완료", event.target.response);
      const res = event.target.response;

      const json = JSON.parse(res);
      makeHtmlTag(json);
    }
  };

  function makeHtmlTag(_res) {
    let htmlbookTag = ``;

    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["good_" + index];

      let tempTag = ``;
      if (i !== _res.total - 1) {
        tempTag = `
        <div class="swiper-slide">
          <div class="book-slide-item">
            <a href="#" class="book-link">
              <div class="book-img">
                <img src="${obj.image}" alt="" />
              </div>
              <div class="book-info">
                <ul class="book-good-list">
                  <li>
                    <p class="book-good-info-p">
                      ${obj.title}
                    </p>
                  </li>
                  <li class="book-good-info">
                    <span>
                      <b>${obj.price}</b>
                      원
                    </span>
                  </li>
                  >
                </ul>
              </div>
            </a>
          </div>
        </div>
        `;
      } else {
        tempTag = `
            <div class="swiper-slide">
              <div class="seeAll">
                <a href="#" class="seeAll-a">
                  <i></i>
                  <p>전체보기</p>
                </a>
              </div>            
            </div>
          `;
      }
      htmlbookTag += tempTag;
    }
    showHtmlTag(htmlbookTag);

    //   const badge = document.querySelectorAll(".book-good-info-badge i");

    //   for (let i = 0; i < badge.length; i++) {
    //     if (badge[i].textContent === "단독판매") {
    //       badge[i].style.color = "red";
    //       badge[i].style.borderColor = "rgba(239,62,67,0.3)";
    //     }
    //   }
  }

  function showHtmlTag(_html) {
    const bookSlide = ".book-slide .swiper-wrapper";
    const tag = document.querySelector(bookSlide);
    tag.innerHTML = _html;

    makeSwiper();
  }

  function makeSwiper() {
    const swiperbook = new Swiper(".book-slide", {
      slidesPerView: 5,
      spaceBetween: 27,
      navigation: {
        nextEl: ".book-slide-wrap .slide-next-bt",
        prevEl: ".book-slide-wrap .slide-prev-bt",
      },
      slidesPerGroup: 5,
    });
  }
});
