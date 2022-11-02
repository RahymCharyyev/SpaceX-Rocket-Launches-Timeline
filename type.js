let i = 0;
let txt =
  '"You want to wake up in the morning and think the future is going to be great - and that’s what being a spacefaring civilization is all about. It’s about believing in the future and thinking that the future will be better than the past. And I can’t think of anything more exciting than going out there and being among the stars."';
let speed = 50; /* The speed/duration of the effect in milliseconds */
const typeWriter = () => {
  if (i < txt.length) {
    document.getElementById("typing__text").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
};

typeWriter();
