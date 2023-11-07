window.addEventListener("load", function () {
  // console.log("투어 슬라이드 기능");

  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  numberWithCommas(69000);

  // 1. 외부 데이터를 불러온다.

  const fileName = "tour.json";
  // 외부 데이터 가져올 때 작성법
  const xhr = new XMLHttpRequest();

  xhr.open("GET", fileName);
  xhr.send();
  xhr.onreadystatechange = function (event) {
    // console.log("데이터 전송 상태 확인", event.target.readyState);
    if (event.target.readyState === XMLHttpRequest.DONE) {
      // console.log("자료 가져오는데 성공완료", event.target.response)
      const res = event.target.response;

      const json = JSON.parse(res);
      makeHtmlTag(json);
    }
  };

  function makeHtmlTag(_res) {
    let htmlTourTag = ``;

    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["good_" + index];

      const tempTag = `
      <div class="swiper-slide">
        <div class="tour-slide-item">
          <a href="${obj.url}" class="tour-link">
            <div class="tour-img">
              <img src="${obj.image}" alt="${obj.desc}" />
            </div>
            <div class="tour-info">
              <ul class="tour-good-list">
                <li class="tour-good-info">
                  <i class="tour-good-info-badge">${obj.badge}</i>
                </li>
                <li class="tour-good-info">
                  <p class="tour-good-info-benefit">${obj.benefit}</p>
                  <span class="tour-good-info-desc">${obj.desc}</span>
                </li>
                <li class="tour-good-info">
                  <span>
                    <b class="tour-good-info-price">${numberWithCommas(
                      obj.price
                    )}</b>
                    <span class="tour-good-info-unit">원~</span>
                  </span>
                </li>
              </ul>
            </div>
          </a>
        </div>
      </div>
    `;
      htmlTourTag += tempTag;
    }
    showHtmlTag(htmlTourTag);
  }

  function showHtmlTag(_html) {
    // 3. swiper 태그에 백틱을 배치한다.
    const tourSlide = ".tour-slide .swiper-wrapper";
    const tag = document.querySelector(tourSlide);
    tag.innerHTML = _html;

    makeSwiper();
  }

  function makeSwiper() {
    // 4. swiper 작동시킨다.
    const swiperTour = new Swiper(".tour-slide", {
      slidesPerView: 3,
      spaceBetween: 27,
      // 좌, 우측 버튼
      navigation: {
        nextEl: ".tour-slide-wrap .slide-next-bt",
        prevEl: ".tour-slide-wrap .slide-prev-bt",
      },
      // 몇장씩 이동할지
      slidesPerGroup: 3,
    });
  }
});
