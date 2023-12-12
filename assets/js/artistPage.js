// const openClose = () => {
//   let spans = document.querySelectorAll("nav span");
//   let contUno = document.querySelectorAll(".cont-1");
//   let colCentrale = document.querySelector(".colCentrale");
//   let notCanvas = document.querySelector(".notCanvas");

//   if (!contUno[1].classList.contains("d-none")) {
//     spans.forEach((i) => i.classList.remove("d-md-inline-block"));
//     spans.forEach((i) => i.classList.add("d-md-none"));
//     contUno[1].classList.add("d-none");
//     colCentrale.classList.remove("col-7");
//     colCentrale.classList.add("col-9");
//     notCanvas.classList.remove("col-3");
//     notCanvas.classList.add("col-1");
//   } else {
//     spans.forEach((i) => i.classList.remove("d-md-none"));
//     spans.forEach((i) => i.classList.add("d-md-inline-block"));
//     contUno[1].classList.remove("d-none");
//     colCentrale.classList.remove("col-9");
//     colCentrale.classList.add("col-7");
//     notCanvas.classList.remove("col-1");
//     notCanvas.classList.add("col-3");
//   }
// };

// let menuBtn = document.querySelector(".menuBtn");
// menuBtn.addEventListener("click", openClose);
