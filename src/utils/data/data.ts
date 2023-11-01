export type movieType = {
  id?: string;
  title?: string;
  distributor?: string;
  year?: number;
  amount?: string;
  // bg?: string;
  img?: string;
  videoSrc? : string;
};


export const movieData = [
  {
    "id": "1",
    "title": "Jawan",
    "distributor": "20th Century Fox",
    "year": 2023,
    "amount": "300cr",
    "img": "https://m.media-amazon.com/images/M/MV5BOWI5NmU3NTUtOTZiMS00YzA1LThlYTktNDJjYTU5NDFiMDUxXkEyXkFqcGdeQXVyMTUzNjEwNjM2._V1_SX300.jpg",
    "videoSrc" : "https://www.youtube.com/watch?v=COv52Qyctws"
  },
  {
    "id": "2",
    "title": "Leo",
    "distributor": "20th Century Fox",
    "year": 2023,
    "amount": "200cr",
    "img": "https://m.media-amazon.com/images/M/MV5BMDk0ZmVmMTktOGNiNS00Yzg5LWIzZTAtNjUxZWZhZDljY2Y0XkEyXkFqcGdeQXVyMTY1MzAyNjU4._V1_SX300.jpg",
    "videoSrc" : "https://www.youtube.com/watch?v=Po3jStA673E"
  },
  {
    "id": "3",
    "title": "Tiger Nageswara Rao",
    "distributor": "20th Century Fox",
    "year": 2023,
    "amount": "70cr",
    "img": "https://m.media-amazon.com/images/M/MV5BNTM0NTA2NDktNjQ3My00MWNjLTkxZDEtMTE0NmNmYWRkMjkyXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_SX300.jpg",
    "videoSrc" :"https://www.youtube.com/watch?v=CdwIA8ZBksQ"
  },
];
